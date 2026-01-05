import OpenAI from 'openai';
import { DesignTokensSchema, type DesignTokens, type ComponentCustomization } from '@repo/core';
import { DESIGN_SYSTEM_PROMPT, COMPONENT_CUSTOMIZATION_PROMPT } from './prompts';

let openai: OpenAI | null = null;

/**
 * Create/get the OpenAI client
 */
export function createAIClient(apiKey?: string): OpenAI {
    if (openai) return openai;

    openai = new OpenAI({
        apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    return openai;
}

/**
 * Generate design tokens from a user prompt
 */
export async function generateDesignTokens(
    userPrompt: string,
    apiKey?: string
): Promise<DesignTokens> {
    const client = createAIClient(apiKey);

    const response = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: DESIGN_SYSTEM_PROMPT },
            { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
        throw new Error('No response from AI');
    }

    const parsed = JSON.parse(content);

    // Validate with Zod
    const validated = DesignTokensSchema.parse(parsed);
    return validated;
}

/**
 * Generate component customizations
 */
export async function generateComponentCustomization(
    componentName: string,
    componentCode: string,
    aesthetic: string,
    apiKey?: string
): Promise<ComponentCustomization> {
    const client = createAIClient(apiKey);

    const response = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: COMPONENT_CUSTOMIZATION_PROMPT },
            {
                role: 'user',
                content: `Component: ${componentName}
Aesthetic: ${aesthetic}

Component Code:
\`\`\`tsx
${componentCode}
\`\`\``,
            },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
        throw new Error('No response from AI');
    }

    return JSON.parse(content) as ComponentCustomization;
}

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import type { ComponentCustomization } from '@repo/core';

/**
 * Transform a component's source code based on customizations
 */
export async function transformComponent(
    sourceCode: string,
    customizations: ComponentCustomization
): Promise<string> {
    const ast = parse(sourceCode, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });

    traverse(ast, {
        // Add imports for Framer Motion if needed
        Program(path) {
            const hasFramerAnimations = customizations.animations?.some(
                a => a.type === 'framer-motion'
            );

            if (hasFramerAnimations) {
                // Check if framer-motion is already imported
                const hasImport = path.node.body.some(
                    node =>
                        node.type === 'ImportDeclaration' &&
                        node.source.value === 'framer-motion'
                );

                if (!hasImport) {
                    // Add framer-motion import at the top
                    const importAst = parse(
                        'import { motion } from "framer-motion";',
                        { sourceType: 'module' }
                    );
                    path.node.body.unshift(importAst.program.body[0]);
                }
            }
        },

        // Modify JSX elements based on code modifications
        JSXOpeningElement(path) {
            const elementName = path.node.name;
            if (elementName.type !== 'JSXIdentifier') return;

            const modifications = customizations.codeModifications?.filter(
                m => m.target.toLowerCase().includes(elementName.name.toLowerCase())
            );

            if (!modifications?.length) return;

            for (const mod of modifications) {
                if (mod.action === 'add-class') {
                    // Find or create className attribute
                    const classAttr = path.node.attributes.find(
                        attr =>
                            attr.type === 'JSXAttribute' &&
                            attr.name.type === 'JSXIdentifier' &&
                            attr.name.name === 'className'
                    );

                    if (classAttr && classAttr.type === 'JSXAttribute') {
                        // Append to existing className
                        if (classAttr.value?.type === 'StringLiteral') {
                            classAttr.value.value += ` ${mod.value}`;
                        }
                    }
                }
            }
        },
    });

    const output = generate(ast, {
        retainLines: true,
        compact: false,
    });

    return output.code;
}

/**
 * Parse component to extract variant information
 */
export function extractVariants(sourceCode: string): string[] {
    const variants: string[] = [];
    const cvaMatch = sourceCode.match(/variants:\s*\{([^}]+)\}/);

    if (cvaMatch) {
        const variantSection = cvaMatch[1];
        const variantNames = variantSection.match(/(\w+):\s*\{/g);
        if (variantNames) {
            for (const name of variantNames) {
                variants.push(name.replace(/:\s*\{/, '').trim());
            }
        }
    }

    return variants;
}

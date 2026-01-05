import { z } from 'zod';

// ============================================================================
// OKLCH Color Schema
// ============================================================================
const oklchPattern = /^oklch\([\d.]+\s+[\d.]+\s+[\d.]+\)$/;
export const OklchColorSchema = z.string().regex(oklchPattern, 'Must be valid oklch() format');
export type OklchColor = z.infer<typeof OklchColorSchema>;

// ============================================================================
// Design Tokens Schema
// ============================================================================
export const DesignTokensSchema = z.object({
    // Core Identity
    name: z.string().regex(/^[a-z0-9-]+$/, 'Must be kebab-case'),
    description: z.string().min(10).max(500),

    // Color Palette
    colors: z.object({
        primary: OklchColorSchema,
        primaryForeground: OklchColorSchema,
        secondary: OklchColorSchema,
        secondaryForeground: OklchColorSchema,
        muted: OklchColorSchema,
        mutedForeground: OklchColorSchema,
        accent: OklchColorSchema,
        accentForeground: OklchColorSchema,
        destructive: OklchColorSchema,
        destructiveForeground: OklchColorSchema,
        background: OklchColorSchema,
        foreground: OklchColorSchema,
        card: OklchColorSchema,
        cardForeground: OklchColorSchema,
        popover: OklchColorSchema,
        popoverForeground: OklchColorSchema,
        border: OklchColorSchema,
        input: OklchColorSchema,
        ring: OklchColorSchema,
        // Optional
        chart1: OklchColorSchema.optional(),
        chart2: OklchColorSchema.optional(),
        chart3: OklchColorSchema.optional(),
        chart4: OklchColorSchema.optional(),
        chart5: OklchColorSchema.optional(),
    }),

    // Dark mode overrides
    darkColors: z.object({
        background: OklchColorSchema,
        foreground: OklchColorSchema,
        card: OklchColorSchema.optional(),
        cardForeground: OklchColorSchema.optional(),
        popover: OklchColorSchema.optional(),
        popoverForeground: OklchColorSchema.optional(),
        primary: OklchColorSchema.optional(),
        primaryForeground: OklchColorSchema.optional(),
        secondary: OklchColorSchema.optional(),
        secondaryForeground: OklchColorSchema.optional(),
        muted: OklchColorSchema.optional(),
        mutedForeground: OklchColorSchema.optional(),
        accent: OklchColorSchema.optional(),
        accentForeground: OklchColorSchema.optional(),
        destructive: OklchColorSchema.optional(),
        border: OklchColorSchema.optional(),
        input: OklchColorSchema.optional(),
        ring: OklchColorSchema.optional(),
    }),

    // Typography
    fonts: z.object({
        heading: z.string(),
        body: z.string(),
        mono: z.string(),
    }),

    // Shape
    radius: z.string().regex(/^[\d.]+rem$|^9999px$|^0$/),
});

export type DesignTokens = z.infer<typeof DesignTokensSchema>;

// ============================================================================
// Animation Schema
// ============================================================================
export const AnimationSchema = z.object({
    name: z.string(),
    type: z.enum(['css-keyframes', 'framer-motion']),
    definition: z.union([z.string(), z.record(z.unknown())]),
    appliesTo: z.enum(['enter', 'exit', 'hover', 'tap', 'custom']),
});

export type Animation = z.infer<typeof AnimationSchema>;

// ============================================================================
// Component Customization Schema
// ============================================================================
export const ComponentCustomizationSchema = z.object({
    cssVars: z.record(z.string()).optional(),
    animations: z.array(AnimationSchema).optional(),
    variants: z.array(z.object({
        name: z.string(),
        classes: z.string(),
    })).optional(),
    codeModifications: z.array(z.object({
        target: z.string(),
        action: z.enum(['add-class', 'add-prop', 'wrap-element']),
        value: z.string(),
    })).optional(),
});

export type ComponentCustomization = z.infer<typeof ComponentCustomizationSchema>;

// ============================================================================
// Forge Project Schema
// ============================================================================
export const ForgeProjectSchema = z.object({
    id: z.string().uuid(),
    userId: z.string(),
    name: z.string().min(1).max(100),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    designTokens: DesignTokensSchema.optional(),
    status: z.enum(['draft', 'generating', 'ready', 'error']),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type ForgeProject = z.infer<typeof ForgeProjectSchema>;

// ============================================================================
// Registry Types
// ============================================================================
export interface RegistryItem {
    $schema?: string;
    name: string;
    type: string;
    title?: string;
    description?: string;
    dependencies?: string[];
    registryDependencies?: string[];
    files: RegistryFile[];
    cssVars?: {
        theme?: Record<string, string>;
        light?: Record<string, string>;
        dark?: Record<string, string>;
    };
    css?: Record<string, Record<string, string>>;
}

export interface RegistryFile {
    path: string;
    type: string;
    content?: string;
    target?: string;
}

export interface Registry {
    $schema: string;
    name: string;
    homepage?: string;
    items: RegistryItem[];
}

import type { DesignTokens, Registry, RegistryItem } from '@franken-ui/core';

/**
 * Build a registry.json from forge project data
 */
export function buildRegistry(
    name: string,
    homepage: string,
    items: RegistryItem[]
): Registry {
    return {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name,
        homepage,
        items,
    };
}

/**
 * Build a style registry item with design tokens
 */
export function buildStyleItem(
    name: string,
    tokens: DesignTokens
): RegistryItem {
    return {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: 'style',
        type: 'registry:style',
        dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
        registryDependencies: ['utils'],
        cssVars: {
            theme: {
                'font-sans': tokens.fonts.body,
                'font-heading': tokens.fonts.heading,
                'font-mono': tokens.fonts.mono,
            },
            light: {
                radius: tokens.radius,
                primary: tokens.colors.primary,
                'primary-foreground': tokens.colors.primaryForeground,
                secondary: tokens.colors.secondary,
                'secondary-foreground': tokens.colors.secondaryForeground,
                muted: tokens.colors.muted,
                'muted-foreground': tokens.colors.mutedForeground,
                accent: tokens.colors.accent,
                'accent-foreground': tokens.colors.accentForeground,
                destructive: tokens.colors.destructive,
                'destructive-foreground': tokens.colors.destructiveForeground,
                background: tokens.colors.background,
                foreground: tokens.colors.foreground,
                card: tokens.colors.card,
                'card-foreground': tokens.colors.cardForeground,
                popover: tokens.colors.popover,
                'popover-foreground': tokens.colors.popoverForeground,
                border: tokens.colors.border,
                input: tokens.colors.input,
                ring: tokens.colors.ring,
            },
            dark: {
                background: tokens.darkColors.background,
                foreground: tokens.darkColors.foreground,
                ...(tokens.darkColors.primary && { primary: tokens.darkColors.primary }),
                ...(tokens.darkColors.card && { card: tokens.darkColors.card }),
            },
        },
        files: [],
    };
}

/**
 * Build a component registry item
 */
export function buildComponentItem(
    name: string,
    code: string,
    dependencies: string[] = [],
    registryDependencies: string[] = []
): RegistryItem {
    return {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name,
        type: 'registry:ui',
        dependencies,
        registryDependencies,
        files: [
            {
                path: `registry/components/${name}/${name}.tsx`,
                type: 'registry:ui',
                content: code,
            },
        ],
    };
}

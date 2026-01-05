/**
 * Convert camelCase to kebab-case
 */
export function toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 */
export function toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Generate a random slug
 */
export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Validate oklch color format
 */
export function isValidOklch(color: string): boolean {
    return /^oklch\([\d.]+\s+[\d.]+\s+[\d.]+\)$/.test(color);
}

/**
 * Parse oklch color into components
 */
export function parseOklch(color: string): { l: number; c: number; h: number } | null {
    const match = color.match(/^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)$/);
    if (!match) return null;
    return {
        l: parseFloat(match[1]),
        c: parseFloat(match[2]),
        h: parseFloat(match[3]),
    };
}

/**
 * Create oklch color string from components
 */
export function createOklch(l: number, c: number, h: number): string {
    return `oklch(${l} ${c} ${h})`;
}

import type { Animation } from '@repo/core';

/**
 * Generate CSS keyframes from animation definitions
 */
export function generateCSSKeyframes(animations: Animation[]): string {
    const cssAnimations = animations.filter(a => a.type === 'css-keyframes');

    return cssAnimations
        .map(a => {
            if (typeof a.definition === 'string') {
                return a.definition;
            }
            return '';
        })
        .filter(Boolean)
        .join('\n\n');
}

/**
 * Generate Framer Motion variants object
 */
export function generateFramerVariants(animations: Animation[]): Record<string, unknown> {
    const framerAnimations = animations.filter(a => a.type === 'framer-motion');
    const variants: Record<string, unknown> = {};

    for (const animation of framerAnimations) {
        if (typeof animation.definition === 'object') {
            variants[animation.appliesTo] = animation.definition;
        }
    }

    return variants;
}

/**
 * Generate animation utility classes
 */
export function generateAnimationClasses(animations: Animation[]): string[] {
    const classes: string[] = [];

    for (const animation of animations) {
        if (animation.type === 'css-keyframes' && animation.appliesTo === 'hover') {
            classes.push(`hover:animate-${animation.name}`);
        } else if (animation.type === 'css-keyframes' && animation.appliesTo === 'enter') {
            classes.push(`animate-${animation.name}`);
        }
    }

    return classes;
}

/**
 * Common animation presets
 */
export const ANIMATION_PRESETS = {
    // Cyberpunk
    glitch: {
        name: 'glitch',
        type: 'css-keyframes' as const,
        definition: `@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}`,
        appliesTo: 'hover' as const,
    },

    neonPulse: {
        name: 'neon-pulse',
        type: 'css-keyframes' as const,
        definition: `@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 5px var(--primary); }
  50% { box-shadow: 0 0 20px var(--primary), 0 0 40px var(--primary); }
}`,
        appliesTo: 'enter' as const,
    },

    // Minimal
    fadeIn: {
        name: 'fade-in',
        type: 'css-keyframes' as const,
        definition: `@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
        appliesTo: 'enter' as const,
    },

    slideUp: {
        name: 'slide-up',
        type: 'css-keyframes' as const,
        definition: `@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`,
        appliesTo: 'enter' as const,
    },

    // Playful
    bounce: {
        name: 'bounce',
        type: 'css-keyframes' as const,
        definition: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}`,
        appliesTo: 'hover' as const,
    },

    wiggle: {
        name: 'wiggle',
        type: 'css-keyframes' as const,
        definition: `@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}`,
        appliesTo: 'hover' as const,
    },
};

/**
 *
 */

import { elasticOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

type Options = {
    duration?: number;
};

export function bounce(node: Element, options: Options): TransitionConfig {
    const { duration = 400 } = options;

    return {
        duration,
        css: (t, u) => {
            const eased = elasticOut(t);

            return `
                transform: scale(${eased}) rotate(${eased + 1080}deg);
                color: hsl(
                    ${Math.trunc(t * 360)},
                    ${Math.min(100, 1000 * u)}%,
                    ${Math.min(50, 500 * u)}%
                )
            );`;
        }
    };
}

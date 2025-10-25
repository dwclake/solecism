/**
 * @author: dwclake
 * @created: 10-25-2025
 */

/**
 *
 * @param ms
 * @returns
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
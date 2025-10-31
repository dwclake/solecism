/**
 *
 * @author dwclake
 */

/**
 *
 * @param ms
 * @returns
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
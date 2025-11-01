/**
 *
 * @param ms
 * @returns
 * @author dwclake
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
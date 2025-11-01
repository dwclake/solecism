import type Document from "./document";

/**
 *
 * @author dwclake
 */
type Return<T> = Promise<{
    ok: boolean,
    document: T | undefined
}>;

export {
    Return,
    Document
};

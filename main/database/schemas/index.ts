/**
 *
 * @author dwclake
 */

import type Document from "./document";

type Return<T> = Promise<{
    ok: boolean,
    document: T | undefined
}>;

export {
    Return,
    Document
};

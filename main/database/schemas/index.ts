/**
 * @author: dwclake
 * @created: 10-25-2025
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

/**
 * @author: dwclake
 * @created: 10-25-2025
 */

export default schemas;

namespace schemas {
    export type Document = {
        id: number,
        title: string,
        content: string,
        created_at: Date,
        updated_at: Date
    };
    export type DocumentReturn = Promise<{
        ok: boolean,
        document: schemas.Document | undefined
    }>;
};

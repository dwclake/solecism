import { type Database } from "sqlite";

import { Return, Document } from "@schemas";

export default { create, open, save, remove };

/**
 *
 * @param db
 * @param title
 * @returns
 * @author dwclake
 */
async function create(db: Database, title: string): Return<Document> {
    const result = await db.run(`
        INSERT INTO documents (title, content)
        VALUES (${title}, ${""})
    `);

    const document = await db.get<Document>(`
        SELECT *
        FROM documents
        WHERE id = ${result.lastID}
    `);
    if (!document) {
        return { ok: false, document: undefined };
    }

    return { ok: true, document };
}

/**
 *
 * @param db
 * @param id
 * @returns
 * @author dwclake
 */
async function open(db: Database, id: number): Return<Document> {
    const document = await db.get<Document>(`
        SELECT *
        FROM documents
        WHERE id = ${id}
    `);
    if (document) {
        return { ok: true, document };
    }

    return { ok: false, document: undefined };
}

/**
 *
 * @param db
 * @param id
 * @param title
 * @param content
 * @returns
 * @author dwclake
 */
async function save(db: Database, id: number, title?: string, content?: string): Return<Document> {
    const fields = [];

    if (title) {
        fields.push(`title = ${title!}`);
    }

    if (content) {
        fields.push(`content = ${content!}`);
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");

    const result = await db.run(`
        UPDATE documents
        SET ${fields.join(", ")}
        WHERE id = ${id}
    `);

    if (!result.changes) {
        return { ok: false, document: undefined };
    }

    const updatedDocument = await db.get<Document>(`
        SELECT *
        FROM documents
        WHERE id = ${id}
    `);
    if (!updatedDocument) {
        return { ok: false, document: undefined };
    }

    return { ok: true, document: updatedDocument };
}

/**
 *
 * @param db
 * @param id
 * @returns
 * @author dwclake
 */
async function remove(db: Database, id: number): Return<Document> {
    const { ok, document } = await open(db, id);

    const result = await db.run(`
        DELETE FROM documents
        WHERE id = ${id}
    `);

    if (!result.changes || !ok) {
        return { ok: false, document: undefined };
    }

    return { ok: true, document: document };
}

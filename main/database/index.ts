import sqlite3 from "sqlite3";
import { open as sqliteOpen } from "sqlite";

import tables from "./tables";
import actions from "./actions";

export { open, actions };

/**
 *
 * @author dwclake
 */
async function open(path: string) {
    console.log(`Opening database at path: ${path}`);
    const db = await sqliteOpen({
        filename: path,
        driver: sqlite3.Database
    });

    await tables.documents(db);

    return db;
}
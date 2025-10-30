/**
 * @author: dwclake
 * @created: 10-18-2025
 */

import sqlite3 from "sqlite3";
import { open as sqliteOpen } from "sqlite";

import tables from "./tables";
import actions from "./actions";

export { open, actions };

async function open() {
    const db = await sqliteOpen({
        filename: "./data/solecism.db",
        driver: sqlite3.Database
    });

    await tables.documents(db);

    return db;
}
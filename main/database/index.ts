/**
 * @author: dwclake
 * @created: 10-18-2025
 */

import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default { documents }

/**
 *
 * @returns
 */
async function documents() {
    const db = await open({
        filename: "./data/documents.db",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    return db;
}
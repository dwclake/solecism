import sqlite3 from "sqlite3";
import { Database } from "sqlite";

export default documents;

/**
 *
 * @returns
 * @author dwclake
 */
async function documents(db: Database<sqlite3.Database, sqlite3.Statement>) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
}
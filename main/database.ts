/* @Author: dwclake
 * @Created: 10-18-2025
 */

import sqlite3 from "sqlite3"
import sqlite from "sqlite"

export const db = await sqlite.open({
    filename: "./data/solecism.db",
    driver: sqlite3.cached.Database
})

await db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`)
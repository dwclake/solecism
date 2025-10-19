/* @Author: dwclake
 * @Created: 10-18-2025
 */

import sqlite3 from "sqlite3"
import sqlite from "sqlite"

export const db = await sqlite.open({
    filename: "./data/solecism.db",
    driver: sqlite3.cached.Database
})
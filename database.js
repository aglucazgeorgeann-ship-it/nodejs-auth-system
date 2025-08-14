const Database = require("better-sqlite3");

// Connect sa database file
const db = new Database("auth.db");

// Gumawa ng users table kung wala pa
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
`).run();

module.exports = db;

import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

class DB {
    database: BunSQLiteDatabase;

    constructor() {
        const sqlite = new Database("sqlite.db");
        this.database = drizzle(sqlite);
    }
}

export const db = new DB();

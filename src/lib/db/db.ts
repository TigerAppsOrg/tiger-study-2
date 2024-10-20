/**
 * @file db.ts
 * @author Joshua Lau '26
 *
 * The app's SQLite database interface.
 * Note: This should ONLY be run on the server.
 */

import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import {
    adjectives,
    animals,
    uniqueNamesGenerator
} from "unique-names-generator";

class DB {
    database: BunSQLiteDatabase;

    constructor() {
        const sqlite = new Database("sqlite.db");
        this.database = drizzle(sqlite);
    }

    createGroup(courseId: string) {
        const name = uniqueNamesGenerator({
            dictionaries: [adjectives, animals]
        });

        console.log(`Creating group ${name} for course ${courseId}`);
    }
}

export const db = new DB();

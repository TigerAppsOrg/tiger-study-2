/**
 * @file migrate.ts
 * @author Joshua Lau '26
 *
 * SQLite migration handler.
 */

import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("db.sqlite");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./drizzle" });

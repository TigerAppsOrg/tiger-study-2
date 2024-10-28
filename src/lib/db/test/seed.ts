/**
 * @file seed.ts
 * @author Joshua Lau '26
 *
 * Mock data to seed the database for testing.
 */

import { db } from "../db";
import * as schema from "../schema";

const seed = async () => {
    await db.joinGroup("sakuya", 9);
};

seed();

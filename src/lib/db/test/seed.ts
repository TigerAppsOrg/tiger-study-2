/**
 * @file seed.ts
 * @author Joshua Lau '26
 *
 * Mock data to seed the database for testing.
 */

import { db } from "../db";
import * as schema from "../schema";

const seed = async () => {
    await db.joinGroup("mk1", 3);
    await db.joinGroup("remilia", 3);
    await db.joinGroup("sakuya", 3);
};

seed();

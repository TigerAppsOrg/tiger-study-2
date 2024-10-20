/**
 * @file seed.ts
 * @author Joshua Lau '26
 *
 * Mock data to seed the database for testing.
 */

import { db } from "../db";
import * as schema from "../schema";

const seed = async () => {
    await db.database.insert(schema.users).values([
        {
            netid: "mk1",
            displayname: "Marisa Kirisame",
            mail: "marisa@gmail.com",
            year: "2025"
        },
        {
            netid: "reimu",
            displayname: "Reimu Hakurei",
            mail: "reimu@gmail.com",
            year: "2026"
        },
        {
            netid: "sakuya",
            displayname: "Sakuya Izayoi",
            mail: "sakuya@gmail.com",
            year: "2027"
        },
        {
            netid: "remilia",
            displayname: "Remilia Scarlet",
            mail: "remilia@gmail.com",
            year: "Graduate"
        }
    ]);
};

seed();

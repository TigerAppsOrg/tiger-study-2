/**
 * @file schema.ts
 * @author Joshua Lau '26
 *
 * App's SQLite database schema defined using Drizzle ORM.
 */

import {
    text,
    integer,
    sqliteTable,
    primaryKey
} from "drizzle-orm/sqlite-core";

// Users Table
export const users = sqliteTable("users", {
    netid: text("netid").notNull().primaryKey().unique(),
    displayname: text("name").notNull(),
    mail: text("mail").notNull(),
    year: text("year").notNull(),
    is_admin: integer("is_admin", { mode: "boolean" }).notNull().default(false)
});

// Courses Table
export const courses = sqliteTable("courses", {
    id: text("id").notNull().primaryKey().unique(),
    code: text("code").notNull(),
    title: text("title").notNull(),
    term: integer("term").notNull()
});

// Groups Table
export const groups = sqliteTable("groups", {
    id: integer("id", { mode: "number" })
        .notNull()
        .primaryKey({ autoIncrement: true })
        .unique(),
    name: text("name").notNull(),
    course_id: text("course_id")
        .notNull()
        .references(() => courses.id, {
            onDelete: "cascade"
        })
});

// Group-Users Association Table
export const group_members = sqliteTable(
    "group_members",
    {
        user_id: text("user_id")
            .notNull()
            .references(() => users.netid),
        group_id: integer("group_id")
            .notNull()
            .references(() => groups.id)
    },
    t => ({
        pk: primaryKey({ columns: [t.user_id, t.group_id] })
    })
);

// Feedback Table
export const feedback = sqliteTable("feedback", {
    id: integer("id", { mode: "number" })
        .notNull()
        .primaryKey({ autoIncrement: true })
        .unique(),
    feedback: text("feedback").notNull(),
    resolved: integer("resolved", { mode: "boolean" }).notNull().default(false)
});

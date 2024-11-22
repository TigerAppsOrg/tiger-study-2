/**
 * @file schema.ts
 * @author Joshua Lau '26
 *
 * App's SQLite database schema defined using Drizzle ORM.
 */

import { relations } from "drizzle-orm";
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
    isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false)
});

export const userRelations = relations(users, ({ many }) => ({
    groupMembers: many(groupMembers)
}));

// Courses Table
export const courses = sqliteTable("courses", {
    id: text("id").notNull().primaryKey().unique(),
    code: text("code").notNull(),
    title: text("title").notNull(),
    term: integer("term").notNull()
});

export const courseRelations = relations(courses, ({ many }) => ({
    groups: many(groups)
}));

// Groups Table
export const groups = sqliteTable("groups", {
    id: integer("id", { mode: "number" })
        .notNull()
        .primaryKey({ autoIncrement: true })
        .unique(),
    name: text("name").notNull(),
    courseId: text("course_id")
        .notNull()
        .references(() => courses.id, {
            onDelete: "cascade"
        })
});

export const groupRelations = relations(groups, ({ one, many }) => ({
    course: one(courses, {
        fields: [groups.courseId],
        references: [courses.id]
    }),
    groupMembers: many(groupMembers)
}));

// Group-Users Association Table
export const groupMembers = sqliteTable(
    "group_members",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.netid),
        groupId: integer("group_id")
            .notNull()
            .references(() => groups.id)
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.groupId] })
    })
);

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
    user: one(users, {
        fields: [groupMembers.userId],
        references: [users.netid]
    }),
    group: one(groups, {
        fields: [groupMembers.groupId],
        references: [groups.id]
    })
}));

// Feedback Table
export const feedback = sqliteTable("feedback", {
    id: integer("id", { mode: "number" })
        .notNull()
        .primaryKey({ autoIncrement: true })
        .unique(),
    feedback: text("feedback").notNull(),
    resolved: integer("resolved", { mode: "boolean" }).notNull().default(false)
});

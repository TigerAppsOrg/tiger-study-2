import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    integer,
    primaryKey,
    boolean,
    serial
} from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
    netid: text("netid").notNull().primaryKey().unique(),
    displayname: text("name").notNull(),
    mail: text("mail").notNull(),
    year: text("year").notNull(),
    isAdmin: boolean("is_admin").notNull().default(false),
    isFeedbackList: boolean("is_feedback_list").notNull().default(false)
});

export const userRelations = relations(users, ({ many }) => ({
    groupMembers: many(groupMembers)
}));

// Courses Table
export const courses = pgTable("courses", {
    id: text("id").notNull().primaryKey().unique(),
    code: text("code").notNull(),
    title: text("title").notNull(),
    term: integer("term").notNull()
});

export const courseRelations = relations(courses, ({ many }) => ({
    groups: many(groups)
}));

// Groups Table
export const groups = pgTable("groups", {
    id: serial("id").notNull().primaryKey().unique(),
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
export const groupMembers = pgTable(
    "group_members",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.netid, {
                onDelete: "cascade"
            }),
        groupId: integer("group_id")
            .notNull()
            .references(() => groups.id, {
                onDelete: "cascade"
            }),
        hasEmailSent: boolean("has_email_sent").notNull().default(false)
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
export const feedback = pgTable("feedback", {
    id: serial("id").notNull().primaryKey().unique(),
    feedback: text("feedback").notNull(),
    resolved: boolean("resolved").notNull().default(false)
});

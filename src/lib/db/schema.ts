import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    netid: text("netid").notNull().primaryKey(),
    displayname: text("name").notNull(),
    mail: text("mail").notNull(),
    is_admin: integer("is_admin", { mode: "boolean" }).notNull().default(false)
});

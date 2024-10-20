/**
 * @file db.ts
 * @author Joshua Lau '26
 *
 * The app's SQLite database interface.
 * Note: This should ONLY be run on the server.
 */

import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import type { Course, UserGroup } from "$lib/types";

class DB {
    database: BunSQLiteDatabase;

    constructor() {
        const sqlite = new Database("db.sqlite");
        this.database = drizzle(sqlite);
    }

    //------------------------------------------------------------------
    // Create
    //------------------------------------------------------------------

    /**
     * Create a group and return its ID.
     * @param courseId ID of course to create group for
     * @returns ID of created group
     */
    async createGroup(courseId: string): Promise<string> {
        const name = uniqueNamesGenerator({
            dictionaries: [colors, animals]
        });
    }

    //------------------------------------------------------------------
    // Read
    //------------------------------------------------------------------

    /**
     * Get all courses in the database.
     * @returns All courses in the database
     */
    getCourses(): Course[] {
        const courses = this.database.select().from(schema.courses).all();
        return courses.map(x => {
            return {
                id: x.id,
                code: x.code,
                title: x.title
            };
        });
    }

    /**
     * Get a user by NetID.
     * @param netid NetID of user
     * @returns User object or null if not found
     */
    getUser(netid: string) {
        const user = this.database
            .select()
            .from(schema.users)
            .where(eq(schema.users.netid, netid))
            .all();
        if (user.length === 0) {
            return null;
        }
        return user[0];
    }

    /**
     * Get all groups for a user.
     * @param netid NetID of user
     * @returns All groups that the user is a member of
     */
    getUserGroups(netid: string): UserGroup[] {
        const groups = this.database
            .select({
                groupId: schema.groups.id,
                groupName: schema.groups.name,
                courseId: schema.groups.course_id,
                courseCode: schema.courses.code,
                members: schema.users.displayname
            })
            .from(schema.group_members)
            .leftJoin(
                schema.groups,
                eq(schema.groups.id, schema.group_members.group_id)
            )
            .leftJoin(
                schema.courses,
                eq(schema.courses.id, schema.groups.course_id)
            )
            .leftJoin(
                schema.users,
                eq(schema.users.netid, schema.group_members.user_id)
            )
            .where(eq(schema.group_members.user_id, netid))
            .groupBy(schema.groups.id)
            .all();

        // Verify fields are not null
        return groups;
    }

    /**
     * Get all groups for a course.
     * @param courseId ID of course
     * @returns All groups for a course
     */
    getCourseGroups(courseId: string) {
        const groups = this.database
            .select({
                groupId: schema.groups.id,
                groupName: schema.groups.name,
                members: schema.users.displayname
            })
            .from(schema.groups)
            .leftJoin(
                schema.group_members,
                eq(schema.group_members.group_id, schema.groups.id)
            )
            .leftJoin(
                schema.users,
                eq(schema.users.netid, schema.group_members.user_id)
            )
            .where(eq(schema.groups.course_id, courseId))
            .groupBy(schema.groups.id)
            .all();
        console.log(groups);
        return groups;
    }

    //------------------------------------------------------------------
    // Update
    //------------------------------------------------------------------

    /**
     * Join a group.
     * @param netid NetID of user
     * @param groupId ID of group
     */
    async joinGroup(netid: string, groupId: string) {
        try {
            await this.database.insert(schema.group_members).values({
                user_id: netid,
                group_id: groupId
            });
        } catch (e) {
            console.log(
                `User ${netid} attempted to join group ${groupId}, but failed with error: ${e}`
            );
            return;
        }
        console.log(`User ${netid} joined group ${groupId}`);
    }

    //------------------------------------------------------------------
    // Delete
    //------------------------------------------------------------------

    /**
     * Leave a group.
     * @param netid NetID of user
     * @param groupId ID of group
     */
    async leaveGroup(netid: string, groupId: string) {
        try {
            await this.database
                .delete(schema.group_members)
                .where(
                    eq(schema.group_members.user_id, netid) &&
                        eq(schema.group_members.group_id, groupId)
                );
        } catch (e) {
            console.log(
                `User ${netid} attempted to leave group ${groupId}, but failed with error: ${e}`
            );
            return;
        }
        console.log(`User ${netid} left group ${groupId}`);
    }

    /**
     * Delete a group.
     * @param groupId ID of group
     */
    async deleteGroup(groupId: string) {
        try {
            await this.database
                .delete(schema.groups)
                .where(eq(schema.groups.id, groupId));
        } catch (e) {
            console.log(`Group ${groupId} could not be deleted: ${e}`);
            return;
        }
        console.log(`Group ${groupId} deleted`);
    }
}

export const db = new DB();

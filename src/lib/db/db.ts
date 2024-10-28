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
import { eq, and, count } from "drizzle-orm";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import type { Course } from "$lib/types";

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
    async createGroup(courseId: string): Promise<number> {
        const name = uniqueNamesGenerator({
            dictionaries: [colors, animals]
        })
            .split("_")
            .map(x => x.charAt(0).toUpperCase() + x.slice(1))
            .join(" ");

        try {
            const newGroup = await this.database
                .insert(schema.groups)
                .values({
                    name: name,
                    course_id: courseId
                })
                .returning();

            console.log(
                `Group ${newGroup[0].id} created for course ${courseId}`
            );
            return newGroup[0].id;
        } catch (e) {
            console.log(`Group could not be created: ${e}`);
            return -1;
        }
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

    getGroup(groupId: number) {
        if (isNaN(groupId)) {
            console.error(`Invalid group ID: ${groupId}`);
            return null;
        }

        const groupInfo = this.database.transaction(tx => {
            // Get group info
            const group = tx
                .select({
                    groupId: schema.groups.id,
                    groupName: schema.groups.name,
                    courseId: schema.groups.course_id,
                    courseName: schema.courses.title,
                    courseCode: schema.courses.code
                })
                .from(schema.groups)
                .leftJoin(
                    schema.group_members,
                    eq(schema.group_members.group_id, schema.groups.id)
                )
                .leftJoin(
                    schema.courses,
                    eq(schema.courses.id, schema.groups.course_id)
                )
                .where(eq(schema.groups.id, groupId))
                .groupBy(schema.groups.id)
                .all();

            if (group.length === 0) {
                console.error(`Group ${groupId} not found`);
                return null;
            }

            // Get group members
            const members = tx
                .select({
                    year: schema.users.year,
                    displayname: schema.users.displayname,
                    email: schema.users.mail
                })
                .from(schema.group_members)
                .leftJoin(
                    schema.users,
                    eq(schema.users.netid, schema.group_members.user_id)
                )
                .where(eq(schema.group_members.group_id, groupId))
                .all();

            return {
                groupInfo: group[0],
                members: members
            };
        });

        return groupInfo;
    }

    /**
     * Get all groups for a user.
     * @param netid NetID of user
     * @returns All groups that the user is a member of
     */
    getUserGroups(netid: string) {
        return this.database
            .select({
                groupId: schema.groups.id,
                groupName: schema.groups.name,
                courseId: schema.groups.course_id,
                courseCode: schema.courses.code,
                courseName: schema.courses.title
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
            .where(eq(schema.group_members.user_id, netid))
            .groupBy(schema.groups.id)
            .all();
    }

    /**
     * Get all groups for a course.
     * @param courseId ID of course
     * @returns All groups for a course
     */
    getCourseGroups(courseId: string) {
        const groups = this.database.transaction(tx => {
            const groupInfo = tx
                .select({
                    groupId: schema.groups.id,
                    groupName: schema.groups.name
                })
                .from(schema.groups)
                .leftJoin(
                    schema.group_members,
                    eq(schema.group_members.group_id, schema.groups.id)
                )
                .where(eq(schema.groups.course_id, courseId))
                .groupBy(schema.groups.id)
                .all();

            return groupInfo.map(group => {
                const members = tx
                    .select({
                        displayname: schema.users.displayname
                    })
                    .from(schema.group_members)
                    .leftJoin(
                        schema.users,
                        eq(schema.users.netid, schema.group_members.user_id)
                    )
                    .where(eq(schema.group_members.group_id, group.groupId))
                    .all();

                return Object.assign(group, {
                    members: members.map(x => x.displayname)
                });
            });
        });

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
    async joinGroup(netid: string, groupId: number) {
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
    async leaveGroup(netid: string, groupId: number) {
        try {
            await this.database.transaction(async tx => {
                await tx
                    .delete(schema.group_members)
                    .where(
                        and(
                            eq(schema.group_members.user_id, netid),
                            eq(schema.group_members.group_id, groupId)
                        )
                    );

                const numMembers = await tx
                    .select({ count: count() })
                    .from(schema.group_members)
                    .where(eq(schema.group_members.group_id, groupId));

                if (numMembers[0].count === 0) {
                    await tx
                        .delete(schema.groups)
                        .where(eq(schema.groups.id, groupId));
                }
            });
        } catch (e) {
            console.log(
                `User ${netid} attempted to leave group ${groupId}, but failed with error: ${e}`
            );
            return;
        }
        console.log(`User ${netid} left group ${groupId}`);
    }
}

export const db = new DB();

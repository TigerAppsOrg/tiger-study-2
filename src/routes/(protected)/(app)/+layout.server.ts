import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { courses, groupMembers, groups } from "$lib/server/db/schema";
import type { ServerLoad } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    CASClient.check(sessionData);

    console.log("Firing load function");

    const { courseList, userGroups } = await db.transaction(async (tx) => {
        const courseList = await tx
            .select({
                id: courses.id,
                code: courses.code,
                title: courses.title
            })
            .from(courses);

        const userGroups = await tx
            .select({
                group: {
                    id: groups.id,
                    name: groups.name
                },
                course: {
                    id: courses.id,
                    code: courses.code,
                    title: courses.title,
                    term: courses.term
                }
            })
            .from(groups)
            .innerJoin(groupMembers, eq(groups.id, groupMembers.groupId))
            .innerJoin(courses, eq(groups.courseId, courses.id))
            .where(eq(groupMembers.userId, sessionData.netid));

        return { courseList, userGroups };
    });

    return {
        courseList,
        userGroups
    };
};

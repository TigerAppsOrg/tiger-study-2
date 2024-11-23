import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { courses, groupMembers, groups } from "$lib/server/db/schema";
import type { Actions, ServerLoad } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    if (!sessionData.displayname) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
    }

    const userGroups = await db
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

    return { userGroups };
};

export const actions: Actions = {
    logout: async ({ locals }) => {
        await CASClient.logout(locals);
    }
};

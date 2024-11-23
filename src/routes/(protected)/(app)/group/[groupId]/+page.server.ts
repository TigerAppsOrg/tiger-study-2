import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { courses, groupMembers, groups, users } from "$lib/server/db/schema";
import { error, type ServerLoad } from "@sveltejs/kit";
import { eq, and } from "drizzle-orm";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    CASClient.check(sessionData);

    const groupId = req.params.groupId;
    if (!groupId) error(httpCodes.error.badRequest, "No group ID provided.");

    const groupInfo = await db.transaction(async (tx) => {
        // First check if user is a member of the group
        const isMember = await tx
            .select()
            .from(groupMembers)
            .where(
                and(
                    eq(groupMembers.groupId, parseInt(groupId)),
                    eq(groupMembers.userId, sessionData.netid)
                )
            );

        if (isMember.length === 0)
            error(
                httpCodes.error.forbidden,
                "You are not a member of this group."
            );

        // Get the group info
        const group = await tx
            .select({
                id: groups.id,
                name: groups.name,
                courseId: groups.courseId,
                courseCode: courses.code,
                courseTitle: courses.title
            })
            .from(groups)
            .innerJoin(courses, eq(groups.courseId, courses.id))
            .where(eq(groups.id, parseInt(groupId)));

        // Get all group members
        const members = await tx
            .select({
                netid: users.netid,
                displayname: users.displayname,
                mail: users.mail,
                year: users.year
            })
            .from(users)
            .innerJoin(groupMembers, eq(users.netid, groupMembers.userId))
            .where(eq(groupMembers.groupId, parseInt(groupId)));

        return {
            ...group[0],
            members
        };
    });

    return {
        groupInfo
    };
};

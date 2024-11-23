import type { GroupDetails } from "$lib/constants";
import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { groupMembers, groups, users } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ url, locals }) => {
    CASClient.check(locals.session.data);

    const courseId = url.searchParams.get("courseId");
    if (!courseId) {
        return new Response("No course ID provided.", {
            status: httpCodes.error.badRequest
        });
    }

    const groupDetails: GroupDetails[] = await db.transaction(async (tx) => {
        const groupInfo = await tx
            .select({
                groupId: groups.id,
                groupName: groups.name
            })
            .from(groups)
            .where(eq(groups.courseId, courseId));

        const groupList: GroupDetails[] = [];
        for (const group of groupInfo) {
            const members = await tx
                .select({
                    netid: groupMembers.userId,
                    displayname: users.displayname
                })
                .from(groupMembers)
                .innerJoin(users, eq(users.netid, groupMembers.userId))
                .where(eq(groupMembers.groupId, group.groupId));

            groupList.push({
                groupId: group.groupId,
                groupName: group.groupName,
                members
            });
        }

        return groupList;
    });

    return new Response(JSON.stringify(groupDetails), {
        status: httpCodes.success.ok,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

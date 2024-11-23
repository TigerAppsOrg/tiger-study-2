import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { groupMembers, groups } from "$lib/server/db/schema";
import { error, type RequestHandler } from "@sveltejs/kit";
import { eq, and, count } from "drizzle-orm";

export const POST: RequestHandler = async ({ locals, request }) => {
    CASClient.check(locals.session.data);

    const req = await request.json();
    const groupId = req.groupId;
    if (!groupId) {
        return new Response("No group ID provided.", {
            status: httpCodes.error.badRequest
        });
    }

    await db.transaction(async (tx) => {
        // Check if group exists
        const isMember = await tx
            .select()
            .from(groupMembers)
            .where(
                and(
                    eq(groupMembers.groupId, parseInt(groupId)),
                    eq(groupMembers.userId, locals.session.data.netid)
                )
            );

        if (isMember.length === 0)
            error(
                httpCodes.error.badRequest,
                "The group does not exist or you are not a member."
            );

        // Remove user from group
        await tx
            .delete(groupMembers)
            .where(
                and(
                    eq(groupMembers.groupId, parseInt(groupId)),
                    eq(groupMembers.userId, locals.session.data.netid)
                )
            );

        // If the group is now empty, delete it
        const groupMembersCount = await tx
            .select({
                count: count()
            })
            .from(groupMembers)
            .where(eq(groupMembers.groupId, parseInt(groupId)));

        if (groupMembersCount[0].count === 0) {
            await tx.delete(groups).where(eq(groups.id, parseInt(groupId)));
        }
    });

    return new Response("User left group.", {
        status: httpCodes.success.ok
    });
};

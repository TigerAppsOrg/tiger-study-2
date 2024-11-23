import { MAX_GROUPS } from "$lib/constants";
import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { groupMembers, groups } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { count, eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ locals, request }) => {
    CASClient.check(locals.session.data);

    const req = await request.json();
    const groupId = req.groupId;
    if (!groupId) {
        return new Response("No group ID provided.", {
            status: httpCodes.error.badRequest
        });
    }

    const txRes = await db.transaction(async (tx) => {
        const userGroups = await tx
            .select({
                count: count()
            })
            .from(groupMembers)
            .where(eq(groupMembers.userId, locals.session.data.netid));

        if (userGroups[0].count >= MAX_GROUPS) {
            return new Response(
                "You are already in the maximum number of groups.",
                {
                    status: httpCodes.error.badRequest
                }
            );
        }

        // Check if group exists
        const group = await tx
            .select()
            .from(groups)
            .where(eq(groups.id, groupId));

        if (group.length === 0) {
            return new Response("Group not found.", {
                status: httpCodes.error.notFound
            });
        }

        // Add user to group
        await tx.insert(groupMembers).values({
            userId: locals.session.data.netid,
            groupId
        });
    });

    if (txRes instanceof Response) return txRes;

    return new Response("User joined group.", {
        status: httpCodes.success.ok
    });
};

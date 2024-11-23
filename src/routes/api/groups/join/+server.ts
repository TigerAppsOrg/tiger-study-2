import { MAX_GROUPS } from "$lib/constants";
import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { groupMembers, groups } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { and, count, eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ locals, request }) => {
    CASClient.check(locals.session.data);

    const req = await request.json();
    const groupId = req.groupId;
    if (!groupId) {
        return new Response("NO_ID", {
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
            return new Response("MAX_GROUPS", {
                status: httpCodes.error.badRequest
            });
        }

        // Check if group exists
        const group = await tx
            .select()
            .from(groups)
            .where(eq(groups.id, groupId));

        if (group.length === 0) {
            return new Response("NOT_FOUND.", {
                status: httpCodes.error.notFound
            });
        }

        // Ensure user is not already in group
        const existing = await tx
            .select()
            .from(groupMembers)
            .where(
                and(
                    eq(groupMembers.userId, locals.session.data.netid),
                    eq(groupMembers.groupId, groupId)
                )
            );

        if (existing.length > 0) {
            return new Response("ALREADY_IN_GROUP.", {
                status: httpCodes.error.badRequest
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

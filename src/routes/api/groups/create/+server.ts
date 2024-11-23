import { MAX_GROUPS } from "$lib/constants";
import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { groupMembers, groups } from "$lib/server/db/schema";
import { type RequestHandler } from "@sveltejs/kit";
import { count, eq } from "drizzle-orm";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

export const POST: RequestHandler = async ({ locals, request }) => {
    CASClient.check(locals.session.data);

    const req = await request.json();
    const courseId = req.courseId;
    if (!courseId) {
        return new Response("No group ID provided.", {
            status: httpCodes.error.badRequest
        });
    }

    const randomName = uniqueNamesGenerator({
        dictionaries: [colors, animals]
    })
        .split("_")
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join(" ");

    const groupId = await db.transaction(async (tx) => {
        // Check how many groups the user is in
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

        // Create group
        const groupRes = await tx
            .insert(groups)
            .values({
                name: randomName,
                courseId
            })
            .returning({
                id: groups.id
            });

        if (groupRes.length === 0) {
            return new Response("Group could not be created.", {
                status: httpCodes.error.internalServerError
            });
        }
        const groupId = groupRes[0].id;

        // Add user to group
        await tx.insert(groupMembers).values({
            userId: locals.session.data.netid,
            groupId
        });

        return groupId;
    });

    if (groupId instanceof Response) return groupId;

    return new Response(JSON.stringify({ groupId }), {
        status: httpCodes.success.ok,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

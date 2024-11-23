import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { groupMembers, groups } from "$lib/server/db/schema";
import { type RequestHandler } from "@sveltejs/kit";
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

    return new Response(JSON.stringify({ groupId }), {
        status: httpCodes.success.ok,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

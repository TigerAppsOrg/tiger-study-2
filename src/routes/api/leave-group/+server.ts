import { db } from "$lib/db/db";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
    const { groupId } = await request.json();
    const user = locals.session.data;

    if (!user.netid) {
        return new Response("Unauthorized", {
            status: 401
        });
    }

    // Leave group
    try {
        await db.leaveGroup(user.netid, parseInt(groupId));
    } catch {
        return new Response("Error while attempting to leave group", {
            status: 400
        });
    }

    return new Response("Left group successfully", {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

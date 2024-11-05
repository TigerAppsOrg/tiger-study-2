import { db } from "$lib/db/db";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
    // TODO -- Look into why request.json() is hanging forever
    const res = await request.json();
    const groupId = res.groupId;
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

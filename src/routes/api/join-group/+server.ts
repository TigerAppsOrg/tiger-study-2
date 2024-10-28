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

    if (!groupId) {
        return new Response("Invalid group ID", {
            status: 400
        });
    }

    await db.joinGroup(user.netid, groupId);

    return new Response("Joined group successfully", {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

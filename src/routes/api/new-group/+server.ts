import { db } from "$lib/db/db";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
    const { courseId } = await request.json();
    const user = locals.session.data;

    if (!user.netid) {
        return new Response("Unauthorized", {
            status: 401
        });
    }

    // Create new group
    const newGroup = await db.createGroup(courseId);
    if (newGroup === "") throw new Error("Group could not be created");

    await db.joinGroup(user.netid, newGroup);

    return new Response(
        JSON.stringify({
            group: newGroup
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};

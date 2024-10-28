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

    const groups = db.getCourseGroups(courseId);

    return new Response(
        JSON.stringify({
            groups: groups
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};

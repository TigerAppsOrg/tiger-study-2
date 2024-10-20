import { db } from "$lib/db/db";
import type { RequestHandler } from "@sveltejs/kit";
import { feedback } from "$lib/db/schema";

export const POST: RequestHandler = async ({ request, locals }) => {
    const { text } = await request.json();

    if (!locals.session.data.netid) {
        return new Response("Unauthorized", {
            status: 401
        });
    }

    // Validate Feedback
    if (text.length > 1000) {
        return new Response("Feedback too long", {
            status: 400
        });
    }

    // Insert feedback
    await db.database.insert(feedback).values({
        feedback: text
    });

    return new Response("Feedback submitted", {
        status: 200
    });
};

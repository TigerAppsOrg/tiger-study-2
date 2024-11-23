import { httpCodes } from "$lib/httpCodes";
import { db } from "$lib/server/db";
import { feedback } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
    const { text } = await request.json();

    if (!locals.session.data.netid) {
        return new Response("Unauthorized", {
            status: httpCodes.error.unauthorized
        });
    }

    // Validate Feedback
    if (text.length > 1000) {
        return new Response("Feedback too long", {
            status: httpCodes.error.badRequest
        });
    }

    // Insert feedback
    await db.insert(feedback).values({
        feedback: text
    });

    return new Response("Feedback submitted", {
        status: httpCodes.success.ok
    });
};

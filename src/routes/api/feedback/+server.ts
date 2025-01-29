import { httpCodes } from "$lib/httpCodes";
import { db } from "$lib/server/db";
import { feedback, users } from "$lib/server/db/schema";
import { feedbackHTML, sendEmail } from "$lib/server/emails";
import type { RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

const sendFeedbackEmails = async (
    emailList: string[],
    feedback: string,
    waitTime: number
) => {
    for (const email of emailList) {
        await sendEmail(
            "TigerStudy",
            email,
            "[TigerStudy] New Feedback",
            feedbackHTML(feedback)
        );

        await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
};

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

    // Send email to admin on email list
    const feedbackList = await db
        .select({
            email: users.mail
        })
        .from(users)
        .where(eq(users.isFeedbackList, true));

    // TODO - Need an async queue to send emails and handle backpressure
    await sendFeedbackEmails(
        feedbackList.map((user) => user.email),
        text,
        50
    );

    return new Response("Feedback submitted", {
        status: httpCodes.success.ok
    });
};

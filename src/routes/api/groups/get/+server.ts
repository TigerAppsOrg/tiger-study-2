import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { groups } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ url, locals }) => {
    CASClient.check(locals.session.data);

    const courseId = url.searchParams.get("courseId");
    if (!courseId) {
        return new Response("No course ID provided.", {
            status: httpCodes.error.badRequest
        });
    }

    const groupList = await db
        .select()
        .from(groups)
        .where(eq(groups.courseId, courseId));

    return new Response(JSON.stringify(groupList), {
        status: httpCodes.success.ok,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

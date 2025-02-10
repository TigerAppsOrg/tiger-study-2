import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { courses, groupMembers, groups, users } from "$lib/server/db/schema";
import { joinedHTML, sendEmail } from "$lib/server/emails";
import type { RequestHandler } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";

const sendJoinEmails = async (
    emailList: string[],
    courseName: string,
    groupId: number
) => {
    const WAIT_TIME_BETWEEN_EMAILS_MS = 100;

    const groupLink = "https://study.tigerapps.org/group/" + groupId;

    for (const email of emailList) {
        await sendEmail(
            "TigerStudy",
            email,
            "[TigerStudy] A New Member Joined Your Group",
            joinedHTML(courseName, groupLink)
        );

        await new Promise((resolve) =>
            setTimeout(resolve, WAIT_TIME_BETWEEN_EMAILS_MS)
        );
    }
};

export const POST: RequestHandler = async ({ locals, request }) => {
    CASClient.check(locals.session.data);

    const req = await request.json();
    const groupId = req.groupId;
    if (!groupId) {
        return new Response("NO_ID", {
            status: httpCodes.error.badRequest
        });
    }
    const userId = locals.session.data.netid;

    const txRes = await db.transaction(async (tx) => {
        // Check that user is in group
        const userGroup = await tx
            .select({
                hasEmailSent: groupMembers.hasEmailSent
            })
            .from(groupMembers)
            .where(
                and(
                    eq(groupMembers.userId, userId),
                    eq(groupMembers.groupId, groupId)
                )
            );

        if (userGroup.length === 0) {
            return new Response("NOT_IN_GROUP", {
                status: httpCodes.error.badRequest
            });
        }

        if (userGroup[0].hasEmailSent) {
            return new Response("ALREADY_SENT", {
                status: httpCodes.error.badRequest
            });
        }

        // Get course name
        const course = await tx
            .select({
                courseName: courses.code
            })
            .from(courses)
            .innerJoin(groups, eq(courses.id, groups.courseId))
            .where(eq(groups.id, groupId));
        if (course.length === 0) {
            return new Response("COURSE_NOT_FOUND.", {
                status: httpCodes.error.notFound
            });
        }

        // Send emails
        const groupMembersList = await tx
            .select({
                email: users.mail
            })
            .from(users)
            .innerJoin(groupMembers, eq(users.netid, groupMembers.userId))
            .where(eq(groupMembers.groupId, groupId));

        const groupEmails = groupMembersList
            .map((user) => user.email)
            .filter((email) => email !== locals.session.data.mail);

        await sendJoinEmails(groupEmails, course[0].courseName, groupId);

        // Update groupMembers
        await tx
            .update(groupMembers)
            .set({
                hasEmailSent: true
            })
            .where(
                and(
                    eq(groupMembers.userId, userId),
                    eq(groupMembers.groupId, groupId)
                )
            );
    });

    if (txRes instanceof Response) return txRes;

    return new Response("User joined group.", {
        status: httpCodes.success.ok
    });
};

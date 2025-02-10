import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import {
    feedbackHTML,
    joinedHTML,
    sendEmail,
    welcomeHTML
} from "$lib/server/emails";
import { seed } from "$lib/server/seed";
import { updateCourses } from "$lib/server/updateCourses";
import { error, type Actions, type ServerLoad } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

// Check if a user is an admin, and if not, throw an error
const adminGuard = async (locals: App.Locals, isLoad: boolean = false) => {
    const sessionData = locals.session.data;
    CASClient.check(sessionData);

    const user = await db
        .select({
            isAdmin: users.isAdmin
        })
        .from(users)
        .where(eq(users.netid, sessionData.netid));

    if (user.length === 0 || !user[0].isAdmin) {
        const doThis = isLoad ? "view this page" : "perform this action";
        error(
            httpCodes.error.forbidden,
            `You are not authorized to ${doThis}. Please contact an administrator if you believe this to be incorrect.`
        );
    }
};

// Extract the email address from a FormData object
const getEmailAddress = async (formData: FormData) => {
    const emailAddress = formData.get("emailAddress") as string;
    if (!emailAddress) throw new Error("No email address provided");
    return emailAddress;
};

export const load: ServerLoad = async (req) => {
    await adminGuard(req.locals, true);
    return {};
};

export const actions: Actions = {
    updateCourses: async ({ locals }) => {
        await adminGuard(locals);
        await updateCourses();
    },

    seed: async ({ locals }) => {
        await adminGuard(locals);
        await seed();
    },

    //----------------------------------------
    // Emails
    //----------------------------------------

    sendWelcomeEmail: async ({ locals, request }) => {
        await adminGuard(locals);

        const formData = await request.formData();
        const emailAddress = await getEmailAddress(formData);

        await sendEmail(
            "TigerStudy",
            emailAddress,
            "[TEST] Welcome to TigerStudy!",
            welcomeHTML("Marisa")
        );
    },

    sendFeedbackEmail: async ({ locals, request }) => {
        await adminGuard(locals);

        const formData = await request.formData();
        const emailAddress = await getEmailAddress(formData);

        await sendEmail(
            "TigerStudy",
            emailAddress,
            "[TEST] New Feedback Received",
            feedbackHTML("This is a test feedback message.")
        );
    },

    sendJoinedEmail: async ({ locals, request }) => {
        await adminGuard(locals);

        const formData = await request.formData();
        const emailAddress = await getEmailAddress(formData);

        await sendEmail(
            "TigerStudy",
            emailAddress,
            "[TEST] New TigerStudy Group Member",
            joinedHTML("COS 126", "https://study.tigerapps.org")
        );
    }
};

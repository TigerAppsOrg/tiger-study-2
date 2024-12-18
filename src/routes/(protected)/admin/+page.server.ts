import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
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
    }
};

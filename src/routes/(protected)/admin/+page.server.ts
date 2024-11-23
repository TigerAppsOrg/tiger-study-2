import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { updateCourses } from "$lib/server/updateCourses";
import { error, type Actions, type ServerLoad } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

const checkAdmin = async (netid: string) => {
    const user = await db
        .select({
            isAdmin: users.isAdmin
        })
        .from(users)
        .where(eq(users.netid, netid));

    return user.length !== 0 && user[0].isAdmin;
};

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    CASClient.check(sessionData);

    const isAdmin = await checkAdmin(sessionData.netid);
    if (!isAdmin) {
        error(
            httpCodes.error.forbidden,
            "You are not authorized to view this page. Please contact an administrator if you believe this to be incorrect."
        );
    }

    return {};
};

export const actions: Actions = {
    updateCourses: async ({ locals }) => {
        const sessionData = locals.session.data;
        CASClient.check(sessionData);
        if (!(await checkAdmin(sessionData.netid))) {
            error(
                httpCodes.error.forbidden,
                "You are not perform this action. Please contact an administrator if you believe this to be incorrect."
            );
        }

        await updateCourses();
    }
};

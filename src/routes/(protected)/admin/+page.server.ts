import { httpCodes } from "$lib/httpCodes";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { error, type ServerLoad } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    if (!sessionData.displayname) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
    }

    // Check if user is an admin
    const user = await db
        .select({
            isAdmin: users.isAdmin
        })
        .from(users)
        .where(eq(users.netid, sessionData.netid));

    if (user.length === 0 || !user[0].isAdmin) {
        error(
            httpCodes.error.forbidden,
            "You are not authorized to view this page. Please contact an administrator if you believe this to be incorrect."
        );
    }

    return {};
};

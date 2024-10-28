/**
 * @file +page.server.ts (/admin)
 * @author Joshua Lau '26
 *
 * Entry point for admin page. Checks if user is logged in and is an admin.
 */

import { db } from "$lib/db/db";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async req => {
    if (!req.locals.session.data.netid) {
        throw new Error("Not logged in");
    } else {
        // Get user data from database
        const userSession = req.locals.session.data;
        const user = db.getUser(userSession.netid);

        if (!user || !user.is_admin) {
            throw new Error("Not an admin");
        }

        // Check if user is an admin
    }
};

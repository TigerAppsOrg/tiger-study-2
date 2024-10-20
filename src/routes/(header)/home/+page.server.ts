/**
 * @file +page.server.ts (/home)
 * @author Joshua Lau '26
 *
 * Entry point for home page. Checks if user is logged in and loads user data.
 */

import { CASClient } from "$lib/db/cas";
import { db } from "$lib/db/db";
import type { Actions, ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async req => {
    const sessionData = req.locals.session.data;
    if (!sessionData.displayname) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
        return {};
    } else {
        // Get user groups
        const userGroups = db.getUserGroups(sessionData.netid);

        return {
            name: sessionData.displayname,
            userGroups: userGroups
        };
    }
};

export const actions: Actions = {
    logout: async ({ locals }) => {
        await CASClient.logout(locals);
    }
};

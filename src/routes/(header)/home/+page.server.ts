/**
 * @file +page.server.ts (/home)
 * @author Joshua Lau '26
 *
 * Entry point for home page. Checks if user is logged in and loads user data.
 */

import { CASClient } from "$lib/db/cas";
import type { Actions, ServerLoad } from "@sveltejs/kit";
// import Database from "bun:sqlite";

export const load: ServerLoad = async req => {
    if (!req.locals.session.data.netid) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
        return {};
    } else {
        // Get user data from database
        const userSession = req.locals.session.data;
        console.log(userSession);

        return {
            props: {
                name: userSession.displayname
            }
        };
    }
};

export const actions: Actions = {
    logout: async ({ locals }) => {
        await CASClient.logout(locals);
    }
};

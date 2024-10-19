/**
 * @file +page.server.ts (/)
 * @author Joshua Lau '26
 *
 * Entry point for landing page. Redirects to home page if user is already logged in.
 */

import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async req => {
    // Redirect to home if already logged in
    if (req.locals.session.data.netid) {
        throw redirect(302, "/home");
    }
};

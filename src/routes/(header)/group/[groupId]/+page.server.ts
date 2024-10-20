/**
 * @file +page.server.ts (/group/[groupId])
 * @author Joshua Lau '26
 *
 * Entry point for group management page. Checks if user is logged in and
 * loads group data for the specified groupId.
 */

import { CASClient } from "$lib/db/cas";
import { db } from "$lib/db/db";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
    if (!locals.session.data.netid) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
        return {};
    }

    const groupId = params.groupId;

    return {
        props: {
            groupId
        }
    };
};

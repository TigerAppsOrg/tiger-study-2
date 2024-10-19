import { CASClient } from "$lib/db/cas";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
    if (!locals.session.data.netid) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
        return {};
    }

    const groupId = params.groupId;
    // Get group info from database

    return {
        props: {
            groupId
        }
    };
};

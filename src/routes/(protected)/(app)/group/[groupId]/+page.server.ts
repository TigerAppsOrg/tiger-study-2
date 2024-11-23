import { CASClient } from "$lib/server/cas";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    if (!sessionData.displayname) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
    }
};

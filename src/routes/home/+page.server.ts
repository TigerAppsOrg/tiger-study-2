import { CASClient } from "$lib/db/cas";
import type { ServerLoad } from "@sveltejs/kit";
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

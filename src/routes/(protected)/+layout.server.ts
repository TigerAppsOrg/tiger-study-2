import { CASClient } from "$lib/server/cas";

export const load = async (req) => {
    const sessionData = req.locals.session.data;
    if (!sessionData.displayname) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
    }

    return {
        netid: sessionData.netid,
        name: sessionData.displayname
    };
};

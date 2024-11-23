import { CASClient } from "$lib/server/cas";

export const load = async (req) => {
    const sessionData = req.locals.session.data;
    CASClient.check(sessionData);

    return {
        netid: sessionData.netid,
        name: sessionData.displayname
    };
};

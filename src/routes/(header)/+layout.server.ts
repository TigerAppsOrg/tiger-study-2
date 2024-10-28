import { CASClient } from "$lib/db/cas";
import { db } from "$lib/db/db";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async req => {
    const sessionData = req.locals.session.data;
    if (!sessionData.displayname) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
    }

    const courses = db.getCourses();
    const userGroups = db.getUserGroups(sessionData.netid);

    return {
        courses,
        userGroups,
        netid: sessionData.netid,
        name: sessionData.displayname
    };
};

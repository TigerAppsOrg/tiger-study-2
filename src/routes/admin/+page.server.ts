import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async req => {
    if (!req.locals.session.data.netid) {
        throw new Error("Not logged in");
    } else {
        // Get user data from database
        const userSession = req.locals.session.data;
        console.log(userSession);

        // Check if user is an admin
    }
};

import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async req => {
    // Redirect to home if already logged in
    if (req.locals.session.data.netid) {
        throw redirect(302, "/home");
    }
};

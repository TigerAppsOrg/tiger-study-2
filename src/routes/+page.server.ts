import { PUBLIC_APP_URL } from "$env/static/public";
import { httpCodes } from "$lib/httpCodes.js";
import { redirect } from "@sveltejs/kit";

export const load = async (req) => {
    const sessionData = req.locals.session.data;
    const referer = req.request.headers.get("referer");
    const wasRedirected = referer && referer.includes(PUBLIC_APP_URL);

    if (sessionData.displayname && !wasRedirected) {
        redirect(httpCodes.redirection.seeOther, "/dashboard");
    }
};

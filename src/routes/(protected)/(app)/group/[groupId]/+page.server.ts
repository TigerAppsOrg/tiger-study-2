import { CASClient } from "$lib/server/cas";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (req) => {
    const sessionData = req.locals.session.data;
    CASClient.check(sessionData);
};

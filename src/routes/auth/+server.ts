import {
    redirect,
    type RequestEvent,
    type RequestHandler
} from "@sveltejs/kit";
import { CASClient } from "$lib/db/cas";

// Validate a CAS login ticket and set the user's session data
export const GET: RequestHandler = async (req: RequestEvent) => {
    const ticket = req.url.searchParams.get("ticket");
    if (!ticket) {
        CASClient.authenticate();
        return new Response("Redirecting to CAS server...", {
            status: 302
        });
    }

    const userInfo = await CASClient.validate(ticket);
    if (!userInfo) {
        console.error("CAS authentication failed");
        return new Response("CAS authentication failed", {
            status: 401
        });
    }

    await req.locals.session.set(userInfo);
    redirect(302, "/home");
};

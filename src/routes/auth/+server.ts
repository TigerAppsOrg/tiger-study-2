import {
    redirect,
    type RequestEvent,
    type RequestHandler
} from "@sveltejs/kit";
import { CASClient } from "$lib/db/cas";

export const GET: RequestHandler = async (req: RequestEvent) => {
    const ticket = req.url.searchParams.get("ticket");
    console.log("Ticket:", ticket);
    if (!ticket) {
        CASClient.authenticate();
        return new Response("Redirecting to CAS server...", {
            status: 302
        });
    }

    const userInfo = await CASClient.validate(ticket);
    console.log("User info:", userInfo);
    if (!userInfo) {
        console.error("CAS authentication failed");
        return new Response("CAS authentication failed", {
            status: 401
        });
    }

    req.locals.session.set(userInfo);
    console.log("Session set:", req.locals.session.data);
    redirect(302, "/");
};

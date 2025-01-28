/**
 * @file +server.ts (/auth)
 * @author Joshua Lau '26
 *
 * Takes a CAS login ticket and validates it. If the ticket is valid, the user's session data is set.
 * Otherwise, the user is redirected to the CAS server.
 */

import {
    redirect,
    type RequestEvent,
    type RequestHandler
} from "@sveltejs/kit";
import { CASClient } from "$lib/server/cas";
import { db } from "$lib/server/db";
import { httpCodes } from "$lib/httpCodes";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "$lib/server/emails";
import { welcomeHTML } from "$lib/server/emails/welcomeHTML";

// Validate a CAS login ticket and set the user's session data
export const GET: RequestHandler = async (req: RequestEvent) => {
    const ticket = req.url.searchParams.get("ticket");
    if (!ticket) {
        CASClient.authenticate();
        return new Response("Redirecting to CAS server...", {
            status: httpCodes.redirection.seeOther
        });
    }

    const userInfo = await CASClient.validate(ticket);
    if (!userInfo) {
        console.error("CAS authentication failed");
        return new Response("CAS authentication failed", {
            status: httpCodes.error.unauthorized
        });
    }

    const existingUser = await db
        .select({
            netid: users.netid
        })
        .from(users)
        .where(eq(users.netid, userInfo.netid));

    console.log(existingUser);
    if (existingUser.length === 0) {
        await db.insert(users).values(userInfo);
        const firstName = userInfo.displayname.split(" ")[0];
        await sendEmail(
            "TigerStudy",
            userInfo.mail,
            "Welcome to TigerStudy!",
            welcomeHTML(firstName)
        );
    }

    await req.locals.session.set(userInfo);
    redirect(httpCodes.redirection.seeOther, "/dashboard");
};

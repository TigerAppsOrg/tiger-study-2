/**
 * @file cas.ts
 * @author Joshua Lau '26
 *
 * Provides a SvelteKit client for the CAS authentication system.
 * Based loosely on https://git.io/JRNLp
 * originally by Alex Halderman, Scott Karlin, Brian Kernighan, and Bob Dondero.
 */

import { redirect } from "@sveltejs/kit";
import type { SessionData } from "../../app";
import { httpCodes } from "$lib/httpCodes";
import { PUBLIC_APP_URL } from "$env/static/public";

export class CASClient {
    // URL of the service that the CAS server will redirect to
    private static APP_URL = PUBLIC_APP_URL + "/api/auth/callback";

    // CAS server URL
    private static CAS_URL = "https://fed.princeton.edu/cas/";

    // URL-encode a string
    private static urlEncode(str: string): string {
        return encodeURIComponent(str).replace(/%20/g, "+");
    }

    // Check if an object has a key
    private static hasKey(obj: object, key: string): boolean {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    /**
     * Validate a login ticket by contacting the CAS server.
     * @param ticket The login ticket to validate
     * @returns The user's session data, or null if the ticket is invalid
     */
    static async validate(ticket: string): Promise<SessionData | null> {
        const valUrl =
            this.CAS_URL +
            "p3/serviceValidate?service=" +
            this.APP_URL +
            "&ticket=" +
            ticket +
            "&format=json";

        const response = await fetch(valUrl, {
            method: "GET",
            headers: {
                Accept: "text/plain"
            }
        });

        const resObj = await response.json();
        if (!resObj || !this.hasKey(resObj, "serviceResponse")) return null;
        const serviceResponse = resObj.serviceResponse;

        if (this.hasKey(serviceResponse, "authenticationSuccess")) {
            const userInfo = serviceResponse.authenticationSuccess;

            let year = "Graduate";
            if (userInfo.attributes.pustatus[0] === "undergraduate") {
                const splitDpt = userInfo.attributes.department[0].split(" ");
                year = splitDpt[splitDpt.length - 1];
            }

            return {
                netid: userInfo.user,
                displayname: userInfo.attributes.displayname[0] || "Student",
                mail: userInfo.attributes.mail[0] || "",
                year: year
            };
        } else if (this.hasKey(serviceResponse, "authenticationFailure")) {
            console.error("CAS authentication failure:", serviceResponse);
            return null;
        } else {
            console.error("Unexpected CAS response:", serviceResponse);
            return null;
        }
    }

    /**
     * Redirect the user to the CAS server for authentication.
     * @param req The request event
     * @returns The user's session data, or null if the user is not logged in
     */
    static authenticate() {
        redirect(
            httpCodes.redirection.seeOther,
            this.CAS_URL + "login?service=" + this.urlEncode(this.APP_URL)
        );
    }

    /**
     * Log the user out and redirect to the landing page.
     * @param locals The request locals
     */
    static async logout(locals: App.Locals) {
        await locals.session.destroy();
        redirect(httpCodes.redirection.seeOther, "/");
    }

    /**
     * Check if the user is logged in. If not, redirect to the CAS server.
     * @param sessionData
     */
    static check(sessionData: SessionData) {
        if (!sessionData.displayname) this.authenticate();
    }
}

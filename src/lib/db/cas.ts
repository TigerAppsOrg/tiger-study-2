/**
 * This module provides a NodeJS/Bun client for the CAS authentication system.
 * Ported from the original Python version by Joshua Lau,
 * original authors Alex Halderman, Scott Karlin, Brian Kernighan, Bob Dondero
 */

export class CASClient {
    CAS_URL = "https://fed.princeton.edu/cas/";

    /**
     * Return the URL of the current request after stripping out
     * the "ticket" parameter added by the CAS server.
     * @param req
     * @returns
     */
    stripTicket(req: Request): string | null {
        const url = new URL(req.url);
        if (!url) {
            console.error("No URL found in request");
            return null;
        }
        const ticket = url.searchParams.get("ticket");
    }

    /**
     * Return true if the user is logged in, false otherwise.
     * @param req
     * @returns
     */
    isLoggedIn(req: Request): boolean {
        const session = req.session;
        return session && "username" in session;
    }

    /**
     * Validate a login ticket by contacting the CAS server.
     * If valid, return the username. Otherwise, return null.
     * @param ticket
     */
    validate(ticket: string): string | null {}

    /**
     * Authenticate the remote user, and return the user's username.
     * Do not return unless the user is successfully authenticated.
     */
    authenticate(): string | null {}

    /**
     * Log the user out.
     */
    logout() {}
}

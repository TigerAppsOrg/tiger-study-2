import { handleSession } from "svelte-kit-cookie-session";
import { SESSION_SECRET } from "$env/static/private";

export const handle = handleSession({
    secret: SESSION_SECRET
});

import { CASClient } from "$lib/server/cas";
import type { Actions, ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (req) => {};

export const actions: Actions = {
    logout: async ({ locals }) => {
        await CASClient.logout(locals);
    }
};

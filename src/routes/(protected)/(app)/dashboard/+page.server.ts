import { CASClient } from "$lib/server/cas";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    logout: async ({ locals }) => {
        await CASClient.logout(locals);
    }
};

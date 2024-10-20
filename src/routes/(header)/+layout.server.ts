import { db } from "$lib/db/db";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const courses = db.getCourses();
    return {
        courses
    };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_CURRENT_TERM } from "$env/static/public";
import { db } from "./db";
import { courses } from "./db/schema";

// API endpoint for the public course listings API
const REG_PUBLIC_URL =
    "https://api.princeton.edu/registrar/course-offerings/classes/";

// Gets the API token for use in the course listings API
const getToken = async () => {
    const response = await fetch(
        "https://registrar.princeton.edu/course-offerings"
    );
    const text = await response.text();
    return "Bearer " + text.split('apiToken":"')[1].split('"')[0];
};

type RegCourse = {
    id: string;
    code: string;
    title: string;
    term: number;
};

const fetchRegCoures = async (term: number): Promise<RegCourse[]> => {
    const token = await getToken();

    const rawCourseList = await fetch(`${REG_PUBLIC_URL}${term}`, {
        method: "GET",
        headers: {
            Authorization: token
        }
    });
    const courseList = await rawCourseList.json();

    const valid =
        courseList &&
        courseList.classes &&
        courseList.classes.class &&
        Array.isArray(courseList.classes.class);
    if (!valid) throw new Error("Invalid course list response format");

    const regCoursesRaw = courseList.classes.class;

    // Remove duplicates
    const seenIds = new Set<string>();
    const uniqueRegListings = regCoursesRaw.filter((x: any) => {
        if (seenIds.has(x.course_id)) return false;
        seenIds.add(x.course_id);
        return true;
    });

    const regCourses = uniqueRegListings.map((x: any) => ({
        id: x.course_id,
        code: x.crosslistings.replace(/\s/g, ""),
        title: x.long_title + (x.topic_title ? ": " + x.topic_title : ""),
        term: term
    }));

    return regCourses;
};

export const updateCourses = async () => {
    console.log("Updating courses for term", PUBLIC_CURRENT_TERM);
    const regCourses = await fetchRegCoures(parseInt(PUBLIC_CURRENT_TERM));

    await db.transaction(async (tx) => {
        const dbTerm = await tx
            .select({ term: courses.term })
            .from(courses)
            .limit(1);

        if (dbTerm.length === 1 && dbTerm[0].term !== regCourses[0].term) {
            // If term is different, delete all courses and insert new ones
            await tx.delete(courses);
            await tx.insert(courses).values(regCourses);
            console.log(
                `Deleted all courses and added ${regCourses.length} new courses`
            );
        } else {
            // If the term is the same, add courses that are not already in db
            const existing = await tx.select({ id: courses.id }).from(courses);

            const existingIds = new Set(existing.map((x) => x.id));
            const newCourses = regCourses.filter((x) => !existingIds.has(x.id));

            if (newCourses.length === 0) {
                console.log("No new courses to add");
                return;
            } else {
                await tx.insert(courses).values(newCourses);
                console.log(`Added ${newCourses.length} new courses`);
            }
        }
    });
};

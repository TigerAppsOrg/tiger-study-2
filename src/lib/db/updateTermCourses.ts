/**
 * @file updateTermCourses.ts
 * @author Joshua Lau '26

 * Resets the courses in the database for a given semester.
 * Should be run at the beginning of each semester to reset the app's data.
 * Running during the same active semester will add new courses, but will
 * not remove any courses that are no longer offered.
 *
 * Note: Currently, the script must be run manually from the command line.
 */

import { db } from "./db";
import * as schema from "./schema";

export type StringBoolean = "Y" | "N";

type RawRegListing = {
    class_number: string;
    crosslistings: string;
    subject: string;
    distribution_area: string;
    section: string;
    building_code: string | null;
    building_name: string | null;
    room: string | null;
    catnum: string;
    mon: StringBoolean;
    tues: StringBoolean;
    wed: StringBoolean;
    thurs: StringBoolean;
    fri: StringBoolean;
    sat: StringBoolean;
    sun: StringBoolean;
    term: string;
    course_id: string;
    class_meetings: string;
    meeting_pattern: string;
    acad_career: string;
    end_time: string;
    long_title: string;
    start_time: string;
    topic_title: string | null;
    class_status: string;
};

type Course = {
    id: string;
    code: string;
    title: string;
    term: number;
};

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

/**
 * Fetches the course listings for a given semester
 * @param term The term code for the semester to fetch course listings for
 * @returns A list of courses offered in the specified semester
 */
const fetchCourses = async (term: number): Promise<Course[]> => {
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

    if (!valid) {
        throw new Error("Invalid course list response format");
    }

    const regListings: RawRegListing[] = courseList.classes.class;
    // Remove duplicates
    const seenIds = new Set<string>();
    const uniqueRegListings = regListings.filter(x => {
        if (seenIds.has(x.course_id)) {
            return false;
        }
        seenIds.add(x.course_id);
        return true;
    });

    const courses = uniqueRegListings.map(x => {
        return {
            id: x.course_id,
            code: x.subject + x.catnum,
            title: x.long_title + (x.topic_title ? ": " + x.topic_title : ""),
            term: term
        };
    });

    return courses;
};

const updateTerm = async (term: number) => {
    const startTime = Date.now();

    const existingCourses = db.getCourses();
    const newCourses = await fetchCourses(term).catch(err => {
        console.error(err);
        return [];
    });

    if (newCourses.length === 0) {
        console.log("No courses found for term " + term);
        return;
    }

    // Add new courses that are not already in the database
    const coursesToAdd = newCourses.filter(
        x => !existingCourses.some(y => y.id === x.id)
    );

    db.database.transaction(async tx => {
        if (existingCourses.length > 0 && existingCourses[0].term !== term) {
            // Delete all courses if the term is different
            tx.delete(schema.courses).all();
        }

        if (coursesToAdd.length > 0) {
            await tx.insert(schema.courses).values(coursesToAdd);
        }
    });

    const endTime = Date.now();
    console.log(
        "Updated term " +
            term +
            " in " +
            (endTime - startTime) +
            "ms. Added " +
            coursesToAdd.length +
            " new courses."
    );
};

const currentTerm = process.env.CURRENT_TERM;
if (!currentTerm) throw new Error("No CURRENT_TERM not set");
updateTerm(parseInt(currentTerm));

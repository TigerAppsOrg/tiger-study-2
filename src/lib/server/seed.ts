import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import { db } from "./db";
import { courses, groupMembers, groups, users } from "./db/schema";

const SAMPLE_USERS = [
    {
        netid: "marisakirisame",
        displayname: "Marisa Kirisame",
        mail: "dachshunduniverse@gmail.com",
        year: "2026"
    }
];

const addUsers = async () => {
    await db.insert(users).values(SAMPLE_USERS).onConflictDoNothing();
};

const addGroups = async () => {
    const sampleCourses = await db.select().from(courses).limit(5);
    const courseIds = sampleCourses.map((course) => course.id);

    // Create groups
    const groupIdMap = new Map();
    for (const courseId of courseIds) {
        const randomName = uniqueNamesGenerator({
            dictionaries: [colors, animals]
        })
            .split("_")
            .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
            .join(" ");

        const newGroupId = await db.transaction(async (tx) => {
            const groupRes = await tx
                .insert(groups)
                .values({
                    name: randomName,
                    courseId
                })
                .returning({
                    id: groups.id
                });

            if (groupRes.length === 0) {
                throw new Error("Group could not be created in seed.");
            }
            const groupId = groupRes[0].id;
            return groupId;
        });
        groupIdMap.set(courseId, newGroupId);
    }

    // Add sample users to groups
    for (const [courseId, groupId] of groupIdMap) {
        for (const user of SAMPLE_USERS) {
            await db.insert(groupMembers).values({
                userId: user.netid,
                groupId
            });
        }

        console.log(
            `Populated group ${groupId} for course ${sampleCourses.find((c) => c.id === courseId)!.code}`
        );
    }
};

export const seed = async () => {
    try {
        await addUsers();
        await addGroups();

        console.log("Seeding complete");
    } catch (e) {
        console.error("Error seeding database:", e);
    }
};

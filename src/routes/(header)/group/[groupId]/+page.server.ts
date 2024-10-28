/**
 * @file +page.server.ts (/group/[groupId])
 * @author Joshua Lau '26
 *
 * Entry point for group management page. Checks if user is logged in and
 * loads group data for the specified groupId.
 */

import { CASClient } from "$lib/db/cas";
import { db } from "$lib/db/db";
import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
    const sessionData = locals.session.data;
    if (!sessionData.netid) {
        // Redirect to CAS server if no session
        CASClient.authenticate();
    }

    if (!params.groupId) {
        throw redirect(404, "/home");
    }

    const groupId = parseInt(params.groupId);
    const groupData = db.getGroup(groupId);
    if (!groupData) {
        console.error("Group not found:", groupId);
        throw redirect(404, "/home");
    }

    const { groupInfo, members } = groupData;

    return {
        userGroups: db.getUserGroups(sessionData.netid),
        courseId: groupInfo.courseId,
        courseCode: groupInfo.courseCode || "",
        courseName: groupInfo.courseName || "",
        groupId: groupInfo.groupId,
        groupName: groupInfo.groupName,
        members: members
    };
};

export type Course = {
    id: string;
    code: string;
    title: string;
};

export type UserGroup = {
    groupId: string;
    groupName: string;
    courseId: string;
    courseCode: string;
    members: string[];
};

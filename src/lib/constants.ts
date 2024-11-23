export type GroupDetails = {
    groupId: number;
    groupName: string;
    members: {
        netid: string;
        displayname: string;
    }[];
};

export const MAX_GROUPS = 10;

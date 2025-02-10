export type GroupDetails = {
    groupId: number;
    groupName: string;
    members: {
        netid: string;
        displayname: string;
    }[];
};

export const MAX_GROUPS = 10;

export const CONTACT_EMAIL = "it.admin@tigerapps.org";

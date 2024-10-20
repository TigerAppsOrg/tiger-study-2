import { writable } from "svelte/store";

export const joinDialogOpen = writable<boolean>(false);

type Course = {
    id: string;
    code: string;
    title: string;
};

export const courses = writable<Course[]>([
    {
        id: "1",
        code: "COS 126",
        title: "General Computer Science"
    },
    {
        id: "2",
        code: "COS 226",
        title: "Algorithms and Data Structures"
    },
    {
        id: "3",
        code: "COS 217",
        title: "Intro to Computer Systems"
    }
]);

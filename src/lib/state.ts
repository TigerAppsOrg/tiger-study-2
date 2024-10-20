import { writable } from "svelte/store";

export const joinDialogOpen = writable<boolean>(false);

export type Course = {
    id: string;
    code: string;
    title: string;
};

export const courses = writable<Course[]>([]);

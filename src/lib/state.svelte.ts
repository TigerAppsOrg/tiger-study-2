import type { Course } from "./types";

export const MAX_GROUPS = 8;

type Box<T> = {
    value: T;
};

export const joinDialogOpen = $state<Box<boolean>>({ value: false });
export const feedbackDialogOpen = $state<Box<boolean>>({ value: false });
export const courses = $state<Box<Course[]>>({ value: [] });
export const selectedCourse = $state<Box<Course | null>>({
    value: null
});
export const userGroups = $state<Box<any[]>>({
    value: []
});

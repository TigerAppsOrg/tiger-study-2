import { writable } from "svelte/store";
import type { Course } from "./types";

export const joinDialogOpen = writable<boolean>(false);
export const feedbackDialogOpen = writable<boolean>(false);

export const courses = writable<Course[]>([]);

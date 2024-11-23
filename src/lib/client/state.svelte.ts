type Box<T> = {
    value: T;
};

type Course = {
    id: string;
    code: string;
    title: string;
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

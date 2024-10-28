<!-- 
    @component JoinDialog.svelte

    The dialog that allows users to join a group.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import * as Dialog from "$lib/components/ui/dialog";
    import { courses, joinDialogOpen } from "$lib/state.svelte";
    import type { Course } from "$lib/types";
    import { Plus } from "svelte-radix";
    import Button from "./ui/button/button.svelte";
    import Input from "./ui/input/input.svelte";
    import { goto } from "$app/navigation";
    import { toast } from "svelte-sonner";
    import { is } from "drizzle-orm";

    const normalize = (str: string) => {
        return str
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .trim();
    };

    let search = $state("");
    const filteredCourses = $derived(
        courses.value.filter(course => {
            if (search.length < 3) {
                return false;
            } else if (search.length === 3) {
                return normalize(course.code).includes(normalize(search));
            } else {
                return (
                    normalize(course.code).includes(normalize(search)) ||
                    normalize(course.title).includes(normalize(search))
                );
            }
        })
    );

    // Clear component data when dialog is closed
    $effect(() => {
        if (joinDialogOpen.value === false) {
            search = "";
            selectedCourse = null;
        }
    });

    let selectedCourse: Course | null = $state(null);
    let alertDialogOpen = $state(false);

    type Group = {
        groupId: number;
        groupName: string;
        members: string[];
    };

    let isLoading = $state(false);
    let availableGroups: Group[] = $state([]);

    $effect(() => {
        if (selectedCourse !== null) {
            // Fetch available groups for the selected course
            isLoading = true;

            try {
                fetch(`/api/get-groups`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        courseId: selectedCourse.id
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        availableGroups = data.groups;
                    });
            } finally {
                isLoading = false;
            }
        } else {
            availableGroups = [];
        }
    });

    const createNewGroup = async () => {
        if (!selectedCourse) {
            alertDialogOpen = false;
            return;
        }

        // Create a new group in the database
        const res = await fetch("/api/new-group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                courseId: selectedCourse.id
            })
        });
        const newGroupId = (await res.json()).group;

        // Redirect to the new group page and cleanup
        goto(`/group/${newGroupId}`);
        toast.success(`Created a new group for ${selectedCourse.code}!`);
        alertDialogOpen = false;
        joinDialogOpen.value = false;
    };
</script>

<Dialog.Root bind:open={joinDialogOpen.value}>
    <Dialog.Content class="h-2/3">
        <div class="flex flex-col h-full overflow-hidden">
            {#if !selectedCourse}
                <div class="my-4">
                    <h2 class="text-xl font-semibold">Join Study Group</h2>
                    <p class="text-slate-500 text-sm">
                        Search for a course to join a group.
                    </p>
                </div>

                <Input
                    bind:value={search}
                    class="focus-visible:ring-0 focus-visible:border-slate-300"
                    type="text"
                    placeholder="Search for courses" />

                <div
                    class="flex flex-col flex-1 mt-2 overflow-y-auto
                 {filteredCourses.length > 0 && 'border-t border-input'}">
                    {#each filteredCourses as course}
                        <button
                            onclick={() => {
                                selectedCourse = course;
                            }}
                            class=" card">
                            <div class="p-1">
                                <p class="text-sm font-semibold">
                                    {course.code}
                                </p>
                                <p class="text-xs text-slate-500">
                                    {course.title}
                                </p>
                            </div>
                        </button>
                    {:else}
                        {#if search.length >= 3}
                            <p class="text-slate-500 text-center py-4">
                                No courses found.
                            </p>
                        {:else}
                            <p class="text-slate-500 text-center py-4">
                                Enter at least 3 characters to search.
                            </p>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div class="my-4">
                    <h2 class="text-xl font-semibold">
                        Groups for {selectedCourse.code}
                    </h2>
                    <p class="text-slate-500 text-sm">
                        Select a group to join or create a new one.
                    </p>
                </div>

                {#if isLoading}
                    <div class="flex items-center justify-center mt-4">
                        Loading groups...
                    </div>
                {:else if availableGroups.length === 0}
                    <div
                        class="flex-1 flex items-center justify-center text-slate-500">
                        No groups found. Create a new one?
                    </div>
                {:else}
                    <div
                        class="flex flex-col flex-1 overflow-y-auto border-t border-input">
                        {#each availableGroups as group}
                            <button onclick={() => {}} class="card">
                                <div class="p-2">
                                    <p class="text-sm font-semibold">
                                        Group: {group.groupName}
                                    </p>
                                    <p class="text-xs text-slate-500">
                                        <span class="font-semibold">
                                            {group.members.length} Members:
                                        </span>
                                        <span>
                                            {group.members.join(", ")}
                                        </span>
                                    </p>
                                </div>
                            </button>
                        {/each}
                    </div>
                {/if}
                <Button
                    on:click={() => {
                        alertDialogOpen = true;
                    }}
                    class="w-full mt-2">
                    <p class="flex items-center justify-center">
                        <Plus class="mr-1" />
                        <span> New Group </span>
                    </p>
                </Button>
                <AlertDialog.Root bind:open={alertDialogOpen}>
                    <AlertDialog.Trigger />
                    <AlertDialog.Content>
                        <AlertDialog.Header>
                            <AlertDialog.Title
                                >Are you want to create a new group?</AlertDialog.Title>
                            <AlertDialog.Description>
                                Consider joining an existing group instead.
                            </AlertDialog.Description>
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                            <Button on:click={createNewGroup}
                                >Create New Group</Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            {/if}
        </div>
    </Dialog.Content>
</Dialog.Root>

<style lang="postcss">
    .card {
        @apply border border-t-0 border-input bg-background hover:bg-accent 
        hover:text-accent-foreground duration-100 flex justify-between
        items-center w-full text-left;
    }
</style>

<!-- 
    @component JoinDialog.svelte

    The dialog that allows users to join a group.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import * as Dialog from "$lib/components/ui/dialog";
    import { courses, joinDialogOpen } from "$lib/state";
    import type { Course } from "$lib/types";
    import { Plus } from "svelte-radix";
    import Button from "./ui/button/button.svelte";
    import Input from "./ui/input/input.svelte";

    const normalize = (str: string) => {
        return str
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .trim();
    };

    let search = "";
    $: filteredCourses = $courses.filter(course => {
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
    });

    // Clear component data when dialog is closed
    $: if ($joinDialogOpen === false) {
        search = "";
        selectedCourse = null;
    }

    let selectedCourse: Course | null = null;

    let alertDialogOpen = false;

    const createNewGroup = () => {
        alertDialogOpen = false;
        $joinDialogOpen = false;
    };
</script>

<Dialog.Root bind:open={$joinDialogOpen}>
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
                            on:click={() => {
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

                <div
                    class="flex flex-col flex-1 overflow-y-auto border-t border-input">
                    <button on:click={() => {}} class="card">
                        <div class="p-2">
                            <p class="text-sm font-semibold">Blue Dolphins</p>
                            <p class="text-xs text-slate-500">
                                <span class="font-semibold"> 5 Members: </span>
                                <span>
                                    John Doe, Jane Smith, Alice Johnson, Bob
                                    Brown, and Charlie White
                                </span>
                            </p>
                        </div>
                    </button>
                </div>
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

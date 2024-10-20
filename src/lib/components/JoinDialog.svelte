<!-- 
    @component JoinDialog.svelte

    The dialog that allows users to join a group.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import { courses, joinDialogOpen } from "$lib/state";
    import * as Dialog from "$lib/components/ui/dialog";
    import Input from "./ui/input/input.svelte";

    const normalize = (str: string) => {
        return str
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .trim();
    };

    let search = "";
    $: filteredCourses = $courses.filter(
        course =>
            normalize(course.code).includes(normalize(search)) ||
            normalize(course.title).includes(normalize(search))
    );

    $: if ($joinDialogOpen === false) {
        search = "";
        selectedCourse = null;
    }

    let selectedCourse = null;
</script>

<Dialog.Root bind:open={$joinDialogOpen}>
    <Dialog.Content class="h-2/3">
        <div class="flex flex-col h-full">
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
                    class="flex flex-col flex-1 mt-2
                 {filteredCourses.length > 0 && 'border-t'}">
                    {#each filteredCourses as course}
                        <button
                            on:click={() => {
                                selectedCourse = course;
                            }}
                            class="w-full text-left bg-slate-50 border border-t-0
                        hover:bg-slate-200 duration-100 flex justify-between">
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
                        <p class="text-slate-500 text-center py-4">
                            No courses found.
                        </p>
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
            {/if}
        </div>
    </Dialog.Content>
</Dialog.Root>

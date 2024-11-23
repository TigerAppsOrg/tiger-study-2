<script lang="ts">
    import {
        courses,
        selectedCourse,
        userGroups
    } from "$lib/client/state.svelte";
    import Input from "./ui/input/input.svelte";

    const normalize = (str: string) => {
        return str
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .trim();
    };

    let search = $state("");
    const filteredCourses = $derived(
        courses.value.filter((course) => {
            if (userGroups.value.some((x) => x.course.id === course.id)) {
                return false;
            }

            const searchNorm = normalize(search);

            if (searchNorm.length < 3) {
                return false;
            } else if (searchNorm.length === 3) {
                return normalize(course.code).includes(searchNorm);
            } else {
                return (
                    normalize(course.code).includes(searchNorm) ||
                    normalize(course.title).includes(searchNorm)
                );
            }
        })
    );
</script>

<div class="my-4">
    <h2 class="text-xl font-semibold">Join Study Group</h2>
    <p class="text-sm text-slate-500">Search for a course to join a group.</p>
</div>

<Input
    bind:value={search}
    class="focus-visible:border-slate-300 focus-visible:ring-0"
    type="text"
    placeholder="Search for courses" />

<div
    class="mt-2 flex flex-1 flex-col overflow-y-auto
    {filteredCourses.length > 0 && 'border-t border-input'}">
    {#each filteredCourses as course (course.id)}
        <button
            onclick={() => {
                selectedCourse.value = course;
            }}
            class="card">
            <div class="p-1">
                <p class="text-sm font-semibold">{course.code}</p>
                <p class="text-xs text-slate-500">{course.title}</p>
            </div>
        </button>
    {:else}
        {#if search.length >= 3}
            <p class="text-slate-500 text-center py-4">No courses found.</p>
        {:else}
            <p class="text-slate-500 text-center py-4">
                Enter at least 3 characters to search.
            </p>
        {/if}
    {/each}
</div>

<style lang="postcss">
    .card {
        @apply flex w-full items-center justify-between border border-t-0 border-input bg-background text-left duration-100 hover:bg-accent hover:text-accent-foreground;
    }
</style>

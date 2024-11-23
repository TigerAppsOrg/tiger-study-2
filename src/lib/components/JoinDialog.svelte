<script lang="ts">
    import { joinDialogOpen, selectedCourse } from "$lib/client/state.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import CourseSearch from "./CourseSearch.svelte";
    import GroupSelection from "./GroupSelection.svelte";

    $effect(() => {
        // Clear component data when dialog is closed
        if (joinDialogOpen.value === false) {
            selectedCourse.value = null;
            search = "";
        }
    });

    // Search query value is owned by the parent component and bound to
    // the search input in order to maintain the search state when a
    // course is selected and <CourseSearch /> is unmounted
    let search = $state("");
</script>

<Dialog.Root bind:open={joinDialogOpen.value}>
    <Dialog.Content class="h-2/3">
        <div class="flex h-full flex-col overflow-hidden">
            {#if !selectedCourse.value}
                <CourseSearch bind:search />
            {:else}
                <GroupSelection />
            {/if}
        </div>
    </Dialog.Content>
</Dialog.Root>

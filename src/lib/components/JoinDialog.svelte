<script lang="ts">
    import { joinDialogOpen, selectedCourse } from "$lib/client/state.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import CourseSearch from "./CourseSearch.svelte";
    import GroupSelection from "./GroupSelection.svelte";

    $effect(() => {
        // Clear component data when dialog is closed
        if (joinDialogOpen.value === false) selectedCourse.value = null;
    });
</script>

<Dialog.Root bind:open={joinDialogOpen.value}>
    <Dialog.Content class="h-2/3">
        <div class="flex h-full flex-col overflow-hidden">
            {#if !selectedCourse.value}
                <CourseSearch />
            {:else}
                <GroupSelection />
            {/if}
        </div>
    </Dialog.Content>
</Dialog.Root>

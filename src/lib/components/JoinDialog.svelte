<!-- 
    @component JoinDialog.svelte

    The dialog that allows users to join a group.
    - Author: Joshua Lau '26
-->

<script>
    import { joinDialogOpen } from "$lib/state";
    import * as Dialog from "$lib/components/ui/dialog";
</script>

<Dialog.Root bind:open={$joinDialogOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
            <Dialog.Description>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>

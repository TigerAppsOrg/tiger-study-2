<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { joinDialogOpen, selectedCourse } from "$lib/client/state.svelte";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import type { GroupDetails } from "$lib/constants";
    import { onMount } from "svelte";
    import { ChevronLeft, Icon, Plus } from "svelte-hero-icons";
    import { toast } from "svelte-sonner";
    import Button from "./ui/button/button.svelte";
    import { httpCodes } from "$lib/httpCodes";

    let hasFailed = $state(false);
    let isLoading = $state(false);
    let availableGroups: GroupDetails[] = $state([]);
    let alertDialogOpen = $state(false);

    async function loadGroups() {
        isLoading = true;
        try {
            const res = await fetch(
                `/api/groups/get?courseId=${selectedCourse.value!.id}`
            );
            const data = await res.json();
            availableGroups = data;
        } catch (e) {
            console.error(e);
            hasFailed = true;
        } finally {
            isLoading = false;
        }
    }

    const createNewGroup = async () => {
        const res = await fetch("/api/groups/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: selectedCourse.value!.id })
        });

        if (res.status !== httpCodes.success.ok) {
            const ERR_MSG = "Failed to create group. ";

            const err = await res.text();
            switch (err) {
                case "NO_ID":
                    toast.error(ERR_MSG + "No course ID provided.");
                    break;
                case "MAX_GROUPS":
                    toast.error(
                        ERR_MSG +
                            "You have reached the maximum amount of groups."
                    );
                    break;
                case "CREATION_ERROR":
                    toast.error(ERR_MSG + "Please try again.");
                    break;
                case "ALREADY_IN_COURSE":
                    toast.error(
                        ERR_MSG + "You are already in a group for this course."
                    );
                    break;
            }
        } else {
            const newGroupId = (await res.json()).groupId;
            await goto(`/group/${newGroupId}`);
            alertDialogOpen = false;
            joinDialogOpen.value = false;
            toast.success(
                `Created a new group for ${selectedCourse.value!.code}!`
            );
            invalidateAll();
        }
    };

    const joinGroup = async (group: GroupDetails) => {
        const res = await fetch("/api/groups/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupId: group.groupId })
        });

        if (res.status !== httpCodes.success.ok) {
            const ERR_MSG = "Failed to join group. ";

            const err = await res.text();
            switch (err) {
                case "NO_ID":
                    toast.error(ERR_MSG + "No group ID provided.");
                    break;
                case "NOT_FOUND":
                    toast.error(ERR_MSG + "Group not found.");
                    break;
                case "MAX_GROUPS":
                    toast.error(
                        ERR_MSG +
                            "You have reached the maximum amount of groups."
                    );
                    break;
                case "ALREADY_IN_GROUP":
                    toast.error(ERR_MSG + "You are already in this group.");
                    break;
                case "ALREADY_IN_COURSE":
                    toast.error(
                        ERR_MSG + "You are already in a group for this course."
                    );
                    break;
            }
        } else {
            await goto(`/group/${group.groupId}`);
            joinDialogOpen.value = false;
            toast.success(`Joined group ${group.groupName}!`);
            invalidateAll();

            fetch("/api/groups/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groupId: group.groupId })
            });
        }
    };

    onMount(() => {
        loadGroups();
    });
</script>

<div class="my-4">
    <h2 class="flex items-center gap-2 text-xl font-semibold">
        <Button
            size="icon"
            variant="ghost"
            onclick={() => {
                selectedCourse.value = null;
            }}>
            <Icon src={ChevronLeft} size="32" />
        </Button>
        <span>Groups for {selectedCourse.value!.code}</span>
    </h2>
    <p class="text-sm text-slate-500">
        Select a group to join or create a new one.
    </p>
</div>

{#if hasFailed}
    <div class="std-flex flex-1 text-slate-500">
        <p class="text-center">
            Failed to load groups. This is most likely a connection issue. If
            the problem persists, please contact support at
            <span class="text-primary"> it.admin@tigerapps.org </span>
        </p>
    </div>
{:else if !isLoading}
    {#if availableGroups.length === 0}
        <div class="std-flex flex-1 text-slate-500">
            No groups found. Create a new one?
        </div>
    {:else}
        <div class="flex flex-1 flex-col overflow-y-auto border-t border-input">
            {#each availableGroups as group (group.groupId)}
                <button onclick={() => joinGroup(group)} class="card">
                    <div class="p-2">
                        <p class="text-sm font-semibold">
                            Group: {group.groupName}
                        </p>
                        <p class="text-xs text-slate-500">
                            <span class="font-semibold">
                                {group.members.length} Members:
                            </span>
                            <span>
                                {group.members
                                    .map((x) => x.displayname)
                                    .join(", ")}
                            </span>
                        </p>
                    </div>
                </button>
            {:else}
                <div class="flex-1 std-flex text-slate-500">
                    You are already in all available groups.
                </div>
            {/each}
        </div>
    {/if}

    <Button
        onclick={() => {
            if (availableGroups.length === 0) {
                createNewGroup();
            } else {
                alertDialogOpen = true;
            }
        }}
        class="mt-2 w-full">
        <p class="std-flex">
            <Icon src={Plus} size="32" class="mr-1" />
            <span>New Group</span>
        </p>
    </Button>
{:else}
    <div class="std-flex flex-1">
        <div
            aria-label="Loading spinner"
            class="h-8 w-8 animate-spin rounded-full border-4
            border-slate-500 border-t-transparent">
        </div>
    </div>
{/if}

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
            <Button onclick={createNewGroup}>Create New Group</Button>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>

<style lang="postcss">
    .card {
        @apply flex w-full items-center justify-between border border-t-0 border-input bg-background text-left duration-100 hover:bg-accent hover:text-accent-foreground;
    }
</style>

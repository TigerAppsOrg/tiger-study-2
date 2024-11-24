<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";
    import {
        ArrowLeftEndOnRectangle,
        Clipboard,
        ExclamationTriangle,
        Icon,
        InformationCircle
    } from "svelte-hero-icons";
    import { toast } from "svelte-sonner";

    let { data } = $props();
    const groupInfo = data.groupInfo;

    let leaveDialogOpen = $state(false);

    const handleLeave = async () => {
        try {
            await fetch("/api/groups/leave", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groupId: groupInfo.id })
            });
        } catch (e) {
            console.error(e);
            toast.error("Failed to leave group. Please try again later.");
            return;
        }

        await invalidateAll();
        await goto("/dashboard");
        leaveDialogOpen = false;
        toast.success("Left group successfully!");
    };
</script>

<svelte:head>
    <title
        >TigerStudy | {groupInfo.courseCode
            .split(" / ")[0]
            .replace(/\s/g, "")}</title>
</svelte:head>

<div class="cont flex h-full flex-col overflow-hidden">
    <section
        class="flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:gap-0 sm:pb-8">
        <div>
            <h2 id="course-code" class="text-2xl font-semibold sm:text-4xl">
                {groupInfo.courseCode}
            </h2>
            <h3
                id="course-name"
                class="font-semibold text-slate-700 sm:text-xl">
                {groupInfo.courseTitle}
            </h3>
            <h3 id="group-name" class="mt-2 text-slate-700 sm:text-xl">
                Group {groupInfo.name}
            </h3>
        </div>
        <div class="flex flex-col gap-2">
            <Button
                variant="outline"
                onclick={() => {
                    leaveDialogOpen = true;
                }}>
                <Icon src={ArrowLeftEndOnRectangle} class="mr-1 size-6" />
                <span> Leave Group </span>
            </Button>
            <AlertDialog.Root bind:open={leaveDialogOpen}>
                <AlertDialog.Trigger />
                <AlertDialog.Content>
                    <AlertDialog.Header>
                        <AlertDialog.Title
                            >Are you sure you want to leave the group?</AlertDialog.Title>
                        <AlertDialog.Description>
                            You can always rejoin later if you change your mind.
                        </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        <Button variant="destructive" onclick={handleLeave}
                            >Leave Group</Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </div>
    </section>
    <section class="mt-8 flex flex-col space-y-4 overflow-hidden">
        {#if groupInfo.members.length === 1}
            <Alert.Root variant="destructive">
                <Icon src={ExclamationTriangle} class="size-5" />
                <Alert.Title>
                    <span class="text-base font-semibold">
                        You're the only one here!
                    </span>
                </Alert.Title>
                <Alert.Description
                    >Please wait for others to join and encourage your
                    classmates to use TigerStudy!</Alert.Description>
            </Alert.Root>
        {:else}
            <Alert.Root>
                <Icon src={InformationCircle} class="size-5" />
                <Alert.Title>
                    <span class="text-base font-semibold">
                        Connect with your group members!
                    </span>
                </Alert.Title>
                <Alert.Description>
                    Contact your group members to meet up and study together.
                    You can copy their emails by clicking the button below.
                </Alert.Description>
            </Alert.Root>
        {/if}

        <div class="btw-flex">
            <h3 class="text-2xl font-semibold">
                Members ({groupInfo.members.length})
            </h3>
            <Button
                size="sm"
                variant="outline"
                onclick={() => {
                    const emails = groupInfo.members
                        .map((member) => member.mail)
                        .join(", ");
                    navigator.clipboard.writeText(emails);
                    toast.success("Copied emails to clipboard!");
                }}>
                <Icon src={Clipboard} class="size-6" />
                Copy Emails
            </Button>
        </div>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Class Year</Table.Head>
                    <Table.Head class="text-right">Email</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each groupInfo.members as member (member.displayname)}
                    <Table.Row>
                        <Table.Cell>{member.displayname}</Table.Cell>
                        <Table.Cell>{member.year}</Table.Cell>
                        <Table.Cell class="text-right"
                            >{member.mail}</Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </section>
</div>

<!-- 
    @component +page.svelte (/group/[groupId])

    On this page, users can view and manage a group they are part of.
    They can view group information and leave the group, for example.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";
    import { ClipboardCopy, Exit, Move } from "svelte-radix";
    import { toast } from "svelte-sonner";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { goto } from "$app/navigation";

    let leaveDialogOpen = false;

    const handleLeave = async () => {
        leaveDialogOpen = false;
        goto("/home");
        toast.success(`You have left your group for ${data.code}.`);
    };

    const data = {
        code: "COS 126",
        name: "General Computer Science",
        group: "Blue Penguins"
    };

    const groupMembers = [
        {
            name: "Alice Smith",
            year: 2024,
            email: "alice@princeton.edu"
        },
        {
            name: "Bob Johnson",
            year: 2023,
            email: "bob@princeton.edu"
        },
        {
            name: "Charlie Brown",
            year: 2026,
            email: "charlie@princeton.edu"
        },
        {
            name: "Alice Smith",
            year: 2024,
            email: "alice@princeton.edu"
        },
        {
            name: "Bob Johnson",
            year: 2023,
            email: "bob@princeton.edu"
        },
        {
            name: "Charlie Brown",
            year: 2026,
            email: "charlie@princeton.edu"
        },
        {
            name: "Alice Smith",
            year: 2024,
            email: "alice@princeton.edu"
        },
        {
            name: "Bob Johnson",
            year: 2023,
            email: "bob@princeton.edu"
        }
    ];
</script>

<div class="h-screen flex flex-col overflow-hidden">
    <Header />
    <main class="flex-1 overflow-hidden py-4">
        <div class="cont h-full overflow-hidden flex flex-col">
            <section class="flex justify-between border-b pb-4">
                <div>
                    <h2 id="course-code" class="text-4xl font-semibold">
                        {data.code}
                    </h2>
                    <h3
                        id="course-name"
                        class="text-xl font-semibold text-slate-700">
                        {data.name}
                    </h3>
                    <h3 id="group-name" class="text-xl text-slate-700">
                        <span> Group: </span>
                        <span>
                            {data.group}
                        </span>
                    </h3>
                </div>
                <div class="flex flex-col gap-2">
                    <Button variant="outline">
                        <Move class="mr-1" />
                        <span> Change Group </span>
                    </Button>
                    <Button
                        variant="outline"
                        on:click={() => {
                            leaveDialogOpen = true;
                        }}>
                        <Exit class="mr-1" />
                        <span> Leave Group </span>
                    </Button>
                    <AlertDialog.Root bind:open={leaveDialogOpen}>
                        <AlertDialog.Trigger />
                        <AlertDialog.Content>
                            <AlertDialog.Header>
                                <AlertDialog.Title
                                    >Are you sure you want to leave the group?</AlertDialog.Title>
                                <AlertDialog.Description>
                                    You can always rejoin later if you change
                                    your mind.
                                </AlertDialog.Description>
                            </AlertDialog.Header>
                            <AlertDialog.Footer>
                                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                                <Button
                                    variant="destructive"
                                    on:click={handleLeave}>Leave Group</Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </div>
            </section>
            <section class="mt-4 space-y-2 overflow-hidden flex flex-col">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-semibold">
                        Members ({groupMembers.length})
                    </h3>
                    <Button
                        size="sm"
                        variant="secondary"
                        on:click={() => {
                            const emails = groupMembers
                                .map(member => member.email)
                                .join(", ");
                            navigator.clipboard.writeText(emails);
                            toast.success("Copied emails to clipboard!");
                        }}>
                        <ClipboardCopy class="mr-1" />
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
                        {#each groupMembers as member}
                            <Table.Row>
                                <Table.Cell>{member.name}</Table.Cell>
                                <Table.Cell>{member.year}</Table.Cell>
                                <Table.Cell class="text-right"
                                    >{member.email}</Table.Cell>
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>
            </section>
        </div>
    </main>
</div>

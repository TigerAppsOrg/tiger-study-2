<!-- 
    @component +page.svelte (/home)

    Main dashboard page.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";
    import { joinDialogOpen } from "$lib/state.js";
    export let data;

    const groups = data.props?.groups;
</script>

<div class="cont flex flex-col h-full">
    <h2 class="text-2xl font-semibold mt-4">
        Welcome, {data.props?.name}!
    </h2>

    {#if groups && groups.length > 0}
        <p class="mb-2 text-slate-500">View and manage your study groups:</p>
    {/if}

    <section class="space-y-8">
        {#if groups && groups.length > 0}
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Course</Table.Head>
                        <Table.Head>Group Name</Table.Head>
                        <Table.Head>Members</Table.Head>
                        <Table.Head class="text-right"></Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each groups as group}
                        <Table.Row>
                            <Table.Cell>{group.course}</Table.Cell>
                            <Table.Cell>{group.name}</Table.Cell>
                            <Table.Cell>{group.members}</Table.Cell>
                            <Table.Cell class="text-right">
                                <Button
                                    size="sm"
                                    class="h-6"
                                    variant="link"
                                    href={`/group/${group.id}`}>
                                    View
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        {:else}
            <div class="space-y-8">
                <div class="flex justify-between items-center">
                    <p>You're not in any study groups yet!</p>
                    <Button on:click={() => joinDialogOpen.set(true)}
                        >Get Started</Button>
                </div>

                <article class="grid sm:grid-cols-3 gap-4">
                    <div class="card">
                        <h4 class="card-title">Step 1</h4>
                        <p class="card-body">
                            Search for a course and join a study group! Note
                            that some courses are disabled due to an instructor
                            or department request.
                        </p>
                    </div>
                    <div class="card">
                        <h4 class="card-title">Step 2</h4>
                        <p class="card-body">
                            Click on the "Join" button to join a group. If the
                            course has been approved for study groups, you'll be
                            placed into a group immediately and we'll send you
                            an email with your partners' details. Otherwise,
                            we'll let you know the moment the course is
                            approved.
                        </p>
                    </div>
                    <div class="card">
                        <h4 class="card-title">Step 3</h4>
                        <p class="card-body">
                            Communicate with your study group to find a suitable
                            time. Be sure to follow course collaboration
                            policies!
                        </p>
                    </div>
                </article>

                <div class="card">
                    <h4 class="card-title">
                        Looking for a 1-on-1 Study Partner instead?
                    </h4>
                    <p class="card-body">
                        Would you benefit from meeting with a peer to help keep
                        you accountable as you pursue your goals and
                        aspirations? Do you want to offer supportive
                        accountability to a fellow student? Check out the
                        <a
                            class="link"
                            href="https://mcgraw.princeton.edu/undergraduates/programs/study-partners"
                            target="_blank">
                            McGraw Center's Study Partners program
                        </a>
                        to learn more!
                    </p>
                </div>
            </div>
        {/if}
    </section>

    <div class="flex-1"></div>

    <footer>
        <p class="text-sm text-slate-500 mt-4 text-center">
            Experiencing difficulties? Contact us at
            <a class="link" href="mailto:tiger-study@princeton.edu">
                tiger-study@princeton.edu</a
            >. TigerStudy is supported by the
            <a
                class="link"
                href="https://mcgraw.princeton.edu/"
                target="_blank">
                McGraw Center for Teaching and Learning
            </a>
            and maintained by the
            <a class="link" href="https://tigerapps.org" target="_blank">
                TigerApps
            </a>
            Team.
        </p>
    </footer>
</div>

<style lang="postcss">
    .card {
        @apply p-4 space-y-1 shadow-sm rounded-lg border
        bg-gradient-to-br from-white to-slate-100;
    }

    .card-title {
        @apply text-lg font-semibold;
    }

    .card-body {
        @apply text-sm;
    }

    .link {
        @apply text-primary hover:underline;
    }
</style>

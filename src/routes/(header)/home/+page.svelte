<!-- 
    @component +page.svelte (/home)

    Main dashboard page.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Table from "$lib/components/ui/table";
    import { joinDialogOpen, userGroups } from "$lib/state.svelte.js";
    let { data } = $props();

    userGroups.value = data.userGroups;
</script>

<div class="cont flex flex-col h-full flex-1">
    <h2 class="text-2xl font-semibold mt-4">
        Welcome, {data.name}!
    </h2>

    {#if userGroups.value && userGroups.value.length > 0}
        <p class="mb-2 text-slate-500">View and manage your study groups:</p>
    {/if}

    <section class="space-y-8">
        {#if userGroups.value && userGroups.value.length > 0}
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Course</Table.Head>
                        <Table.Head>Title</Table.Head>
                        <Table.Head>Group Name</Table.Head>
                        <Table.Head class="text-right"></Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each userGroups.value as group (group.groupId)}
                        <Table.Row>
                            <Table.Cell>{group.courseCode}</Table.Cell>
                            <Table.Cell>{group.courseName}</Table.Cell>
                            <Table.Cell>{group.groupName}</Table.Cell>
                            <Table.Cell class="text-right">
                                <Button
                                    size="sm"
                                    class="h-6"
                                    variant="link"
                                    href={`/group/${group.groupId}`}>
                                    View
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        {:else}
            <div class="space-y-8">
                <div class="btw-flex">
                    <p>You're not in any study groups yet!</p>
                    <Button on:click={() => (joinDialogOpen.value = true)}
                        >Get Started</Button>
                </div>

                <article class="grid sm:grid-cols-3 gap-4">
                    <div class="card">
                        <h4 class="card-title">Step 1</h4>
                        <p class="card-body">
                            Click the "Join Group" button to search for course
                            study groups! Note that some courses may be disabled
                            due to an instructor or department request.
                        </p>
                    </div>
                    <div class="card">
                        <h4 class="card-title">Step 2</h4>
                        <p class="card-body">
                            View members of existing study groups and select a
                            group to join or create a new group. See your
                            group's information and members.
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
            </div>
        {/if}
    </section>

    <div class="card my-8">
        <h4 class="card-title">Looking for a 1-on-1 Study Partner instead?</h4>
        <p class="card-body">
            Would you benefit from meeting with a peer to help keep you
            accountable as you pursue your goals and aspirations? Do you want to
            offer supportive accountability to a fellow student? Check out the
            <a
                class="link"
                href="https://mcgraw.princeton.edu/undergraduates/programs/study-partners"
                target="_blank">
                McGraw Center's Study Partners program
            </a>
            to learn more!
        </p>
    </div>

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
</style>

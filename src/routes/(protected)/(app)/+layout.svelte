<script>
    import { courses, userGroups } from "$lib/client/state.svelte";
    import FeedbackDialog from "$lib/components/FeedbackDialog.svelte";
    import JoinDialog from "$lib/components/JoinDialog.svelte";
    import Header from "./Header.svelte";

    let { children, data } = $props();

    $effect(() => {
        userGroups.value = data.userGroups;
        courses.value = data.courseList;
    });
</script>

<JoinDialog />
<FeedbackDialog />

<div class="flex min-h-screen flex-col overflow-hidden">
    <Header />
    <main class="flex flex-1 flex-col overflow-hidden py-4">
        {@render children?.()}
    </main>
</div>

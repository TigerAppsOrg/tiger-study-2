<script>
    import FeedbackDialog from "$lib/components/FeedbackDialog.svelte";
    import Header from "./Header.svelte";

    let { children } = $props();
</script>

<FeedbackDialog />
<div class="flex min-h-screen flex-col overflow-hidden">
    <Header />
    <main class="flex flex-1 flex-col overflow-hidden py-4">
        {@render children?.()}
    </main>
</div>

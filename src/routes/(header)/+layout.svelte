<script>
    import Header from "$lib/components/Header.svelte";
</script>

<div class="h-screen flex flex-col overflow-hidden">
    <Header />
    <main class="flex-1 overflow-hidden py-4">
        <slot />
    </main>
</div>

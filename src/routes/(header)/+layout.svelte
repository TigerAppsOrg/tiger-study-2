<!-- 
    @component +layout.svelte (header group)

    Shared layout for all pages with the standard app header.
    - Author: Joshua Lau '26
-->

<script>
    import Header from "$lib/components/Header.svelte";
    import JoinDialog from "$lib/components/JoinDialog.svelte";
    import { courses } from "$lib/state";

    export let data;

    courses.set(data.courses);
</script>

<JoinDialog />
<div class="h-screen flex flex-col overflow-hidden">
    <Header />
    <main class="flex-1 overflow-hidden py-4">
        <slot />
    </main>
</div>

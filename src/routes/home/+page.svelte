<!-- 
    @component +page.svelte (/home)

    Main dashboard page.
    - Author: Joshua Lau '26
-->

<script>
    import Header from "$lib/components/Header.svelte";
</script>

<div class="h-screen flex flex-col">
    <Header />
    <main class="flex-1">
        <div class="cont"></div>
    </main>
</div>

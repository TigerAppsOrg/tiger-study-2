<!-- 
    @component Header.svelte

    The header for the "home" dashboard page.
    - Author: Joshua Lau '26
-->

<script>
    import { Plus } from "svelte-radix";
    import Button from "./ui/button/button.svelte";

    const handleLogout = async () => {};
</script>

<header class="h-16 border-b shadow-sm flex">
    <div class="cont flex items-center justify-between">
        <a href="/home" aria-label="Dashboard">
            <h1 class="text-2xl font-semibold">TigerStudy</h1>
        </a>

        <nav class="flex items-center gap-2">
            <Button variant="ghost" href="/">Home</Button>
            <form action="/logout">
                <Button variant="ghost" on:click={handleLogout}>Logout</Button>
            </form>

            <Button size="sm">
                <Plus class="mr-1" />
                <span> Join Group </span>
            </Button>
        </nav>
    </div>
</header>

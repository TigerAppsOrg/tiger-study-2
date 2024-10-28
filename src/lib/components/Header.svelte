<!-- 
    @component Header.svelte

    The header for the "home" dashboard page.
    - Author: Joshua Lau '26
-->

<script>
    import { Plus } from "svelte-radix";
    import Button from "./ui/button/button.svelte";
    import { feedbackDialogOpen, joinDialogOpen } from "$lib/state.svelte";
</script>

<header class="h-16 border-b shadow-sm flex">
    <div class="cont btw-flex">
        <a href="/home" aria-label="Dashboard">
            <h1 class="text-2xl font-semibold">
                <span> 🐯 </span>
                <span> TigerStudy </span>
            </h1>
        </a>

        <nav class="flex items-center gap-4">
            <Button variant="ghost" href="/home" size="sm">Home</Button>
            <Button
                variant="ghost"
                size="sm"
                on:click={() => (feedbackDialogOpen.value = true)}
                >Feedback</Button>

            <form method="POST" action="/home?/logout">
                <Button type="submit" variant="ghost" size="sm">Logout</Button>
            </form>

            <Button size="sm" on:click={() => (joinDialogOpen.value = true)}>
                <Plus class="mr-1" />
                <span> Join Group </span>
            </Button>
        </nav>
    </div>
</header>

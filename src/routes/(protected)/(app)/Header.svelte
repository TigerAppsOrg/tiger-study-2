<script>
    import { Icon, Plus } from "svelte-hero-icons";
    import Button from "$lib/components/ui/button/button.svelte";
    import {
        feedbackDialogOpen,
        joinDialogOpen
    } from "$lib/client/state.svelte";
    import { toggleFont } from "$lib/client/font";
</script>

<header class="flex h-16 border-b shadow-sm">
    <div class="cont btw-flex">
        <a href="/dashboard" aria-label="Dashboard">
            <div class="flex items-end gap-1 font-semibold">
                <img class="size-8" src="/logo.png" alt="TigerStudy logo" />
                <h2 class="text-xl">TigerStudy</h2>
            </div>
        </a>

        <nav class="flex items-center gap-4">
            <Button variant="ghost" href="/dashboard">Home</Button>
            <Button
                variant="ghost"
                onclick={() => (feedbackDialogOpen.value = true)}
                >Feedback</Button>

            <form method="POST" action="/dashboard?/logout">
                <Button type="submit" variant="ghost">Logout</Button>
            </form>

            <Button onclick={() => (joinDialogOpen.value = true)}>
                <Icon src={Plus} class="size-5" />
                <span> Join Group </span>
            </Button>

            <Button
                aria-label="Toggle font"
                onclick={toggleFont}
                variant="outline"
                class="size-10 rounded-sm">A</Button>
        </nav>
    </div>
</header>

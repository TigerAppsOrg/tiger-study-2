<!-- 
    @component Header.svelte

    The header for the "home" dashboard page.
    - Author: Joshua Lau '26
-->

<script>
    import { Plus } from "svelte-radix";
    import Button from "./ui/button/button.svelte";
</script>

<header class="h-16 bg-slate-200 flex">
    <div class="cont flex items-center justify-between">
        <a href="/home" aria-label="Dashboard">
            <h1 class="text-xl font-semibold">TigerStudy</h1>
        </a>

        <Button>
            <Plus class="mr-1" />
            <span> Join Group </span>
        </Button>
    </div>
</header>

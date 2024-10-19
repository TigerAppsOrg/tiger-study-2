<script>
    import { Plus } from "svelte-radix";
    import Button from "./ui/button/button.svelte";
</script>

<header
    class="flex items-center justify-between
    h-16 bg-slate-200 px-4">
    <h1 class="text-xl font-semibold">TigerStudy</h1>

    <Button>
        <Plus class="mr-1" />
        <span> Join Group </span>
    </Button>
</header>

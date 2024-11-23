<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Icon, Home } from "svelte-hero-icons";
</script>

<svelte:head>
    <title>TigerStudy | Oh Noes!</title>
    <meta property="og:title" content="TigerStudy | Oh Noes!" />
</svelte:head>

<div class="std-flex h-[80vh]">
    <div class="cont">
        <h1 class="mb-2 text-8xl font-semibold text-primary">Oh noes!</h1>
        <h2 class="mb-2 text-4xl font-light text-slate-700">
            Error: {$page.status}
        </h2>
        <p class="mb-8 text-2xl text-slate-700">
            {$page.error?.message}
        </p>
        <Button href="/" size="lg">
            <Icon src={Home} />
            <span> Go to Homepage </span>
        </Button>
    </div>
</div>

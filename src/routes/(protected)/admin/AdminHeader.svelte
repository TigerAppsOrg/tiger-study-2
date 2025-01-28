<script>
    import { toggleFont } from "$lib/client/font";
    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowLeftStartOnRectangle, Home, Icon } from "svelte-hero-icons";
</script>

<header class="flex h-16 border-b shadow-sm">
    <div class="cont btw-flex">
        <a href="/dashboard" aria-label="Dashboard">
            <div class="flex items-end gap-1 font-semibold">
                <img class="size-8" src="/logo.png" alt="TigerStudy logo" />
                <h2 class="text-xl tracking-tighter">TigerStudy</h2>
            </div>
        </a>

        <nav class="flex items-center gap-4">
            <Button variant="ghost" href="/dashboard" class="hidden md:flex">
                <Icon src={Home} class="size-5" />
                App Dashboard</Button>

            <form method="POST" action="/dashboard?/logout" class="flex">
                <Button type="submit" variant="ghost">
                    <Icon src={ArrowLeftStartOnRectangle} class="size-5" />
                    Logout</Button>
            </form>

            <Button
                aria-label="Toggle font"
                onclick={toggleFont}
                variant="outline"
                size="icon"
                class="flex">A</Button>
        </nav>
    </div>
</header>

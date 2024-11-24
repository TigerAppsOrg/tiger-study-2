<script>
    import {
        ArrowLeftStartOnRectangle,
        Bars3,
        ChatBubbleBottomCenter,
        Home,
        Icon,
        Plus
    } from "svelte-hero-icons";
    import Button from "$lib/components/ui/button/button.svelte";
    import {
        feedbackDialogOpen,
        joinDialogOpen
    } from "$lib/client/state.svelte";
    import { toggleFont } from "$lib/client/font";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
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
            <!-- Yes, I know this duplication of everything for mobile devices
             is terrible and should be refactored, but it's a super quick
             and easy way to make sure everything is responsive -- Josh '26 -->

            <Button variant="ghost" href="/dashboard" class="hidden md:flex">
                <Icon src={Home} class="size-5" />
                Dashboard</Button>
            <Button
                class="hidden md:flex"
                variant="ghost"
                onclick={() => (feedbackDialogOpen.value = true)}>
                <Icon src={ChatBubbleBottomCenter} class="size-5" />
                Feedback</Button>

            <form
                method="POST"
                action="/dashboard?/logout"
                class="hidden md:flex">
                <Button type="submit" variant="ghost">
                    <Icon src={ArrowLeftStartOnRectangle} class="size-5" />
                    Logout</Button>
            </form>

            <div class="hidden sm:flex">
                <Button onclick={() => (joinDialogOpen.value = true)}>
                    <Icon src={Plus} class="size-5" />
                    <span> Join Group </span>
                </Button>
            </div>

            <div class="sm:hidden">
                <Button onclick={() => (joinDialogOpen.value = true)} size="sm">
                    <Icon src={Plus} class="size-5" />
                    <span> Join Group </span>
                </Button>
            </div>

            <div class="md:hidden">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button variant="outline" size="icon">
                            <Icon src={Bars3} class="size-6" />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Group>
                            <DropdownMenu.Item>
                                <Button variant="ghost" href="/dashboard">
                                    <Icon src={Home} class="size-5" />
                                    Dashboard</Button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Button
                                    variant="ghost"
                                    onclick={() =>
                                        (feedbackDialogOpen.value = true)}>
                                    <Icon
                                        src={ChatBubbleBottomCenter}
                                        class="size-5" />
                                    Feedback</Button
                                ></DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <form method="POST" action="/dashboard?/logout">
                                    <Button type="submit" variant="ghost">
                                        <Icon
                                            src={ArrowLeftStartOnRectangle}
                                            class="size-5" />
                                        Logout</Button>
                                </form></DropdownMenu.Item>
                        </DropdownMenu.Group>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>

            <Button
                aria-label="Toggle font"
                onclick={toggleFont}
                variant="outline"
                size="icon"
                class="hidden sm:flex">A</Button>
        </nav>
    </div>
</header>

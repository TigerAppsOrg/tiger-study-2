<script>
    import { Button } from "$lib/components/ui/button";
    import {
        ChatBubbleOvalLeft,
        Icon,
        MagnifyingGlass,
        UserGroup
    } from "svelte-hero-icons";
</script>

<svelte:head>
    <title>TigerStudy</title>
</svelte:head>

<div id="page" class="flex min-h-screen">
    <div id="overlay" class="flex flex-1 flex-col pb-4">
        <header class="flex h-16 border-b shadow-sm">
            <div class="cont btw-flex">
                <button
                    onclick={() => {
                        // Scroll to top
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>
                    <div class="flex items-end gap-1 font-semibold">
                        <img
                            class="size-8"
                            src="/logo.png"
                            alt="TigerStudy logo" />
                        <h2 class="text-xl tracking-tighter">TigerStudy</h2>
                    </div>
                </button>
                <nav>
                    <Button href="/dashboard">
                        <span> Get Started </span>
                    </Button>
                </nav>
            </div>
        </header>
        <main class="std-flex flex-1">
            <div class="cont std-flex flex-col space-y-16 py-12">
                <div class="space-y-4 text-center">
                    <h1
                        class="text-6xl font-semibold leading-tight text-slate-900">
                        Study better, together
                    </h1>
                    <p
                        class="mx-auto max-w-lg text-xl leading-relaxed text-slate-500">
                        Find study groups for all your courses with TigerStudy.
                    </p>
                    <Button size="lg" href="/dashboard">
                        <span> Get Started </span>
                    </Button>
                </div>
                <section class="grid gap-4 sm:grid-cols-3">
                    <div class="card">
                        <div class="icon">
                            <Icon src={MagnifyingGlass} size="28" />
                        </div>
                        <h4 class="card-title">Step 1</h4>
                        <p class="card-body">
                            Search for any course and join a study group.
                        </p>
                    </div>
                    <div class="card">
                        <div class="icon">
                            <Icon src={UserGroup} size="28" />
                        </div>
                        <h4 class="card-title">Step 2</h4>
                        <p class="card-body">
                            View your group's information and members.
                        </p>
                    </div>
                    <div class="card">
                        <div class="icon">
                            <Icon src={ChatBubbleOvalLeft} size="28" />
                        </div>
                        <h4 class="card-title">Step 3</h4>
                        <p class="card-body">
                            Communicate with your study group to find a suitable
                            time.
                        </p>
                    </div>
                </section>
            </div>
        </main>
        <footer>
            <div class="cont">
                <p class="mt-4 text-center text-sm text-slate-500">
                    Have questions? Contact us at
                    <a class="link" href="mailto:tiger-study@princeton.edu">
                        tiger-study@princeton.edu</a
                    >. TigerStudy is supported by the
                    <a
                        class="link"
                        href="https://mcgraw.princeton.edu/"
                        target="_blank">
                        McGraw Center for Teaching and Learning
                    </a>
                    and maintained by the
                    <a
                        class="link"
                        href="https://tigerapps.org"
                        target="_blank">
                        TigerApps
                    </a>
                    Team.
                </p>
            </div>
        </footer>
    </div>
</div>

<style lang="postcss">
    #overlay {
        --overlay-opacity: 0.1;
        background-color: rgba(144, 238, 144, var(--overlay-opacity));
        animation: colorChange 15s infinite;
    }

    @keyframes colorChange {
        0% {
            background-color: rgba(128, 0, 128, var(--overlay-opacity));
        }
        33% {
            background-color: rgba(173, 216, 230, var(--overlay-opacity));
        }
        66% {
            background-color: rgba(255, 255, 255, var(--overlay-opacity));
        }
        100% {
            background-color: rgba(128, 0, 128, var(--overlay-opacity));
        }
    }

    #page {
        background-image: url("/bg.svg");
        background-size: cover;
        background-position: center;
    }

    .card {
        @apply space-y-1 rounded-lg border bg-gradient-to-br from-white to-slate-100 p-4 shadow-sm;
    }

    .icon {
        @apply mb-2 text-4xl text-primary;
    }

    .card-title {
        @apply text-xl font-semibold;
    }
</style>

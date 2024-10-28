<script>
    import { Button } from "$lib/components/ui/button";
    import { MagnifyingGlass, Person, Share1 } from "svelte-radix";
</script>

<!-- 
    @component +page.svelte (/)

    Landing page.
    - Author: Joshua Lau '26
-->

<div id="page" class="flex flex-col min-h-screen pb-4">
    <header class="h-16 border-b shadow-sm flex">
        <div class="cont btw-flex">
            <button
                onclick={() => {
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}>
                <h1 class="text-2xl font-semibold">
                    <span> 🐯 </span>
                    <span> TigerStudy </span>
                </h1>
            </button>
            <nav>
                <Button size="sm" href="/home">
                    <span> Get Started </span>
                </Button>
            </nav>
        </div>
    </header>
    <main class="flex-1 std-flex">
        <div class="cont py-12 std-flex flex-col space-y-16">
            <div class="text-center space-y-4">
                <h1 class="text-6xl font-semibold text-slate-900 leading-tight">
                    Study better, together
                </h1>
                <p
                    class="text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Find study groups for all your courses with TigerStudy.
                </p>
                <Button size="lg" href="/home">
                    <span> Get Started </span>
                </Button>
            </div>
            <section class="grid sm:grid-cols-3 gap-4">
                <div class="card">
                    <div class="icon">
                        <MagnifyingGlass size="28" />
                    </div>
                    <h4 class="card-title">Step 1</h4>
                    <p class="card-body">
                        Search for any course and join a study group.
                    </p>
                </div>
                <div class="card">
                    <div class="icon">
                        <Person size="28" />
                    </div>
                    <h4 class="card-title">Step 2</h4>
                    <p class="card-body">
                        View your group's information and members.
                    </p>
                </div>
                <div class="card">
                    <div class="icon">
                        <Share1 size="28" />
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
            <p class="text-sm text-slate-500 mt-4 text-center">
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
                <a class="link" href="https://tigerapps.org" target="_blank">
                    TigerApps
                </a>
                Team.
            </p>
        </div>
    </footer>
</div>

<style lang="postcss">
    #page {
        background-image: url("/bg.svg");
        background-size: cover;
        background-position: center;
    }

    .card {
        @apply p-4 space-y-1 shadow-sm rounded-lg border
        bg-gradient-to-br from-white to-slate-100;
    }

    .icon {
        @apply text-4xl text-primary mb-2;
    }

    .card-title {
        @apply text-xl font-semibold;
    }
</style>

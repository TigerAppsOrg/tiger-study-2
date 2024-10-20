<script>
    import { Button } from "$lib/components/ui/button";
</script>

<!-- 
    @component +page.svelte (/)

    Landing page.
    - Author: Joshua Lau '26
-->

<div class="flex flex-col min-h-screen pb-4">
    <header class="h-16 border-b shadow-sm flex">
        <div class="cont flex items-center justify-between">
            <button
                on:click={() => {
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
    <main>
        <div class="cont py-4">
            <p>
                Welcome to TigerStudy! Get started by creating an account or
                logging in.
            </p>
        </div>
    </main>
    <div class="flex-1"></div>
    <footer>
        <div class="cont">
            <p class="text-sm text-slate-500 mt-4 text-center">
                Experiencing difficulties? Contact us at
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

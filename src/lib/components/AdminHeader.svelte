<!-- 
    @component AdminHeader.svelte

    The header for the admin page.
    - Author: Joshua Lau '26
-->

<script>
    import Button from "./ui/button/button.svelte";
</script>

<header class="h-16 border-b shadow-sm flex">
    <div class="cont btw-flex">
        <a href="/admin" aria-label="Admin Dashboard">
            <h1 class="text-2xl font-semibold">
                <span> TigerStudy Admin </span>
            </h1>
        </a>

        <nav class="flex items-center gap-4">
            <Button variant="ghost" href="/home" size="sm">Home</Button>
            <form method="POST" action="/home?/logout">
                <Button type="submit" variant="ghost" size="sm">Logout</Button>
            </form>
        </nav>
    </div>
</header>

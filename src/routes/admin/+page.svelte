<!-- 
    @component +page.svelte (/admin)

    Admin dashboard
    - Author: Joshua Lau '26
-->

<script>
    import AdminHeader from "$lib/components/AdminHeader.svelte";

    let { data } = $props();
</script>

<div class="flex flex-col overflow-hidden min-h-screen">
    <AdminHeader />
    <main class="flex-1 overflow-hidden py-4 flex flex-col">
        <div class="cont">I am the admin page</div>
    </main>
</div>

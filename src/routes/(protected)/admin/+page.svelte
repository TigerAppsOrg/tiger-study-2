<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import AdminHeader from "./AdminHeader.svelte";
</script>

<svelte:head>
    <title>TigerStudy | Admin</title>
</svelte:head>

<div class="flex min-h-screen flex-col overflow-hidden">
    <AdminHeader />
    <div class="mx-auto max-w-2xl p-8">
        <h1 class="mb-6 text-2xl font-bold">Admin Controls</h1>

        <div class="space-y-4">
            <form action="?/updateCourses" method="POST">
                <Button type="submit" class="w-full">Update Courses</Button>
            </form>

            <form action="?/seed" method="POST">
                <Button type="submit" class="w-full">Seed</Button>
            </form>

            <form action="?/sendTestEmail" method="POST" class="space-y-2">
                <input
                    type="email"
                    name="emailAddress"
                    placeholder="Enter email address"
                    required
                    class="w-full rounded-md border border-gray-300 px-4 py-2
                    focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Button type="submit" class="w-full">Send Test Email</Button>
            </form>
        </div>
    </div>
</div>

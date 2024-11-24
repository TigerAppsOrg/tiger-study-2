<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<svelte:head>
    <title>TigerStudy | Admin</title>
</svelte:head>

<form action="?/updateCourses" method="POST">
    <Button type="submit">Update Courses</Button>
</form>

<form action="?/seed" method="POST">
    <Button type="submit">Seed</Button>
</form>

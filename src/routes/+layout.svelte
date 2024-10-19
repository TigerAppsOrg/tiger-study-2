<!-- 
    @component +layout.svelte (/)

    Global layout for all pages.
    - Author: Joshua Lau '26
-->

<script>
    import "../app.css";
</script>

<svelte:head>
    <title>TigerStudy</title>
    <meta
        name="description"
        content="TigerStudy helps students easily create and join study groups for their classes." />
    <meta
        name="keywords"
        content="TigerStudy, study groups, student study groups, academic collaboration, class study groups, group study, peer learning, study buddies, student networking, online study groups, school collaboration, coursework help, study app for students" />
</svelte:head>

<slot></slot>

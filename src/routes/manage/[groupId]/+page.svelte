<!-- 
    @component +page.svelte (/manage/[groupId])

    On this page, users can manage a group they are part of.
    They can view group information and leave the group, for example.
    - Author: Joshua Lau '26
-->

<script>
    export let data;
</script>

<h1>
    {data.props?.groupId}
</h1>

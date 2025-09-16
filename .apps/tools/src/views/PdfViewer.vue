<template>
    <input type="file" @change="e => handleViewClick(e.target.files[0])">
</template>

<script setup>
function handleViewClick(file)
{
    location.href = `/pdfviewer/web/viewer.html?file=${URL.createObjectURL(file)}`;
}
</script>

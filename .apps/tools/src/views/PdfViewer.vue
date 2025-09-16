<template>
    <div class="box">
        <input class="form-control" type="file" @change="e => handleViewClick(e.target.files[0])">
        <iframe class="frame" :src></iframe>
    </div>
</template>

<script setup>
const src = ref();
function handleViewClick(file)
{
    src.value = `/pdfviewer/web/viewer.html?file=${URL.createObjectURL(file)}`;
}
</script>

<style scoped>
.box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
}
.frame {
    flex: auto;
}
</style>

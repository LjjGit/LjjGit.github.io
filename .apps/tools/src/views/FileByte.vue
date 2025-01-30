<template>
    <input type="file" @change="handleFileChange"/>
    <pre>{{ b64 }}</pre>
    <button v-if="b64" @click="handleCopy(b64)">复制</button>
    <pre>{{ num }}</pre>
    <button v-if="num" @click="handleCopy(num)">复制</button>
    <pre>{{ hex }}</pre>
    <button v-if="hex" @click="handleCopy(hex)">复制</button>
</template>

<script setup>
import { ref } from 'vue';

const b64 = ref();
const num = ref();
const hex = ref();

const handleFileChange = (e) => {
    /** @type File */
    const file = e.target.files[0];
    file.arrayBuffer().then(buf => {
        const uin8 = Array.from(new Uint8Array(buf));
        b64.value = btoa(String.fromCharCode.apply(num, uin8));
        num.value = uin8.join(', ');
        hex.value = uin8.map(item => '0x' + item.toString(16)).join(', ');
    });
};

const handleCopy = data => {
    navigator.clipboard.writeText(data).then(() => {
        alert('复制成功');
    });
};
</script>

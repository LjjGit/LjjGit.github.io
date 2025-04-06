<template>
    <div class="box">
        <div><input type="file" @change="handleFileChange"/></div>
        <div class="show-box">
            <div class="show-item-box">
                <div class="show-text b64">{{ b64 }}</div>
                <div><button class="cp-btn" v-if="b64" @click="handleCopy(b64)">复制 {{ b64.length }} Bytes</button></div>
            </div>
            <div class="show-item-box">
                <div class="show-text">{{ num }}</div>
                <div><button class="cp-btn" v-if="num" @click="handleCopy(num)">复制</button></div>
            </div>
            <div class="show-item-box">
                <div class="show-text">{{ hex }}</div>
                <div><button class="cp-btn" v-if="hex" @click="handleCopy(hex)">复制</button></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const b64 = ref();
const num = ref();
const hex = ref();

const handleFileChange = (e) => {
    /** @type File */
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onload = () => {
        b64.value = fr.result.split(',')[1];
    };
    fr.readAsDataURL(file);
    file.arrayBuffer().then(buf => {
        const uin8 = Array.from(new Uint8Array(buf));
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

<style scoped>
.box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.show-box {
    flex: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.show-item-box {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.show-item-box:nth-child(2n + 1) {
    background-color: #ccc;
}
.show-text {
    font-size: 11px;
    flex: auto;
    overflow: auto;
}
.show-text.b64 {
    word-break: break-all;
}
.cp-btn {
    display: block;
    margin: 0 auto;
}
</style>

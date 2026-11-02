<template>
    <div class="control-panel">
        <p><el-button v-for="(v, i) in 20" @click="n = i">{{ i }}</el-button></p>
        <label>
            小矩形数量 (n = {{ n }})：
            <input type="range" v-model.number="n" min="1" max="1000" step="1">
        </label>
        <p>那么小矩形的宽是: h/n</p>
        <p>小矩形总面积等于一个小矩形面积乘以总数：</p>
        <p>小矩形总面积: [5 × (h / n)] × n = 5h</p>
    </div>
    <div class="canvas-container">
        <canvas class="canvas" ref="canvasRef" width="1080" height="1080"></canvas>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const canvasRef = ref();
const n = ref(0);

watchEffect(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 核心尺寸配置
    const totalWidth = 1000;
    const rectHeight = 600; // 紧凑的外框高度
    const startY = 120;
    // 水平居中计算：(1080 - 1000) / 2 = 40
    const startX = (canvas.width - totalWidth) / 2;

    // ----------------------------------------------------
    // 1. 画外围参考大矩形框 (高对比度暗灰边框)
    // ----------------------------------------------------
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, totalWidth, rectHeight);

    // 顶部统一标注大矩形宽度 h
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#111111';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('h', startX + totalWidth / 2, startY - 20);

    // 宽度 h 的指示线 (高对比度黑色)
    ctx.beginPath();
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY - 18); ctx.lineTo(startX, startY - 6);
    ctx.moveTo(startX + totalWidth, startY - 18); ctx.lineTo(startX + totalWidth, startY - 6);
    ctx.moveTo(startX, startY - 12); ctx.lineTo(startX + totalWidth, startY - 12);
    ctx.stroke();

    // 正弦曲线函数（两条曲线纵向间距为 100）
    const HEIGHT_OFFSET = 100;
    const fn = i => 50 * Math.sin((Math.PI * i) / 180) + 210;

    // ----------------------------------------------------
    // 2. 绘制上面的曲边闭合图形（高对比度鲜红）
    // ----------------------------------------------------
    ctx.beginPath();
    ctx.strokeStyle = '#d00000';
    ctx.lineWidth = 3;

    // 上边缘
    for (let i = startX; i <= startX + totalWidth; i++) {
        if (i === startX) ctx.moveTo(i, fn(i));
        else ctx.lineTo(i, fn(i));
    }
    // 下边缘
    for (let i = startX + totalWidth; i >= startX; i--) {
        ctx.lineTo(i, fn(i) + HEIGHT_OFFSET);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 42, 42, 0.35)'; // 鲜艳红填充
    ctx.fill();

    // 标注曲边图形左侧的高度 "5"
    const labelX = startX - 18;
    const upperY = fn(startX);
    const lowerY = upperY + HEIGHT_OFFSET;
    const centerY = (upperY + lowerY) / 2;

    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#d00000';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('5', labelX - 8, centerY);

    // 垂直指示线
    ctx.beginPath();
    ctx.strokeStyle = '#d00000';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, upperY); ctx.lineTo(labelX - 4, upperY);
    ctx.moveTo(startX, lowerY); ctx.lineTo(labelX - 4, lowerY);
    ctx.moveTo(labelX - 4, upperY); ctx.lineTo(labelX - 4, lowerY);
    ctx.stroke();

    // ----------------------------------------------------
    // 3. 动态绘制 n 个逼近曲线的矩形（高对比度宝蓝）
    // ----------------------------------------------------
    const rectWidth = totalWidth / n.value;
    ctx.strokeStyle = '#002288';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(0, 102, 255, 0.4)'; // 宝蓝填充

    for (let k = 0; k < n.value; k++) {
        const x = startX + k * rectWidth;
        const y = fn(x);

        ctx.fillRect(x, y, rectWidth, HEIGHT_OFFSET);
        ctx.strokeRect(x, y, rectWidth, HEIGHT_OFFSET);
    }

    // ----------------------------------------------------
    // 4. 同一大矩形内绘制靠紧的对照标准矩形（高对比度翡翠绿）
    // ----------------------------------------------------
    // 靠近上方的曲线图形，间距调紧
    const compareRectY = startY + 440;

    ctx.fillStyle = 'rgba(0, 176, 80, 0.45)'; // 亮绿色
    ctx.strokeStyle = '#007020';
    ctx.lineWidth = 3;
    ctx.fillRect(startX, compareRectY, totalWidth, HEIGHT_OFFSET);
    ctx.strokeRect(startX, compareRectY, totalWidth, HEIGHT_OFFSET);

    // 对照矩形左侧高度 "5" 的标注
    const compCenterY = compareRectY + HEIGHT_OFFSET / 2;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#007020';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('5', labelX - 8, compCenterY);

    ctx.beginPath();
    ctx.strokeStyle = '#007020';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, compareRectY); ctx.lineTo(labelX - 4, compareRectY);
    ctx.moveTo(startX, compareRectY + HEIGHT_OFFSET); ctx.lineTo(labelX - 4, compareRectY + HEIGHT_OFFSET);
    ctx.moveTo(labelX - 4, compareRectY); ctx.lineTo(labelX - 4, compareRectY + HEIGHT_OFFSET);
    ctx.stroke();
});
</script>

<style scoped>
.control-panel {
    text-align: center;
    margin-bottom: 15px;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 18px;
}
.control-panel input[type="range"] {
    width: 320px;
    vertical-align: middle;
}
.canvas-container {
    text-align: center;
}
.canvas {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
}
</style>
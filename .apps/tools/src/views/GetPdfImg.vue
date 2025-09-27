<template>
<input type="file" accept="application/pdf" @change="handleFileUpload">
<div ref="imageContainerRef"></div>
</template>

<script setup>
import { getDocument, GlobalWorkerOptions, OPS } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const imageContainerRef = ref();

let imageContainer;
onMounted(() => {
    imageContainer = imageContainerRef.value;
});

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        alert('请选择一个PDF文件。');
        return;
    }

    imageContainer.innerHTML = '<p>正在解析PDF，请稍候...</p>';
    const arrayBuffer = await file.arrayBuffer();
    const typedArray = new Uint8Array(arrayBuffer);

    try {
        // 1. 加载PDF文档
        const loadingTask = getDocument(typedArray);
        const pdfDoc = await loadingTask.promise;
        console.log(`PDF 加载成功，总页数: ${pdfDoc.numPages}`);

        // 清空容器
        imageContainer.innerHTML = '';

        // 2. 遍历每一页
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            console.log(`正在处理第 ${pageNum} 页...`);
            const page = await pdfDoc.getPage(pageNum);

            // 3. 获取操作符列表
            const opList = await page.getOperatorList();

            // 4. 从操作符列表中筛选出图像操作符
            const imageNames = [];
            opList.fnArray.forEach((fn, index) => {
                if (fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject) {
                    imageNames.push(opList.argsArray[index][0]);
                }
            });

            // 5. 去除重复的图像名（同一图片可能在页面上多次使用）
            const uniqueImageNames = [...new Set(imageNames)];

            if (uniqueImageNames.length === 0) {
                console.log(`第 ${pageNum} 页未找到图片。`);
                continue;
            }

            // 6. 通过图像名获取图像数据
            for (const imageName of uniqueImageNames) {
                const image = await new Promise((resolve) => {
                    page.objs.get(imageName, resolve);
                });

                if (image) {
                    // 7. 将图像数据转换为可展示的图片
                    await displayImage(image, pageNum, imageName);
                }
            }
        }
        if (imageContainer.innerHTML === '') {
            imageContainer.innerHTML = '<p>未在该PDF中找到任何图片。</p>';
        }
    } catch (error) {
        console.error('处理PDF时发生错误:', error);
        imageContainer.innerHTML = `<p style="color:red;">处理失败: ${error.message}</p>`;
    }
}

async function displayImage(image, pageNum, imageName) {
    // 创建一个离屏Canvas来绘制图像
    const canvas = new OffscreenCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // 检查 image 类型并正确绘制
    if (image instanceof ImageBitmap) {
        ctx.drawImage(image, 0, 0, image.width, image.height);
    } else {
        // 如果 image 有 bitmap 属性（如 PDFImage 对象）
        const bitmap = image.bitmap || image;
        if (bitmap instanceof ImageBitmap) {
            ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
        } else {
            console.warn(`图像 ${imageName} 的数据格式无法直接绘制。`, image);
            return;
        }
    }

    // 将Canvas转换为Blob URL
    const blob = await canvas.convertToBlob({ type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);

    // const body = new FormData();
    // body.append('name', pageNum + imageName + '.jpg');
    // body.append('file', blob);
    // fetch('http://localhost:1111/b.php', {
    //     method: 'post',
    //     body,
    // });

    // 在页面上创建img元素显示图片
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = `第 ${pageNum} 页 - 图片 ${imageName}`;
    imgElement.title = `尺寸: ${image.width}x${image.height}`;

    const label = document.createElement('div');
    label.textContent = imgElement.alt;

    imageContainer.appendChild(label);
    imageContainer.appendChild(imgElement);
}
</script>

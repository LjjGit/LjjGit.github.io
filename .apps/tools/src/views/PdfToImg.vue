<template>
    <input class="form-control" type="file" @change="fileChange">
    <div class="imgs" ref="imgs"></div>
</template>

<script setup>
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const imgs = ref('imgs');

function fileChange(e)
{
    getDocument(URL.createObjectURL(e.target.files[0])).promise.then(async doc => {
        for (let i = 1; i <= doc.numPages; i++) {
            await new Promise(resolve => {
                doc.getPage(i).then(page => {
                    /**
                     * @type {HTMLCanvasElement}
                     */
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const viewport = page.getViewport({ scale: 2 });
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    page.render({
                        canvas,
                        viewport,
                    }).promise.then(() => {
                        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const pxList = new Uint32Array(imgData.data.buffer);
                        let top;
                        const x = 10, y = 10, w = canvas.width - 20, h = canvas.height - 20;
                        for (let i = y; i < h; i++) {
                            for (let j = x; j < w; j++) {
                                if (4294967295 !== pxList[i * canvas.width + j]) {
                                    top = i;
                                    break;
                                }
                            }
                            if (top) break;
                        }

                        let left;
                        for (let j = x; j < w; j++) {
                            for (let i = y; i < h; i++) {
                                if (4294967295 !== pxList[i * canvas.width + j]) {
                                    left = j;
                                    break;
                                }
                            }
                            if (left) break;
                        }

                        let right;
                        for (let j = x + w; j >= x; j--) {
                            for (let i = y; i < h; i++) {
                                if (4294967295 !== pxList[i * canvas.width + j]) {
                                    right = j;
                                    break;
                                }
                            }
                            if (right) break;
                        }

                        let bottom;
                        for (let i = canvas.height - 1; i > 0; i--) {
                            for (let j = x; j < w; j++) {
                                if (4294967295 !== pxList[i * canvas.width + j]) {
                                    bottom = i;
                                    break;
                                }
                            }
                            if (bottom) break;
                        }

                        const cv = document.createElement('canvas');
                        const ct = cv.getContext('2d');
                        cv.width = right - left;
                        cv.height = bottom - top;

                        ct.drawImage(
                            canvas,
                            left, top,
                            cv.width, cv.height,
                            0, 0,
                            cv.width, cv.height
                        );

                        const img = document.createElement('img');
                        img.src = cv.toDataURL('image/jpeg');
                        imgs.value.append(img);
                        resolve();


                        // const img = document.createElement('img');
                        // img.src = canvas.toDataURL('image/jpeg');
                        // imgs.value.append(img);
                        // resolve();
                    })
                });
            });
        }
    });
}
</script>

<style scoped>
.imgs {
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.imgs:deep(img) {
    display: block;
    margin: 10px;
    width: 720px;
}
</style>

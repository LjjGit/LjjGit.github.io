import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';

const router = createRouter({
    history: createWebHashHistory('/tools/'),
    routes: [
        { path: '/', component: () => import('./views/Home.vue') },
        { path: '/calc', component: () => import('./views/Calc.vue') },
        { path: '/file-byte', component: () => import('./views/FileByte.vue') },
        { path: '/nes-color', component: () => import('./views/NesColor.vue') },
        { path: '/pdf-viewer', component: () => import('./views/PdfViewer.vue') },
        { path: '/pdf-to-img', component: () => import('./views/PdfToImg.vue') },
        { path: '/get-pdf-img', component: () => import('./views/GetPdfImg.vue') },
    ],
});

createApp(App)
    .use(router)
    .mount('#app');

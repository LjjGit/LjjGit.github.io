import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';

const router = createRouter({
    history: createWebHashHistory('/tools/'),
    routes: [
        { path: '/', component: () => import('./views/Home.vue') },
        { path: '/calc', component: () => import('./views/Calc.vue') },
    ],
});

createApp(App)
    .use(router)
    .mount('#app');

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: true,
        }),
        AutoImport({
            imports: [
                // presets
                'vue',
            ],
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
    ],
    base: '/tools/',
    build: {
        outDir: import.meta.dirname + '/../../.deploy/tools',
    },
});

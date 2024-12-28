import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    outDir: '../../../.deploy/blog',
    base: '/blog/',
    title: 'My Awesome Project',
    description: 'A VitePress Site',
    locales: {
        root: {
            lang: 'zh',
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: '示例', link: '/markdown-examples'},
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'},
                ],
            },
        ],

        // socialLinks: [
        //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        // ]
    },
});

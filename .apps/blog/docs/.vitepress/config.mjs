import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    outDir: '../../../.deploy/blog',
    base: '/blog/',
    title: '博客 Blog',
    description: 'Vitepress generate. Github actions deploy',
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
                text: '示例',
                items: [
                    {text: 'js数组访问元素过程', link: '/array-get-element-process'},
                    {text: 'Markdown 示例', link: '/markdown-examples'},
                    {text: '运行时 API 示例', link: '/api-examples'},
                    {text: '学习使用Github actions', link: '/learn-github-actions'},
                ],
            },
        ],

        // socialLinks: [
        //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        // ]
    },
});

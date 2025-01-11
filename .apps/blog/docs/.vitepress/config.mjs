import { createContentLoader, defineConfig } from 'vitepress';

const sidebar = [];

let generatePostLinkToSidebar = () => {
    generatePostLinkToSidebar = null;
    setTimeout(() => {
        createContentLoader('posts/*.md').load().then((data) => {
            const postNav = {
                text: '帖子',
                collapsed: false,
                items: [],
            };

            sidebar.push(postNav);

            for (const item of data) {
                postNav.items.push({
                    text: item.frontmatter.title,
                    link: item.url,
                });
            }
        });
    });
};

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
    themeConfig: new Proxy({
        // https://vitepress.dev/reference/default-theme-config
        // nav: [
        //     {text: '首页', link: '/'},
        // ],

        sidebar,

        // socialLinks: [
        //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        // ]
    }, {
        get(target, p, receiver)
        {
            generatePostLinkToSidebar?.();

            return target[p];
        },
    }),
});

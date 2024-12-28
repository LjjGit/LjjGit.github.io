## 学习使用 Github actions 自动部署静态网页。

在`.github/workflows`目录下定义`.yml`文件，即可自动执行逻辑。写本文的时候，已经测试可以。

定义如下：

`build-blog.yml`:

```yaml
name: Build blog

on:
    workflow_call:

defaults:
    run:
        working-directory: .apps/blog

jobs:
    build:
        name: Build
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v4
              with:
                  fetch-depth: 0
            - name: Setup Node
              uses: actions/setup-node@v4
              with:
                  node-version: latest
            - name: Setup Pages
              uses: actions/configure-pages@v4
            - name: Install dependencies
              run: npm ci # ci: Clean install a project
            - name: Build with VitePress
              run: npm run docs:build
            - name: Upload artifact
              uses: actions/upload-pages-artifact@v3
              with:
                  path: .deploy

```

`deploy.yml`

```yaml
name: Deploy

on:
    push:
        branches: [master]

concurrency:
    group: pages
    cancel-in-progress: false

permissions:
    contents: read
    pages: write
    id-token: write

jobs:
    call-build-blog:
        uses: ./.github/workflows/build-blog.yml
    deploy:
        needs: call-build-blog
        environment:
            name: github-pages
        runs-on: ubuntu-latest
        name: Deploy
        steps:
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4

```

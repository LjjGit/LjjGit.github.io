<script setup>
import { withBase } from 'vitepress';
import { data as posts } from './posts.data.js';
</script>

<ol>
    <li v-for="post of posts"><a :href="withBase(post.url)">{{ post.frontmatter.title }}</a></li>
</ol>

# 个人博客 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个极简文艺风格的个人综合博客，Astro + Vue 3 islands 架构，墨与纸配色，书页翻动动画。

**Architecture:** Astro SSG 静态生成，Vue 组件按需水合（islands）。Markdown 内容通过 Content Collections 管理。首页全屏英雄区 + 书页翻动背景，页面切换使用 3D 翻转动画模拟书页开合。

**Tech Stack:** Astro, Vue 3, @astrojs/vue, @astrojs/mdx, Content Collections

---

## File Structure

```
blog/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── main.css
│   │       └── markdown.css
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── BookBackground.vue
│   │   ├── PageTransition.vue
│   │   ├── ArticleCard.astro
│   │   ├── WorkCard.astro
│   │   ├── Timeline.astro
│   │   └── TagFilter.vue
│   ├── content/
│   │   ├── config.ts
│   │   └── articles/
│   │       ├── hello-world.md
│   │       └── vue3-tips.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── articles.astro
│       ├── article/[slug].astro
│       ├── works.astro
│       └── about.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

### Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro`
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "personal-blog",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/vue": "^4.0.0",
    "@astrojs/mdx": "^3.0.0",
    "vue": "^3.4.0"
  }
}
```

- [ ] **Step 2: 创建 astro.config.mjs**

```js
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'

export default defineConfig({
  integrations: [vue(), mdx()]
})
```

- [ ] **Step 3: 创建 tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: 创建 src/layouts/BaseLayout.astro**

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = '个人博客' } = Astro.props;
---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content={description}>
  <title>{title}</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <slot />
</body>
</html>

<style is:global>
  @import '../assets/styles/main.css';
</style>
```

- [ ] **Step 5: 创建 src/pages/index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="首页">
  <main class="home">
    <h1 class="home__title">个人博客</h1>
    <p class="home__subtitle">建设中...</p>
  </main>
</main>

<style>
  .home {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .home__title {
    font-size: 42px;
    font-weight: 300;
    letter-spacing: 4px;
    color: #2c2c2c;
    margin-bottom: 16px;
  }
  .home__subtitle {
    font-size: 13px;
    color: #888;
    letter-spacing: 2px;
  }
</style>
```

- [ ] **Step 6: 安装依赖并验证**

Run: `cd E:/blog && npm install && npm run dev`
Expected: Astro dev server starts on http://localhost:4321

- [ ] **Step 7: Commit**

```bash
git init && git add -A && git commit -m "feat: initialize Astro + Vue project"
```

---

### Task 2: 全局样式

**Files:**
- Create: `src/assets/styles/main.css`
- Create: `src/assets/styles/markdown.css`

- [ ] **Step 1: 创建 main.css**

```css
:root {
  --bg: #ececf2;
  --text-primary: #2c2c2c;
  --text-body: #555555;
  --text-secondary: #888888;
  --border: rgba(0, 0, 0, 0.06);
  --hover: rgba(0, 0, 0, 0.04);
  --font-serif: Georgia, 'Noto Serif SC', serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-serif);
  background-color: var(--bg);
  color: var(--text-body);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

h1, h2, h3, h4 {
  font-family: var(--font-serif);
  color: var(--text-primary);
  font-weight: 400;
}

::selection {
  background: rgba(0, 0, 0, 0.08);
}

.page-title {
  font-size: 28px;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 40px;
}
```

- [ ] **Step 2: 创建 markdown.css**

```css
.markdown-body {
  font-family: var(--font-serif);
  color: var(--text-body);
  line-height: 2;
}

.markdown-body h1 {
  font-size: 2em;
  margin: 2em 0 1em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid var(--border);
}

.markdown-body h2 {
  font-size: 1.5em;
  margin: 1.5em 0 0.8em;
}

.markdown-body h3 {
  font-size: 1.2em;
  margin: 1.2em 0 0.6em;
}

.markdown-body p {
  margin-bottom: 1.2em;
}

.markdown-body blockquote {
  border-left: 2px solid var(--border);
  padding-left: 1em;
  color: var(--text-secondary);
  margin: 1.5em 0;
}

.markdown-body code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 0.9em;
  background: rgba(0, 0, 0, 0.04);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.markdown-body pre {
  background: rgba(0, 0, 0, 0.03);
  padding: 1em 1.2em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5em 0;
}

.markdown-body pre code {
  background: none;
  padding: 0;
}

.markdown-body img {
  max-width: 100%;
  border-radius: 6px;
  margin: 1.5em 0;
}

.markdown-body ul, .markdown-body ol {
  padding-left: 1.5em;
  margin-bottom: 1.2em;
}

.markdown-body li {
  margin-bottom: 0.4em;
}

.markdown-body a {
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.markdown-body a:hover {
  opacity: 0.7;
}

.markdown-body hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2em 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/
git commit -m "feat: add global styles and markdown typography"
```

---

### Task 3: Content Collections 配置

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/articles/hello-world.md`
- Create: `src/content/articles/vue3-tips.md`

- [ ] **Step 1: 创建 content config**

```ts
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tag: z.enum(['技术', '随笔', '设计']),
    excerpt: z.string(),
    readingTime: z.string(),
  }),
});

export const collections = { articles };
```

- [ ] **Step 2: 创建示例文章 hello-world.md**

```markdown
---
title: Hello World
date: 2026-05-01
tag: 随笔
excerpt: 这是我的第一篇博客文章，记录开始写作的这一刻。
readingTime: 3 分钟
---

这是我的第一篇博客文章。

## 为什么写博客

写作是思考的最佳方式。当你试图把模糊的想法变成清晰的文字，思维就完成了升华。

> 未经审视的生活不值得过。—— 苏格拉底

## 开始

这个博客将记录我在技术、设计和生活中的思考与探索。

希望这些文字对你也有所帮助。
```

- [ ] **Step 3: 创建示例文章 vue3-tips.md**

```markdown
---
title: Vue 3 实用技巧
date: 2026-04-28
tag: 技术
excerpt: 整理一些 Vue 3 开发中的实用技巧和最佳实践。
readingTime: 5 分钟
---

## Composition API 的优势

Vue 3 的 Composition API 让代码组织更加灵活。

```js
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
```

## 使用 `<script setup>`

`<script setup>` 是 Composition API 的编译时语法糖，让代码更简洁。

## 总结

Vue 3 带来了更好的开发体验，值得升级。
```

- [ ] **Step 4: 验证内容集合**

Run: `npm run dev`
Expected: 无报错，内容集合配置生效

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: add Content Collections config and sample articles"
```

---

### Task 4: NavBar 导航组件 (Vue Island)

**Files:**
- Create: `src/components/NavBar.vue`

- [ ] **Step 1: 创建 NavBar.vue**

```vue
<template>
  <nav class="navbar" :class="{ 'navbar--hidden': isHidden }">
    <div class="navbar__links">
      <a href="/" class="navbar__link" :class="{ active: currentPath === '/' }">首页</a>
      <a href="/articles" class="navbar__link" :class="{ active: currentPath.startsWith('/articles') || currentPath.startsWith('/article') }">文章</a>
      <a href="/works" class="navbar__link" :class="{ active: currentPath === '/works' }">作品</a>
      <a href="/about" class="navbar__link" :class="{ active: currentPath === '/about' }">关于</a>
    </div>
    <button class="navbar__menu-btn" @click="toggleMenu" :class="{ open: menuOpen }">
      <span></span>
      <span></span>
    </button>
    <div class="navbar__mobile" :class="{ open: menuOpen }">
      <a href="/" @click="closeMenu">首页</a>
      <a href="/articles" @click="closeMenu">文章</a>
      <a href="/works" @click="closeMenu">作品</a>
      <a href="/about" @click="closeMenu">关于</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentPath = ref(window.location.pathname)
const menuOpen = ref(false)
const isHidden = ref(false)
let lastScroll = 0

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const handleScroll = () => {
  const currentScroll = window.scrollY
  isHidden.value = currentScroll > 100 && currentScroll > lastScroll
  lastScroll = currentScroll
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 24px 32px;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.navbar--hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.navbar__links {
  display: flex;
  gap: 24px;
}

.navbar__link {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-secondary);
  letter-spacing: 1px;
  transition: color 0.3s ease;
  position: relative;
}

.navbar__link:hover,
.navbar__link.active {
  color: var(--text-primary);
}

.navbar__link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--text-primary);
}

.navbar__menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 16px;
  position: relative;
}

.navbar__menu-btn span {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--text-primary);
  position: absolute;
  left: 0;
  transition: all 0.3s ease;
}

.navbar__menu-btn span:first-child { top: 0; }
.navbar__menu-btn span:last-child { bottom: 0; }

.navbar__menu-btn.open span:first-child {
  top: 50%;
  transform: rotate(45deg);
}

.navbar__menu-btn.open span:last-child {
  bottom: 50%;
  transform: rotate(-45deg);
}

.navbar__mobile {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.navbar__mobile.open {
  opacity: 1;
  pointer-events: all;
}

.navbar__mobile a {
  font-size: 20px;
  color: var(--text-primary);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .navbar { padding: 16px 20px; }
  .navbar__links { display: none; }
  .navbar__menu-btn { display: block; }
  .navbar__mobile { display: flex; }
}
</style>
```

- [ ] **Step 2: 验证导航**

Run: `npm run dev`
Expected: 右上角显示导航链接

- [ ] **Step 3: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "feat: add responsive NavBar component"
```

---

### Task 5: 书页翻动背景 (BookBackground)

**Files:**
- Create: `src/components/BookBackground.vue`

- [ ] **Step 1: 创建 BookBackground.vue**

```vue
<template>
  <div class="book-bg">
    <div class="book">
      <div class="page page--left">
        <div class="page__content">
          <div class="line" v-for="i in 8" :key="'l'+i" :style="{ width: widths[i-1] }"></div>
        </div>
      </div>
      <div class="page page--right">
        <div class="page__content">
          <div class="line" v-for="i in 8" :key="'r'+i" :style="{ width: widths[i+7] }"></div>
        </div>
      </div>
      <div class="page page--flip">
        <div class="page__content">
          <div class="line" v-for="i in 8" :key="'f'+i" :style="{ width: widths[i+15] }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const widths = Array.from({ length: 24 }, () => `${40 + Math.random() * 50}%`)
</script>

<style scoped>
.book-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
}

.book {
  width: 400px;
  height: 280px;
  position: relative;
  perspective: 1200px;
  opacity: 0.06;
}

.page {
  position: absolute;
  width: 50%;
  height: 100%;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.page--left {
  left: 0;
  border-radius: 2px 0 0 2px;
}

.page--right {
  right: 0;
  border-radius: 0 2px 2px 0;
}

.page--flip {
  right: 0;
  transform-origin: left center;
  animation: flip 4s ease-in-out infinite;
  backface-visibility: hidden;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

.page__content {
  padding: 20px;
}

.line {
  height: 2px;
  background: rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
  border-radius: 1px;
}

@keyframes flip {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(-180deg); }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BookBackground.vue
git commit -m "feat: add book page flipping background animation"
```

---

### Task 6: 首页 (Home)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 创建首页**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import NavBar from '../components/NavBar.vue';
import BookBackground from '../components/BookBackground.vue';
---

<BaseLayout title="首页">
  <NavBar client:load />
  <BookBackground client:load />
  <main class="home">
    <div class="home__content">
      <p class="home__label">Personal Blog</p>
      <h1 class="home__title">你的名字</h1>
      <p class="home__subtitle">Code · Design · Life</p>
      <div class="home__divider">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </main>
</BaseLayout>

<style>
  .home {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .home__content {
    text-align: center;
    z-index: 1;
    position: relative;
  }

  .home__label {
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }

  .home__title {
    font-size: 42px;
    font-weight: 300;
    letter-spacing: 4px;
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  .home__subtitle {
    font-family: var(--font-sans);
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--text-secondary);
    margin-bottom: 32px;
  }

  .home__divider {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .home__divider span {
    width: 24px;
    height: 1px;
    background: var(--text-secondary);
    opacity: 0.3;
  }
</style>
```

- [ ] **Step 2: 验证首页**

Run: `npm run dev`
Expected: 全屏居中英雄区，背景有书页翻动，右上角有导航

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add homepage with hero section and book background"
```

---

### Task 7: 标签筛选组件 (TagFilter)

**Files:**
- Create: `src/components/TagFilter.vue`

- [ ] **Step 1: 创建 TagFilter.vue**

```vue
<template>
  <div class="tag-filter">
    <button
      v-for="tag in tags"
      :key="tag"
      class="tag-filter__item"
      :class="{ active: modelValue === tag }"
      @click="$emit('update:modelValue', tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tags: { type: Array, required: true },
  modelValue: { type: String, default: '全部' }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.tag-filter {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
}

.tag-filter__item {
  font-family: var(--font-sans);
  font-size: 12px;
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.tag-filter__item:hover {
  border-color: var(--text-secondary);
}

.tag-filter__item.active {
  background: var(--text-primary);
  color: var(--bg);
  border-color: var(--text-primary);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TagFilter.vue
git commit -m "feat: add TagFilter component"
```

---

### Task 8: 文章卡片组件 (ArticleCard)

**Files:**
- Create: `src/components/ArticleCard.astro`

- [ ] **Step 1: 创建 ArticleCard.astro**

```astro
---
interface Props {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readingTime: string;
}

const { slug, title, date, tag, excerpt, readingTime } = Astro.props;
---

<a href={`/article/${slug}`} class="article-card">
  <div class="article-card__meta">
    <span class="article-card__date">{date}</span>
    <span class="article-card__dot">·</span>
    <span class="article-card__tag">{tag}</span>
    <span class="article-card__dot">·</span>
    <span class="article-card__reading">{readingTime}</span>
  </div>
  <h3 class="article-card__title">{title}</h3>
  <p class="article-card__excerpt">{excerpt}</p>
  <span class="article-card__more">阅读全文 →</span>
</a>

<style>
  .article-card {
    display: block;
    padding: 24px 0;
    border-bottom: 1px solid var(--border);
    transition: opacity 0.3s ease;
  }

  .article-card:hover {
    opacity: 0.7;
  }

  .article-card__meta {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .article-card__dot {
    opacity: 0.4;
  }

  .article-card__title {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .article-card__excerpt {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 12px;
  }

  .article-card__more {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ArticleCard.astro
git commit -m "feat: add ArticleCard component"
```

---

### Task 9: 文章列表页 (Articles)

**Files:**
- Create: `src/pages/articles.astro`

- [ ] **Step 1: 创建文章列表页**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import NavBar from '../components/NavBar.vue';
import TagFilter from '../components/TagFilter.vue';
import ArticleCard from '../components/ArticleCard.astro';
import { getCollection } from 'astro:content';

const articles = (await getCollection('articles'))
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
---

<BaseLayout title="文章">
  <NavBar client:load />
  <main class="articles">
    <div class="articles__container">
      <h1 class="page-title">文章</h1>
      <TagFilter client:load tags={['全部', '技术', '随笔', '设计']} modelValue="全部" />
      <div class="articles__list">
        {articles.map(article => (
          <ArticleCard
            slug={article.slug}
            title={article.data.title}
            date={article.data.date}
            tag={article.data.tag}
            excerpt={article.data.excerpt}
            readingTime={article.data.readingTime}
          />
        ))}
      </div>
    </div>
  </main>
</BaseLayout>

<style>
  .articles {
    padding: 120px 20px 80px;
  }

  .articles__container {
    max-width: 640px;
    margin: 0 auto;
  }

  .articles__list {
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

- [ ] **Step 2: 验证文章列表**

Run: `npm run dev`
Expected: /articles 显示文章列表

- [ ] **Step 3: Commit**

```bash
git add src/pages/articles.astro
git commit -m "feat: add articles page with content collections"
```

---

### Task 10: 文章详情页 (ArticleDetail)

**Files:**
- Create: `src/pages/article/[slug].astro`

- [ ] **Step 1: 创建文章详情页**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import NavBar from '../../components/NavBar.vue';
import { getCollection } from 'astro:content';
import '../../assets/styles/markdown.css';

export async function getStaticPaths() {
  const articles = await getCollection('articles');
  return articles.map(article => ({
    params: { slug: article.slug },
    props: { article },
  }));
}

const { article } = Astro.props;
const { Content } = await article.render();

const articles = await getCollection('articles');
const sorted = articles.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
const currentIndex = sorted.findIndex(a => a.slug === article.slug);
const prevArticle = currentIndex > 0 ? sorted[currentIndex - 1] : null;
const nextArticle = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
---

<BaseLayout title={article.data.title}>
  <NavBar client:load />
  <main class="article-detail">
    <div class="article-detail__container">
      <div class="article-detail__meta">
        <span>{article.data.date}</span>
        <span class="dot">·</span>
        <span>{article.data.tag}</span>
        <span class="dot">·</span>
        <span>{article.data.readingTime}</span>
      </div>
      <h1 class="article-detail__title">{article.data.title}</h1>
      <div class="article-detail__content markdown-body">
        <Content />
      </div>
      <div class="article-detail__nav">
        {prevArticle && (
          <a href={`/article/${prevArticle.slug}`} class="nav-link">
            ← {prevArticle.data.title}
          </a>
        )}
        {nextArticle && (
          <a href={`/article/${nextArticle.slug}`} class="nav-link">
            {nextArticle.data.title} →
          </a>
        )}
      </div>
    </div>
  </main>
</BaseLayout>

<style>
  .article-detail {
    padding: 120px 20px 80px;
  }

  .article-detail__container {
    max-width: 720px;
    margin: 0 auto;
  }

  .article-detail__meta {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 16px;
    display: flex;
    gap: 6px;
  }

  .dot { opacity: 0.4; }

  .article-detail__title {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 1px;
    margin-bottom: 40px;
    line-height: 1.4;
  }

  .article-detail__nav {
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
  }

  .nav-link {
    font-family: var(--font-sans);
    font-size: 13px;
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: var(--text-primary);
  }
</style>
```

- [ ] **Step 2: 验证文章详情**

Run: `npm run dev`
Expected: /article/hello-world 显示文章内容

- [ ] **Step 3: Commit**

```bash
git add src/pages/article/
git commit -m "feat: add article detail page with markdown rendering"
```

---

### Task 11: 作品卡片组件 (WorkCard)

**Files:**
- Create: `src/components/WorkCard.astro`

- [ ] **Step 1: 创建 WorkCard.astro**

```astro
---
interface Props {
  title: string;
  description: string;
  tags: string[];
  cover?: string;
  demo?: string;
  github?: string;
}

const { title, description, tags, cover, demo, github } = Astro.props;
---

<div class="work-card">
  <div class="work-card__cover" style={cover ? `background: ${cover}` : ''}>
    <span class="work-card__placeholder">{title.charAt(0)}</span>
  </div>
  <div class="work-card__body">
    <h3 class="work-card__title">{title}</h3>
    <p class="work-card__desc">{description}</p>
    <div class="work-card__tags">
      {tags.map(tag => (
        <span class="work-card__tag">{tag}</span>
      ))}
    </div>
    <div class="work-card__links">
      {demo && <a href={demo} target="_blank" class="work-card__link">在线预览</a>}
      {github && <a href={github} target="_blank" class="work-card__link">GitHub</a>}
    </div>
  </div>
</div>

<style>
  .work-card {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .work-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  .work-card__cover {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.06));
  }

  .work-card__placeholder {
    font-size: 32px;
    color: var(--text-secondary);
    opacity: 0.3;
  }

  .work-card__body {
    padding: 20px;
  }

  .work-card__title {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  .work-card__desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .work-card__tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  .work-card__tag {
    font-family: var(--font-sans);
    font-size: 11px;
    padding: 2px 8px;
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-secondary);
  }

  .work-card__links {
    display: flex;
    gap: 12px;
  }

  .work-card__link {
    font-family: var(--font-sans);
    font-size: 12px;
    color: var(--text-secondary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .work-card__link:hover {
    color: var(--text-primary);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WorkCard.astro
git commit -m "feat: add WorkCard component"
```

---

### Task 12: 作品集页面 (Works)

**Files:**
- Create: `src/pages/works.astro`

- [ ] **Step 1: 创建作品集页面**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import NavBar from '../components/NavBar.vue';
import WorkCard from '../components/WorkCard.astro';

const works = [
  {
    title: '个人博客',
    description: '这个极简文艺风格的博客，使用 Astro + Vue 构建',
    tags: ['Astro', 'Vue', 'CSS'],
    cover: 'linear-gradient(135deg, #e8e6e3, #d4d4d4)',
    demo: '#',
    github: '#'
  },
  {
    title: '天气应用',
    description: '简洁的天气查询应用，支持城市搜索和未来预报',
    tags: ['JavaScript', 'API'],
    cover: 'linear-gradient(135deg, #d4d4e8, #c4c4d8)',
    demo: '#',
    github: '#'
  },
  {
    title: '待办清单',
    description: '极简风格的待办事项管理工具',
    tags: ['Vue', 'LocalStorage'],
    cover: 'linear-gradient(135deg, #e3e8e6, #d4d8d4)',
    github: '#'
  },
  {
    title: 'Markdown 编辑器',
    description: '支持实时预览的在线 Markdown 编辑器',
    tags: ['Vue', 'Marked'],
    cover: 'linear-gradient(135deg, #e6e3e8, #d8d4d8)',
    demo: '#'
  }
];
---

<BaseLayout title="作品">
  <NavBar client:load />
  <main class="works">
    <div class="works__container">
      <h1 class="page-title">作品</h1>
      <div class="works__grid">
        {works.map(work => (
          <WorkCard {...work} />
        ))}
      </div>
    </div>
  </main>
</BaseLayout>

<style>
  .works {
    padding: 120px 20px 80px;
  }

  .works__container {
    max-width: 720px;
    margin: 0 auto;
  }

  .works__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .works__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/works.astro
git commit -m "feat: add works page with grid layout"
```

---

### Task 13: 时间轴组件 (Timeline)

**Files:**
- Create: `src/components/Timeline.astro`

- [ ] **Step 1: 创建 Timeline.astro**

```astro
---
interface Props {
  items: Array<{
    date: string;
    title: string;
    description: string;
  }>;
}

const { items } = Astro.props;
---

<div class="timeline">
  {items.map((item) => (
    <div class="timeline__item">
      <div class="timeline__dot"></div>
      <div class="timeline__content">
        <span class="timeline__date">{item.date}</span>
        <h4 class="timeline__title">{item.title}</h4>
        <p class="timeline__desc">{item.description}</p>
      </div>
    </div>
  ))}
</div>

<style>
  .timeline {
    position: relative;
    padding-left: 24px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: var(--border);
  }

  .timeline__item {
    position: relative;
    padding-bottom: 28px;
  }

  .timeline__item:last-child {
    padding-bottom: 0;
  }

  .timeline__dot {
    position: absolute;
    left: -24px;
    top: 6px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1px solid var(--text-secondary);
    background: var(--bg);
  }

  .timeline__date {
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
  }

  .timeline__title {
    font-size: 15px;
    font-weight: 400;
    margin: 4px 0 6px;
  }

  .timeline__desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Timeline.astro
git commit -m "feat: add Timeline component"
```

---

### Task 14: 关于页面 (About)

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: 创建关于页面**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import NavBar from '../components/NavBar.vue';
import Timeline from '../components/Timeline.astro';

const skills = ['Vue', 'JavaScript', 'CSS', 'Node.js', 'Figma', 'Photography'];

const timeline = [
  { date: '2026', title: '开始写博客', description: '用文字记录技术与生活' },
  { date: '2024', title: '加入某公司', description: '担任前端开发工程师' },
  { date: '2022', title: '计算机科学学位', description: '某大学' }
];
---

<BaseLayout title="关于">
  <NavBar client:load />
  <main class="about">
    <div class="about__container">
      <div class="about__header">
        <div class="about__avatar">
          <span>W</span>
        </div>
        <h1 class="about__name">你的名字</h1>
        <p class="about__tagline">开发者 · 设计爱好者 · 终身学习者</p>
      </div>

      <div class="about__section">
        <h2 class="about__section-title">关于我</h2>
        <p class="about__text">
          一个对技术和设计充满热情的开发者。喜欢用代码创造美好的事物，
          在技术与艺术的交汇处寻找灵感。
        </p>
        <p class="about__text">
          这个博客记录我在编程、设计和生活中的思考与探索。
          希望这些文字能给你带来一些启发。
        </p>
      </div>

      <div class="about__section">
        <h2 class="about__section-title">技能</h2>
        <div class="about__tags">
          {skills.map(skill => (
            <span class="about__skill">{skill}</span>
          ))}
        </div>
      </div>

      <div class="about__section">
        <h2 class="about__section-title">经历</h2>
        <Timeline items={timeline} />
      </div>

      <div class="about__section">
        <h2 class="about__section-title">联系</h2>
        <div class="about__links">
          <a href="#" class="about__link">GitHub</a>
          <a href="#" class="about__link">Twitter</a>
          <a href="#" class="about__link">Email</a>
        </div>
      </div>
    </div>
  </main>
</BaseLayout>

<style>
  .about {
    padding: 120px 20px 80px;
  }

  .about__container {
    max-width: 560px;
    margin: 0 auto;
  }

  .about__header {
    text-align: center;
    margin-bottom: 48px;
  }

  .about__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 28px;
    color: var(--text-secondary);
    filter: grayscale(1);
  }

  .about__name {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }

  .about__tagline {
    font-family: var(--font-sans);
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 1px;
  }

  .about__section {
    margin-bottom: 40px;
  }

  .about__section-title {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }

  .about__text {
    font-size: 15px;
    line-height: 2;
    margin-bottom: 12px;
  }

  .about__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .about__skill {
    font-family: var(--font-sans);
    font-size: 12px;
    padding: 4px 12px;
    border: 1px solid var(--border);
    border-radius: 14px;
    color: var(--text-secondary);
  }

  .about__links {
    display: flex;
    gap: 20px;
  }

  .about__link {
    font-family: var(--font-sans);
    font-size: 13px;
    color: var(--text-secondary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .about__link:hover {
    color: var(--text-primary);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page with timeline and skills"
```

---

### Task 15: 最终验证与构建

**Files:** None (verification only)

- [ ] **Step 1: 验证所有页面**

Run: `npm run dev`
Test each route:
- `/` — 首页英雄区 + 书页背景
- `/articles` — 文章列表
- `/article/hello-world` — 文章详情
- `/works` — 作品网格
- `/about` — 关于页面

- [ ] **Step 2: 验证响应式**

调整浏览器窗口宽度，确认移动端导航和布局正常

- [ ] **Step 3: 构建生产版本**

Run: `npm run build`
Expected: 构建成功，dist 目录生成

- [ ] **Step 4: Final Commit**

```bash
git add -A
git commit -m "feat: complete personal blog with Astro + Vue"
```

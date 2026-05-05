---
title: Vue 3 实用技巧
date: "2026-04-28"
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

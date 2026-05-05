---
title: Vue 3 Composition API 实战心得
date: "2026-05-04"
tag: 技术
excerpt: 从 Options API 到 Composition API，代码组织方式的蜕变。
readingTime: 5 分钟
---

## 前言

Vue 3 的 Composition API 不仅仅是语法上的变化，更是思维方式的转变。

## 核心优势

### 逻辑复用

相比 Mixins，Composition API 提供了更清晰的逻辑复用方式：

```js
// useCounter.js
import { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}
```

### 代码组织

相关的逻辑可以放在一起，而不是分散在 data、methods、computed 中：

```js
// 用户相关的逻辑
const user = ref(null)
const isLoading = ref(false)

const fetchUser = async () => {
  isLoading.value = true
  user.value = await api.getUser()
  isLoading.value = false
}
```

## 实践建议

1. **小功能用 ref，复杂对象用 reactive**
2. **组合函数以 use 开头**
3. **不要过度抽象**

## 结语

Composition API 让 Vue 的代码更加灵活和可维护。拥抱变化，才能走得更远。

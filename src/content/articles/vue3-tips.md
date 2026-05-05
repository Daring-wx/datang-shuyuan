---
title: Vue 3 开发小技巧
date: "2026-05-03"
tag: 技术
excerpt: 整理一些 Vue 3 开发中的实用技巧和最佳实践。
readingTime: 5 分钟
---

## 响应式数据

### ref vs reactive

```js
import { ref, reactive } from 'vue'

// 简单类型用 ref
const count = ref(0)
console.log(count.value) // 访问需要 .value

// 复杂对象用 reactive
const state = reactive({ name: '大唐', age: 1 })
console.log(state.name) // 直接访问
```

### computed 的缓存

```js
const firstName = ref('张')
const lastName = ref('三')

// 只有依赖变化时才重新计算
const fullName = computed(() => `${firstName.value}${lastName.value}`)
```

## 组件通信

### Props 定义

```js
defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 }
})
```

### 事件发射

```js
const emit = defineEmits(['update', 'delete'])

const handleClick = () => {
  emit('update', newValue)
}
```

## 生命周期

```js
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
  // 可以访问 DOM
})

onUnmounted(() => {
  console.log('组件已卸载')
  // 清理定时器、事件监听等
})
```

## 实用技巧

1. **v-memo**：缓存复杂列表渲染
2. **shallowRef**：大型对象性能优化
3. **toRef**：保持响应式引用

## 结语

Vue 3 的 Composition API 让代码更灵活，善用这些技巧，能让你的开发更高效。

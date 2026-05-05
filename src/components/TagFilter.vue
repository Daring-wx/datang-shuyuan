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

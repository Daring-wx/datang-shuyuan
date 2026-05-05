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

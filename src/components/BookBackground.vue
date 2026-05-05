<template>
  <div class="book-bg" :class="'book-bg--theme' + bgTheme">
    <!-- 背景纹理 -->
    <div class="bg-texture"></div>

    <!-- 光晕 -->
    <div class="glow glow--1" :style="{ transform: `translate(${mouseX * 20}px, ${mouseY * 15}px)` }"></div>
    <div class="glow glow--2" :style="{ transform: `translate(${mouseX * -15}px, ${mouseY * -10}px)` }"></div>

    <!-- 浮动粒子 -->
    <div class="particles">
      <div
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="{
          left: p.x + '%',
          top: p.y + '%',
          animationDuration: p.duration + 's',
          animationDelay: p.delay + 's',
          width: p.size + 'px',
          height: p.size + 'px'
        }"
      ></div>
    </div>

    <!-- 主书本 -->
    <div class="book book--main" ref="bookRef" :style="bookStyle">
      <div class="page page--left">
        <div class="page__texture"></div>
        <div class="page__content">
          <div class="line" v-for="i in 9" :key="'ml'+i" :style="{ width: mainWidths[i-1] }"></div>
        </div>
        <div class="page__fold"></div>
      </div>
      <div class="page page--right">
        <div class="page__texture"></div>
        <div class="page__content">
          <div class="line" v-for="i in 9" :key="'mr'+i" :style="{ width: mainWidths[i+8] }"></div>
        </div>
      </div>
      <div class="page page--flip">
        <div class="page__texture"></div>
        <div class="page__content">
          <div class="line" v-for="i in 9" :key="'mf'+i" :style="{ width: mainWidths[i+17] }"></div>
        </div>
        <div class="page__curl"></div>
      </div>
      <div class="book__spine"></div>
      <div class="book__shadow"></div>
    </div>

    <!-- 副书本 -->
    <div class="book book--secondary" :style="{ transform: `rotate(-8deg) translate(${mouseX * -8}px, ${mouseY * -5}px)` }">
      <div class="page page--left"></div>
      <div class="page page--right"></div>
      <div class="page page--flip page--flip-slow"></div>
    </div>

    <!-- 浮动文字碎片 -->
    <div class="floating-text">
      <span v-for="t in textFragments" :key="t.id" class="text-fragment" :style="{
        left: t.x + '%',
        top: t.y + '%',
        animationDuration: t.duration + 's',
        animationDelay: t.delay + 's',
        fontSize: t.size + 'px'
      }">{{ t.char }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const bookRef = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const bgTheme = ref(0)
let bgTimer = null

const bookStyle = computed(() => ({
  transform: `translate(${mouseX.value * 15}px, ${mouseY.value * 10}px)`
}))

const handleMouseMove = (e) => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  mouseX.value = (e.clientX - centerX) / centerX
  mouseY.value = (e.clientY - centerY) / centerY
}

// 每10秒切换背景（配合书本翻页），4种主题循环
const cycleBg = () => {
  bgTheme.value = (bgTheme.value + 1) % 4
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  bgTimer = setInterval(cycleBg, 10000)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearInterval(bgTimer)
})

const mainWidths = Array.from({ length: 27 }, () => `${35 + Math.random() * 55}%`)
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 3,
  duration: 8 + Math.random() * 12,
  delay: Math.random() * 5
}))

const textFragments = Array.from({ length: 12 }, (_, i) => {
  const chars = '诗书文墨韵雅言辞章句读山水云风月'
  return {
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    char: chars[Math.floor(Math.random() * chars.length)],
    size: 12 + Math.random() * 18,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 6
  }
})
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
  overflow: hidden;
  transition: background 2s ease-in-out;
}

/* 主题0：深灰黑（冷调） */
.book-bg--theme0 {
  background: linear-gradient(135deg, #1a1a1e 0%, #1e1e24 50%, #1a1a20 100%);
}

/* 主题1：深蓝黑（夜空） */
.book-bg--theme1 {
  background: linear-gradient(135deg, #181a20 0%, #1a1e28 50%, #16181e 100%);
}

/* 主题2：深紫灰（暮色） */
.book-bg--theme2 {
  background: linear-gradient(135deg, #1c1a20 0%, #1e1c22 50%, #1a181e 100%);
}

/* 主题3：深青灰（山岚） */
.book-bg--theme3 {
  background: linear-gradient(135deg, #1a1e1e 0%, #1c2020 50%, #181c1c 100%);
}

/* 纸张纹理 */
.bg-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

/* ========== 光晕 ========== */
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: glowPulse 8s ease-in-out infinite;
  transition: transform 0.5s ease-out, background 2s ease-in-out;
}

.glow--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(150, 150, 180, 0.7), transparent 70%);
  top: 20%;
  left: 30%;
}

.book-bg--theme1 .glow--1 {
  background: radial-gradient(circle, rgba(100, 130, 180, 0.6), transparent 70%);
}

.book-bg--theme2 .glow--1 {
  background: radial-gradient(circle, rgba(160, 140, 180, 0.5), transparent 70%);
}

.book-bg--theme3 .glow--1 {
  background: radial-gradient(circle, rgba(140, 170, 170, 0.5), transparent 70%);
}

.glow--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(180, 170, 150, 0.6), transparent 70%);
  bottom: 20%;
  right: 25%;
  animation-delay: -4s;
}

.book-bg--theme1 .glow--2 {
  background: radial-gradient(circle, rgba(120, 150, 200, 0.5), transparent 70%);
}

.book-bg--theme2 .glow--2 {
  background: radial-gradient(circle, rgba(180, 150, 200, 0.4), transparent 70%);
}

.book-bg--theme3 .glow--2 {
  background: radial-gradient(circle, rgba(150, 180, 180, 0.4), transparent 70%);
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.12; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.1); }
}

/* ========== 浮动粒子 ========== */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: rgba(180, 180, 200, 0.35);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

.book-bg--theme1 .particle {
  background: rgba(140, 160, 200, 0.3);
}

.book-bg--theme2 .particle {
  background: rgba(180, 160, 200, 0.3);
}

.book-bg--theme3 .particle {
  background: rgba(160, 190, 190, 0.3);
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% {
    transform: translateY(-100px) translateX(30px) scale(0.5);
    opacity: 0;
  }
}

/* ========== 主书本 ========== */
.book--main {
  width: 700px;
  height: 500px;
  position: relative;
  perspective: 1800px;
  opacity: 0.5;
  transition: transform 0.3s ease-out;
}

.book--secondary {
  width: 280px;
  height: 200px;
  position: absolute;
  perspective: 1500px;
  opacity: 0.2;
  top: 15%;
  right: 12%;
  transition: transform 0.3s ease-out;
}

/* ========== 书页 ========== */
.page {
  position: absolute;
  width: 50%;
  height: 100%;
  background: linear-gradient(145deg, #e8e8e8 0%, #e0e0e0 50%, #d8d8d8 100%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.book-bg--theme1 .page {
  background: linear-gradient(145deg, #e0e2e8 0%, #d8dae2 50%, #d0d4dc 100%);
}

.book-bg--theme2 .page {
  background: linear-gradient(145deg, #e4e0e8 0%, #dcd8e2 50%, #d4d0dc 100%);
}

.book-bg--theme3 .page {
  background: linear-gradient(145deg, #e0e4e4 0%, #d8dede 50%, #d0d8d8 100%);
}

.page__texture {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.01) 3px,
    rgba(0, 0, 0, 0.01) 4px
  );
  pointer-events: none;
}

.page--left {
  left: 0;
  border-radius: 4px 0 0 4px;
  box-shadow: inset -8px 0 20px rgba(0, 0, 0, 0.06);
}

.page--right {
  right: 0;
  border-radius: 0 4px 4px 0;
}

.page--flip {
  right: 0;
  transform-origin: left center;
  animation: flip 10s ease-in-out infinite;
  backface-visibility: hidden;
  box-shadow: -8px 0 25px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.page--flip-slow {
  animation: flipSlow 14s ease-in-out infinite !important;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.12);
}

.page__fold {
  position: absolute;
  right: 0;
  top: 10%;
  bottom: 10%;
  width: 15px;
  background: linear-gradient(to left, rgba(0,0,0,0.04), transparent);
}

.page__curl {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%);
  border-radius: 0 0 4px 0;
}

.book__spine {
  position: absolute;
  left: 50%;
  top: 3%;
  bottom: 3%;
  width: 3px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.12) 15%,
    rgba(0, 0, 0, 0.18) 50%,
    rgba(0, 0, 0, 0.12) 85%,
    transparent
  );
  transform: translateX(-50%);
  z-index: 5;
  border-radius: 1px;
}

.book__shadow {
  position: absolute;
  bottom: -20px;
  left: 10%;
  right: 10%;
  height: 30px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.1), transparent 70%);
  filter: blur(8px);
}

.page__content {
  padding: 20px 18px;
}

.line {
  height: 2px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.25) 80%, transparent);
  margin-bottom: 12px;
  border-radius: 1px;
  animation: linePulse 6s ease-in-out infinite;
}

.line:nth-child(odd) { animation-delay: -2s; }
.line:nth-child(3n) { height: 1.5px; opacity: 0.7; }

/* ========== 浮动文字 ========== */
.floating-text {
  position: absolute;
  width: 100%;
  height: 100%;
}

.text-fragment {
  position: absolute;
  font-family: var(--font-serif);
  color: rgba(180, 180, 200, 0.18);
  animation: textFloat 12s ease-in-out infinite;
  user-select: none;
}

.book-bg--theme1 .text-fragment {
  color: rgba(140, 160, 200, 0.15);
}

.book-bg--theme2 .text-fragment {
  color: rgba(180, 160, 200, 0.15);
}

.book-bg--theme3 .text-fragment {
  color: rgba(160, 190, 190, 0.15);
}

@keyframes textFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
  50% { transform: translateY(-20px) rotate(5deg); opacity: 0.25; }
}

/* ========== 动画 ========== */
@keyframes flip {
  0%, 100% {
    transform: rotateY(0deg);
    box-shadow: -8px 0 25px rgba(0, 0, 0, 0.15);
  }
  50% {
    transform: rotateY(-175deg);
    box-shadow: 8px 0 25px rgba(0, 0, 0, 0.1);
  }
}

@keyframes flipSlow {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(-170deg); }
}

@keyframes linePulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.5; }
}
</style>

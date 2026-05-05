<template>
  <div class="weather">
    <!-- 雨滴 -->
    <div class="rain" v-if="weather === 'rain'">
      <div
        v-for="drop in rainDrops"
        :key="drop.id"
        class="raindrop"
        :style="{
          left: drop.x + '%',
          animationDuration: drop.duration + 's',
          animationDelay: drop.delay + 's',
          opacity: drop.opacity
        }"
      ></div>
    </div>

    <!-- 雪花 -->
    <div class="snow" v-if="weather === 'snow'">
      <div
        v-for="flake in snowFlakes"
        :key="flake.id"
        class="snowflake"
        :style="{
          left: flake.x + '%',
          animationDuration: flake.duration + 's',
          animationDelay: flake.delay + 's',
          fontSize: flake.size + 'px',
          opacity: flake.opacity
        }"
      >❄</div>
    </div>

    <!-- 花瓣 -->
    <div class="petals" v-if="weather === 'petal'">
      <div
        v-for="petal in petals"
        :key="petal.id"
        class="petal"
        :style="{
          left: petal.x + '%',
          animationDuration: petal.duration + 's',
          animationDelay: petal.delay + 's',
          opacity: petal.opacity
        }"
      >
        <svg width="20" height="24" viewBox="0 0 20 24">
          <path :d="petal.shape" :fill="petal.color" />
        </svg>
      </div>
    </div>

    <!-- 树叶 -->
    <div class="leaves" v-if="weather === 'leaf'">
      <div
        v-for="leaf in leaves"
        :key="leaf.id"
        class="leaf"
        :style="{
          left: leaf.x + '%',
          animationDuration: leaf.duration + 's',
          animationDelay: leaf.delay + 's',
          opacity: leaf.opacity
        }"
      >
        <svg :width="leaf.size" :height="leaf.size * 1.3" viewBox="0 0 30 40">
          <path :d="leaf.shape" :fill="leaf.color" />
          <path :d="leaf.vein" stroke="rgba(0,0,0,0.12)" stroke-width="0.5" fill="none"/>
        </svg>
      </div>
    </div>

    <!-- 天气切换按钮 -->
    <div class="weather-toggle">
      <button
        v-for="w in weathers"
        :key="w.id"
        class="weather-btn"
        :class="{ active: weather === w.id }"
        @click="switchWeather(w.id)"
        :title="w.name"
      >{{ w.icon }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const weathers = [
  { id: 'rain', name: '雨', icon: '雨' },
  { id: 'snow', name: '雪', icon: '雪' },
  { id: 'petal', name: '花瓣', icon: '花' },
  { id: 'leaf', name: '树叶', icon: '叶' },
]

const weather = ref('rain')
const currentIndex = ref(0)
let autoTimer = null

const switchWeather = (id) => {
  weather.value = id
  currentIndex.value = weathers.findIndex(w => w.id === id)
  startTimer()
}

const startTimer = () => {
  clearInterval(autoTimer)
  autoTimer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % weathers.length
    weather.value = weathers[currentIndex.value].id
  }, 10000)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(autoTimer)
})

const rainDrops = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  duration: 0.6 + Math.random() * 0.4,
  delay: Math.random() * 2,
  opacity: 0.3 + Math.random() * 0.3
}))

const snowFlakes = Array.from({ length: 50 }, (_, i) => {
  const chars = '❄❅❆✦✧'
  return {
    id: i,
    x: Math.random() * 100,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
    size: 12 + Math.random() * 18,
    opacity: 0.4 + Math.random() * 0.3,
    char: chars[Math.floor(Math.random() * chars.length)]
  }
})

const petalShapes = [
  'M10 0C10 0 20 8 18 16C16 24 10 24 10 24C10 24 4 24 2 16C0 8 10 0 10 0Z',
  'M10 0C10 0 22 6 20 14C18 22 10 24 10 24C10 24 2 22 0 14C-2 6 10 0 10 0Z',
  'M10 0C10 0 18 10 16 18C14 26 10 24 10 24C10 24 6 26 4 18C2 10 10 0 10 0Z',
]

const petalColors = ['#FFB7C5', '#FFC0CB', '#FFD1DC', '#F8BBD0', '#FCE4EC']

const petals = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 6,
  opacity: 0.5 + Math.random() * 0.3,
  shape: petalShapes[Math.floor(Math.random() * petalShapes.length)],
  color: petalColors[Math.floor(Math.random() * petalColors.length)]
}))

const leafShapes = [
  'M15 0C15 0 30 12 28 24C26 36 15 40 15 40C15 40 4 36 2 24C0 12 15 0 15 0Z',
  'M15 2C15 2 28 14 26 26C24 38 15 40 15 40C15 40 6 38 4 26C2 14 15 2 15 2Z',
  'M15 0C15 0 32 10 30 22C28 34 15 40 15 40C15 40 2 34 0 22C-2 10 15 0 15 0Z',
]

const leafVeins = [
  'M15 4L15 36M8 14L15 18M22 14L15 18M6 22L15 26M24 22L15 26',
  'M15 6L15 38M10 16L15 20M20 16L15 20M8 24L15 28M22 24L15 28',
  'M15 4L15 36M6 12L15 16M24 12L15 16M4 20L15 24M26 20L15 24',
]

const leafColors = ['#8B7355', '#9B8B6B', '#A08060', '#7B8B5B', '#B8956B', '#8B6B5B']

const leaves = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  duration: 6 + Math.random() * 6,
  delay: Math.random() * 6,
  size: 16 + Math.random() * 10,
  opacity: 0.5 + Math.random() * 0.3,
  shape: leafShapes[Math.floor(Math.random() * leafShapes.length)],
  vein: leafVeins[Math.floor(Math.random() * leafVeins.length)],
  color: leafColors[Math.floor(Math.random() * leafColors.length)]
}))
</script>

<style scoped>
.weather {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

/* ========== 雨 ========== */
.raindrop {
  position: absolute;
  top: -20px;
  width: 1.5px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, rgba(100, 120, 150, 0.7));
  animation: rainFall linear infinite;
}

@keyframes rainFall {
  0% { transform: translateY(-20px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

/* ========== 雪 ========== */
.snowflake {
  position: absolute;
  top: -30px;
  color: rgba(150, 160, 180, 0.8);
  animation: snowFall linear infinite;
  filter: blur(0.3px);
}

@keyframes snowFall {
  0% {
    transform: translateY(-30px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% {
    transform: translateY(100vh) translateX(50px) rotate(360deg);
    opacity: 0;
  }
}

/* ========== 花瓣 ========== */
.petal {
  position: absolute;
  top: -30px;
  animation: petalFall linear infinite;
}

@keyframes petalFall {
  0% { transform: translateY(-30px) translateX(0) rotate(0deg) scale(1); opacity: 0; }
  10% { opacity: 1; }
  25% { transform: translateY(25vh) translateX(70px) rotate(90deg) scale(0.95); }
  50% { transform: translateY(50vh) translateX(-50px) rotate(180deg) scale(0.9); }
  75% { transform: translateY(75vh) translateX(60px) rotate(270deg) scale(0.85); }
  90% { opacity: 1; }
  100% { transform: translateY(100vh) translateX(30px) rotate(360deg) scale(0.8); opacity: 0; }
}

/* ========== 树叶 ========== */
.leaf {
  position: absolute;
  top: -40px;
  animation: leafFall linear infinite;
}

@keyframes leafFall {
  0% { transform: translateY(-40px) translateX(0) rotate(0deg) scale(1); opacity: 0; }
  10% { opacity: 1; }
  20% { transform: translateY(20vh) translateX(50px) rotate(60deg) scale(0.97); }
  40% { transform: translateY(40vh) translateX(-40px) rotate(140deg) scale(0.93); }
  60% { transform: translateY(60vh) translateX(60px) rotate(220deg) scale(0.9); }
  80% { transform: translateY(80vh) translateX(-30px) rotate(300deg) scale(0.87); }
  90% { opacity: 1; }
  100% { transform: translateY(100vh) translateX(20px) rotate(380deg) scale(0.83); opacity: 0; }
}

/* ========== 切换按钮 ========== */
.weather-toggle {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 100;
  pointer-events: auto;
}

.weather-btn {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: var(--text-secondary);
}

.weather-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.2);
}

.weather-btn.active {
  background: var(--text-primary);
  color: white;
  border-color: var(--text-primary);
}
</style>

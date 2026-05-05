<template>
  <nav class="navbar" :class="{ 'navbar--hidden': isHidden }">
    <div class="navbar__links">
      <a href="/datang-shuyuan" class="navbar__link" :class="{ active: currentPath === '/datang-shuyuan' || currentPath === '/datang-shuyuan/' }">首页</a>
      <a href="/datang-shuyuan/articles" class="navbar__link" :class="{ active: currentPath.startsWith('/datang-shuyuan/articles') }">文章</a>
      <a href="/datang-shuyuan/works" class="navbar__link" :class="{ active: currentPath.startsWith('/datang-shuyuan/works') }">作品</a>
      <a href="/datang-shuyuan/about" class="navbar__link" :class="{ active: currentPath.startsWith('/datang-shuyuan/about') }">关于</a>
    </div>
    <button class="navbar__menu-btn" @click="toggleMenu" :class="{ open: menuOpen }">
      <span></span>
      <span></span>
    </button>
    <div class="navbar__mobile" :class="{ open: menuOpen }">
      <a href="/datang-shuyuan" @click="closeMenu">首页</a>
      <a href="/datang-shuyuan/articles" @click="closeMenu">文章</a>
      <a href="/datang-shuyuan/works" @click="closeMenu">作品</a>
      <a href="/datang-shuyuan/about" @click="closeMenu">关于</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentPath = ref('/')
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

onMounted(() => {
  currentPath.value = window.location.pathname
  window.addEventListener('scroll', handleScroll)
})
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

<template>
  <div class="poetry-container">
    <!-- 左侧诗句 -->
    <div class="poetry-column poetry-column--left">
      <div class="poetry-track" :style="{ animationDuration: leftDuration + 's' }">
        <div v-for="(text, i) in leftPoems" :key="'l'+i" class="poetry-line">{{ text }}</div>
        <div v-for="(text, i) in leftPoems" :key="'l2'+i" class="poetry-line">{{ text }}</div>
      </div>
    </div>

    <!-- 右侧诗句 -->
    <div class="poetry-column poetry-column--right">
      <div class="poetry-track" :style="{ animationDuration: rightDuration + 's', animationDirection: 'reverse' }">
        <div v-for="(text, i) in rightPoems" :key="'r'+i" class="poetry-line">{{ text }}</div>
        <div v-for="(text, i) in rightPoems" :key="'r2'+i" class="poetry-line">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const leftPoems = [
  // 李白
  '床前明月光',
  '疑是地上霜',
  '举头望明月',
  '低头思故乡',
  '日照香炉生紫烟',
  '遥看瀑布挂前川',
  '飞流直下三千尺',
  '疑是银河落九天',
  // 杜甫
  '国破山河在',
  '城春草木深',
  '感时花溅泪',
  '恨别鸟惊心',
  '会当凌绝顶',
  '一览众山小',
  // 王维
  '空山新雨后',
  '天气晚来秋',
  '明月松间照',
  '清泉石上流',
  '独在异乡为异客',
  '每逢佳节倍思亲',
  // 白居易
  '离离原上草',
  '一岁一枯荣',
  '野火烧不尽',
  '春风吹又生',
  '日出江花红胜火',
  '春来江水绿如蓝',
]

const rightPoems = [
  // 王之涣
  '白日依山尽',
  '黄河入海流',
  '欲穷千里目',
  '更上一层楼',
  '黄河远上白云间',
  '一片孤城万仞山',
  // 孟浩然
  '春眠不觉晓',
  '处处闻啼鸟',
  '夜来风雨声',
  '花落知多少',
  '移舟泊烟渚',
  '日暮客愁新',
  // 王昌龄
  '秦时明月汉时关',
  '万里长征人未还',
  '但使龙城飞将在',
  '不教胡马度阴山',
  '寒雨连江夜入吴',
  '平明送客楚山孤',
  // 李商隐
  '相见时难别亦难',
  '东风无力百花残',
  '春蚕到死丝方尽',
  '蜡炬成灰泪始干',
  '身无彩凤双飞翼',
  '心有灵犀一点通',
  // 杜牧
  '远上寒山石径斜',
  '白云生处有人家',
  '停车坐爱枫林晚',
  '霜叶红于二月花',
  '清明时节雨纷纷',
  '路上行人欲断魂',
]

const leftDuration = 80
const rightDuration = 85
</script>

<style scoped>
.poetry-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.poetry-column {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  overflow: hidden;
}

.poetry-column--left {
  left: 60px;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.poetry-column--right {
  right: 60px;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.poetry-track {
  display: flex;
  flex-direction: column;
  animation: scrollUp linear infinite;
}

.poetry-line {
  font-family: 'Noto Serif SC', Georgia, serif;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 18px;
  letter-spacing: 6px;
  color: rgba(180, 180, 200, 0.35);
  padding: 16px 0;
  white-space: nowrap;
  line-height: 1;
}

@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@media (max-width: 1024px) {
  .poetry-column--left {
    left: 20px;
  }
  .poetry-column--right {
    right: 20px;
  }
  .poetry-line {
    font-size: 13px;
    letter-spacing: 4px;
  }
}

@media (max-width: 768px) {
  .poetry-column {
    display: none;
  }
}
</style>

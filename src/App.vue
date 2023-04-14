<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';

function onClick() {}
onMounted(() => {
  const { clientWidth, clientHeight } = document.documentElement;
  function randomX() {
    return Math.floor(Math.random() * (clientWidth - 100 - 100)) + 100;
  }
  function randomY() {
    return Math.floor(Math.random() * (clientHeight - 100 - 100)) + 100;
  }
  function start() {
    setTimeout(() => {
      gsap.to('#as', { x: randomX(), y: randomY(), duration: 1 });
      gsap.to('#ngm', { x: randomX(), y: randomY(), duration: 1 });
      start();
    }, 888);
  }
  start();

  const ngmDom = document.querySelector('#ngm');
  const audio = document.querySelector('#audio');
  const music_switch = document.querySelector('.music_switch');
  audio.muted = true;
  ngmDom.addEventListener('mouseenter', (e) => {
    audio.play();
  });
  music_switch.onclick = function () {
    if (audio.muted) {
      audio.muted = false;
      music_switch.classList.add('active');
    } else {
      audio.muted = true;
      console.log(audio.muted);
      music_switch.classList.remove('active');
    }
  };
});
</script>

<template>
  <div id="as">哎哟</div>
  <div id="ngm" @click="onClick">你干嘛</div>
  <div class="music_switch">
    <span class="s1"></span>
    <span class="s2"></span>
    <span class="s3"></span>
    <span class="s4"></span>
  </div>
  <audio id="audio" src="./a.mp3"></audio>
</template>

<style scoped>
#as {
  font-size: 50px;
  display: inline-block;
  color: #fff;
}
#ngm {
  font-size: 50px;
  display: inline-block;
  color: #fff;
}
.music_switch {
  position: fixed;
  width: 40px;
  height: 30px;
  top: 48px;
  right: 62px;
  cursor: pointer;
  z-index: 10;
}
.music_switch span {
  position: absolute;
  width: 4px;
  bottom: 0;
  background: #fff;
}
.music_switch .s1 {
  height: 11px;
  right: 0px;
}
.music_switch .s2 {
  height: 21px;
  right: 10px;
}
.music_switch .s3 {
  height: 28px;
  right: 20px;
}
.music_switch .s4 {
  height: 13px;
  right: 30px;
}
.music_switch.active .s1 {
  animation: wave 0.66s linear infinite;
  -webkit-animation: wave 0.66s linear infinite;
  -ms-animation: wave 0.66s linear infinite;
}
.music_switch.active .s2 {
  animation: wave 0.8s linear infinite;
}
.music_switch.active .s3 {
  animation: wave 0.7s linear infinite;
}
.music_switch.active .s4 {
  animation: wave 0.5s linear infinite;
}
@keyframes wave {
  0% {
    height: 10px;
  }
  50% {
    height: 28px;
  }
  100% {
    height: 10px;
  }
}
</style>

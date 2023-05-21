<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { throttle } from "./utils";
function onClick() {}

let timer;
function resize() {
  const { clientWidth, clientHeight } = document.documentElement;
  function randomX() {
    return Math.floor(Math.random() * (clientWidth - 100 - 100)) + 100;
  }
  function randomY() {
    return Math.floor(Math.random() * (clientHeight - 100 - 100)) + 100;
  }
  function start() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      gsap.to("#as", { x: randomX(), y: randomY(), duration: 1 });
      gsap.to("#ngm", { x: randomX(), y: randomY(), duration: 1 });
      start();
    }, 888);
  }
  start();
}

function bindEvent() {
  const ngmDom = document.querySelector("#ngm");
  const audio = document.querySelector("#audio");
  const music_switch = document.querySelector(".music_switch");
  audio.muted = true;
  ngmDom.addEventListener("mouseenter", (e) => {
    audio.play();
  });
  music_switch.onclick = function () {
    if (audio.muted) {
      audio.muted = false;
      music_switch.classList.add("active");
    } else {
      audio.muted = true;
      music_switch.classList.remove("active");
    }
  };
}
const _map = {
  a: "/ikun/啊.wav",
  m: "/ikun/没.wav",
  n: "/ikun/你.wav",
  t: "/ikun/太.wav",
  c: "/ikun/唱.wav",
  r: "/ikun/RAP.wav",
  g: "/ikun/干.wav",
  y: "/ikun/哟.wav",
  j: "/ikun/鸡.wav",
};
function createKeyTextDom(text) {
  const _div = document.createElement("div");
  _div.innerHTML = text;
  _div.addEventListener("animationend", () => {
    console.log("Animation ended", text);
    document.querySelector(".keyContainer").removeChild(_div);
  });
  document.querySelector(".keyContainer").appendChild(_div);
  _div.classList.add("leave");
}
onMounted(() => {
  resize();
  // bindEvent();
  window.addEventListener("resize", resize);
  let audioCount = 0;
  const handleKeydown = throttle(function (event) {
    createKeyTextDom(event.key);
    if (Object.keys(_map).includes(event.key)) {
      console.log("event.key: ", event.key);
      // 创建并播放声音
      let sound = new Audio(_map[event.key]);
      sound.play();

      function handleAudioEnded() {
        audioCount--;
        if (audioCount === 0) {
          document.querySelector(".music_switch").classList.remove("active");
        }
        audio.removeEventListener("ended", handleAudioEnded);
        audio = null;
      }
      audio.addEventListener("ended", handleAudioEnded);
      audioCount++;
      document.querySelector(".music_switch").classList.add("active");
    }
  }, 400);
  document.addEventListener("keydown", handleKeydown);
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
  <div class="keyContainer">
    <div class="leave">n</div>
  </div>
  <audio id="audio" src="./ikun/啊.wav"></audio>
</template>

<style>
@import url(./App.scss);
</style>

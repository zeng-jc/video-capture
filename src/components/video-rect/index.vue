<script setup lang="ts" name="video-rect">
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player'
import type { VideoJsPlayerOptions } from 'video.js/index'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const emits = defineEmits(['videoLoad'])
let videoPlayer: Player
const videoRef = ref<Element>()

const initVideo = () => {
  const options: VideoJsPlayerOptions = {
    language: 'zh-CN',
    controls: true,
    preload: 'auto', // 预加载
    // autoplay: true, //
    fluid: false, // 自适应宽高
    userActions: {
      doubleClick: false
    },
    inactivityTimeout: 0
  }
  if (!videoRef.value) return
  videoPlayer = videojs(videoRef.value, options, () => {
    emits('videoLoad', getVideoStyle(videoRef.value))
  })
  videoPlayer.on('loadeddata', () => {
    emits('videoLoad', getVideoStyle(videoRef.value))
  })
}

const getVideoStyle = (el: Element | undefined) => {
  if (!el) return
  const { width, height } = getComputedStyle(el)
  return {
    width,
    height
  }
}

onMounted(() => {
  initVideo()
})

onBeforeUnmount(() => {
  if (videoPlayer) videoPlayer.dispose()
})

const changeVideo = (videoURL: string, fileType: string) => {
  videoPlayer.src({ src: videoURL, type: fileType })
}

defineExpose({ changeVideo })
</script>

<template>
  <video id="my-video" ref="videoRef" class="video-js" height="750">
    <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" />
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a web browser that
    </p>
  </video>
</template>

<style lang="less" scoped>
.video-js {
  :deep(.vjs-control-bar) {
    bottom: -3em !important;
    height: 30px;
    display: flex !important;
  }
  :deep(.vjs-big-play-button) {
    display: none !important;
  }
  :deep(.controls) {
    margin: auto;
    width: fit-content;
  }
}
</style>

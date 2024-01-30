<script lang="ts" setup>
import { ref, markRaw, reactive, computed, type Raw, type Component } from 'vue'
import InteractRect from '@/components/interact-rect/index.vue'
import VideoRect from '@/components/video-rect/index.vue'
const rectContainerRef = ref<HTMLDivElement>()
interface RectInfo {
  id: number
  component: Raw<Component>
  coordinate?: object
}
const rects = reactive<RectInfo[]>([])
let increment = 0
const addEraseRect = () => {
  rects.push({ component: markRaw(InteractRect), id: increment++ })
}
const addProtectedRect = () => {}
const removeRect = (index: number) => {
  rects.splice(index, 1)
}
const coordinateRect = (index: number, coor: object) => {
  rects[index].coordinate = coor
  console.log(rects)
}
const clearRect = () => {
  rects.length = 0
}

const width = ref<string>('0px')
const height = ref<string>('0px')
const dynamicStyle = computed(() => {
  return {
    width: width.value,
    height: height.value
  }
})

/**  video  **/
const videoRectRef = ref()
const videoLoadHandler = ({ width: w, height: h }: { width: string; height: string }) => {
  console.log(w, h)

  width.value = w
  height.value = h
}
const selectVideo = (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files![0]
  const videoURL = URL.createObjectURL(file)
  videoRectRef.value.changeVideo(videoURL, file.type)
  clearRect()
}
</script>

<template>
  <div class="main">
    <button @click="addEraseRect">添加擦除rect</button>
    <!-- <button @click="addProtectedRect">添加保护rect</button> -->
    <button @click="clearRect">清空rect</button>
    <input type="file" accept="video/*" @change="selectVideo" />
    <div class="video-rect-container">
      <video-rect @videoLoad="videoLoadHandler" ref="videoRectRef"></video-rect>
      <div class="rect-container" ref="rectContainerRef" :style="dynamicStyle">
        <component
          v-for="(item, index) in rects"
          :key="item.id"
          :is="item.component"
          @remove="removeRect(index)"
          @coordinate="
            (payload: object) => {
              coordinateRect(index, payload)
            }
          "
          a="aaa"
        ></component>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.video-rect-container {
  position: relative;
  width: fit-content;
  margin: auto;
}
.rect-container {
  position: absolute;
  top: 0;
  left: 0;
  outline: 1px solid red;
  overflow: hidden;
  margin: auto;
}
</style>

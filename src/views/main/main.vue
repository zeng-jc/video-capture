<script lang="ts" setup>
import { ref, markRaw, reactive, type Raw, type Component } from 'vue'
import InteractRect from '@/components/interact-rect/index.vue'
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
  console.log(index, coor)
}
const clearRect = () => {
  rects.length = 0
}
</script>

<template>
  <div class="main">
    <h2>main</h2>
    <button @click="addEraseRect">添加擦除rect</button>
    <button @click="addProtectedRect">添加保护rect</button>
    <button @click="clearRect">清空rect</button>
    <div class="rect-container" ref="rectContainerRef">
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
</template>

<style lang="less" scoped>
.rect-container {
  width: 450px;
  height: 850px;
  outline: 1px solid red;
  overflow: hidden;
  margin: auto;
}
</style>

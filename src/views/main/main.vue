<script lang="ts" setup>
import { ref, markRaw, reactive, type Raw, type Component } from 'vue'
import InteractRect from '@/components/interact-rect/index.vue'
const rectContainerRef = ref<HTMLDivElement>()
interface RectInfo {
  id: number
  component: Raw<Component>
}
const rects = reactive<RectInfo[]>([])
let increment = 0
const addRect = () => {
  rects.push({ component: markRaw(InteractRect), id: increment++ })
}
const removeRect = (index: number) => {
  rects.splice(index, 1)
}
const coordinateRect = (coor: object) => {
  console.log(coor)
}
</script>

<template>
  <div class="main">
    <h2>main</h2>
    <button @click="addRect">添加rect</button>
    <div class="rect-container" ref="rectContainerRef">
      <component
        v-for="(item, index) in rects"
        :key="item.id"
        :is="item.component"
        @remove="removeRect(index)"
        @coordinate="coordinateRect"
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

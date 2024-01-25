<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCoordinate, getTranslate } from './index'
import interact from 'interactjs'
import type { InteractEvent, ResizeEvent } from '@interactjs/types/index'
const rectParent = ref()
const rect = ref<HTMLDivElement>()
const removeRect = () => {
  rect.value?.remove()
}

onMounted(() => {
  interact('.rect')
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event: ResizeEvent) {
          let target = event.target
          let x = parseFloat(target.getAttribute('data-x') || '0')
          let y = parseFloat(target.getAttribute('data-y') || '0')
          // update the element's style
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'
          // translate when resizing from top or left edges
          x += event?.deltaRect?.left || 0
          y += event?.deltaRect?.top || 0
          target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
          target.setAttribute('data-x', x + '')
          target.setAttribute('data-y', y + '')
        },
        end(event) {
          const { x, y } = getTranslate(getComputedStyle(event.target).transform)
          console.log(
            'topLeftX,topLeftY: ',
            getCoordinate(x, y, Math.round(event.rect.width), Math.round(event.rect.height))
          )
        }
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),
        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 50, height: 50 }
        })
      ],

      inertia: true
    })
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      // enable autoScroll
      autoScroll: true,

      listeners: {
        // call this function on every dragmove event
        move: dragMoveListener,
        // call this function on every dragend event
        end(event) {
          const { x, y } = getTranslate(getComputedStyle(event.target).transform)
          console.log(
            'topLeftX,topLeftY: ',
            getCoordinate(x, y, Math.round(event.rect.width), Math.round(event.rect.height))
          )
        }
      }
    })
  function dragMoveListener(event: InteractEvent) {
    let target = event.target
    // keep the dragged position in the data-x/data-y attributes
    let x = parseFloat(target.getAttribute('data-x') || '0') + event.dx
    let y = parseFloat(target.getAttribute('data-y') || '0') + event.dy
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    // update the posiion attributes
    target.setAttribute('data-x', x + '')
    target.setAttribute('data-y', y + '')
  }
  // this function is used later in the resizing and gesture demos
  // window.dragMoveListener = dragMoveListener
})
</script>

<template>
  <div class="rect-parent" ref="rectParent">
    <div
      class="rect"
      style="transform: translate(100px, 100px)"
      data-x="100"
      data-y="100"
      ref="rect"
    >
      <span class="remove-rect" @click="removeRect">×</span>
      <span class="top-left"></span>
      <span class="top-right"></span>
      <span class="bottom-right"></span>
      <span class="bottom-left"></span>
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="left"></span>
      <span class="right"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>

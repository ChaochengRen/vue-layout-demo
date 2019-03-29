<template>
  <div class="flexi-block" :style="blockStyle">
    <component :is="option.comp.name"></component>
  </div>
</template>

<script>
export default {
  name: "FlexiBlock",
  props: {
    option: Object
  },
  data() {
    return {}
  },
  computed: {
    blockStyle() {
      const option = this.option;
      return {
        top: `${option.posY}px`,
        left: `${option.posX}px`,
        width: `${option.width}px`,
        height: `${option.height}px`
      }
    }
  }
}
</script>

<style lang="less">
.flexi-block {
  position: absolute;
  width: 100px;
  height: 80px;
  z-index: 5;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px 0 rgba(61, 157, 236, 0.5)
}
</style>

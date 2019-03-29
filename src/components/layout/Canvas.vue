<template>
  <div class="canvas-wrapper">
    <div class="canvas-con">
      <div ref="canvas" class="canvas" @dragover.prevent="handleDragOver($event)" @dragenter="handleDragEnter($event)" @drop.prevent="handleDrop($event)">
        <block v-for="(block, i) in blocks" :key="i" :option="block.option"></block>
      </div>
    </div>
  </div>
</template>

<script>
import Block from './FlexiBlock';

export default {
  name: "Canvas",
  components: { Block },
  data() {
    return {
      blocks: [],
      originCoord: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move";
      return true;
    },
    handleDragEnter(e) {
      return true;
    },
    handleDrop(e) {
      const originCoord = this.originCoord;
      const data = e.dataTransfer.getData("text");
      let option;
      try {
        option = JSON.parse(data);
      } catch (e) {
        option = {};
      }
      this.blocks.push({option: Object.assign({
        posX: e.clientX - originCoord.x,
        posY: e.clientY - originCoord.y
      }, option)});
    },
    calcOriginCoord() {
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.originCoord.x = rect.left;
      this.originCoord.y = rect.top;
    }
  },
  mounted() {
    this.calcOriginCoord();
    document.addEventListener('resize', this.calcOriginCoord);
  },
  destroyed() {
    document.removeEventListener('resize', this.calcOriginCoord);
  }
}
</script>

<style lang="less">
.canvas-wrapper {
  flex: 1;
  overflow: auto;
  .canvas-con {
    box-sizing: border-box;
    margin: 25px;
    .canvas {
      min-height: 1024px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
      background: #fff;
      background-image: linear-gradient(90deg, rgba(0, 80, 200, 0.15) 10%, rgba(0, 0, 0, 0) 10%),linear-gradient(rgba(0, 80, 200, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
      background-size: 10px 10px;
      position: relative;
    }
  }
}
</style>

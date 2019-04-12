<template>
  <div class="canvas-wrapper">
    <div class="canvas-con">
      <div class="toolbar">
        <h-button type="ghost" shape="circle" @click="reset">新画布</h-button>
        <h-button type="primary" shape="circle" @click="save" :disabled="!isModified">保存</h-button>
      </div>
      <div ref="canvas" class="canvas" :style="canvasStyle" @dragover.prevent="handleDragOver($event)" @dragenter="handleDragEnter($event)" @drop.prevent="handleDrop($event)">
        <block v-for="block in blocks" :key="block.option.id" 
          v-on:update:option="handleOptionChange" 
          :option.sync="block.option"
          @on-block-deletion="handleBlockDel"></block>
        <div
          ref="resizer"
          class="resizer"
          @mousedown="handleResize($event)"
          draggable="true"
          ondragstart="event.preventDefault()"
        ></div>
        <div class="resize-indicator" ref="resizeIndicator"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Block from './FlexiBlock';
import shortid from 'shortid';

const minH = 900;
const minW = 1400;

export default {
  name: "Canvas",
  components: { Block },
  props: {
    /**
     * 外部导入数据
     * 数据格式：
     * {
     *   blocks: [{
     *     width,
     *     height,
     *     posX,
     *     posY,
     *     compName
     *   }],
     *   canvas: {
     *     width,
     *     height
     *   }
     * }
     */
    importData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      blocks: [],
      /* 画布左上角的坐标 */
      originCoord: {
        x: 0,
        y: 0
      },
      canvasH: minH,
      canvasW: minW,
      isModified: false
    }
  },
  computed: {
    canvasStyle() {
      return {
        width: this.canvasW + 'px',
        height: this.canvasH + 'px'
      }
    }
  },
  watch: {
    blocks() {
      this.isModified = true;
    },
    importData: {
      immediate: true,
      handler(val) {
        this.blocks = (val.blocks || []).map(b => {
          return {
            option: {
              id: shortid.generate(),
              width: b.width || 300,
              height: b.height || 200,
              posX: b.posX >= 0 ? b.posX : 0,
              posY: b.posY >= 0 ? b.posY : 0,
              comp: {
                name: b.compName
              }
            }
          }
        });
        if (val.hasOwnProperty('canvas')) {
          this.canvasW = Math.max(val.canvas.width, minW);
          this.canvasH = Math.max(val.canvas.height, minH);
        }
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
      let dataObj, option, type;
      try {
        dataObj = JSON.parse(data);
        option = dataObj.option;
        type = dataObj.type;
      } catch (e) {
        option = {};
        type = '';
      }
      let posX, posY;
      if (type === 'create') {
        posX = this.calcBlockPos(e.clientX - originCoord.x + this.$el.scrollLeft);
        posY = this.calcBlockPos(e.clientY - originCoord.y + this.$el.scrollTop);
        this.blocks.push({option: Object.assign({
          id: shortid.generate(),
          posX,
          posY
        }, option)});
      } else if (type === 'move') {
        let block = this.blocks.find(b => b.option.id === option.id);
        posX = this.calcBlockPos(e.clientX - dataObj.cursor.posX + block.option.posX);
        posY = this.calcBlockPos(e.clientY - dataObj.cursor.posY + block.option.posY);
        if (block) {
          block.option.posX = posX;
          block.option.posY = posY;
        }
      }
      if (typeof posX !== 'undefined' && typeof posY != 'undefined') {
        if ((posX + option.width) > this.canvasW) {
          this.canvasW = posX + option.width;
        }
        if ((posY + option.height) > this.canvasH) {
          this.canvasH = posY + option.height;
        }
      } 
    },
    handleOptionChange(option) {
      if ((option.posX + option.width) > this.canvasW) {
        this.canvasW = option.posX + option.width;
      }
      if ((option.posY + option.height) > this.canvasH) {
        this.canvasH = option.posY + option.height;
      }
    },
    handleResize(event) {
      const indicator = this.$refs.resizeIndicator;
      this.resizing = true;
      const cursor = {
        x: event.clientX,
        y: event.clientY
      }
      let self = this;

      const clearResize = function () {
        indicator.style.display = 'none';
        self.resizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
      const handleMouseMove = function(e) {
        if (!self.resizing) return;
        const canvasH = self.canvasH;
        const canvasW = self.canvasW;
        // 当前指示框宽度
        const curW = canvasW - cursor.x + e.clientX;
        // 当前指示框高度
        const curH = canvasH - cursor.y + e.clientY;
        if (curW < minW && curH < minH) {
          clearResize();
          self.canvasW = minW;
          self.canvasH = minH;
          return;
        } else if (curW >= minW && curH < minH) {
          indicator.style.width = curW + 'px';
          indicator.style.height = minH + 'px';
        } else if (curW < minW && curH >= minH) {
          indicator.style.width = minW + 'px';
          indicator.style.height = curH + 'px';
        } else {
          indicator.style.width = curW + 'px';
          indicator.style.height = curH + 'px';
        }
        indicator.style.left = '0';
        indicator.style.top = '0';
        indicator.style.display = 'block';
      }
      const handleMouseUp = function(e) {
        if (self.resizing) {
          const canvasH = self.canvasH;
          const canvasW = self.canvasW;
          self.canvasW = self.calcBlockPos(e.clientX - cursor.x + canvasW);
          self.canvasH = self.calcBlockPos(e.clientY - cursor.y + canvasH);
        }
        clearResize();
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    handleBlockDel(blockId) {
      const blocks = this.blocks;
      let blockIndex = blocks.findIndex(b => b.option.id === blockId);
      if (blockIndex > -1) {
        blocks.splice(blockIndex, 1);
      }
    },
    /**
     * 自动贴靠
     */
    calcBlockPos(pos) {
      if (pos < 0) {
        return 0;
      }
      let r = pos % 10;
      if (r <= 5) {
        return pos - r;
      } else {
        return pos + 10 - r;
      }
    },
    calcOriginCoord() {
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.originCoord.x = rect.left;
      this.originCoord.y = rect.top;
    },
    reset() {
      this.blocks = [];
      this.canvasW = minW;
      this.canvasH = minH;
    },
    save() {
      this.isModified = false;
      this.$emit("on-save", {
        blocks: this.blocks,
        canvas: {
          width: this.canvasW,
          height: this.canvasH
        }
      });
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
  position: relative;
  .canvas-con {
    box-sizing: border-box;
    margin: 40px 25px 25px;
    .canvas {
      min-height: 900px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
      background: #fff;
      background-image: linear-gradient(90deg, rgba(0, 80, 200, 0.15) 10%, rgba(0, 0, 0, 0) 10%),linear-gradient(rgba(0, 80, 200, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
      background-size: 10px 10px;
      position: relative;
      .resizer {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        cursor: se-resize;
        &:hover {
          background: #aaa;
        }
      }
    }
    .toolbar {
      position: fixed;
      right: 45px;
      top: 5px;
      z-index: 10;
      button {
        height: 28px;
        width: 60px;
        padding: 0;
        margin-left: 10px;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5)
      }
    }
  }
  .resize-indicator {
    width: 0;
    height: 0;
    background: none;
    display: none;
    position: absolute;
    z-index: 10;
    border: 2px dashed #000;
    margin: 0 50px 50px 0;
    box-sizing: content-box;
  }
}
</style>

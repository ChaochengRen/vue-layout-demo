<template>
  <div
    class="flexi-block"
    :style="blockStyle"
    @dragstart="handleDragStart($event)"
    @dragend="handleDragEnd($event)"
    draggable="true"
  >
    <component :is="option.comp.name" :width="option.width" :height="option.height"></component>
    <div class="flexi-block-toolbar" draggable="true"
      ondragstart="event.preventDefault()">
      <h-icon name="trash_fill" @on-click="del"></h-icon>
    </div>
    <div
      ref="resizer"
      class="resizer"
      draggable="true"
      ondragstart="event.preventDefault()"
      @mousedown="handleResize($event)"
    ></div>
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
  },
  methods: {
    handleDragStart(e) {
      const dataTransfer = e.dataTransfer;
      dataTransfer.effectAllowed = "move";
      dataTransfer.setData("text", JSON.stringify({
        type: "move",
        cursor: {
          posX: e.clientX,
          posY: e.clientY
        },
        option: this.option
      }));
      return true;
    },
    handleDragEnd(e) { },
    handleResize(event) {
      const indicator = this.$parent.$refs.resizeIndicator;
      this.resizing = true;
      const cursor = {
        x: event.clientX,
        y: event.clientY
      }
      let self = this;
      const handleMouseMove = function(e) {
        if (!self.resizing) return;
        const option = self.option;
        if ((option.width - cursor.x + e.clientX) >= 100
          && (option.height - cursor.y + e.clientY) >= 100) {
          indicator.style.width = option.width - cursor.x + e.clientX + 'px';
          indicator.style.height = option.height - cursor.y + e.clientY + 'px';
          indicator.style.left = option.posX + 'px';
          indicator.style.top = option.posY + 'px';
          indicator.style.display = 'block';
        } else {
          indicator.style.display = 'none';
          self.resizing = false;
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        }
      }
      const handleMouseUp = function(e) {
        if (self.resizing) {
          indicator.style.display = 'none';
          const option = self.option;
          option.width = self.calcSize(e.clientX - cursor.x + option.width);
          option.height = self.calcSize(e.clientY - cursor.y + option.height);
          self.$emit('update:option', option);
        }
        self.resizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    calcSize(len) {
      let r = len % 10;
      if (r <= 5) {
        return len - r;
      } else {
        return len + 10 - r;
      }
    },
    del() {
      this.$emit("on-block-deletion", this.option.id);
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
  box-shadow: 0 0 4px 0 rgba(61, 157, 236, 0.5);
  cursor: move;
  &-toolbar {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    text-align: right;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s, background 0.2s;
    &:hover {
      background: rgba(216, 216, 216, 0.4);
      opacity: 1;
    }
    i {
      transition: color 0.2s;
      margin-right: 4px;
      z-index: 10;
    }
    i:hover {
      color: #888;
    }
  }
}
</style>

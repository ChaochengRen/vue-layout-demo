<template>
  <div
    class="widget"
    @dragstart="handleDragStart($event)"
    @dragend="handleDragEnd($event)"
    draggable="true"
  >{{option.comp.title}}</div>
</template>

<script>
export default {
  name: "Widget",
  props: {
    option: Object
  },
  data() {
    return {}
  },
  methods: {
    handleDragStart(e) {
      const dataTransfer = e.dataTransfer;
      dataTransfer.effectAllowed = "move";
      dataTransfer.setData("text", JSON.stringify({
        type: "create",
        option: this.option
      }));
      return true;
    },
    handleDragEnd(e) { }
  }
}
</script>

<style lang="less">
.widget {
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 6;
}
</style>

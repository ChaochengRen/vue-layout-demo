<template>
  <div
    class="widget"
    @dragstart="handleDragStart($event)"
    @dragend="handleDragEnd($event)"
    draggable="true"
  ></div>
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
      dataTransfer.setData("text/plain", JSON.stringify(this.option));
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
}
</style>

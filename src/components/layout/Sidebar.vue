<template>
  <div class="sidebar">
    <div ref="items" class="sidebar-item" v-for="(option, i) in widgetOptions" :key="i" >
      <widget :option="option"></widget>
    </div>
  </div>
</template>

<script>
import Widget from './Widget';

export default {
  name: "Sidebar",
  components: {Widget},
  props: {
    widgetOptions: Array
  }
}
</script>

<style lang="less">
.sidebar {
  width: 20%;
  min-width: 200px;
  height: 100%;
  overflow: auto;
  border: 1px solid #bbb;
  border-left: none;
  background: #333;
  &-item {
    width: 180px;
    height: 130px;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
    transition: background-color 0.2s;
    &:hover {
      background-color: #555;
      cursor: move;
    }
  }
}

</style>

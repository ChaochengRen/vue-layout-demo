<template>
  <div class="demo">
    <sidebar :widgetOptions="widgetOptions"></sidebar>
    <Canvas></Canvas>
  </div>
</template>

<script>
import Sidebar from './layout/Sidebar';
import Canvas from './layout/Canvas';

export default {
  name: 'Demo',
  components: {Sidebar, Canvas},
  data() {
    return {
      widgetOptions: [
        {
          width: 300,
          height: 200,
          comp: {
            name: "RTable"
          }
        },
        {
          width: 500,
          height: 300,
          comp: {
            name: "RTable"
          }
        },
        {
          width: 200,
          height: 180,
          comp: {
            name: "RTable"
          }
        },
        {
          width: 400,
          height: 250,
          comp: {
            name: "RTable"
          }
        }
      ]
    }
  }
}
</script>
<style lang="less">
.demo {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
}
</style>

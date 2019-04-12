<template>
  <div class="demo">
    <sidebar :widgetOptions="widgetOptions"></sidebar>
    <Canvas @on-save="handleSave" :importData="importData"></Canvas>
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
            name: "RTable",
            title: '表格'
          }
        },
        {
          width: 500,
          height: 300,
          comp: {
            name: "PieChart",
            title: '饼图'
          }
        },
        {
          width: 200,
          height: 180,
          comp: {
            name: "LineChart",
            title: '折线图'
          }
        },
        {
          width: 400,
          height: 250,
          comp: {
            name: "BarChart",
            title: '柱状图'
          }
        }
      ],
      importData: {"blocks":[{"width":380,"height":350,"posX":50,"posY":40,"compName":"RTable"},{"width":620,"height":350,"posX":480,"posY":40,"compName":"PieChart"},{"width":380,"height":280,"posX":50,"posY":430,"compName":"LineChart"},{"width":620,"height":340,"posX":480,"posY":430,"compName":"BarChart"},{"width":380,"height":380,"posX":50,"posY":740,"compName":"PieChart"},{"width":620,"height":230,"posX":480,"posY":800,"compName":"RTable"},{"width":380,"height":250,"posX":50,"posY":1160,"compName":"BarChart"},{"width":620,"height":350,"posX":480,"posY":1060,"compName":"LineChart"}],"canvas":{"width":1650,"height":1450}}
    }
  },
  methods: {
    handleSave(data) {
      let transData = data.blocks.map(b => {
        let option = b.option;
        return {
          width: option.width,
          height: option.height,
          posX: option.posX,
          posY: option.posY,
          compName: option.comp.name
        }
      })
      console.log(JSON.stringify({
        blocks: transData,
        canvas: data.canvas
      }));
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

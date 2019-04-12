<template>
  <h-pie ref="chart" :data="chartData" :width="width + 'px'" :height="height + 'px'"></h-pie>
</template>

<script>
  export default {
    name: 'PieChart',
    props: {
      width: {
        type: Number,
        default: 500
      },
      height: {
        type: Number,
        default: 400
      }
    },
    watch: {
      width() {
        this.$nextTick(() => {
          this.$refs.chart.echarts.resize();
        })
      },
      height() {
        this.$nextTick(() => {
          this.$refs.chart.echarts.resize();
        })
      } 
    },
    data () {
      return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
      }
    }
  }
</script>
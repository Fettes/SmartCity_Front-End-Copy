<template>
  <div ref="dom" class="charts chart-boxplot"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBoxPlot',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let xAxisData = Object.values(this.value).map(_ => _.name)
      let seriesData = Object.values(this.value)
      let option = {
        title: {
          x: 'center'
        },
        grid: {
            top: "5%",
            left: "1.2%",
            right: "1%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: {
          data:xAxisData,
          axisLine: false,
          splitLine:false,
          position: 'top'
        },
        yAxis: {
          show: false,
        },
        series: [{
            type: 'k',
            data: seriesData
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
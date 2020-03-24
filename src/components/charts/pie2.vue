<template>
  <div ref="dom" class="charts chart-piee"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPiee',
  props: {
    value: Array,
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
      let legend = this.value.map(_ => _.name)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center',
          y: 'cen ter'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legend
        },
        series: [
          {
            name: '空气数据',
            type: 'pie',
            radius : ['50%', '70%'],
            data: this.value,
            itemStyle: {
                normal : {
                    label : {
                        show : true,
                    },
                    labelLine : {
                        show : true
                    }
                },
                emphasis : {
                    label : {
                        show:true,
                        position:'center',
                        textStyle : {
                            fontSize : '15',
                            fontWeight : 'bold'
                        }
                    }
                } 
            }
          }
        ]
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

<template>
  <div class="dark">

    <Row :gutter="20" >
      <i-col :md="24" :lg="6">
        <Card shadow>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                设备列表
            </p>
            <div class="device_table">
                <tables ref="tables" v-model="dt_tableData" :columns="dt_columns"/>
                <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                    <i-col span='4' offset="6">
                        <Button class="search-btn" type="primary">
                            上一页
                        </Button>
                    </i-col>
                    <i-col span='4' offset="3">
                        <Button class="search-btn" type="primary">
                            下一页
                        </Button>
                    </i-col>
                </Row>
            </div>
        </Card>
      </i-col>

      <i-col :md="24" :lg="10" style="margin-bottom: 20px;">
        <Card shadow>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                控制开关灯
            </p>

           <!-- <img src="../images/radar.png" class='imgs'>
                </img>
                <div class="card_img">
                <image src="../images/radar.png" class='img'>
                </image>
            </div> -->
            <checkbox />启用开灯时间
            <Divider />
                <div>
                    <Row>
                        <Col span="12">
                            开灯日期：<DatePicker type="date" placeholder="Select date" style="width: 150px"></DatePicker>
                        </Col>
                        <Col span="12">
                            开灯时间：<TimePicker type="time" placeholder="Select time" style="width: 100px"></TimePicker>
                        </Col>
                    </Row>
                </div>
            <Divider />
            <checkbox />启用关灯时间
            <Divider />
                <div>
                    <Row>
                        <Col span="12">
                            关灯日期：<DatePicker type="date" placeholder="Select date" style="width: 150px"></DatePicker>
                        </Col>
                        <Col span="12">
                            关灯时间：<TimePicker type="time" placeholder="Select time" style="width: 100px"></TimePicker>
                        </Col>
                    </Row>
                </div>
            <Divider />
            <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                    <i-col span='4' offset="6">
                        <Button class="search-btn" type="primary">
                            开启
                        </Button>
                    </i-col>
                    <i-col span='4' offset="3">
                        <Button class="search-btn" type="primary">
                            恢复默认
                        </Button>
                    </i-col>
                </Row>
        </Card>

        <Card shadow>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                资产信息
            </p>
            <tables ref="tables" v-model="dt_lightdata" :columns="dt_lightcolumns"/>
             <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                    <i-col span='4' offset="6">
                        <Button class="search-btn" type="primary">
                            上一页
                        </Button>
                    </i-col>
                    <i-col span='4' offset="3">
                        <Button class="search-btn" type="primary">
                            下一页
                        </Button>
                    </i-col>
                </Row>

        </Card>
      </i-col>

      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
         <p slot="title">
            <Icon type="ios-film-outline"></Icon>
              开灯时间
        </p>
            <div ref="dom2" style="height: 280px;" ></div>
        </Card>

        <Card shadow>
            <p slot="title">
               <Icon type="ios-film-outline"></Icon>
               关灯时间
            </p>

           <div ref="dom" style="height: 280px;" ></div>
            <!--
                <i-echarts :option="closeData"></i-echarts>
                <div  ref="dom" style="height: 310px;" ></div>
                <chart-line style="height: 280px;" :value="closeData" text="车流量统计示图"></chart-line> -->

        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <!-- <example style="height: 310px;"/> -->

      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'// ChartPie,
import Tables from '_c/tables'
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
// import Example from '../single-page/home/example.vue'
export default {
  name: 'device_stru',
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    Tables,
    echarts
    // Example
  },
  data () {
    return {
      dom: null,
      dt_columns: [
        { title: '设备列表', key: 'device_list' },
        { title: '设备状态', key: 'device_status' },
        { title: '设备地址', key: 'device_address' }
        // {title:'',key:''},
        // {title:'',key:''},
      ],
      dt_lightcolumns: [
        { title: '星期', key: 'device_week' },
        { title: '日期', key: 'device_date' },
        { title: '开灯时间', key: 'device_open' },
        { title: '关灯时间', key: 'device_close' }
      ],
      dt_tableData: [
        {
          device_list: '路灯1001',
          device_status: '照明中',
          device_address: '南路一号'
        }, {
          device_list: '路灯1002',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1003',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1004',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1005',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1006',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1007',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1008',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1009',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1010',
          device_status: '照明中',
          device_address: '南路'
        }, {
          device_list: '路灯1011',
          device_status: '照明中',
          device_address: '南路'
        }
      ],
      dt_lightdata: [
        {
          device_week: '星期二',
          device_date: '2019/01/01',
          device_open: '18:00',
          device_close: '5:00'
        }, {
          device_week: '星期三',
          device_date: '2019/01/02',
          device_open: '18:00',
          device_close: '5:00'
        }, {
          device_week: '星期四',
          device_date: '2019/01/03',
          device_open: '18:00',
          device_close: '5:00'
        }, {
          device_week: '星期五',
          device_date: '2019/01/04',
          device_open: '18:00',
          device_close: '5:00'
        }, {
          device_week: '星期六',
          device_date: '2019/01/05',
          device_open: '18:00',
          device_close: '5:00'
        }, {
          device_week: '星期七',
          device_date: '2019/01/06',
          device_open: '18:00',
          device_close: '5:00'
        }
      ],
      runningInfoList: [
        {
          title1: '产品名称',
          content1: '爱尔视雷达',
          title2: '运行状态',
          content2: '正常运行'
        }, {
          title1: '序列号',
          content1: '151021001121',
          title2: '设备类型',
          content2: '雷达巴拉'
        }, {
          title1: '设备功率',
          content1: '40KW',
          title2: '检测速度',
          content2: '2秒每次'
        }
      ],
      closeData: [
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            top: '3%',
            left: '1.2%',
            right: '1%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'time',
              data: ['4:00', '5:00', '6:00', '7:00']
            }
          ],
          series: [
            {
              name: '路灯1001',
              type: 'line',
              stack: '关灯时间',
              areaStyle: { normal: {
                color: '#2d8cf0'
              } },
              data: [500, 501, 503, 506, 510, 515, 521]
            }
          ]
        }
      ]
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'time'
        }
      ],
      series: [
        {
          name: '路灯1001',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color: '#2d8cf0'
          } },
          data: [500, 501, 503, 506, 510, 515, 521]
        }
      ]
    }
    const option2 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'time'
        }
      ],
      series: [
        {
          name: '路灯1001',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color: '#2d8cf0'
          } },
          data: [1821, 1819, 1818, 1816, 1815, 1813, 1812]
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom2 = echarts.init(this.$refs.dom2)
      this.dom.setOption(option)
      this.dom2.setOption(option2)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
    //
  }
}
</script>

<style lang="less" scope>
.count-style{
  font-size: 50px;
}
.card_img{
    text-align:center;
    //width:100%;
    //height:100%;
}
.imgs{
    width:100%;
    height:200px;
}
.ivu-card-body,.ivu-card-head{

    background:#09101D;
    .device_table{
        padding:0px;
        background:#09101D;
    }
    p{
        color:white;
    }
    .ivu-table th,td{
        background:#09101D;
        color:white;
    }
}

//.right-area,.zk-table__cell-inner,.zk-table__body-cell, .zk-table__footer-cell, .zk-table__header-cell,.ivu-card-body,.dark{
//  background: #09101D;
//}
ul{
    list-style:none;
}

// .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td{
//     background-color:burlywood;
// }
tr.ivu-table-row-hover td{
    background-color: burlywood;
}
.ivu-card-body{
    padding:8px;
}
</style>

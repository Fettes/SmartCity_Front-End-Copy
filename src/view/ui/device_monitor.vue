<template>
  <div class="layout dark">
        <Content :style="{padding: '12px', minHeight: '280px', background: '#000'}">
          <Row :gutter="10">
            <i-col span="6" >
              <Card :bordered="false"class="paddingcard">
                <p slot="title">
                  <Icon type="ios-paper" />  设备列表
                  <Icon type="md-pin" style="float:right" size="24"  @click="showMap()"/>
                </p>
                <div class="device_table">
                  <Table
                    highlight-row
                    ref="tables"
                    :row-class-name="rowClassName"
                    :columns="dt_columns"
                    :data="dt_tableData"
                    @on-row-click="choosedevice()"
                    
                  ><!--  height=392 stripe
                  @on-row-click="showMap()"
                   @on-row-click="Mapnotice()" -->
                    <template slot-scope="{ row, index }" slot="status">
                      <p v-if="row.status === 0">
                        <Icon type="ios-radio-button-on" color="green" size="24"></Icon>
                      </p>
                      <p v-else-if="row.status === 1">
                        <Icon type="ios-radio-button-on" color="yellow" size="24"></Icon>
                      </p>
                      <p v-else>
                        <Icon type="ios-radio-button-on" color="red" size="24"></Icon>
                      </p>
                    </template>

                    <template slot-scope="{ row, index }" slot="lamppost">
                      <p>{{ row.lamppost }}</p>
                    </template>

                    <template slot-scope="{ row, index }" slot="name">
                      <p>{{ row.name }}</p>
                    </template>
                  </Table>
                  <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                    <i-col span="4" offset="6">
                      <Button class="search-btn" type="primary" size="small">上一页</Button>
                    </i-col>
                    <i-col span="4" offset="3">
                      <Button class="search-btn" type="primary" size="small">下一页</Button>
                    </i-col>
                  </Row>
                </div>
              </Card>
              <Card shadow class="paddingcard " >
                <p slot="title">
                  <Icon type="md-options" /> 实时数据
                </p>
                <Row :gutter="20" style="text-align:left;margin-top: 20px;margin-left: 8px;"  v-model="runningInfoList" >
                  <i-col span="8">
                    <p>总 人 数: {{ runningInfoList.people_total }}</p>
                  </i-col>
                  <i-col span="8">
                    <p>人群密度: {{ runningInfoList.people_dense }}</p>
                  </i-col>
                  <i-col span="8">
                    <p>热力指数: {{ runningInfoList.hot_rate }}</p>
                  </i-col>
                </Row>
              </Card>
            </i-col>

            <i-col span="18" >

              <Card shadow class="paddingcard">
                  <p slot="title">
                      <Icon type="ios-film-outline"></Icon>
                      监控画面
                  </p>
                  <div  class ="theimage" style="height:100%;width:100%;text-align:left;">
                  <div  style="height:550px;width:100%;">
                    <img src="../../assets/images/device/led_on.png" class="imgs">
                  </div>
                  <!-- ref="basicMapbox"<pre id="info"></pre>-->
                </div>
                <!--<div class="card_img">
                      <image src="../images/radar.png" class='img'>
                      </image>
                  </div> -->

              </Card>
            </i-col>

            <!-- <i-col span="6" style="margin-bottom: 20px;">
              <Card shadow class="paddingcard">
                <p slot="title">
                  <Icon type="md-options" /> 实时数据
                </p>
                <Row :gutter="20" style="text-align:center;margin-top: 10px;" v-model="runningInfoList">
                  <i-col span="8">
                    <p>总 人 数: {{ runningInfoList.people_total }}</p>
                  </i-col>
                  <i-col span="8">
                    <p>人群密度: {{ runningInfoList.people_dense }}</p>
                  </i-col>
                  <i-col span="8">
                    <p>热力指数: {{ runningInfoList.hot_rate }}</p>
                  </i-col>
                </Row>
              </Card> -->

              <!-- <Row>
                <drag-drawer
                  title="时间区域选择"
                  :closable="true"
                  width="75%"
                  v-model="showtimechoose"
                  min-width="30px"
                  :inner="true"
                  :transfer="false"
                  :placement="placementComputed"
                  :draggable="draggable"
                  @on-resize="handleResize"
                  :scrollable="true">
                    <Form :model="formData">
                      <Row :gutter="32">
                        <Col span="12">
                          <FormItem label="起始日期" label-position="top">
                            <DatePicker type="date" placeholder="选择起始日期" style="width: 100%" v-model="formData.startdate"></DatePicker>
                          </FormItem>
                        </Col>
                        <Col span="12">
                          <FormItem label="起始时间" label-position="top">
                            <TimePicker type="time" class="timetext" placeholder="选择起始时间" style="width: 100%" v-model="formData.starttime"></TimePicker>
                            <!-- <DatePicker type="daterange" placement="bottom-end" placeholder="选择结束日期" style="width: 100%"></DatePicker> -->
                          <!--</FormItem>
                        </Col>
                      </Row>
                      <Row :gutter="32">
                        <Col span="12">
                          <FormItem label="结束日期" label-position="top">
                            <DatePicker type="date" placeholder="选择结束日期" style="width: 100%" placement="bottom-end" v-model="formData.enddate"></DatePicker>
                          </FormItem>
                        </Col>
                        <Col span="12">
                          <FormItem label="结束时间" label-position="top">
                            <TimePicker class="timetext" type="time" placeholder="选择结束时间" style="width: 100%" placement="bottom-end" v-model="formData.endtime"></TimePicker>
                            <!-- <DatePicker type="daterange" placement="bottom-end" placeholder="选择结束日期" style="width: 100px"></DatePicker> -->
                          <!--</FormItem>
                        </Col>
                      </Row>

                  </Form>
                  <div class="demo-drawer-footer">
                      <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                      <Button type="primary" @click="value3 = false">确定</Button>
                  </div>

                </drag-drawer>
                <Card shadow class="paddingcard">
                  <p slot="title">
                    <Icon type="ios-pie" /> 数据分析
                    <button type="" class="search-btn ivu-btn ivu-btn-primary ivu-btn-small" @click="showtimechoose=true"  type="primary" style="float:right">选择时间</button>
                  </p>
                  <chart-pie style="height: 150px;" :value="pieData" text="人流量统计示图"></chart-pie>
                </Card>

                <Card shadow class="paddingcard">
                  <p slot="title">
                    <Icon type="ios-alert-outline"></Icon>
                    报警信息分析
                  </p>
                  <chart-bar style="height: 220px;" :value="bardata" :options="options" text="报警信息统计"></chart-bar>
                </Card>
              </Row> -->

<!-- 
            </i-col> -->
          </Row>
          <Row>
              <Card :bordered="false" class="paddingcard paddingcard2">
                <p slot="title">
                  <Icon type="md-bookmarks"></Icon> 资产信息
                </p>
                <Row :gutter="20" v-model="deviceInfo" class="deviceinfo">
                  <Col span="4">
                    <ul>
                      <li>产品名称：{{ deviceInfo.name }}</li>
                      <li>设备编号：{{ deviceInfo.device_number }}</li>

                    </ul>
                  </Col>
                  <Col span="4" offset="1">
                    <ul>
                      <li>生产厂家：{{ deviceInfo.producer }}</li>
                      <li>型    号：{{ deviceInfo.type }}</li>

                    </ul>
                  </Col>
                  <Col span="4" offset="1">
                    <ul>
                      <li>购买日期：{{ deviceInfo.purchase_date }}</li>
                      <li>安装日期：{{ deviceInfo.deploy_date }}</li>
                    </ul>
                  </Col>
                  <Col span="4" offset="1">
                    <ul>
                      <li>联系员工：{{ deviceInfo.contact_staff }}</li>
                      <li>联系电话：{{ deviceInfo.contact_phone }}</li>
                    </ul>
                  </Col>
                  <Col span="4" offset="1">
                    <ul>
                      <li>所属中控机: {{ deviceInfo.belong_device }}</li>
                      <li>所属灯杆: {{ deviceInfo.belong_light }}</li>
                    </ul>
                  </Col>
                </Row>
              </Card>
          </Row>
        </Content>

    <Drawer :closable="true" width="600px" v-model="showDrawerMap">
      <Row :gutter="20" style="margin-top: 5px;">
          <div style="height:100%;width:100%;">
            <div ref="basicMapbox" style="height:700px;width:100%;"></div>
          </div>
        </Row>
    </Drawer>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts' // ChartPie,
import Tables from '_c/tables'
// import Example from '../single-page/home/example.vue'
import mapboxgl from 'mapbox-gl'
import Notice from 'iview'
import DragDrawer from '_c/drag-drawer'

export default {
  name: 'device_monitor',
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    Tables,
    Notice,
    DragDrawer
    // Example
  },
  data () {
    return {
      showDrawerMap: false,
      showtimechoose: false,
      formData: {
        startdate: '',
        starttime: '',
        enddate: '',
        endtime: ''
      },
      bardata: [
        { value: 335, name: 'Bad video' },
        { value: 310, name: 'Over Speed' },
        { value: 234, name: 'Fall object' },
        { value: 135, name: 'Bad Prence Events' }
      ],
      dt_columns: [
        { title: '状态', slot: 'status', width: 60 },
        { title: '灯柱', slot: 'lamppost' },
        { title: '名称', slot: 'name' }
      ],
      dt_tableData: [
        {
          status: 0,
          lamppost: '1001',
          name: '监控'
        },
        {
          status: 0,
          lamppost: '1002',
          name: '监控'
        },
        {
          status: 1,
          lamppost: '1003',
          name: '监控'
        },
        {
          status: 1,
          lamppost: '1004',
          name: '监控'
        },
        {
          status: 0,
          lamppost: '1005',
          name: '监控'
        },
        {
          status: 0,
          lamppost: '1006',
          name: '监控'
        },
        {
          status: 0,
          lamppost: '1007',
          name: '监控'
        },
        // {
        //   status: 0,
        //   lamppost: '1008',
        //   name: '监控'
        // },
        // {
        //   status: 2,
        //   lamppost: '1009',
        //   name: '监控'
        // },
        // {
        //   status: 2,
        //   lamppost: '1010',
        //   name: '监控'
        // }
      ],
      deviceInfo: {
        name: 'TrafiCam x-stream',
        device_number: '800223888',
        producer: '美国菲力尔公司',
        type: 'PFM-Z68X-UD7-A5',
        purchase_date: '2018-09-25',
        deploy_date: '2019-09-25',
        contact_staff: '李工',
        contact_phone: '13754689158',
        belong_device: 'zkj002',
        belong_light: '8号灯杆'
      },
      runningInfoList: {
        people_total: '1207',
        people_dense: '207',
        hot_rate: '153.04'
      },
      pieData: [
        { value: 335, name: '今天' },
        { value: 2296, name: '过去7天' },
        { value: 10598, name: '过去一个月' }
      ],
      list1: [
        {
          status: 1,
          lamppost: '1003',
          name: '雷达',
          problem: '不通电',
          datetime: '2018-12-12 09:12:12'
        },
        {
          status: 1,
          lamppost: '1004',
          name: '雷达',
          problem: '不通电',
          datetime: '2018-12-12 09:12:12'
        },
        {
          status: 2,
          lamppost: '1009',
          name: '雷达',
          problem: '不在线',
          datetime: '2018-12-12 09:12:12'
        },
        {
          status: 0,
          lamppost: '1010',
          name: '雷达',
          problem: '不正常',
          datetime: '2018-12-12 09:12:12'
        }
      ]
    }
  },
  methods: {
    rowClassName: function (row, index) {
      if (index % 2 == 0) {
        return 'ivu-table-stripe-even'
      } else return 'ivu-table-stripe-odd'
    },
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.list1[this.list1.length - 1]
          for (let i = 1; i < 11; i++) {
            this.list1.push(last + i)
          }
          resolve()
        }, 2000)
      })
    },
    createMap () {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiMjAxMGppbmciLCJhIjoiY2pyN3hwcWhiMDBrMjQzcGc1NndsaW1tbCJ9.BQoRib1rflv656nIy_5IEQ'
      // var coordinates = document.getElementById("coordinates");
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [113.51552328392535, 22.352760037751793], // 设置地图中心
        zoom: 18 // 设置地图比例
      })

      // 使用定位模块
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserLocation: true,
          zoom: 12
        })
      )
    },
    showMap () {
      this.showDrawerMap = true
      this.createMap()
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scope>
.ivu-card-body {
  //background: #033352;
  padding:8px;
  p,li {
     color: white;
   }
   .device_table {
     padding: 0px;
     //max-height: 400px;
     //background: #001529;
   }
   .ivu-table_wrapper{
     border: 0px;
   }
   .ivu-table th,
   td {
     //background: #001529;
     color: white;
   }
   .ivu-time-picker-cells-cell{
     color:black;
   }
}
.realtimedata.ivu-card-body{
  height:84px;
}
.ivu-card-head {
  //background: #0b558d;

    background-image: url(../../assets/images/title_back.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  p {
     color: white;
   }
}
.ivu-drawer-wrap-inner{
  padding-top: 10px;
}
.textcenter{
  text-align: center;
}
.paddingcard{
  padding-bottom:10px ;
  background: #000;
}
.paddingcard2{
  //margin-top:-10px!important;
}
.count-style {
  font-size: 50px;
}
.card_image .ivu-card-body {
  text-align: center;

  //height:100%;
}
.imgs {
  padding:0px !important;
  text-align:center;
  width: 100%;
  height: 100%;
}

canvas.mapboxgl-canvas{
  width:100% !important;
  height: 100% !important;
}
/*偶数行*/
  .ivu-table-stripe-even td{
    background-color: #133e66!important;
  }
  /*奇数行*/
  .ivu-table-stripe-odd td{
    background-color: #052d4c!important;
  }
   .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td{
    background-color: #1F85DE !important;
  }
  .theimage{
    padding:0px !important;
  }
ul {
  list-style: none;
}
.dark tr.ivu-table-row-hover td {
  background-color: #1F85DE;
}

.layout {
  //border: 1px solid #d7dde4;
  background: #002546;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  // max-height: 500px;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #001529;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout {
  background: #001529;
}

.deviceinfo li span {
  margin-right: 20px;
}

.coordinates {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px 10px;
  margin: 0;
  font-size: 11px;
  line-height: 18px;
  border-radius: 3px;
  display: none;
}
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-bottom-left {
  display: none;
}

</style>

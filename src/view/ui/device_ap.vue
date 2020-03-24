<template>
  <div class="wifi_ap">
    <Layout>
      <Content style="padding:5px;padding-left:0px;">
        <Row :gutter="10">
  <!-------左边表格------------------------------->
          <i-col span="5">
            <Card :bordered="false" class="paddingCardLeftUpdate">
              <p slot="title">
                <Icon type="ios-paper" size="24"/>设备列表
                <Button
                  size="small"
                  style="float:right"
                  type="primary"
                  @click="showMap = true;createMapLarge()"
                ><Icon type="md-pin" style="float:right" size="17"/></Button>
              </p>
              <div class="device_table" style="margin-left:10px;">
                <Tree :data="dt_deviceTable" @on-select-change="chooseDevice"></Tree>
              </div>
            </Card>
          </i-col>

  <!-------中间图片------------------------------->
          <i-col span="19">
            <Drawer v-model="showMap" width="100%" :closable="true" :inner="true" :transfer="false">
              <div ref="basicMapbox2" style=" height:100%; width:100%;"></div>
            </Drawer>
            <Row>
              <i-col span="8">
                <Card shadow class="paddingCardMiddleUpdate" style="margin-right:10px;">
                  <p slot="title">
                    <Icon type="md-git-network" />  基站样式
                  </p>
                  <Row style="height:635px;">
                    <Row>
                      <img src="../../assets/images/AP.png" class="imgs">
                    </Row>
                  <Row  style="text-align:center;margin-top: 10px;">
                      <Button class="open-btn" type="primary" size="small">开启</Button>
                      <Button class="open-btn" type="primary"   size="small" style="margin-left:30px;">关闭</Button>
                  </Row>
                  </Row>
                </Card>
              </i-col>
      <!-------右侧上方图表------------------------------->

                <i-col span="16">
                  <Card shadow class="paddingCardRightTopUpdate">
                      <p slot="title">停留时间 (小时)</p>
                      <div id="staytime_chart" style="height:200px;width:783px;"></div>
                  </Card>

            <!-------右侧左侧地图---------------------->
                  <Row :gutter="10">
                    <i-col span="10">
                      <Card shadow class="paddingCardRightMiddleUpdate" style="height:423px;margin-top:12px;">
                        <p slot="title">
                          <Icon type="ios-alert-outline"></Icon>
                            GIS地图
                          </p>
                          <div style="height:383px;width:100%;" ref="basicMapbox">
                            <!-- <div ref="basicMapbox" style="height:100%; width:auto;">
                            </div> -->
                          </div>
                      </Card>
                    </i-col>
            <!-------右侧右侧图表---------------------->
                    <i-col span="14">
                      <Card shadow class="paddingCardRightTopUpdate" style="margin-top:12px;">
                        <p slot="title">终端与客流统计</p>
                          <Row style="padding-top:10px;">
                            <i-col span="6" offset="4">
                              <i-circle :percent="60" :size="60" stroke-color="#18c6d1">
                                <Icon type="ios-desktop" size="20"></Icon>
                                <br>
                                <span class="demo-Circle-inner" style="font-size:14px">60%</span>
                              </i-circle>
                            </i-col>
                            <i-col span="6">
                              <i-circle :percent="80" :size="60" stroke-color="#4ee38f">
                                <Icon type="logo-android" size="20"></Icon>
                                <br>
                                <span class="demo-Circle-inner" style="font-size:14px">80%</span>
                              </i-circle>
                            </i-col>
                            <i-col span="6">
                              <i-circle :percent="70" :size="60" stroke-color="#fc370a">
                                <Icon type="logo-apple" size="20"></Icon>
                                <br>
                                <span class="demo-Circle-inner" style="font-size:18px">70%</span>
                              </i-circle>
                            </i-col>
                          </Row>
                          <Row>
                            <div id="flow_chart" style="padding:10px;height:307px;width:430px;"></div>
                          </Row>
                      </Card>
                    </i-col>
                  </Row>
                </i-col>
              </Row>
              <!--<Row>
                <Card :bordered="false" class="paddingCardBottomUpdate" style="margin-top:10px;">
                  <p slot="title">
                    <Icon type="md-bookmarks"></Icon> 资产信息
                  </p>
                  <Row :gutter="20" v-model="deviceInfo" class="deviceinfo" style="height:68px;margin-left:25px;">
                    <i-col span="4" style="border-right:1px dashed #2c8cf0; margin-top:15px;">
                      <ul>
                        <li>
                          <p>
                            <span>产品名称:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.name }}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>运行状态:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.status }}</span>
                          </p>
                        </li>
                      </ul>
                    </i-col>
                    <i-col span="4" offset="1" style="border-right:1px dashed #2c8cf0; margin-top:15px;">
                      <ul>
                        <li>
                          <p>
                            <span>购买日期:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.purchase_date }}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>维护日期:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.maintenance_date }}</span>
                          </p>
                        </li>
                      </ul>
                    </i-col>
                    <i-col span="4" offset="1" style="border-right:1px dashed #2c8cf0; margin-top:15px;">
                      <ul>
                        <li>
                          <p>
                            <span>维护周期:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.maintenance_intervals }}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>保修期限:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.warranty_period }}</span>
                          </p>
                        </li>
                      </ul>
                    </i-col>
                    <i-col span="4" offset="1" style="border-right:1px dashed #2c8cf0; margin-top:15px;">
                      <ul>
                        <li>
                          <p>
                            <span>生产产家:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.producer }}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>联系员工:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contact_staff }}</span>
                          </p>
                        </li>
                      </ul>
                    </i-col>
                    <i-col span="4" offset="1" style="margin-top:15px;">
                      <ul>
                        <li>
                          <p>
                            <span>联系电话:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contact_phone }}</span>
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>联系邮箱:</span>
                            <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contact_email }}</span>
                          </p>
                        </li>
                      </ul>
                    </i-col>
                  </Row>
                </Card>
              </Row>-->
            <Row>
              <Card :bordered="false" class="paddingCardBottomUpdate" style="margin-top:10px;">
                <p slot="title">
                  <Icon type="md-bookmarks"></Icon>资产信息
                </p>
                <Row :gutter="20" style="height:68px;margin-left:25px;">
                  <i-col span="4" style="border-right:1px dashed #2c8cf0; margin-top:15px;">
                    <ul>
                      <li>
                        <p>
                          <span>产品名称:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.name }}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>运行状态:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{  deviceInfo.status }}</span>
                        </p>
                      </li>
                    </ul>
                  </i-col>
                  <i-col
                    span="4"
                    style="margin-left:1%; border-right:1px dashed #2c8cf0; margin-top:15px;"
                  >
                    <ul>
                      <li>
                        <p>
                          <span>安装日期:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.maintenance_date }}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>维护日期:</span>
                          <span
                            style="color:#2c8cf0;margin-left:20px"
                          >{{ deviceInfo.maintenance_date }}</span>
                        </p>
                      </li>
                    </ul>
                  </i-col>
                  <i-col
                    span="4"
                    style="margin-left:1%; border-right:1px dashed #2c8cf0; margin-top:15px;"
                  >
                    <ul>
                      <li>
                        <p>
                          <span>维护周期:</span>
                          <span
                            style="color:#2c8cf0;margin-left:20px"
                          >{{ deviceInfo.maintenance_intervals }}（月）</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>保修期限:</span>
                          <span
                            style="color:#2c8cf0;margin-left:20px"
                          >{{ deviceInfo.warranty_period }}（年）</span>
                        </p>
                      </li>
                    </ul>
                  </i-col>
                  <i-col
                    span="7"
                    style="margin-left:1%; border-right:1px dashed #2c8cf0; margin-top:15px;"
                  >
                    <ul>
                      <li>
                        <p>
                          <span>生产产家:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.producer }}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>联系员工:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contact_staff }}</span>
                        </p>
                      </li>
                    </ul>
                  </i-col>
                  <i-col span="4" style="margin-left:1%; margin-top:15px;">
                    <ul>
                      <li>
                        <p>
                          <span>联系电话:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contact_phone }}</span>
                        </p>
                      </li>
                      <!-- <li>
                        <p>
                          <span>联系邮箱:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contact_email }}</span>
                        </p>
                      </li>-->
                    </ul>
                  </i-col>
                </Row>
              </Card>
            </Row>
            </i-col>
          </Row>
<!-------下方列表------------------------------->
      </Content>
    </Layout>
  </div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
import {ChartPie, ChartBar, ChartBoxplot} from '_c/charts';
import deviceInfoList from './data/led_deviceinfodata'
import mapboxgl from 'mapbox-gl'
export default {
  name: "device_ap",
  data() {
    return {
      deviceInfo: {
        name: '爱尔视人行道灯',
        status: '正常运行',
        purchase_date: '2018-09-25',
        maintenance_date: '2019-09-25',
        maintenance_intervals: '3个月',
        warranty_period: '3年',
        producer: '爱尔视有限公司',
        contact_staff: '李工',
        contact_phone: '13578168700',
        contact_email: 'ligong@gmail.com'
      },

      ap_flowBarChart: null,
      ap_usingTimeBarChart: null,
      ap_guestBarChart: null,
      col_deviceTable: [
        { title: '状态', align: "center", slot: 'status', width: 80 },
        { title: '灯杆名称', align: "center", key: 'lightPoleName' },
        { title: '位置', align: "center", key: 'location' }
      ],
      dt_deviceTable: [
        {
          status: 1,
          lightPoleName: "智慧灯杆大三巴1001",
          location: "澳门大三巴道路左侧",
          _highlight: true
        },
        {
          location: "澳门大三巴道路中侧",
          status: 2,
          lightPoleName: "智慧灯杆大三巴1002"
        },
        {
          location: "澳门大三巴道路右侧",
          status: 2,
          lightPoleName: "智慧灯杆大三巴1003"
        }
      ],
    };
  },

methods: {

//表格隔行变色函数
  rowClassName: function (row, index) {
    if (index % 2 == 0) {
      return 'ivu-table-stripe-even'
    } else return 'ivu-table-stripe-odd'
  },
  // resize() {
  //   this.ap_flowBarChart.resize();
  //   this.ap_usingTimeBarChart.resize();
  //   this.ap_guestBarChart.resize();
  // },
  drawbarchart(id){
    this.charts = echarts.init(document.getElementById(id),'macarons');
    this.charts.setOption({
      color: ["#11969f"],
      title: {},
      tooltip: {},
      grid: {
        top: "5%",
        left: "1%",
        right: "1%",
        bottom: "5%",
        containLabel: true
      },
      xAxis: {
        color: ["#3398DB"],
        axisLabel: {
          textStyle: {
            color: "#fff",
            size:"14pt",
          }
        },
        axisLine:{
          lineStyle:{
            color:'#0087ED',
          }
        },
        type: "value",
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff",
            size:"14pt",
          }
        },
        axisLine:{
          lineStyle:{
            color:'#0087ED',
            width:1,//这里是为了突出显示加上的
          }
        },
        type: "category",
        data: ["小米", "华为", "三星", "OPPE", "Vivo", "魅族"]
      },
      series: [
        {
          name: "流量使用",
          type: "bar",
          data: [9, 3, 5, 6, 8, 6]
        }
      ],
      barWidth: 10,
    });
  },
  drawbarchart2(id){
    this.charts = echarts.init(document.getElementById(id),'macarons');
    this.charts.setOption({
    title : {
    },
    legend: {
        data:['客流统计','终端流量'],
        textStyle: {
            color:'#fff',         // 图例文字颜色
        }
    },
    calculable : true,
    grid: {
      top: "10%",
      left: "1%",
      right: "1%",
      bottom: "5%",
      containLabel: true
    },
  	color: ['#18c6d1','#fc370a'],
    xAxis : {
      color: ["#3398DB"],
      axisLabel: {
        textStyle: {
          color: "#fff",
          size:"14pt",
        }
      },
      axisLine:{
        lineStyle:{
          color:'#0087ED',
          width:1,
        }
      },
      type : 'category',
      data : ['AP001','AP002','AP003','AP004','AP005','AP006']
    },
    yAxis : {
      axisLabel: {
        textStyle: {
          color: "#fff",
          size:"14pt",
        }
      },
      axisLine:{
        lineStyle:{
          color:'#0087ED',
          width:1,//这里是为了突出显示加上的
        }
      },
      type : 'value',
      boundaryGap: [0, 0.01]
    },
    series : [
        {
            name:'客流统计',
            type:'bar',
            data:[500,2000,3600,12100,1000,2000,],
        },
        {
            name:'终端流量',
            type:'bar',
            data:[700,1500,4000,10000,3000,5000,],
        }
    ],
    barWidth: 10,
    });
    window.onresize = function(){
      this.charts.resize(); //myEchart为echarts.init初始化得到的对象
    }
  },
  createMap () {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiMjAxMGppbmciLCJhIjoiY2pyN3hwcWhiMDBrMjQzcGc1NndsaW1tbCJ9.BQoRib1rflv656nIy_5IEQ'
    // var coordinates = document.getElementById("coordinates");
    const map = new mapboxgl.Map({
      container: this.$refs.basicMapbox,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [113.51552328392535, 22.352760037751793], // 设置地图中心
      zoom: 11 // 设置地图比例
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
    var marker = new mapboxgl.Marker()
    .setLngLat([113.539644,22.354442])
    .addTo(map);
  },
},

  mounted() {

    this.drawbarchart("staytime_chart");
    this.drawbarchart2("flow_chart");
    this.createMap();
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.ap_flowBarChart);
    // 绘制图表
    myChart.setOption({
      color: ["#3398DB"],
      title: {},
      tooltip: {},
      xAxis: {
        color: ["#3398DB"],
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        },
        data: [
          "AP001",
          "AP002",
          "AP003",
          "AP004",
          "AP005",
          "AP006",
          "AP007",
          "AP008",
          "AP009",
          "AP010",
          "AP011",
          "AP012"
        ]
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
        // data: [2000, 4000, 8000, 10000, 12000]
      },
      series: [
        {
          name: "流量使用",
          type: "bar",
          data: [
            500,
            2000,
            3600,
            12100,
            1000,
            2000,
            5122,
            200,
            360,
            1110,
            1011,
            2011
          ]
        }
      ]
    });


    myChart = echarts.init(this.$refs.ap_guestBarChart);
    // 绘制图表
    myChart.setOption({
    title : {
    },
    legend: {
        data:['客流统计','终端流量'],
        padding:-5,
        textStyle: {
            color:'#fff',         // 图例文字颜色
        }
    },
    calculable : true,
    grid: {
      top: "5%",
      left: "1%",
      right: "1%",
      bottom: "5%",
      containLabel: true
    },
  	color: ['#18c6d1','#fc370a'],
    xAxis : {
      color: ["#3398DB"],
      axisLabel: {
        textStyle: {
          color: "#fff",
          size:"14pt",
        }
      },
      axisLine:{
        lineStyle:{
          color:'#0087ED',
          width:1,
        }
      },
      type : 'category',
      data : ['AP001','AP002','AP003','AP004','AP005','AP006']
    },
    yAxis : {
      axisLabel: {
        textStyle: {
          color: "#fff",
          size:"14pt",
        }
      },
      axisLine:{
        lineStyle:{
          color:'#0087ED',
          width:1,//这里是为了突出显示加上的
        }
      },
      type : 'value',
      boundaryGap: [0, 0.01]
    },
    series : [
        {
            name:'客流统计',
            type:'bar',
            data:[500,2000,3600,12100,1000,2000,],
        },
        {
            name:'终端流量',
            type:'bar',
            data:[700,1500,4000,10000,3000,5000,],
        }
    ],
    barWidth: 10,
    });
    this.$nextTick(() => {
      on(window, "resize", this.resize);
    });
    // window.onresize = () => {
    //   let sChart = echarts.getInstanceByDom(document.getElementById('staytime_chart'));
    //   sChart.resize();
    //   let fChart = echarts.getInstanceByDom(document.getElementById('flow_chart'));
    //   fChart.resize();
    // };
  }
};
</script>

<style  lang="less" scoped>

.imgs {
  padding-left:20px !important;
  padding-right:20px !important;
  padding-top:20px !important;
  padding-bottom:20px !important;
  width: 80%;
  float:right;
  height: 549px;
}


.col1 {
  height: 600px;
}

.ivu-card-head {
  background: #09101d;

}
ul {
  list-style: none;
}
.paging .ivu-page-total {
  color: white !important;
}
.device_img {
  width: 150px;
  height: 300px;
}

.item-list {
  font-size: 14px;
}
.item-list .ivu-col {
  margin-bottom: 12px;
}
.ap_flowBarChart {
  height: 300px;
  width: 100%;
}
</style>

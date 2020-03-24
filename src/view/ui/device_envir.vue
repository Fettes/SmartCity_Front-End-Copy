<template>
  <div class="device_envir">
    <Layout>
      <Content style="padding:5px; padding-left:0px;">
          <!----------------- 左侧list --------------------->
        <Row :gutter="10">
        <i-col span="5">
            <Card shadow class="treeCard">
              <p slot="title">
                <Icon type="ios-paper"></Icon>设备列表
                <Button
                  size="small"
                  style="float:right"
                  type="primary"
                  @click="showMap = true;createMapLarge()"
                >
                  <Icon type="md-pin" style="float:right" size="17"/>
                </Button>
              </p>
              <Tree :data="AssetData" @on-select-change="chooseDevice"></Tree>
            </Card>
        </i-col>
        <i-col span="19" offset="5">
          <Drawer v-model="showMap" width="100%" :closable="true" :inner="true" :transfer="false">
            <div ref="basicMapbox2" style=" height:100%; width:98%;"></div>
          </Drawer>
          <!----------------- 中间图片 --------------------->
          <Row :gutter="12">
          <i-col span="7">
            <Card :bordered="false" class="paddingCardMiddleUpdate">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>灯柱样式
              </p>
              <div class="img-style" style="height:635px;">
                <Row>
                  <img src="../../assets/images/light_envir.png" class="imgs">
                </Row>

                <Row style="text-align:center;margin-top: 10px;">
                  <Button class="open-btn" type="primary" size="small">开启</Button>
                  <Button class="open-btn" type="primary" size="small" style="margin-left:30px;">关闭</Button>
                </Row>
              </div>
            </Card>
          </i-col>
          <!------------------ 右侧上方框框 --------------------->
          <i-col span="17" >
            <Drawer
              title="选择日期时间范围"
              class="EnvirDrawer"
              v-model="addDateDrawer"
              width="58%"
              :closable="true"
              :inner="true"
              :transfer="false"
            >
              <Form @submit.prevent="submit">
                <Row>
                  <i-col span="22" offset="1" class="datepicker" sytle="height:300px">
                    <FormItem label="选择日期时间：" label-position="left">
                      <DatePicker
                        confirm
                        type="datetimerange"
                        placeholder="选择日期"
                        style="width: 100%"
                        placement="bottom-end"
                        v-model="choose.date"
                      ></DatePicker>
                    </FormItem>
                  </i-col>
                </Row>
              </Form>
              <div class="ivu-drawer-footer">
                <Button style="margin-right: 8px" @click="addDateDrawer = false">取消</Button>
                <Button
                  type="primary"
                  html-type="submit"
                  @click="getdate(), addDateDrawer = false"
                >确定</Button>
              </div>
            </Drawer>

            <Card shadow class="paddingCardRightTopUpdate">
              <p slot="title">
                <Icon type="md-options"></Icon>传感器数据
                <Button
                  size="small"
                  style="float:right"
                  type="primary"
                  @click="addDateDrawer = true"
                >选择日期</Button>
              </p>
              <Row>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="normalCard" style="margin-top:25px;">
                    <div slot="title">
                      <Icon type="ios-thermometer-outline"/>温度
                    </div>
                    <p>{{sensordata.temperature}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="errorCard" style="margin-top:25px;">
                    <div slot="title">
                      <Icon type="ios-water"/>水位
                    </div>
                    <p>{{sensordata.waterLevel}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="normalCard" style="margin-top:25px;">
                    <div slot="title">
                      <Icon type="md-water"/>湿度
                    </div>
                    <p>{{sensordata.waterLevel}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="warnCard" style="margin-top:25px;">
                    <div slot="title">
                      <Icon type="logo-freebsd-devil"/>PM10
                    </div>
                    <p>{{sensordata.pm10}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="errorCard" style="margin-top:25px;">
                    <div slot="title">
                      <Icon type="logo-freebsd-devil"/>PM2.5
                    </div>
                    <p>{{sensordata.pm2d5}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1">
                  <Card shadow class="normalCard" style="margin-top:25px;">
                    <div slot="title">
                      <Icon type="ios-radio"/>噪声
                    </div>
                    <p>{{sensordata.noise}}</p>
                  </Card>
                </i-col>
              </Row>
              <Row>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="normalCard" style="margin-top:25px;margin-bottom:30px;">
                    <div slot="title">水平风速</div>
                    <p>{{sensordata.windSpeed}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="normalCard" style="margin-top:25px;margin-bottom:30px;">
                    <div slot="title">
                      <Icon type="md-bonfire"/>CO
                    </div>
                    <p>{{sensordata.co}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="warnCard" style="margin-top:25px;margin-bottom:30px;">
                    <div slot="title">
                      <Icon type="md-bonfire"/>SO2
                    </div>
                    <p>{{sensordata.so2}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="normalCard" style="margin-top:25px;margin-bottom:30px;">
                    <div slot="title">氮氧化物</div>
                    <p>{{sensordata.nox}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1" style="margin-right:25px;">
                  <Card shadow class="normalCard" style="margin-top:25px;margin-bottom:30px;">
                    <div slot="title">
                      <Icon type="md-bonfire  "/>O3
                    </div>
                    <p>{{sensordata.o3}}</p>
                  </Card>
                </i-col>
                <i-col span="2" offset="1">
                  <Card shadow class="normalCard" style="margin-top:25px;margin-bottom:30px;">
                    <div slot="title">
                      <Icon type="ios-rainy"/>雨量
                    </div>
                    <p>{{sensordata.rainfall}}</p>
                  </Card>
                </i-col>
              </Row>
            </Card>
            <!------------------ 右侧左侧报警 --------------------->
            <Row :gutter="12">
              <i-col span="10">
                <Card class="paddingCardRightMiddleUpdate" style="height:422px;margin-top:12px;">
                  <p slot="title">
                    <Icon type="ios-alert-outline"></Icon>GIS地图
                  </p>
                  <div style="height:381px;width:100%;" ref="basicMapbox"></div>
                </Card>
              </i-col>
              <i-col span="14">
                <Card
                  shadow
                  class="paddingCardRightLeftUpdate"
                  style="height:266px;margin-top:12px;"
                >
                  <p slot="title">
                    <Icon type="ios-warning"></Icon>报警
                  </p>
                  <div
                    style="height:226px; padding-top:10px; padding-left:30px; color:#fff"
                  >
                    <ul>
                      <li style="line-height:34px;" v-for="(item, index) in alarmList" :key="index">
                        <span style="margin-right:10px" v-if="item.status === 1">
                          <Icon type="ios-radio-button-on" color="yellow" size="18"></Icon>
                        </span>
                        <span style="margin-right:10px" v-else>
                          <Icon type="ios-radio-button-on" color="red" size="18"></Icon>
                        </span>
                        <span style="margin-right:10px">{{item.deviceNo}}</span>
                        <span style="margin-right:10px; ">{{item.deviceType}}</span>
                        <span style="margin-right:20px; color:#2c8cf0">{{item.alarmTypeI}}</span>
                        <span>{{item.alarmTime}}</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </i-col>
              <!------------------ 右侧右边下边运行状态 --------------------->
              <i-col span="14">
                <Card shadow class="paddingCardRightMiddleUpdate" style="height:142px;margin-top:12px;">
                  <p slot="title">
                    <Icon type="md-options"/>运行状态
                  </p>
                  <ul>
                    <li>
                      <Row style="text-align:left;padding-left:20px;padding-top:10px;">
                        <i-col span="6">
                          <p>产品名称:</p>
                        </i-col>
                        <i-col span="15">
                          <span
                            style="color:#2c8cf0;padding-left:10px;"
                          >{{ runningInfoList.lightPoleName }}</span>
                        </i-col>
                      </Row>
                    </li>
                    <li>
                      <Row style="text-align:left;padding-left:20px;">
                        <i-col span="6">
                          <p>工作温度:</p>
                        </i-col>
                        <i-col span="5">
                          <span
                            style="color:#2c8cf0;padding-left:10px;"
                          >{{ runningInfoList.workingTemp}}</span>
                        </i-col>
                        <i-col span="6">
                          <p>纬度:</p>
                        </i-col>
                        <i-col span="5">
                          <span
                            style="color:#2c8cf0;padding-left:10px;"
                          >{{ runningInfoList.latitude }}</span>
                        </i-col>
                      </Row>
                    </li>
                    <li>
                      <Row style="text-align:left;padding-left:20px;">
                        <i-col span="6">
                          <p>告警深度:</p>
                        </i-col>
                        <i-col span="5">
                          <span
                            style="color:#2c8cf0;padding-left:10px;"
                          >{{ runningInfoList.waterAlarmDepth }}</span>
                        </i-col>
                        <i-col span="6">
                          <p>经度:</p>
                        </i-col>
                        <i-col span="5">
                          <span
                            style="color:#2c8cf0;padding-left:10px;"
                          >{{ runningInfoList.longitude }}</span>
                        </i-col>
                      </Row>
                    </li>
                    <li>
                      <Row style="text-align:left;padding-left:20px;padding-bottom:8px;">
                        <i-col span="6">
                          <p>工作集电压值:</p>
                        </i-col>
                        <i-col span="5">
                          <span
                            style="color:#2c8cf0;padding-left:10px;"
                          >{{ runningInfoList.workingVoltage}}</span>
                        </i-col>
                        <i-col span="6">
                          <p>准确度:</p>
                        </i-col>
                        <i-col span="5">
                          <span
                            style="color:#2c8cf0;padding-left:10px;"
                          >{{ runningInfoList.waterAccuracy}}</span>
                        </i-col>
                      </Row>
                    </li>
                  </ul>
                </Card>
              </i-col>
            </Row>
          </i-col>
        </Row>
        <!-------下方列表------------------------------->
          <Row style="margin-top:10px;">
            <Card :bordered="false" class="paddingCardBottomUpdate">
              <p slot="title">
                <Icon type="md-bookmarks"></Icon>资产信息
              </p>
              <Row
                :gutter="20"
                v-model="deviceInfo"
                class="deviceinfo"
                style="height:68px;"
              >
              <i-col span="5" style="margin-left: 15px; border-right:1px dashed #2c8cf0; margin-top:15px;">
                <ul>
                  <li>
                    <p>
                      <span>产品名称:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.deviceName }}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>运行状态:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.status }}</span>
                    </p>
                  </li>
                </ul>
              </i-col>
              <i-col span="5"  style="border-right:1px dashed #2c8cf0; margin-top:15px;margin-left:2%;">
                <ul>
                  <li>
                    <p>
                      <span>购买日期:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.installTime }}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>维护日期:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.maintenanceDate }}</span>
                    </p>
                  </li>
                </ul>
              </i-col>
              <i-col span="3"  style="width:15%; border-right:1px dashed #2c8cf0; margin-top:15px;margin-left:2%;">
                <ul>
                  <li>
                    <p>
                      <span>维护周期:</span>
                      <span
                        style="color:#2c8cf0;margin-left:20px"
                      >{{ deviceInfo1.maintenancePeriod }}（月）</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>保修期限:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.guaranteeTime }}（月）</span>
                    </p>
                  </li>
                </ul>
              </i-col>
              <i-col span="4" style="border-right:1px dashed #2c8cf0; margin-top:15px;margin-left:2%; ">
                <ul>
                  <li>
                    <p>
                      <span>生产产家:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.manufacturer }}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>联系员工:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.contact }}</span>
                    </p>
                  </li>
                </ul>
              </i-col>
              <i-col span="5" style="width:16%; margin-top:15px;margin-left:2%;">
                <ul>
                  <li>
                    <p>
                      <span>联系电话:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.tel }}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>联系邮箱:</span>
                      <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo1.contact_email }}</span>
                    </p>
                  </li>
                </ul>
              </i-col>
            </Row>
          </Card>
        </Row>
        </i-col>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar, ChartPiee } from "_c/charts"; //ChartPie,
import Tables from "_c/tables";
import echarts from "echarts";
import mapboxgl from "mapbox-gl";
import {
  getAllEnvirSensor,
  getEnvirSensorData,
  getassets,
  getAlarmMessage,
  getAssetDevices
} from "@/api/envir";

let devicewarning = (h, { root, node, data }) => {
  return h(
    "span",
    {
      style: {
        display: "inline-block",
        width: "100%"
      }
    },
    [
      h("span", [
        h("Icon", {
          props: {
            type: "ios-radio-button-on"
          },
          style: {
            marginRight: "12px",
            color: "yellow"
          }
        }),
        h("span", data.title)
      ])
    ]
  );
};

let devicefalse = (h, { root, node, data }) => {
  return h(
    "span",
    {
      style: {
        display: "inline-block",
        width: "100%"
      }
    },
    [
      h("span", [
        h("Icon", {
          props: {
            type: "ios-radio-button-on"
          },
          style: {
            marginRight: "12px",
            color: "red"
          }
        }),
        h("span", data.title)
      ])
    ]
  );
};
let devicerun = (h, { root, node, data }) => {
  return h(
    "span",
    {
      style: {
        display: "inline-block",
        width: "100%"
      }
    },
    [
      h("span", [
        h("Icon", {
          props: {
            type: "ios-radio-button-on"
          },
          style: {
            marginRight: "12px",
            color: "green"
          }
        }),
        h("span", data.title)
      ])
    ]
  );
};

export default {
  name: "device_envir",
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    ChartPiee,
    Tables
    //Example
  },
  data() {
    return {
      deviceInfo1:[],
      showMap: false,
      concentratorLocatoin: [],
      lightPoleLocation: [],
      //左侧树数据
      AssetData: [],
      //左侧表格表头
      dt_columns: [
        { title: "状态", align: "center", slot: "status", width: 80 },
        { title: "灯杆名称", align: "center", key: "lightPoleName" },
        { title: "位置", align: "center", key: "location" }
      ],
      //左侧表格数据库取值
      dt_sensorListfromDB: [],
      //抽屉日期
      addDateDrawer: false,
      choose: {
        date: ""
      },
      //当前设备id
      currentDevice: "",
      //右侧sensor数据
      sensordata: { temperature: 0 },
      //资产数据
      deviceInfo: {
        deviceName: "",
        status: "",
        installTime: "",
        maintenanceDate: "",
        maintenancePeriod: 0,
        guaranteeTime: 0,
        manufacturer: "",
        contact: "",
        tel: "",
        contact_email: ""
      },
      //运行状态数据
      runningInfoList: {},
      //piechart数据
      pieData: [
        { name: "二氧化硫", value: 221 },
        { name: "氮氧化物", value: 121 },
        { name: "臭氧", value: 121 },
        { name: "一氧化碳", value: 231 }
      ],
      alarmList: [
        {
          status: 1,
          lamppost: "1003",
          name: "人行道灯",
          problem: "不通电",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 1,
          lamppost: "1004",
          name: "人行道灯",
          problem: "不通电",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 2,
          lamppost: "1009",
          name: "人行道灯",
          problem: "不在线",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 0,
          lamppost: "1010",
          name: "人行道灯",
          problem: "不正常",
          datetime: "2018-12-12 09:12:12"
        }
      ],
      dt_tableData: [
        {
          title: "灯杆1",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700201大气传感",
              expand: true,
              render: devicerun
            },
            {
              title: "ETAR700201气象传感",
              expand: true,
              render: devicerun
            }
          ]
        },
        {
          title: "灯杆2",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700202大气传感",
              expand: true,
              render: devicerun
            },
            {
              title: "ETAR700202气象传感",
              expand: true,
              render: devicerun
            }
          ]
        },
        {
          title: "灯杆3",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700203大气传感",
              expand: true,
              render: devicerun
            },
            {
              title: "ETAR700203气象传感",
              expand: true,
              render: devicerun
            }
          ]
        },
        {
          title: "灯杆4",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700204大气传感",
              expand: true,
              render: devicefalse
            },
            {
              title: "ETAR700204气象传感",
              expand: true,
              render: devicewarning
            }
          ]
        },
        {
          title: "灯杆5",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700205大气传感",
              expand: true,
              render: devicerun
            },
            {
              title: "ETAR700205气象传感",
              expand: true,
              render: devicerun
            }
          ]
        },
        {
          title: "灯杆6",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700206大气传感",
              expand: true,
              render: devicefalse
            },
            {
              title: "ETAR700206气象传感",
              expand: true,
              render: devicefalse
            }
          ]
        },
        {
          title: "灯杆7",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700207大气传感",
              expand: true,
              render: devicerun
            },
            {
              title: "ETAR700207气象传感",
              expand: true,
              render: devicerun
            }
          ]
        },
        {
          title: "灯杆8",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [h("span", [h("span", data.title)])]
            );
          },
          children: [
            {
              title: "ETAR700208大气传感",
              expand: true,
              render: devicerun
            },
            {
              title: "ETAR700208气象传感",
              expand: true,
              render: devicerun
            }
          ]
        }
      ]
    };
  },
  methods: {
    /* ----------------------------------------------- */
    //调用地图函数
    createMap(lat, lng) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiMjAxMGppbmciLCJhIjoiY2pyN3hwcWhiMDBrMjQzcGc1NndsaW1tbCJ9.BQoRib1rflv656nIy_5IEQ";
      // var coordinates = document.getElementById("coordinates");
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: "mapbox://styles/mapbox/light-v9",
        center: [lng, lat], // 设置地图中心
        zoom: 11 // 设置地图比例
      });

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
      );
      var marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    },
    /*  --------------------------------------------------*/
    //表格隔行变色
    rowClassName: function(row, index) {
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },
    //绘画piechart
    drawpiechart(id) {
      this.charts = echarts.init(document.getElementById(id), "macarons");
      this.charts.setOption({
        title: {
          text: "空气环境",
          subtext: this.subtext,
          textStyle: {
            color: "#7999CF"
          },
          x: "center",
          y: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: [
          "#2d8cf0",
          "#19be6b",
          "#ff9900",
          "#E46CBB",
          "#9A66E4",
          "#ed3f14"
        ],
        legend: {
          orient: "vertical",
          left: "left",
          data: this.pieData,
          textStyle: {
            //图例文字的样式
            color: [
              "#2d8cf0",
              "#19be6b",
              "#ff9900",
              "#E46CBB",
              "#9A66E4",
              "#ed3f14"
            ]
          }
        },
        series: [
          {
            name: "空气数据",
            type: "pie",
            radius: ["50%", "70%"],
            data: this.pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              normal: {
                show: true,
                formatter: "{b}: {c}({d}%)"
              }
            }
          }
        ]
      });
    }, //地数数据获取函数
    createMapRenderData(data) {
      var concentratorList = [];
      var lightPoleList = [];
      //获取集中器地图所需列表
      for (let i in data) {
        var tempCon = new Object();
        tempCon["cname"] = data[i]["name"];
        tempCon["longitude"] = data[i]["children"][0]["longitude"];
        tempCon["latitude"] = data[i]["children"][0]["latitude"];
        if (data[i]["status"] == 0) {
          tempCon["status"] = "设备正常";
        } else if (data[i]["status"] == 1) {
          tempCon["status"] = "连接中断";
        } else if (data[i]["status"] == 2) {
          tempCon["status"] = "恢复连接";
        } else if (data[i]["status"] == 4) {
          tempCon["status"] = "未登录";
        } else if (data[i]["status"] == 8) {
          tempCon["status"] = "上电";
        } else if (data[i]["status"] == 16) {
          tempCon["status"] = "断电";
        }
        this.concentratorLocatoin.push(tempCon);
      }
      //获取地图所需灯具信息列表
      for (let i in data) {

        if (data[i]["children"] != null) {
          var tempchildren = data[i]["children"];
          for (let y in tempchildren) {
            var tempLight = new Object();
            if (tempchildren[y]["children"] != null) {
              tempLight["lname"] = tempchildren[y]["name"]; //灯杆名字
              /*tempLight["cname"] = tempchildren[y]["parentId"]; *///集中器名字
              tempLight["longitude"] = tempchildren[y]["longitude"];
              tempLight["latitude"] = tempchildren[y]["latitude"];
              var tempchild = tempchildren[y]["children"];
              for (let z in tempchild) {
                if (tempchild[z]["status"] == 0) {
                  tempLight["status"] = "在线";
                } else if (tempchild[z]["status"] == 1) {
                  tempLight["status"] = "不在线";
                } else if (tempchild[z]["status"] == 2) {
                  tempLight["status"] = "未配置到终端";
                } else if (tempchild[z]["status"] == 4) {
                  tempLight["status"] = "控制器故障";
                } else if (tempchild[z]["status"] == 16) {
                  tempLight["status"] = "集中器不在线";
                } else if (tempchild[z]["status"] == 32) {
                  tempLight["status"] = "控制器失控";
                }
                this.lightPoleLocation.push(tempLight);
              }
            }
          }
        }
      }
      console.log(this.lightPoleLocation);
      console.log("4444444444444444444444444")
      console.log(this.concentratorLocatoin);
    },
    createMapLarge(lat, lng) {
      if(lat==null){
        lat=this.deviceInfo1.latitude
      }if(lng==null){
        lng=this.deviceInfo1.longitude
      }
      mapboxgl.accessToken =
        "pk.eyJ1IjoiMjAxMGppbmciLCJhIjoiY2pyN3hwcWhiMDBrMjQzcGc1NndsaW1tbCJ9.BQoRib1rflv656nIy_5IEQ";
      //获取标记点信息
      var tempConfeatures = this.getDynanmicConFeatures();
      var tempLightfeatures = this.getDynanmicLightFeatures();
      //放入json数据中
      var geojson = {
        type: "FeatureCollection",
        features: tempConfeatures
      };
      var geojson2 = {
        type: "FeatureCollection",
        features: tempLightfeatures
      };
      //构建地图
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox2,
        style: "mapbox://styles/mapbox/light-v9",
        center: [lng, lat], // 设置地图中心
        zoom: 14 // 设置地图比例
      });
      // add markers to map
      geojson.features.forEach(function(marker) {
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "markerCon";
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                marker.properties.title +
                "</h3><p>" +
                marker.properties.description +
                "</p>"
              )
          )
          .addTo(map);
      });
      // add markers to map
      geojson2.features.forEach(function(marker) {
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "markerLight";
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                marker.properties.title +
                "</h3><p>" +
                marker.properties.description +
                "</p>"
              )
          )
          .addTo(map);
      });

      // 使用定位模块
      /*map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserLocation: true,
          zoom: 10
        })
      );*/
      map.on("load", function() {
        map.resize();
      });
    },
    getDynanmicConFeatures() {
      var feature = [];
      for (let i in this.concentratorLocatoin) {
        var temp1 = new Object();
        temp1["type"] = "Feature";
        //property
        var tempproperty = new Object();
        temp1["properties"] = tempproperty;
        tempproperty["title"] = this.concentratorLocatoin[i]["cname"];
        tempproperty["description"] =
          "集中器状态：" +
          this.concentratorLocatoin[i]["status"] +
          "<br>集中器坐标为：[" +
          this.concentratorLocatoin[i]["longitude"] +
          "," +
          this.concentratorLocatoin[i]["latitude"] +
          "]";
        //geometry
        var tempgeometry = new Object();
        temp1["geometry"] = tempgeometry;
        tempgeometry["type"] = "Point";
        var coordinatesarray = [];
        coordinatesarray.push(this.concentratorLocatoin[i]["longitude"]);
        coordinatesarray.push(this.concentratorLocatoin[i]["latitude"]);
        tempgeometry["coordinates"] = coordinatesarray;
        feature.push(temp1);
      }
      console.log("111111111111111111111111111111111111111111111111111")
      return feature;
    },
    getDynanmicLightFeatures() {
      var feature = [];
      for (let i in this.lightPoleLocation) {
        var temp1 = new Object();
        temp1["type"] = "Feature";
        //property
        var tempproperty = new Object();
        temp1["properties"] = tempproperty;
        tempproperty["title"] = this.lightPoleLocation[i]["lname"];
        tempproperty["description"] =

          "灯具坐标为：[" +
          this.lightPoleLocation[i]["longitude"] +
          "," +
          this.lightPoleLocation[i]["latitude"] +
          "]<br>灯具状态：" +
          this.lightPoleLocation[i]["status"];
        //geometry
        var tempgeometry = new Object();
        temp1["geometry"] = tempgeometry;
        tempgeometry["type"] = "Point";
        var coordinatesarray = [];
        coordinatesarray.push(this.lightPoleLocation[i]["longitude"]);
        coordinatesarray.push(this.lightPoleLocation[i]["latitude"]);
        tempgeometry["coordinates"] = coordinatesarray;
        feature.push(temp1);
      }
      console.log("111111111111111111111111111111111111111111111111111")
      return feature;
    },
    /* -----------------------------------------------*/
    //获取左侧树 所有设备列表
    getDeviceList(device_type) {
      let token = this.$store.state.user.token;
      getAssetDevices({
        deviceType: device_type,
        token: token
      })
        .then(res => {
          const data = res.data.result;
          console.log(res.data.result);
          let currentDevice = res.data.result[0]["deviceLightPoleDtoList"][0]["deviceAssetList"][0];
          this.deviceInfo1 = currentDevice;
          this.convertDiviceListFormat(data);
          this.createMap(data[0]["deviceLightPoleDtoList"][0].latitude, data[0]["deviceLightPoleDtoList"][0].longitude);

          this.createMapRenderData(data)
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //左侧树 数据格式化
    convertDiviceListFormat(data) {
      for (let i in data) {
        data[i]["title"] = data[i]["name"];
        data[i]["expand"] = true;
        data[i]["children"] = data[i]["deviceLightPoleDtoList"];
        if (data[i]["children"] != null) {
          for (let y in data[i]["children"]) {
            data[i]["children"][y]["title"] = data[i]["children"][y]["name"];
            data[i]["children"][y]["expand"] = true;
            data[i]["children"][y]["children"] =
              data[i]["deviceLightPoleDtoList"][y]["deviceAssetList"];
            if (data[i]["children"][y]["children"] != null) {
              for (let z in data[i]["children"][y]["children"]) {
                if (i == 0 && y == 0 && z == 0) {
                  this.$set(data[i]["children"][y]["children"][z],"selected",true);
                }
                data[i]["children"][y]["children"][z]["title"] =
                  data[i]["children"][y]["children"][z]["deviceName"];
                data[i]["children"][y]["children"][z]["latitude"] = data[i]["children"][y]["latitude"];
                data[i]["children"][y]["children"][z]["longitude"] = data[i]["children"][y]["longitude"];
                data[i]["children"][y]["children"][z]["expand"] = true;

              }
            }
          }
        }
      }
      this.AssetData = data;
    },
    /* ---------------------------------------------------*/
    //左侧表格数据获取
    getEnvirList(pageNum) {
      let token = this.$store.state.user.token;
      let pageNo = pageNum;
      let pageSize = 10;
      //调用后台方法
      getAllEnvirSensor({
        token: token,
        pageNo: pageNo,
        pageSize: pageSize
      })
        .then(res => {
          console.log("=========================");
          console.log("左侧list:");
          console.log(res.data.result);
          res.data.result[0]._highlight = true;
          this.currentDeviceId = res.data.result[0].sensorDeviceId;
          this.runningInfoList = res.data.result[0];
          this.dt_sensorListfromDB = res.data.result;
          this.getSensorData(
            "2019-3-28 00:00:00",
            "2019-3-29 00:00:00",
            this.currentDeviceId
          );
          this.getDeviceInfo(3, this.currentDeviceId);
          this.getAlarm(this.currentDeviceId);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //设备表格每行点击数据更新(括号内参数顺序不能变)
    chooseDevice(data, index) {
      //右侧数据更新(获取当前deviceid)
      console.log(data[0])
      let device_id = data[0].id;
      console.log(data[0].id)
      this.currentDevice = data[0].id;

      this.deviceInfo1 = data[0];
      let lat = parseFloat(data[0].latitude);
      let lng = parseFloat(data[0].longitude);
      this.createMapLarge(lat, lng);
      this.createMap(lat, lng);
      //资产信息更新
     /* let device_type = 3;
      this.getDeviceInfo(device_type, device_id);*/
      //运行状态更新
      this.runningInfoList = data[0];
      //报警更新
      this.getAlarm(device_id);
    },

    /* ---------------------------------------------------*/
    //右侧数据获取
    getSensorData(beginTime, endTime, deviceId) {
      let token = this.$store.state.user.token;
      //调用后台方法
      getEnvirSensorData({
        token: token,
        beginTime: beginTime,
        endTime: endTime,
        deviceId: deviceId
      })
        .then(res => {
          console.log("=========================");
          console.log("右侧list:");
          console.log(res.data.result);
          this.sensordata = res.data.result;
          //取值后直接画图
          this.pieData[0].value = this.sensordata.so2;
          this.pieData[1].value = this.sensordata.nox;
          this.pieData[2].value = this.sensordata.o3;
          this.pieData[3].value = this.sensordata.co;
          this.$nextTick(function() {
            this.drawpiechart("piechart");
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //获取输入时间
    getdate() {
      var date = this.choose.date;
      var starttime = new Date(date[0]).Format("yyyy-MM-dd HH:mm:ss");
      var endtime = new Date(date[1]).Format("yyyy-MM-dd HH:mm:ss");
      let deviceId = this.currentDeviceId;
      this.getSensorData(starttime, endtime, deviceId);
    },
    /*告警分析------------------------------------------------------------- */
    getAlarm(deviceId) {
      let token = this.$store.state.user.token;
      getAlarmMessage({
        token: token,
        pageNo: 1,
        pageSize: 10,
        deviceType: 3
      })
        .then(res => {
          console.log("=========================");
          console.log("告警分析:");
          console.log(res.data);
          this.alarmList = res.data.result;
          this.AlarmFormate(this.alarmList);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //设备状态指示灯解析
    AlarmFormate(data) {
      for (let i in data) {
        if (data[i]["alarmTypeI"] == "0") {
          data[i]["alarmTypeI"] = "未知类型";
        }
        if (data[i]["alarmTypeI"] == "1") {
          data[i]["alarmTypeI"] = "设备断电";
        }
        if (data[i]["alarmTypeI"] == "2") {
          data[i]["alarmTypeI"] = "设备离线";
          data[i]["status"] = 1;
        }
        if (data[i]["alarmTypeI"] == "3") {
          data[i]["alarmTypeI"] = "运行异常";
        }
        if (data[i]["alarmTypeI"] == "4") {
          data[i]["alarmTypeI"] = "水浸告警";
        }
        if (data[i]["alarmTypeI"] == "5") {
          data[i]["alarmTypeI"] = "高温告警";
        }
        if (data[i]["alarmTypeI"] == "6") {
          data[i]["alarmTypeI"] = "高湿告警";
        }
        if (data[i]["alarmTypeI"] == "7") {
          data[i]["alarmTypeI"] = "维护过期";
        }
        if (data[i]["alarmTypeI"] == "8") {
          data[i]["alarmTypeI"] = "空气污染";
        }
      }
    },

    /* ---------------------------------------------------*/
    //获取资产信息
    getDeviceInfo(deviceType, deviceID) {
      let token = this.$store.state.user.token;
      //调用后台方法
      getassets({
        token: token,
        deviceId: deviceID,
        deviceType: deviceType
      })
        .then(res => {
          console.log("=========================");
          console.log("下方list:");
          console.log(res.data+"---");
          this.deviceInfo = res.data;
          this.DeviceInfoFormate(res.data);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //运行状态文字转换
    DeviceInfoFormate(data) {
      if (data["status"] == 2) {
        data["status"] = "设备离线";
      }
      if (data["status"] == 1) {
        data["status"] = "运行正常";
      }
      if (data["status"] == 0) {
        data["status"] = "设备断电";
      }

      var install = data.installTime + "";
      var maintain = data.maintenanceDate + "";
      if (install.length > 10) {
        install = install.substring(0, install.length - 9);
      }
      if (maintain.length > 10) {
        maintain = maintain.substring(0, maintain.length - 9);
      }
      data["installTime"] = install;
      data["maintenanceDate"] = maintain;
    },

    /* ---------------------------------------------------*/
    initData() {
      this.getDeviceList(3);
      this.getEnvirList(1);

    }
  },

  mounted() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
//图片高度
.imgs {
  height: 557px;
  width: 80%;
  float: right;
}
//图片居中
.img-style {
  text-align: center;
}
.count-style {
  font-size: 50px;
}
ul {
  list-style: none;
}
</style>

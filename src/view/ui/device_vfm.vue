<template>
  <div class="vfm">
    <Layout>
      <Content style="padding: 5px;padding-left:0px;">
        <Row :gutter="10">
          <i-col span="5">
            <Card :bordered="false" class="paddingCardLeftUpdate">
              <p slot="title">
                <Icon type="ios-paper" size="24"/>设备列表
                <Button
                  size="small"
                  style="float:right"
                  type="primary"
                  @click="showMap = true;createMapLarge()"
                >
                  <Icon type="md-pin" style="float:right" size="17"/>
                </Button>

              </p>
              <div class="device_table" style="margin-left:10px;">
                <Tree :data="dt_deviceList" @on-select-change="chooseDevice"></Tree>
              </div>
            </Card>
          </i-col>

          <i-col span="19">
            <Drawer v-model="showMap" width="100%" :closable="true" :inner="true" :transfer="false">
              <div ref="basicMapbox2" style=" height:100%; width:100%;"></div>
            </Drawer>
            <Row>
              <i-col span="8">
                <Card :bordered="false" class="paddingCardMiddleUpdate" style="margin-right:10px;">
                  <p slot="title">
                    <Icon type="logo-instagram"/>监控画面
                  </p>
                  <Row style="height:635px;">
                    <Row>
                      <img src="../../assets/images/pole_vfm.png" class="imgs">
                    </Row>
                    <Row style="text-align:center;margin-top: 10px;">
                      <Button type="primary" size="small" @click="openDevice()">开启</Button>
                      <Button type="primary" size="small" @click="closeDevice()" style="margin-left:30px;">关闭</Button>
                    </Row>
                  </Row>
                </Card>
              </i-col>

              <i-col span="16">
                <Card shadow class="paddingCardRightMiddleUpdate">
                  <p slot="title">
                    <Icon type="ios-pie"/>数据分析
                    <!-- <button type="" class="search-btn ivu-btn ivu-btn-primary ivu-btn-small" @click="showtimechoose=true"  type="primary" style="float:right">选择时间</button> -->
                  </p>

                  <Row>
                    <i-col span="17">
                      <!-- text="车流量统计示图" -->
                      <div id="piechart" style="height:200px;width:100%;"></div>
                      <!-- <chart-pie id="pie" style="height: 178px;" :value="pieData" text="车流-统计图"></chart-pie> -->
                    </i-col>
                    <i-col span="7">
                      <Row style="margin-right:10px;margin-left:5px;">
                        <Row>
                          <br>
                          <p style="font-size:14px;">起始时间</p>
                          <DatePicker
                            id="startDate"
                            type="datetime"
                            v-model="timePicker.startTime"
                            format="yyyy年MM月dd日 HH:mm:ss"
                            size="small"
                            placeholder="选择日期"
                            style="width: 100%"
                          ></DatePicker>
                          <!-- <TimePicker id="startTime" type="time" size="small" class="timetext" placeholder="选择时间" style="width: 50%" v-model="formData.starttime"></TimePicker> -->
                        </Row>
                        <Row style="margin-top:10px;margin-bottom:10px;">
                          <p style="font-size:14px;">结束时间</p>
                          <DatePicker
                            id="endDate"
                            type="datetime"
                            v-model="timePicker.endTime"
                            format="yyyy年MM月dd日 HH:mm:ss"
                            size="small"
                            placeholder="选择日期"
                            style="width: 100%"
                          ></DatePicker>
                          <!-- <TimePicker id="endTime" format="yyyy-MM-dd" class="timetext" size="small" type="time" placeholder="选择时间" style="width: 50%" v-model="formData.endtime"></TimePicker> -->
                        </Row>
                        <Row style="text-align:left">
                          <Button type="primary" @click="getPeriodDataAnalysis" size="small">应用</Button>
                        </Row>
                      </Row>
                    </i-col>
                  </Row>
                </Card>

                <Row style="margin-top:10px;">
                  <i-col span="8" style="padding-right:10px;">
                    <Card shadow class="paddingCardRightMiddleUpdate">
                      <p slot="title">
                        <Icon type="ios-alert-outline"></Icon>GIS地图

                      </p>
                      <div style="height:383px;">
                        <div
                          ref="basicMapbox"
                          style=" height:100%;
                                  width:100%;"
                        ></div>
                      </div>
                    </Card>
                  </i-col>

                  <i-col span="16">
                    <Card shadow class="paddingCardRightMiddleUpdate">
                      <p slot="title">
                        <Icon type="md-options"/>运行状态
                      </p>
                      <Row style="height:132px;">
                        <ul>
                          <li>
                            <Row :gutter="20" style="text-align:center;margin-top: 25px;">
                              <i-col span="5" style="text-align:right;">
                                <p>产品名称:</p>
                              </i-col>
                              <i-col span="7" style="text-align:left;">
                                <p>
                                  <span style="color:#2c8cf0;">{{ runningInfoList.devName }}</span>
                                </p>
                              </i-col>

                              <i-col span="5" style="text-align:right;">
                                <p>运行状态:</p>
                              </i-col>
                              <i-col span="7" style="text-align:left;">
                                <p>
                                  <span style="color:#2c8cf0">{{ runningInfoList.runningState }}</span>
                                </p>
                              </i-col>
                            </Row>
                          </li>

                          <li>
                            <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                              <i-col span="5" style="text-align:right;">
                                <p>设备型号:</p>
                              </i-col>
                              <i-col span="7" style="text-align:left;">
                                <p>
                                  <span style="color:#2c8cf0">{{ runningInfoList.model }}</span>
                                </p>
                              </i-col>

                              <i-col span="5" style="text-align:right;">
                                <p>检测速度:</p>
                              </i-col>
                              <i-col span="7" style="text-align:left;">
                                <p>
                                  <span style="color:#2c8cf0">{{ runningInfoList.detectionSpeed }}次/秒</span>
                                </p>
                              </i-col>
                            </Row>
                          </li>

                          <li>
                            <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                              <i-col span="5" style="text-align:right;">
                                <p>设备功率:</p>
                              </i-col>
                              <i-col span="7" style="text-align:left;">
                                <p>
                                  <span style="color:#2c8cf0">{{ runningInfoList.power}}kW·h</span>
                                </p>
                              </i-col>
                            </Row>
                          </li>
                        </ul>
                      </Row>
                    </Card>

                    <Card shadow class="paddingCardRightLeftUpdate" style="margin-top:12px;">
                      <p slot="title">
                        <Icon type="ios-warning"/>报警信息分析
                      </p>
                      <div id="alarmRow" style="height:188px; color:#fff">
                        <Row style="margin:10px;">
                          <ul>
                            <li v-for="(item, index) in alarmList" :key="index" style="margin-top:5px;"  >
                              <Row>
                                <i-col span="1" >
                                  <span v-if="item.priority === 0">
                                    <Icon type="ios-radio-button-on" color="#19be6b" size="20"></Icon>
                                  </span>
                                  <span v-if="item.priority === 1">
                                    <Icon type="ios-radio-button-on" color="#ff9900" size="20"></Icon>
                                  </span>
                                  <span v-if="item.priority === 2">
                                    <Icon type="ios-radio-button-on" color="#d64c4c" size="20"></Icon>
                                  </span>
                                </i-col>
                                <i-col span="8" style="padding-left:10px;padding-right:10px;">
                                  <span class="Ospan">{{item.deviceNo}}</span>
                                </i-col>
                                <i-col span="5" style="padding-right:10px;">
                                  <span class="Ospan">{{item.alarmType}}</span>
                                </i-col>
                                <i-col span="3" style="padding-right:10px;">
                                  <span class="Ospan">{{item.isDealT}}</span>
                                </i-col>
                                <i-col span="7">
                                  <span class="Ospan">{{item.alarmTime}}</span>
                                </i-col>
                              </Row>
                            </li>
                          </ul>
                        </Row>
                      </div>
                    </Card>
                  </i-col>
                </Row>
              </i-col>
            </Row>
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
                  <Col span="5" class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;">
                    <ul>
                      <li>
                        产品名称：
                        <span style="color:#2c8cf0">{{ deviceInfo.deviceName }}</span>
                      </li>
                      <li>
                        运行状态：
                        <span style="color:#2c8cf0">{{ deviceInfo.status }}</span>
                      </li>
                    </ul>
                  </Col>
                  <Col span="5"  class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;">
                    <ul>
                      <li>
                        安装日期：
                        <span style="color:#2c8cf0">{{ deviceInfo.installTime }}</span>
                      </li>
                      <li>
                        维护日期：
                        <span style="color:#2c8cf0">{{ deviceInfo.maintenanceDate }}</span>
                      </li>
                    </ul>
                  </Col>
                  <Col span="4" class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;">
                    <ul>
                      <li>
                        维护周期：
                        <span style="color:#2c8cf0">{{ deviceInfo.maintenancePeriod }}（月）</span>
                      </li>
                      <li>
                        保修期限：
                        <span style="color:#2c8cf0">{{ deviceInfo.guaranteeTime }}（月）</span>
                      </li>
                    </ul>
                  </Col>
                  <Col span="5" class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;">
                    <ul>
                      <li>
                        生产产家：
                        <span style="color:#2c8cf0">{{ deviceInfo.manufacturer }}</span>
                      </li>
                      <li>
                        设备型号：
                        <span style="color:#2c8cf0">{{ deviceInfo.model }}</span>
                      </li>
                    </ul>
                  </Col>
                  <Col span="5" class="listStyle" style="padding-left:30px;">
                    <ul>
                      <li>
                        联系员工：
                        <span style="color:#2c8cf0">{{ deviceInfo.contact }}</span>
                      </li>
                      <li>
                        联系电话：
                        <span style="color:#2c8cf0">{{ deviceInfo.tel }}</span>
                      </li>
                    </ul>
                  </Col>
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
import { ChartPie, ChartBar } from "_c/charts"; // ChartPie,
import Tables from "_c/tables";
// import Example from '../single-page/home/example.vue'
import mapboxgl from "mapbox-gl";
import Notice from "iview";
import DragDrawer from "_c/drag-drawer";
import echarts from "echarts";
import {
  getAllvfmDevices,
  getDeviceInfo,
  getRealTimeData,
  getDataAnalysisById,
  getAlarmMessage,
  deviceOperate
} from "@/api/vfm";
const axios = require("axios");

//MQTT
import mqtt from 'mqtt'
const options = {
  connectTimeout: 40000,
  clientId: "web"+new Date().getTime(),
  username: "admin",
  password: "Pass_emqtt",
  clean: true
}
const client = mqtt.connect("ws://39.108.249.215:8083/mqtt", options)

export default {
  name: "device_vfm",
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    Tables,
    Notice,
    DragDrawer,
    echarts
    // Example
  },
  data() {
    return {
      showMap: false,
      concentratorLocatoin: [],
      lightPoleLocation: [],
      currentDeviceId: 0,
      timePicker: {
        startTime: "2019-01-01 08:00:00",
        endTime: "2019-03-12 08:00:00"
      },
      showDrawerMap: false,
      showtimechoose: false,
      formData: {
        startdate: "",
        starttime: "",
        enddate: "",
        endtime: ""
      },
      dt_tableData: [],
      deviceInfo: {},
      runningInfoList: {},
      pieData: [
        { value: 335, name: "大型车流量" },
        { value: 310, name: "中型车流量" },
        { value: 234, name: "小型车流量" },
        { value: 135, name: "机动车流量" },
        { value: 1548, name: "行人流量" }
      ],
      alarmList: [],
      dt_deviceList: []
    };
  },
  methods: {
    initMqtt() {
            // mqtt连接
      client.on('connect', (e) => {
        console.log('连接成功:')
        client.subscribe('smart-city/alarm/4', { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        //client.publish("/World", "Hello mqtt");
        })
      })
      // 接收消息处理
      client.on('message', (topic, message) => {
        console.log('收到来自', topic, '的消息', message.toString())
        try{
          var json = JSON.parse(message)

          console.log(json);
          //json.priority=Number(json.alarmLevel);
          //this.$Message.success("收到新告警");
          if (json["deviceNo"].length>19){
            json["deviceNo"]=json["deviceNo"].substring(0,17)+"...";
          }
          //是否处理
          if (json["isDeal"] == "0") {
            json["isDealT"] = "未处理";
          }
          if (json["isDeal"] == "1") {
            json["isDealT"] = "处理中";
          }
          if (json["isDeal"] == "2") {
            json["isDealT"] = "已处理";
          }
          this.alarmList.unshift(json);
        }
        catch{

        }
      })
      // 断开发起重连
      client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      })
      // 链接异常处理
      client.on('error', (error) => {
        console.log('连接失败:', error)
      })
    },
    //地数数据获取函数
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
        lat=this.deviceInfo.latitude
      }if(lng==null){
        lng=this.deviceInfo.longitude
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
     /* map.addControl(
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

    //左端设备列表----------------------------------------------------------
    getDeviceList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getAllvfmDevices({
        token: token,
        deviceType: 4
      })
        .then(res => {
          console.log("=========================");
          console.log("设备列表:");
          console.log(res.data.result);
          console.log("获取左侧树的数据")
          //初始化
          let currentDevice = res.data.result[0]["deviceLightPoleDtoList"][0]["deviceAssetList"][0];
          console.log("currentDevice")
          console.log(currentDevice)
          console.log(res.data.result)
          //地图坐标
          this.createMap(res.data.result[0]["deviceLightPoleDtoList"][0].longitude, res.data.result[0]["deviceLightPoleDtoList"][0].latitude);
          this.currentDeviceId = currentDevice.id;
          this.convertDiviceListFormat(res.data.result);
          this.deviceInfo = currentDevice;
          this.getAlarm(this.currentDeviceId);
          this.DeviceInfoFormate(this.deviceInfo);
          this.getRealTimeData(this.currentDeviceId);
          this.getDataAnalysis(this.currentDeviceId);


          this.createMapRenderData(res.data.result);

        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //设备列表解析
    convertDiviceListFormat(data) {
      for (let i in data) {
        data[i]["title"] = data[i]["name"];
        data[i]["expand"] = true;
        data[i]["children"] = data[i]["deviceLightPoleDtoList"];
        if (data[i]["children"] != null) {
          for (let y in data[i]["children"]) {
            data[i]["children"][y]["title"] = data[i]["children"][y]["name"];
            data[i]["children"][y]["expand"] = true;
            data[i]["children"][y]["children"] = data[i]["children"][y]["deviceAssetList"];
            if (data[i]["children"][y]["children"]!=null){
              for (let x in data[i]["children"][y]["children"]){
                if (i==0&y==0&x==0){
                  data[i]["children"][y]["children"][x]["selected"]=true;
                }
                data[i]["children"][y]["children"][x]["title"] = data[i]["children"][y]["children"][x]["deviceName"];
                data[i]["children"][y]["children"][x]["latitude"] = data[i]["children"][y]["latitude"];
                data[i]["children"][y]["children"][x]["longitude"] = data[i]["children"][y]["longitude"];
              }
            }
          }
        }
      }
      this.dt_deviceList = data;
    },

    //点击设备后更新页面信息
    chooseDevice(current, oldCurrent) {
      console.log("current")
      console.log(current)

      if (current[0].deviceType!=null){
        this.currentDeviceId = current[0].id;
        //资产信息
        this.deviceInfo = current[0];
        this.DeviceInfoFormate(this.deviceInfo);
        //数据分析
        let temp = new Date().Format("yyyy-MM-dd HH:mm:ss");
        this.timePicker.endTime = temp;
        this.timePicker.startTime =
        temp.substring(0, temp.length - 15) + "-01-01 00:00:00";
        this.getDataAnalysis(this.currentDeviceId);
        //实时数据
        this.getRealTimeData(this.currentDeviceId);
        //地图更新
        let lat = parseFloat(current[0].latitude);
        let lng = parseFloat(current[0].longitude);
        this.createMapLarge(lat,lng);
        this.createMap(lat, lng);
      }
    },

    //设备开关
    openDevice(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deviceOperate({
        token: token,
        assetId: this.currentDeviceId,
        onOff:1,
      })
        .then(res => {
          console.log("=========================");
          console.log("开启设备:");
          console.log(res.data);
          this.$Message.success('已开启');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('开启失败');
        });
    },
    closeDevice(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deviceOperate({
        token: token,
        assetId: this.currentDeviceId,
        onOff:0,
      })
        .then(res => {
          console.log("=========================");
          console.log("关闭设备:");
          console.log(res.data);
          this.$Message.success('已关闭');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('关闭失败');
        });
    },

    //数据分析-------------------------------------------------------------
    getDataAnalysis(deviceId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      this.timePicker.startTime = new Date(this.timePicker.startTime).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      this.timePicker.endTime = new Date(this.timePicker.endTime).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      getDataAnalysisById({
        token: token,
        assetId: deviceId,
        startTime: this.timePicker.startTime,
        endTime: this.timePicker.endTime
      })
        .then(res => {
          console.log("=========================");
          console.log("数据分析:");
          console.log(res.data);
          this.FormatPie(res.data.result);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //数据处理
    FormatPie(data) {
      this.pieData[0]["value"] = data["largeSizeVehicle"];
      this.pieData[1]["value"] = data["middleSizeVehicle"];
      this.pieData[2]["value"] = data["smallSizeVehicle"];
      this.pieData[3]["value"] = data["nonMotorVehicle"];
      this.pieData[4]["value"] = data["pedestrian"];
      this.$nextTick(function() {
        this.drawpiechart("piechart");
      });
    },
    //数据分析-选择区间
    getPeriodDataAnalysis() {
      console.log(document.getElementById('alarmRow').scrollTop);
      //this.alarmList.unshift(this.alarmList[1]);
      var sTime = new Date(this.timePicker.startTime).getTime();
      var eTime = new Date(this.timePicker.endTime).getTime();
      if (sTime > eTime) {
        this.$Message.error("开始时间请勿晚于结束时间!");
      } else {
        this.getDataAnalysis(this.currentDeviceId);
      }
    },

    //运行状态-------------------------------------------------------------
    getRealTimeData(deviceId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getRealTimeData({
        token: token,
        deviceId: deviceId
      })
        .then(res => {
          console.log("=========================");
          console.log("运行状态:");
          console.log(res.data);
          this.runningInfoList = res.data.result;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //告警分析-------------------------------------------------------------
    getAlarm(deviceId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getAlarmMessage({
        token: token,
        deviceType: 4,
        isDeal:0,
      })
        .then(res => {
          console.log("=========================");
          console.log("告警分析:");
          console.log(res.data);
          this.alarmList = res.data;
          this.AlarmFormate(this.alarmList);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //报警信息处理
    AlarmFormate(data) {
      for (let i in data) {
        if (data[i]["deviceNo"].length>19){
          data[i]["deviceNo"]=data[i]["deviceNo"].substring(0,17)+"...";
        }
        //是否处理
        if (data[i]["isDeal"] == "0") {
          data[i]["isDealT"] = "未处理";
        }
        if (data[i]["isDeal"] == "1") {
          data[i]["isDealT"] = "处理中";
        }
        if (data[i]["isDeal"] == "2") {
          data[i]["isDealT"] = "已处理";
        }
      }
    },

    //设备资产信息----------------------------------------------------------
    getDeviceInfo(deviceId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getDeviceInfo({
        token: token,
        deviceId: deviceId,
        deviceType: 4
      })
        .then(res => {
          console.log("=========================");
          console.log("资产信息:");
          console.log(res.data);
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

    //API above,UI below------------------------------------------------

    rowClassName: function(row, index) {
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },
    //调用地图函数
    createMap(lat, lng) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiMjAxMGppbmciLCJhIjoiY2pyN3hwcWhiMDBrMjQzcGc1NndsaW1tbCJ9.BQoRib1rflv656nIy_5IEQ";
      // var coordinates = document.getElementById("coordinates");
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: "mapbox://styles/mapbox/light-v9",
        center: [lat, lng], // 设置地图中心
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
      var marker = new mapboxgl.Marker().setLngLat([lat, lng]).addTo(map);
    },
    drawpiechart(id) {
      this.charts = echarts.init(document.getElementById(id), "macarons");
      this.charts.setOption({
        title: {
          text: "车流量\n统计图",
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
    },
    initData() {
      this.initMqtt();
      let temp = new Date().Format("yyyy-MM-dd HH:mm:ss");
      this.timePicker.endTime = temp;
      this.timePicker.startTime =
        temp.substring(0, temp.length - 15) + "-01-01 00:00:00";
      this.getDeviceList();
    }
  },
  mounted() {
    this.initData();
    window.onresize = () => {
      let pieChart = echarts.getInstanceByDom(document.getElementById('piechart'));
      pieChart.resize();
    };
  },
  created() {}
};
</script>

<style lang="less" scoped>
.open-btn {
  background-color: #ffffff;
  color: #13456b;
}

.open-btn[disabled] {
  background-color: #13456b;
  color: #ffffff;
}
.open-btn:hover {
  background-color: #1299e6;
  color: #ffffff;
}
.open-btn:active {
  background-color: #13456b;
  color: #ffffff;
}
//table 颜色边框样式
.ivu-card-body {
  padding: 0px;
  margin: 0pt;
  .device_table {
    padding: 1px;
    height: 608px;
  }
  .ivu-table-wrapper {
    border: none;
  }

  .ivu-table {
    background-color: transparent;
    th {
      background-color: transparent;
      font-size: 18px;
      color: #0f8ad0;
      height: 52px;
      border: none;
    }
  }
  .ivu-table-body {
    td {
      border: 0;
    }
  }
  .ivu-table:before {
    width: 0px;
  }
  .ivu-table:after {
    height: 0px;
  }
}
.listStyle {
  margin-top: 15px;
}
.ivu-drawer-wrap-inner {
  padding-top: 10px;
}
.textcenter {
  text-align: center;
}
.paddingcard {
  background: #000;
}

.card_image .ivu-card-body {
  text-align: center;
}

.imgs {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  width: 80%;
  float: right;
  height: 549px;
}
/*偶数行*/
.ivu-table-stripe-even td {
  background-color: #133e66 !important;
}
/*奇数行*/
.ivu-table-stripe-odd td {
  background-color: #052d4c !important;
}
.ivu-table-row-highlight td,
.ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td,
.ivu-table-stripe
  .ivu-table-fixed-body
  tr.ivu-table-row-highlight:nth-child(2n)
  td,
tr.ivu-table-row-highlight.ivu-table-row-hover td {
  background-color: #1f85de !important;
}
ul {
  list-style: none;
}

.dark tr.ivu-table-row-hover td {
  background-color: #1f85de;
}
.layout {
  //border: 1px solid #d7dde4;
  //background: #0f1a2e !important;
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
.ivu-layout-content {
  background-color: transparent !important;
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
.Ospan{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
}
</style>

<template>
  <div class="pfm">
    <Layout>
      <Content style="padding:5px;padding-left:0px;">
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
                <Tree :data="dt_deviceTable" @on-select-change="chooseDevice"></Tree>
              </div>
            </Card>
          </i-col>

          <i-col span="19">
            <Drawer v-model="showMap" width="100%" :closable="true" :inner="true" :transfer="false">
              <div ref="basicMapbox2" style=" height:100%; width:100%;"></div>
            </Drawer>
            <Row>
              <i-col span="8">
                <Card :bordered="false" class="paddingCardMiddleUpdate"  style="margin-right:10px;">
                  <p slot="title">
                    <Icon type="logo-instagram"/>监控画面
                  </p>
                  <Row style="height:635px;">
                    <Row>
                      <img src="../../assets/images/pole_pfm.png" class="imgs">
                    </Row>
                    <Row style="text-align:center;margin-top: 10px;">
                      <Button type="primary" size="small" @click="openDevice()">开启</Button>
                      <Button type="primary" size="small" @click="closeDevice()" style="margin-left:30px;">关闭</Button>
                    </Row>
                  </Row>
                </Card>
              </i-col>

              <i-col span="16">
                <Card shadow class="paddingCardRightTopUpdate" style="height:240px">
                  <p slot="title">
                    <Icon type="ios-alert-outline"></Icon>人流量统计
                  </p>
                  <div>
                    <div id="barchart" style="height:200px;width:100%;"></div>
                  </div>
                  <!-- <chart-bar style="height: 179spx;" :value="bardata" :options="options" text="报警信息统计"></chart-bar> -->
                </Card>

                <Row style="margin-top:12px;">
                  <i-col span="8" style="padding-right:10px;">
                    <Card shadow class="paddingCardRightMiddleUpdate" style="height:423px;">
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
                    <Card shadow class="paddingCardRightMiddleUpdate" style="height:220px;">
                      <p slot="title">
                        <Icon type="ios-pie"/>数据分析
                        <!-- <button type="" class="search-btn ivu-btn ivu-btn-primary ivu-btn-small" @click="showtimechoose=true"  style="font-size:14px;float:right;width:91px;height:29px;">选择时间</button> -->
                      </p>
                      <div id="piechart" style="height: 180px;"></div>
                    </Card>

                    <Card
                      shadow
                      class="paddingCardRightMiddleUpdate"
                      style="height:191px;margin-top:12px;"
                    >
                      <p slot="title">
                        <Icon type="md-options"/>实时数据
                      </p>
                      <div id="curveline" style="height:151px; width:100%;"></div>
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
  getWeekAnalysis,
  getDeviceInfo,
  getRealTimeDataById,
  getDataAnalysisById,
  deviceOperate
} from "@/api/pfm";
const axios = require("axios");

export default {
  name: "device_pfm",
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
      showDrawerMap: false,
      showtimechoose: false,
      currentDeviceId: 0,
      barMax: 400,
      formData: {
        startdate: "",
        starttime: "",
        enddate: "",
        endtime: ""
      },
      bardata: [
        // { value: 335, name: '3.18' },
        // { value: 310, name: '3.19' },
        // { value: 234, name: '3.20' },
        // { value: 135, name: '3.21' },
        // { value: 335, name: '3.22' },
        // { value: 310, name: '3.23' },
        // { value: 234, name: '3.24' },
        // { value: 335, name: '3.25' },
        // { value: 310, name: '3.26' },
        // { value: 234, name: '3.27' },
      ],
      dt_deviceTable: [],
      deviceInfo: {
        name: "TrafiCam x-stream",
        device_number: "800223888",
        producer: "美国菲力尔公司",
        type: "PFM-Z68X-UD7-A5",
        purchase_date: "2018-09-25",
        deploy_date: "2019-09-25",
        contact_staff: "李工",
        contact_phone: "13754689158",
        belong_device: "zkj002",
        belong_light: "8号灯杆"
      },
      runningInfoList: [
        { value: 1507, name: "总人数" },
        { value: 507, name: "人群密度" },
        { value: 1153.04, name: "热力指数" }
      ],
      pieData: [
        { value: 335, name: "今天" },
        { value: 2296, name: "过去一周" },
        { value: 10598, name: "过去一个月" }
      ]
    };
  },
  methods: {
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
      console.log(this.deviceInfo)
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
    //左端设备列表----------------------------------------------------------
    getDeviceList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getAllvfmDevices({
        token: token,
        deviceType: 5
      })
        .then(res => {
          console.log("=========================");
          console.log("设备列表:");
          console.log(res.data.result);
          //初始化
          let currentDevice = res.data.result[0]["deviceLightPoleDtoList"][0]["deviceAssetList"][0];
          this.currentDeviceId = currentDevice.id;
          this.convertDiviceListFormat(res.data.result);
          this.deviceInfo = currentDevice;

          this.DeviceInfoFormate(this.deviceInfo);
          this.getRealTimeData(this.currentDeviceId);
          this.getDataAnalysis(this.currentDeviceId);
          this.getWeekDataAnalysis(this.currentDeviceId);
          this.createMap(res.data.result[0]["deviceLightPoleDtoList"][0].latitude, res.data.result[0]["deviceLightPoleDtoList"][0].longitude);
          this.createMapRenderData(res.data.result)
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
      this.dt_deviceTable = data;
    },
    //点击设备后更新页面信息
    chooseDevice(current, oldCurrent) {
      if (current[0].deviceType!=null){
        this.currentDeviceId = current[0].id;
        //人流统计图
        this.getWeekDataAnalysis(this.currentDeviceId);
        //数据分析
        this.getDataAnalysis(this.currentDeviceId);
        //实时数据
        this.getRealTimeData(this.currentDeviceId);
        //资产信息
        this.deviceInfo = current[0];
        this.DeviceInfoFormate(this.deviceInfo);
        //地图更新
        let lat = parseFloat(current[0].latitude);
        let lng = parseFloat(current[0].longitude);
        this.createMap(lat, lng);
        this.createMapLarge(lat,lng);
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

    //数据分析----------------------------------------------------------
    getWeekDataAnalysis(assetId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getWeekAnalysis({
        token: token,
        assetId: assetId
      })
        .then(res => {
          console.log("=========================");
          console.log("条形图分析:");
          console.log(res.data);
          this.bardata = res.data.result.valueList;
          this.barMax = res.data.result.maximum;
          this.$nextTick(function() {
            this.drawbarchart("barchart");
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //数据分析----------------------------------------------------------
    getDataAnalysis(assetId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getDataAnalysisById({
        token: token,
        assetId: assetId
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
    //数据分析
    FormatPie(data) {
      this.pieData[0]["value"] = data["peopleNumToday"];
      this.pieData[1]["value"] = data["peopleNumLastWeek"];
      this.pieData[2]["value"] = data["peopleNumLastMonth"];
      this.$nextTick(function() {
        this.drawpiechart("piechart");
      });
    },

    //实时数据----------------------------------------------------------
    getRealTimeData(assetId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getRealTimeDataById({
        token: token,
        assetId: assetId
      })
        .then(res => {
          console.log("=========================");
          console.log("实时数据:");
          console.log(res.data);
          this.FormatCurve(res.data.result);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //数据处理
    FormatCurve(data) {
      this.runningInfoList[0]["value"] = data["peopleNum"];
      this.runningInfoList[1]["value"] = data["peopleDensity"];
      this.runningInfoList[2]["value"] = data["thermalIndex"];
      this.$nextTick(function() {
        this.drawcurveline("curveline");
      });
    },

    //设备资产信息----------------------------------------------------------
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

    drawcurveline(id) {
      this.charts = echarts.init(document.getElementById(id), "macarons");
      this.charts.setOption({
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              show: true,
              textStyle: {
                color: "black"
              }
            },
            data: ["总人数", "人群密度", "热力指数"]
          }
        ],
        yAxis: [
          {
            show: false,
            axisTick: {
              show: false
            },
            type: "value"
          }
        ],
        grid: {
          top: "15%",
          left: "5%",
          right: "10%",
          bottom: "10%",
          containLabel: true
        },
        series: [
          {
            name: "实时数据",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#70c8d2",
                areaStyle: { color: "#2c635f", label: { show: true } }
              }
            },
            data: this.runningInfoList,
            label: {
              normal: {
                show: true, //显示数字
                position: "top" //这里可以自己选择位置
              }
            }
          }
        ]
      });
    },
    drawbarchart(id) {
      this.charts = echarts.init(document.getElementById(id), "macarons");
      this.charts.setOption({
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.bardata.map(_ => _.name),
            axisLabel: {
              textStyle: {
                color: "black"
              }
            },
            axisLine: {
              lineStyle: {
                color: "black"
              }
            }
          }
        ],
        yAxis: [
          {
            name: "单位：人数",
            type: "value",
            min: 0,
            max: this.barMax,
            interval: this.barMax / 4,
            nameTextStyle: {
              color: "black"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "black"
              }
            }
          }
          // {
          //   type: 'value',
          //   name: '单位：%',
          //   min: 0,
          //   max: 80,
          //   interval: 20,
          //   nameTextStyle:{
          //     color:'white'
          //   },
          //   axisLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     textStyle: {
          //       color: 'white'
          //     }
          //   }
          // }
        ],
        grid: {
          top: "25%",
          left: "10%",
          right: "10%",
          bottom: "10%",
          containLabel: true
        },
        series: [
          {
            //name:'蒸发量',
            type: "bar",
            data: this.bardata,
            barWidth: "20%",
            label: {
              normal: {
                color: "black",
                show: true, //显示数字
                position: "top" //这里可以自己选择位置
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#f3d407" },
                  //{offset: 0.5, color: 'yellow'},
                  { offset: 1, color: "#ff6d00" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ff6d00" },
                  // {offset: 0.7, color: 'green'},
                  { offset: 1, color: "#f3d407" }
                ])
              }
            }
          },
          {
            name: "平均温度",
            type: "line",
            data: this.bardata.map(_ => _.value)
          }
        ]
      });
    },
    drawpiechart(id) {
      this.charts = echarts.init(document.getElementById(id), "macarons");
      this.charts.setOption({
        title: {
          text: "人流量\n统计图",
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
    rowClassName: function(row, index) {
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.list1[this.list1.length - 1];
          for (let i = 1; i < 11; i++) {
            this.list1.push(last + i);
          }
          resolve();
        }, 2000);
      });
    },
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
    initData() {
      this.getDeviceList();
    }
  },
  mounted() {
    this.initData();
    /*window.onresize = () => {
      let barchart = echarts.getInstanceByDom(document.getElementById('barchart'));
      barchart.resize();
      let pieChart = echarts.getInstanceByDom(document.getElementById('piechart'));
      pieChart.resize();
      let curveline = echarts.getInstanceByDom(document.getElementById('curveline'));
      curveline.resize();
    };*/
  }
};
</script>

<style type="text/less" lang="less" scoped>
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

//下方list距离上部高度
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

  //height:100%;
}
.imgs {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  height: 549px;
  width: 80%;
  float: right;
}
ul {
  list-style: none;
}
.dark tr.ivu-table-row-hover td {
  background-color: #1f85de;
}

.layout {
  //background: #0f1a2e;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
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
</style>

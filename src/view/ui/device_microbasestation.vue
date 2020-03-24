<template>
  <div class="device_microbase">
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
                <Card :bordered="false" class="paddingCardMiddleUpdate" style="margin-right:10px;">
                  <p slot="title">
                    <Icon type="logo-instagram"/>监控画面
                  </p>
                  <Row style="height:635px;">
                    <Row>
                      <img src="../../assets/images/pole_microbasestation.png" class="imgs">
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
                    <Icon type="md-analytics"/>设备能耗统计
                  </p>
                  <div id="dom" style="height: 199px;"></div>
                </Card>

                <Row style="margin-top:10px;">
                  <i-col span="8" style="padding-right:10px;">
                    <Card shadow class="paddingCardRightMiddleUpdate">
                      <p slot="title">
                        <Icon type="ios-alert-outline"></Icon>GIS地图
                      </p>
                      <div style="height:384px;">
                        <div
                          ref="basicMapbox"
                          id="mapbox"
                          style=" height:100%;
                                  width:100%;"
                        ></div>
                      </div>
                    </Card>
                  </i-col>

                  <i-col span="16">
                    <Card shadow class="paddingCardRightMiddleUpdate">
                      <p slot="title">
                        <Icon type="md-options"></Icon>设备运行状况
                      </p>
                      <Row v-model="runningInfoList" style="height: 161px;margin-left:20px;">
                        <i-col style="margin-top:5px;">
                          <i-col span="5">
                            <ul>
                              <li style="margin-top:5px;">产品名称：</li>
                              <li style="margin-top:5px;">已用电量：</li>
                              <li style="margin-top:5px;">天线效率：</li>
                              <li style="margin-top:5px;">序 列 号：</li>
                              <li style="margin-top:5px;">运行时间：</li>
                            </ul>
                          </i-col>
                          <i-col span="7">
                            <ul>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.name }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.used_electricity }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.antenna_efficiency }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.serial_number }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.running_time }}</span>
                              </li>
                            </ul>
                          </i-col>
                          <i-col span="5">
                            <ul>
                              <li style="margin-top:5px;">设备功率：</li>
                              <li style="margin-top:5px;">功耗情况：</li>
                              <li style="margin-top:5px;">当前接入数：</li>
                              <li style="margin-top:5px;">方向性系数：</li>
                              <li style="margin-top:5px;">设备类型：</li>
                            </ul>
                          </i-col>
                          <i-col span="7">
                            <ul>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.power }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.power_consumption }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.current_access_number }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span
                                  style="color:#2c8cf0"
                                >{{ runningInfoList.directional_coefficient }}</span>
                              </li>
                              <li style="margin-top:5px;">
                                <span style="color:#2c8cf0">{{ runningInfoList.device_type }}</span>
                              </li>
                            </ul>
                          </i-col>
                        </i-col>
                      </Row>
                    </Card>

                    <Card shadow class="paddingCardRightLeftUpdate" style="margin-top:12px;">
                      <p slot="title">
                        <Icon type="ios-warning"/>报警信息分析
                      </p>
                      <div style="height:159px;  color:#fff">
                        <Row style="margin:10px;">
                          <ul style="margin-left:20px;">
                            <li v-for="(item, index) in alarmList" :key="index" style="margin-top:5px;">
                              <span style="margin-right:20px" v-if="item.status === 1">
                                <Icon type="ios-radio-button-on" color="yellow" size="20"></Icon>
                              </span>
                              <span style="margin-right:20px" v-else>
                                <Icon type="ios-radio-button-on" color="red" size="20"></Icon>
                              </span>
                              <span style="margin-right:10px">{{item.deviceNo}}</span>
                              <span style="margin-right:10px">{{item.alarmType}}</span>
                              <span style="margin-right:20px">{{item.alarmTypeI}}</span>
                              <span>{{item.alarmTime}}</span>
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
import echarts from "echarts";
import mapboxgl from "mapbox-gl";
// import Example from '../single-page/home/example.vue'
import { on, off } from "@/libs/tools";
import { getAllStationDevices, getAlarmMessage, deviceOperate } from "@/api/microbasestation";

export default {
  name: "device_microBaseStation",
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    Tables
    // Example
  },

  data() {
    return {
      showMap: false,
      concentratorLocatoin: [],
      lightPoleLocation: [],
      alarmList: [],
      list1: [
        {
          status: 1,
          lamppost: "1001",
          name: "基站#1",
          problem: "不通电",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 2,
          lamppost: "1002",
          name: "基站#2",
          problem: "不正常",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 2,
          lamppost: "1003",
          name: "基站#3",
          problem: "不在线",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 0,
          lamppost: "1004",
          name: "基站#4",
          problem: "不正常",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 0,
          lamppost: "1005",
          name: "基站#5",
          problem: "不正常",
          datetime: "2018-12-12 09:12:12"
        }
      ],
      dt_deviceTable: [],
      deviceInfo: {},
      runningInfoList: {
        name: "天线#1",
        status: "正常运行",
        serial_number: "222016092302",
        device_type: "宽频段板状天线",
        power: "2.4W",
        antenna_efficiency: "0.95",
        directional_coefficient: "2.15dbi",
        power_consumption: "126.22Kw",
        used_electricity: "50Kwh",
        current_access_number: "36",
        running_time: "980小时"
      },
      closeData: [
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          grid: {
            top: "3%",
            left: "1.2%",
            right: "1%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: true,
              data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
          ],
          yAxis: [
            {
              type: "time",
              data: ["4:00", "5:00", "6:00", "7:00"]
            }
          ],
          series: [
            {
              name: "路灯1001",
              type: "line",
              stack: "关灯时间",
              areaStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              },
              data: [500, 501, 503, 506, 510, 515, 521]
            }
          ]
        }
      ]
    };
  },

  methods: {
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

      getAllStationDevices({
        token: token,
        deviceType: 13
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

    //告警分析-------------------------------------------------------------
    getAlarm(deviceId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getAlarmMessage({
        token: token,
        pageNo: 1,
        pageSize: 10,
        deviceType: 13
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
    drawDom(id) {
      this.charts = echarts.init(document.getElementById(id), "macarons");
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#133e66"
            }
          }
        },
        grid: {
          top: "15%",
          left: "1.2%",
          right: "1%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            color: ["#3398DB"],
            axisLabel: {
              textStyle: {
                color: "black"
              }
            },
            axisLine: {
              lineStyle: {
                color: "black"
              }
            },
            boundaryGap: true,
            data: [
              "3.10",
              "3.11",
              "3.12",
              "3.13",
              "3.14",
              "3.15",
              "3.16",
              " 3.17",
              "3.18",
              "3.19",
              "3.20",
              "3.21",
              "3.22",
              "3.23"
            ]
          }
        ],
        yAxis: [
          {
            color: ["#3398DB"],
            axisLabel: {
              textStyle: {
                color: "black"
              }
            },
            // axisLine:{
            //   lineStyle:{
            //     color:'white',
            //   }
            // },
            type: "value"
            //   data:[0,20,40,60,80,100,120,140,160]
          }
        ],
        series: [
          {
            name: "天线#1",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                color: "#2c8cf0",
                show: true, //显示数字
                position: "top" //这里可以自己选择位置
              }
            },
            areaStyle: {
              normal: {
                color: "#2d8cf0"
              }
            },
            data: [
              20,
              140,
              40,
              50,
              60,
              70,
              80,
              90,
              100,
              110,
              120,
              130,
              140,
              150
            ]
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
          const last = this.alarmList[this.alarmList.length - 1];
          resolve();
        }, 2000);
      });
    },
    initData() {
      this.getDeviceList();
      this.getAlarm();
    }
  },
  mounted() {
    this.initData();
    this.$nextTick(function() {
      this.drawDom("dom");
    });
    window.onresize = () => {
      let dom = echarts.getInstanceByDom(document.getElementById('dom'));
      dom.resize();
    };
  }
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
.count-style {
  font-size: 50px;
}
.card_img {
  text-align: center;
  //width:100%;
  //height:100%;
}

.ivu-drawer-wrap-inner {
  padding-top: 10px;
}
.textcenter {
  text-align: center;
}
.count-style {
  font-size: 50px;
}
.imgs {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  width: 80%;
  float: right;
  height: 575px;
}
/*偶数行*/
.ivu-table-stripe-even td {
  background-color: #133e66 !important;
}
/*奇数行*/
.ivu-table-stripe-odd td {
  background-color: #052d4c !important;
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

.deviceinfo li span {
  margin-right: 20px;
}
.listStyle {
  margin-top: 15px;
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

<template>
  <div class="camera">
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
                    <img src="../../assets/images/camera.png" class="imgs">
                  </Row>
                  <Row style="text-align:center;margin-top: 10px;">
                    <Button type="primary" size="small" @click="openCamera()">开启</Button>
                    <Button type="primary" size="small" @click="closeCamera()" style="margin-left:30px;">关闭</Button>
                  </Row>
                </Row>
              </Card>
            </i-col>

            <i-col span="16">
              <Card :bordered="false" class="paddingCardMiddleUpdate">
                <p slot="title">
                  <Icon type="logo-instagram"/>实时监控
                </p>
                <Row style="height:635px;" class="myvideo">
                  <!-- <Row>//视频</Row> -->
                  <Row style="text-align:center;">
                    <!-- <Button class="open-btn" type="primary" size="small">开启</Button> -->
                    <!-- <Button class="open-btn" type="primary" size="small" style="margin-left:30px;">关闭</Button> -->
                    <!--<iframe
                      style="width:100%;height:608px;"
                      src="http://39.108.249.215/video/index.html"
                    ></iframe>-->
                    <video-player
                      class="vjs-custom-skin"
                      ref="videoPlayer"
                      :options="playerOptions"
                      style="width:100%;height:100%;margin-left:0px;margin-right:0px;"
                    ></video-player>
                  </Row>
                </Row>
              </Card>
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
    <!-- <Drawer :closable="true" width="200px" v-model="showDrawerMap">
      <Row :gutter="20" style="margin-top: 5px;">
          <div style="height:100%;width:100%;">
            <div ref="basicMapbox" style="height:700px;width:100%;"></div>
          </div>
        </Row>
    </Drawer>-->
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
import {getAllCamera, getDeviceInfo, getCamera, deviceOperate} from "@/api/camera";
const axios = require("axios");

export default {
  name: "device_camera_transport",
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
      index:0,
      currentDeviceId: 0,
      formData: {
        startdate: "",
        starttime: "",
        enddate: "",
        endtime: ""
      },
      dt_deviceTable: [],
      deviceInfo:{},
      runningInfoList: [
        { value: 1507, name: "总人数" },
        { value: 507, name: "人群密度" },
        { value: 1153.04, name: "热力指数" }
      ],
      pieData: [
        { value: 335, name: "今天" },
        { value: 2296, name: "过去一周" },
        { value: 10598, name: "过去一个月" }
      ],
      playerOptions: {
        overNative: true,
        autoplay: true,
        controls: true,
        loop: true,
        techOrder: ["flash", "html5"],
        sourceOrder: true,
        flash: {
          hls: { withCredentials: false }
          // swf: "/static/media/video-js.swf"
        },
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            type: "rtmp/mp4",
            // src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
            src: "rtmp://39.108.249.215:1935/vod/test.flv" //你的视频地址（必填）
            // src: "rtmp://qsiotsys/vod/test.flv" //你的视频地址（必填）
          }
          // {
          //   withCredentials: false,
          //   type: 'application/x-mpegURL',
          //   src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
          // }
        ],
        poster: "/static/images/logo.png"
        // controlBar: {
        //   timeDivider: false, // 时间分割线
        //   durationDisplay: false, // 总时间
        //   progressControl: true, // 进度条
        //   customControlSpacer: true, // 未知
        //   fullscreenToggle: true // 全屏
        // },
      }
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
      getAllCamera({
        token: token,
        deviceType: 7,
      })
        .then(res => {
          console.log("=========================");
          console.log("设备列表:");
          console.log(res.data.result);
          //初始化
          this.index=0;
          while(res.data.result[0]["deviceLightPoleDtoList"][this.index]["deviceAssetList"].length==0){
            this.index++;
          }
          this.currentDeviceId = res.data.result[0]["deviceLightPoleDtoList"][this.index]["deviceAssetList"][0].id;
          this.convertDiviceListFormat(res.data.result);
          this.deviceInfo = res.data.result[0]["children"][this.index]["children"][0];
          this.DeviceInfoFormate(this.deviceInfo);
          this.getCameraUrl(this.currentDeviceId);
          this.createMapRenderData(res.data.result)
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
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
                if (i==0&y==this.index&x==0){
                  data[i]["children"][y]["children"][x]["selected"]=true;
                }
                data[i]["children"][y]["children"][x]["latitude"] = data[i]["children"][y]["latitude"];
                data[i]["children"][y]["children"][x]["longitude"] = data[i]["children"][y]["longitude"];
                data[i]["children"][y]["children"][x]["title"] = data[i]["children"][y]["children"][x]["deviceName"];
              }
            }
          }
        }
      }
      this.dt_deviceTable = data;
    },
    // //设备状态指示灯解析
    // statusFormate(data){
    //   for(let i in data){
    //     // if (data[i]['devState']=="运行正常"){
    //     //   data[i]['status']=0;
    //     // }
    //     // if (data[i]['devState']=="设备离线"){
    //     //   data[i]['status']=1;
    //     // }
    //     // if (data[i]['devState']=="设备断电"){
    //     //   data[i]['status']=2;
    //     // }
    //     data[i]['status']=data[i]['devState'];
    //   }
    // },
    //点击设备后更新页面信息
    chooseDevice(current,current2){
      if (current[0].deviceType!=null){
        this.currentDeviceId=current[0].id;
        //资产信息
        let lat = parseFloat(current[0].latitude);
        let lng = parseFloat(current[0].longitude);
        console.log(current[0].latitude)
        console.log(lng)
        this.createMapLarge(lat, lng);
        this.deviceInfo=current[0];
        this.DeviceInfoFormate(this.deviceInfo);
        this.getCameraUrl(this.currentDeviceId);
      }
    },

    // //翻页-上一页-设备列表
    // deviceListLast(){
    //   if (this.devicePageNum==1){
    //     this.$Message.info('已经是第一页了');
    //   }else{
    //     this.devicePageNum--;
    //     this.getDeviceList(this.devicePageNum);
    //   }
    // },
    // //翻页-下一页
    // deviceListNext(){
    //   if(10*this.devicePageNum>=this.deviceTotal){
    //     this.$Message.info('已经是最后一页了');
    //   } else {
    //     this.devicePageNum++;
    //   }
    // },

    //运行状态文字转换
    DeviceInfoFormate(data){
      if (data['status']==2){
        data['status']="设备离线";
      }
      if (data['status']==1){
        data['status']="运行正常";
      }
      if (data['status']==0){
        data['status']="设备断电";
      }
      var install = data.installTime + "";
      var maintain = data.maintenanceDate+"";
      if(install.length>10){
        install = install.substring(0, install.length-9);
      }
      if(maintain.length>10){
        maintain = maintain.substring(0, maintain.length-9);
      }
      data['installTime'] = install;
      data['maintenanceDate'] = maintain;
    },

    //视频----------------------------------------------------------
    getCameraUrl(assetId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getCamera({
        token: token,
        assetId: assetId,
      })
        .then(res => {
          console.log("=========================");
          console.log("视频地址:");
          console.log(res.data);
          this.playerOptions.sources[0].src=res.data.result.rtmpUrl;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //设备开关
    openCamera(){
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
    closeCamera(){
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

    //API above,UI below------------------------------------------------



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
    initData() {
      this.getDeviceList();
    }
  },
  mounted() {
    this.initData();
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    currentStream() {
      return this.currentTech === "Flash" ? "RTMP" : "HLS";
    }
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
  height: 557px;
  width: 80%;
  float: right;
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

.vjs-custom-skin {
  margin: 20%;
  height: 608px;
}

.myvideo {
  background-color: #000;
}
</style>

<template>
  <Layout>
    <div class="envir_dataAnalysis">
      <Content style="padding:5px;padding-left:0px;">
        <Row>
          <i-col span="5">
            <Card class="treeCard">
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
              <Tree :data="AssetData" ref="mainTree" @on-select-change="setData"></Tree>
            </Card>
          </i-col>

<i-col span="19" offset="5">
            <Drawer v-model="showMap" width="100%" :closable="true" :inner="true" :transfer="false">
            <div ref="basicMapbox2" style=" height:100%; width:100%;"></div>
          </Drawer>
          <Row>
            <i-col span="24"  >

              <Card class="analysis_big_chart_with_picker">
                <p slot="title" style="padding-top:7px">
                  <Icon type="ios-pulse" size="20"/>
                  <span style="font-size:18px;">{{currentAssetName}} — 周数据分析</span>
                  <span style="float:right;">
                    <date-picker
                      size="small"
                      type="datetime"
                      v-model="endTimeWeek"
                      placeholder="请选择结束时间"
                      :options="endTimeOption"
                    ></date-picker>
                    <button
                      class="search-btn ivu-btn ivu-btn-primary ivu-btn-default"
                      @click="judgeSelectedWeek();"
                      type="primary"
                      style="margin-left:5px;height:25px;padding-top:3px;"
                    >确认结束时间</button>
                  </span>
                </p>
                <div id="chartweek" style="width: 1170px; height: 362px;"></div>
              </Card>
            </i-col>
          </Row>
          <Row style="margin-top:12px;">
            <i-col span="24" >
              <Card class="analysis_big_chart_with_picker">
                <p slot="title" style="padding-top:7px">
                  <Icon type="ios-pulse" size="18"/>
                  <span style="font-size:18px;">{{currentAssetName}} — 月数据分析</span>
                  <span style="float:right">
                    <date-picker
                      size="small"
                      type="datetime"
                      v-model="endTimeMonth"
                      placeholder="请选择开始时间"

                      :options="endTimeOption"
                    ></date-picker>
                    <button
                      class="search-btn ivu-btn ivu-btn-primary ivu-btn-default"
                      @click="judgeSelectedMonth()"
                      type="primary"
                      style="margin-left:5px;height:25px;padding-top:3px;"
                    >确认结束时间</button>
                  </span>
                </p>
                <div id="chartmonth" style="width:1170px; height: 362px;"></div>
              </Card>
            </i-col>
          </Row>
          <Row style="margin-top:12px;">
            <i-col span="24" >
              <Card class="analysis_big_chart_with_picker">
                <p slot="title" style="padding-top:7px">
                  <Icon type="ios-pulse" size="18"/>
                  <span style="font-size:18px;">{{currentAssetName}} — 日平均分析</span>
                  <span style="float:right">
                    <date-picker
                      size="small"
                      type="datetime"
                      format="yyyy-MM-dd"
                      v-model="averageTime"
                      placeholder="请选择时间范围"
                      :options="endTimeOption"
                    ></date-picker>
                    <button
                      class="search-btn ivu-btn ivu-btn-primary ivu-btn-default"
                      @click="judgeSelectedAverage()"
                      type="primary"
                      style="margin-left:5px;height:25px;padding-top:3px;"
                    >确认时间</button>
                  </span>
                </p>
                <div id="chartaverage" style="width:1170px; height: 362px;"></div>
              </Card>
            </i-col>
          </Row>
</i-col>
        </Row>
      </Content>
    </div>
  </Layout>
</template>

<script>
import echarts from "echarts";
import mapboxgl from "mapbox-gl";
import { getAssetDevices, getDataByDays, getAverageData } from "@/api/envir";
import { constants } from "crypto";
import ICol from "iview/src/components/grid/col";
import Divider from "iview/src/components/divider/divider";

export default {
  name: "device_light_data_analysis",
  components: {
    Divider,
    ICol,
    echarts
  },
  data() {
    return {
      deviceInfo:[],
      showMap: false,
      concentratorLocatoin: [],
      lightPoleLocation: [],
      //左侧树数据
      AssetData: [],
      //时间选择器数据
      endTimeWeek: new Date(),
      endTimeMonth: new Date(),
      averageTime: new Date(),
      //当前设备ID
      currentAssetID: "",
      currentAssetName: "",
      //图表数据初始化
      weekDaysData: [],
      monthDaysData: [],
      xAxisWeekData: [],
      xAxisMonthData: [],
      //周表数据初始
      weekCO: [],
      weekNO2: [],
      weekO3: [],
      weekSO2: [],
      weekPM2: [],
      weekPM10: [],
      weekTemperature: [],
      weekNoise: [],
      //月表初始化
      monthCO: [],
      monthNO2: [],
      monthO3: [],
      monthSO2: [],
      monthPM2: [],
      monthPM10: [],
      monthTemperature: [],
      monthNoise: [],
      //日平均表初始化
      averageTitle:"",
      averageCO: [],
      averageNO2: [],
      averageO3: [],
      averageSO2: [],
      averagePM2: [],
      averagePM10: [],
      averageTemperature: [],
      averageNoise: [],

      //设置时间选择器限制
      endTimeOption: {
        disabledDate(date) {
          //不可选今天之后的日期
          return date && date.valueOf() > Date.now();
        }
      }
      //
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
          this.deviceInfo=res.data.result[0]["deviceLightPoleDtoList"][0]["deviceAssetList"][0]
          this.convertDiviceListFormat(data);
          this.$nextTick(function() {
            this.getDefaultNode();
            this.judgeSelectedWeek();
            this.judgeSelectedMonth();
            this. createMapRenderData(data)
          });
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
    //选择默认Tree node
    getDefaultNode() {
      var array = [];
      var data = this.$refs.mainTree.getSelectedNodes();
      //因为直选中一个，数组为0

      this.setData(array, data[0]);
    },
    convertDiviceListFormat2(data) {
      let menu = [];
      for (let i in data) {
        data[i]["title"] = data[i]["name"];
        data[i]["expand"] = true;
        //data[i]["render"] = this.concentrator;
        // deal with children
        let children = data[i]["deviceLightPoleDtoList"];
        //console.log(children)
        if (children != null) {
          for (let y in children) {
            console.log("deviceLightPoleDtoList");
            console.log(children[y]);
            children[y]["title"] = children[y]["name"];
            children[y]["expand"] = true;
            // deal with sub children
            let child = data[i]["deviceLightPoleDtoList"][y]["deviceAssetList"];
            console.log("deviceAssetList");
            //console.log(child)

            if (child != null) {
              console.log(child);
              for (let z in child) {
                child[z]["title"] = child[z]["deviceName"];
                console.log(child[z]["title"]);
                child[z]["expand"] = true;
                // child[z]["selected"] = false;
                // if (child[z]["status"] < 1) {
                //   child[z]["render"] = this.lightOff;
                // } else if (child[z]["status"] <= 100) {
                //   child[z]["render"] = this.lightOn;
                // } else {
                //   child[z]["render"] = this.lightError;
                // }
                data[i]["deviceLightPoleDtoList"][y]["deviceAssetList"][z] =
                  child[z];
              }
            }
            data[i]["deviceLightPoleDtoList"][y] = children[y];
          }
        }
        menu.push(data[i]);
      }
      this.AssetData = menu;
      return menu;
    },
    /* -----------------------------------------------*/
    //设定跳转所需变量
    setData(array, data) {
      //隐藏图表的显示

      console.log(JSON.stringify(data));
      var chart = document.getElementById("chartweek");
      var chart2 = document.getElementById("chartmonth");
      var chart3 = document.getElementById("chartaverage");
      if (chart.style.display == "block"||chart2.style.display == "block"||chart3.style.display == "block") {
        chart.style.display = "none";
        chart2.style.display = "none";
        chart3.style.display = "none";
        this.$Message.warning("请重新选择时间范围！");
      }


      if (data.deviceType != null) {
        this.currentAssetID = data.id;
        this.currentAssetName = data.deviceName;
        //地图更新
        let lat = parseFloat(data.latitude);
        let lng = parseFloat(data.longitude);
        console.log(data.latitude)
        console.log(lng)
        this.createMapLarge(lat, lng);
      }
    },
    judgeSelectedWeek() {
      if (this.currentAssetName == "") {
        this.$Message.warning("请选择一个传感器！");
      } else this.getWeekDaysData();
    },
    judgeSelectedMonth() {
      if (this.currentAssetName == "") {
        this.$Message.warning("请选择一个传感器！");
      } else this.getMonthDaysData();
    },
    judgeSelectedAverage() {
      if (this.currentAssetName == "") {
        this.$Message.warning("请选择一个传感器！");
      } else this.getAverageDaysData();
    },
    /* -----------------------------------------------*/
    //获取周传感器数据
    getWeekDaysData() {
      let tempchart = document.getElementById("chartweek");
      tempchart.style.display = "block";
      let token = this.$store.state.user.token;
      //得到终止时间
      var endtime = new Date(this.endTimeWeek).Format("yyyy-MM-dd HH:mm:ss");
      //得到终止时间
      let temp = new Date(this.endTimeWeek);
      temp = temp.setDate(temp.getDate() - 7);
      temp = new Date(temp);
      var starttime = new Date(temp).Format("yyyy-MM-dd HH:mm:ss");
      //执行后台函数
      getDataByDays({
        token: token,
        beginTime: starttime,
        endTime: endtime,
        assetId: this.currentAssetID
      })
        .then(res => {
          console.log("=========================");
          console.log("传感器周数据:");
          //运行函数格式化数据
          this.formatWeekDaysData(res.data.result);
          this.$nextTick(function() {
            this.drawWeekDaysChart();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //获得的 周 数据进行预处理
    formatWeekDaysData(weekdata) {
      console.log(weekdata);
      //清空前一次查询数据
      this.xAxisWeekData = [];
      this.weekCO = [];
      this.weekNO2 = [];
      this.weekO3 = [];
      this.weekSO2 = [];
      this.weekPM2 = [];
      this.weekPM10 = [];
      this.weekTemperature = [];
      this.weekNoise = [];
      //获取格式化后终止时间
      var endtimeweek = new Date(this.endTimeWeek).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      //转化为中文日期
      endtimeweek = endtimeweek.substring(0, 10);
      endtimeweek = endtimeweek.replace("-", "年");
      endtimeweek = endtimeweek.replace("-", "月");
      endtimeweek = endtimeweek + "日";
      //获取格式化后开始时间
      let temp = new Date(this.endTimeWeek);
      temp = temp.setDate(temp.getDate() - 7);
      temp = new Date(temp);
      var starttimeweek = new Date(temp).Format("yyyy-MM-dd HH:mm:ss");
      //转化为中文日期
      starttimeweek = starttimeweek.substring(0, 10);
      starttimeweek = starttimeweek.replace("-", "年");
      starttimeweek = starttimeweek.replace("-", "月");
      starttimeweek = starttimeweek + "日";
      //转化为x轴
      this.xAxisWeekData.push(starttimeweek);
      for (var i = 6; i > 0; i--) {
        let tempdate = new Date(this.endTimeWeek);
        tempdate = tempdate.setDate(tempdate.getDate() - i);
        tempdate = new Date(tempdate);
        var middle = new Date(tempdate).Format("yyyy-MM-dd HH:mm:ss");
        //转化为中文日期
        middle = middle.substring(0, 10);
        middle = middle.replace("-", "年");
        middle = middle.replace("-", "月");
        middle = middle + "日";
        this.xAxisWeekData.push(middle);
      }
      //转化数据
      for (i in weekdata) {
        this.weekCO.push(weekdata[i].co);
        this.weekNO2.push(weekdata[i].no2);
        this.weekO3.push(weekdata[i].o3);
        this.weekSO2.push(weekdata[i].so2);
        this.weekPM2.push(weekdata[i].pm2d5);
        this.weekPM10.push(weekdata[i].pm10);
        this.weekTemperature.push(weekdata[i].temperature);
        this.weekNoise.push(weekdata[i].noise);
      }
    },
    //周数据分析图标绘画
    drawWeekDaysChart() {
      var option = {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            saveAsImage: { show: true },
            restore: { show: true }
          }
        },
        calculable: true,
        legend: {
          data: [
            "一氧化碳",
            "二氧化氮",
            "臭氧",
            "二氧化硫",
            "PM2.5",
            "PM10",
            "温度",
            "噪音"
          ]
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisWeekData
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "空气质量",
            axisLabel: {
              formatter: "{value} 克/立方米"
            }
          },
          {
            type: "value",
            name: "温度",
            axisLabel: {
              formatter: "{value} °C"
            }
          },
          {
            type: "value",
            name: "噪音",
            offset: 40,
            axisLabel: {
              formatter: "{value} 分贝"
            }
          }
        ],
        grid: {
          top: "20%",
          left: "8%",
          right: "8%",
          bottom: "10%"
        },
        series: [
          {
            name: "一氧化碳",
            type: "bar",
            data: this.weekCO
          },
          {
            name: "二氧化氮",
            type: "bar",
            data: this.weekNO2
            //data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
          },
          {
            name: "臭氧",
            type: "bar",
            data: this.weekO3
            //data: [3.0, 4.9, 19.0, 29.4, 38.7, 90.7, 275.6]
          },
          {
            name: "二氧化硫",
            type: "bar",
            data: this.weekSO2
            //data: [13.0, 24.9, 119.0, 9.4, 8.7, 210.7, 75.6]
          },
          {
            name: "PM2.5",
            type: "bar",
            data: this.weekPM2
            //data: [3.0, 0.9, 1.0, 0.94, 8.7, 20.7, 5.6]
          },
          {
            name: "PM10",
            type: "bar",
            data: this.weekPM10
            //data: [3.0, 0.29, 11.9, 9.4, 0.87, 2.7, 15.6]
          },
          {
            name: "温度",
            type: "line",
            yAxisIndex: 1,
            data: this.weekTemperature
            //data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
          },
          {
            name: "噪音",
            type: "line",
            yAxisIndex: 2,
            data: this.weekNoise
            //data: [23.0, 25.2, 32.3, 45.5, 61.3, 102.2, 20.3]
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(
        document.getElementById("chartweek"),
        "macarons"
      );
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    /* -----------------------------------------------*/
    //获取月传感器数据
    getMonthDaysData() {
      //恢复图表的显示
      let tempchart2 = document.getElementById("chartmonth");
      tempchart2.style.display = "block";

      let token = this.$store.state.user.token;
      //得到终止时间
      var endtime = new Date(this.endTimeMonth).Format("yyyy-MM-dd HH:mm:ss");
      //得到开始时间
      let temp = new Date(this.endTimeMonth);
      temp = temp.setDate(temp.getDate() - 31);
      temp = new Date(temp);
      var starttime = new Date(temp).Format("yyyy-MM-dd HH:mm:ss");
      //执行后台函数
      getDataByDays({
        token: token,
        beginTime: starttime,
        endTime: endtime,
        assetId: this.currentAssetID
      })
        .then(res => {
          console.log("=========================");
          console.log("传感器月数据:");
          //运行函数格式化数据
          this.formatMonthDaysData(res.data.result);
          this.$nextTick(function() {
            this.drawMonthDaysChart();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //获得的 月 数据进行预处理
    formatMonthDaysData(monthdata) {
      console.log(monthdata);
      //清空前一次查询数据
      this.xAxisMonthData = [];
      this.monthCO = [];
      this.monthNO2 = [];
      this.monthO3 = [];
      this.monthSO2 = [];
      this.monthPM2 = [];
      this.monthPM10 = [];
      this.monthTemperature = [];
      this.monthNoise = [];
      //获取格式化后终止时间
      var endtimemonth = new Date(this.endTimeMonth).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      //转化为中文日期
      endtimemonth = endtimemonth.substring(5, 10);
      //endtimemonth = endtimemonth.replace("-", "年");
      endtimemonth = endtimemonth.replace("-", "月");
      endtimemonth = endtimemonth + "日";
      //获取格式化后开始时间
      let temp = new Date(this.endTimeMonth);
      temp = temp.setDate(temp.getDate() - 31);
      temp = new Date(temp);
      var starttimemonth = new Date(temp).Format("yyyy-MM-dd HH:mm:ss");
      //转化为中文日期
      starttimemonth = starttimemonth.substring(5, 10);
      //starttimemonth = starttimemonth.replace("-", "年");
      starttimemonth = starttimemonth.replace("-", "月");
      starttimemonth = starttimemonth + "日";
      //转化为x轴
      this.xAxisMonthData.push(starttimemonth);
      for (var i = 30; i > 0; i--) {
        let tempdate = new Date(this.endTimeMonth);
        tempdate = tempdate.setDate(tempdate.getDate() - i);
        tempdate = new Date(tempdate);
        var middle = new Date(tempdate).Format("yyyy-MM-dd HH:mm:ss");
        //转化为中文日期
        middle = middle.substring(8, 10);
        //middle = middle.replace("-", "年");
        //middle = middle.replace("-", "月");
        middle = middle + "日";
        this.xAxisMonthData.push(middle);
      }
      this.xAxisMonthData.push(endtimemonth);
      console.log(this.xAxisMonthData);
      //转化数据
      for (i in monthdata) {
        this.monthCO.push(monthdata[i].co);
        this.monthNO2.push(monthdata[i].no2);
        this.monthO3.push(monthdata[i].o3);
        this.monthSO2.push(monthdata[i].so2);
        this.monthPM2.push(monthdata[i].pm2d5);
        this.monthPM10.push(monthdata[i].pm10);
        this.monthTemperature.push(monthdata[i].temperature);
        this.monthNoise.push(monthdata[i].noise);
      }
    },
    //月数据分析图标绘画
    drawMonthDaysChart() {
      var option = {
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            saveAsImage: { show: true },
            restore: { show: true }
          }
        },
        calculable: true,
        legend: {
          data: [
            "一氧化碳",
            "二氧化氮",
            "臭氧",
            "二氧化硫",
            "PM2.5",
            "PM10",
            "温度",
            "噪音"
          ]
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              interval: 0,
              rotate: 25
            },
            data: this.xAxisMonthData
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "空气质量",
            axisLabel: {
              formatter: "{value} 克/立方米"
            }
          },
          {
            type: "value",
            name: "温度",
            axisLabel: {
              formatter: "{value} °C"
            }
          },
          {
            type: "value",
            name: "噪音",
            offset: 40,
            axisLabel: {
              formatter: "{value} 分贝"
            }
          }
        ],
        grid: {
          top: "20%",
          left: "8%",
          right: "8%",
          bottom: "12%"
        },
        series: [
          {
            name: "一氧化碳",
            type: "bar",
            data: this.monthCO
          },
          {
            name: "二氧化氮",
            type: "bar",
            data: this.monthNO2
            //data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
          },
          {
            name: "臭氧",
            type: "bar",
            data: this.monthO3
            //data: [3.0, 4.9, 19.0, 29.4, 38.7, 90.7, 275.6]
          },
          {
            name: "二氧化硫",
            type: "bar",
            data: this.monthSO2
            //data: [13.0, 24.9, 119.0, 9.4, 8.7, 210.7, 75.6]
          },
          {
            name: "PM2.5",
            type: "bar",
            data: this.monthPM2
            //data: [3.0, 0.9, 1.0, 0.94, 8.7, 20.7, 5.6]
          },
          {
            name: "PM10",
            type: "bar",
            data: this.monthPM10
            //data: [3.0, 0.29, 11.9, 9.4, 0.87, 2.7, 15.6]
          },
          {
            name: "温度",
            type: "line",
            yAxisIndex: 1,
            data: this.monthTemperature
            //data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
          },
          {
            name: "噪音",
            type: "line",
            yAxisIndex: 2,
            data: this.monthNoise
            //data: [23.0, 25.2, 32.3, 45.5, 61.3, 102.2, 20.3]
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(
        document.getElementById("chartmonth"),
        "macarons"
      );
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    /* ----------------------------------------------*/
    //获取传感器日平均数据
    getAverageDaysData() {
      //恢复图表的显示
      let tempchart3 = document.getElementById("chartaverage");
      tempchart3.style.display = "block";
      //开始取值
      let token = this.$store.state.user.token;
      //得到开始结束时间
      var averagetimestart = new Date(this.averageTime).Format('yyyy-MM-dd') + ' 00:00:00';
      var averagetimeend = new Date(this.averageTime).Format('yyyy-MM-dd 23:59:59');
      //执行后台函数
      getAverageData({
        token: token,
        beginTime: averagetimestart,
        endTime: averagetimeend,
        assetId: this.currentAssetID
      })
        .then(res => {
          console.log("=========================");
          console.log("传感器平均数据:");
          //运行函数格式化数据
          this.formatMonthDaysData(res.data.result)
          this.$nextTick(function() {
            this.drawAverageDaysChart();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //获得的 日平均 数据进行预处理
    formatMonthDaysData(averagedata){
      console.log(averagedata);
      //清空前一次查询数据
      this.averageTitle = "";
      this.averageCO = [];
      this.averageNO2 = [];
      this.averageO3 = [];
      this.averageSO2 = [];
      this.averagePM2 = [];
      this.averagePM10 = [];
      this.averageTemperature = [];
      this.averageNoise = [];
      //获取格式化后终止时间
      var endtimeaverage = new Date(this.averageTime[1]).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      //转化为中文日期
      endtimeaverage = endtimeaverage.substring(0, 10);
      endtimeaverage = endtimeaverage.replace("-", "年");
      endtimeaverage = endtimeaverage.replace("-", "月");
      endtimeaverage = endtimeaverage + "日";
      //获取格式化后开始时间
      var starttimeaverage = new Date(this.averageTime[0]).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      //转化为中文日期
      starttimeaverage = starttimeaverage.substring(0, 10);
      starttimeaverage = starttimeaverage.replace("-", "年");
      starttimeaverage = starttimeaverage.replace("-", "月");
      starttimeaverage = starttimeaverage + "日";
      //日平均表格标题
      this.averageTitle = starttimeaverage + "--" + endtimeaverage;
      //转化数据
      this.averageCO = averagedata.co;
      this.averageNO2 = averagedata.no2;
      this.averageO3 = averagedata.o3;
      this.averageSO2 = averagedata.so2;
      this.averagePM2 = averagedata.pm2d5;
      this.averagePM10 = averagedata.pm10;
      this.averageTemperature = averagedata.temperature;
      this.averageNoise = averagedata.noise;

    },
    //日平均数据分析图标绘画
    drawAverageDaysChart() {
      var placeHolderStyle = {
        normal: {
          color: "rgba(0,0,0,0)",
          label: {
            show: true,
            position: "center"
          },
          labelLine: { show: false }
        },
        emphasis: {
          color: "rgba(0,0,0,0)"
        }
      };
      var labelInnerBottom1 = {
        normal: {
          color: "#00CD66"
        }
      };
      var labelInnerBottom2 = {
        normal: {
          color: "rgba(0,0,0,0)"
        },
        emphasis: {
          color: "rgba(0,0,0,0)"
        }
      };
      var option = {
        legend: {
          x: "center",
          y: "50.0%",
          data: [
            "一氧化碳",
            "二氧化氮",
            "臭氧",
            "二氧化硫",
            "PM2.5",
            "PM10",
            "温度",
            "噪音",
            "各项标准值"
          ]
        },
        title: {
          text: this.averageTitle,
          subtext: "环境传感器平均数据",
          x: "center"
        },
        tooltip: {
          show: true,
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "实时平均数据",
            type: "pie",
            center: ["20%", "30%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "一氧化碳",
                value: this.averageCO,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "克/立方米";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter:
                    "{a} <br/>" + "一氧化碳平均数据:" + "{c} (克/立方米)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["20%", "30%"],
            radius: [50, 65],
            color: "#00CD66",
            data: [
              {
                value: 50,
                name: "一氧化碳标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "一氧化碳标准值:" + "{c} (克/立方米)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          },
          {
            name: "实时平均数据",
            type: "pie",
            center: ["40%", "30%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "二氧化氮",
                value: this.averageNO2,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "克/立方米";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter:
                    "{a} <br/>" + "二氧化氮平均数据:" + "{c} (克/立方米)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["40%", "30%"],
            radius: [50, 65],
            data: [
              {
                value: 50,
                name: "二氧化氮标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "二氧化氮标准值:" + "{c} (克/立方米)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          },
          {
            name: "实时平均数据",
            type: "pie",
            center: ["60%", "30%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "臭氧",
                value: this.averageO3,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "克/立方米";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter: "{a} <br/>" + "臭氧平均数据:" + "{c} (克/立方米)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["60%", "30%"],
            radius: [50, 65],
            data: [
              {
                value: 50,
                name: "臭氧标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "臭氧标准值:" + "{c} (克/立方米)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          },
          {
            name: "实时平均数据",
            type: "pie",
            center: ["80%", "30%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "二氧化硫",
                value: this.averageSO2,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "克/立方米";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter:
                    "{a} <br/>" + "二氧化硫平均数据:" + "{c} (克/立方米)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["80%", "30%"],
            radius: [50, 65],
            data: [
              {
                value: 50,
                name: "二氧化硫标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "二氧化硫标准值:" + "{c} (克/立方米)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          },
          {
            name: "实时平均数据",
            type: "pie",
            center: ["20%", "75%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "PM2.5",
                value: this.averagePM2,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "克/立方米";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter: "{a} <br/>" + "PM2.5平均数据:" + "{c} (克/立方米)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["20%", "75%"],
            radius: [50, 65],
            data: [
              {
                value: 50,
                name: "PM2.5标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "PM2.5标准值:" + "{c} (克/立方米)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          },
          {
            name: "实时平均数据",
            type: "pie",
            center: ["40%", "75%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "PM10",
                value: this.averagePM10,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "克/立方米";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter: "{a} <br/>" + "PM10平均数据:" + "{c} (克/立方米)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["40%", "75%"],
            radius: [50, 65],
            data: [
              {
                value: 50,
                name: "PM10标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "PM10标准值:" + "{c} (克/立方米)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          },
          {
            name: "实时平均数据",
            type: "pie",
            center: ["60%", "75%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "温度",
                value: this.averageTemperature,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "℃";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter: "{a} <br/>" + "温度平均数据:" + "{c} (℃)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["60%", "75%"],
            radius: [50, 65],
            data: [
              {
                value: 50,
                name: "温度标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "温度标准值:" + "{c} (℃)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          },
          {
            name: "实时平均数据",
            type: "pie",
            center: ["80%", "75%"],
            radius: [35, 50],
            data: [
              {
                name: "invisible",
                value: 46,
                tooltip: {
                  show: false
                },
                itemStyle: placeHolderStyle
              },
              {
                name: "噪音",
                value: this.averageNoise,
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.name + "\n" + params.value + "分贝";
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                tooltip: {
                  formatter: "{a} <br/>" + "噪音平均数据:" + "{c} (分贝)"
                }
              }
            ]
          },
          {
            name: "各项标准值",
            type: "pie",
            clockWise: false,
            center: ["80%", "75%"],
            radius: [50, 65],
            data: [
              {
                value: 50,
                name: "噪音标准值",
                tooltip: {
                  formatter: "{a} <br/>" + "噪音标准值:" + "{c} (分贝)"
                },
                itemStyle: labelInnerBottom1
              },
              {
                value: 50,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: labelInnerBottom2
              }
            ]
          }
        ]
      };

      //初始化echarts实例
      var myChart = echarts.init(
        document.getElementById("chartaverage"),
        "macarons"
      );
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },

    initData() {
      this.getDeviceList(3);
    }
  },

  mounted() {
    this.initData();


  }
};
</script>
<style lang="less" scoped>
</style>

<template>
  <div class="layout">
    <Content :style="{ minHeight: '280px'}">
      <Row class="background-row">
        <Row >
          <div class="dark">
            <Row :gutter="20">
              <i-col
                :xs="24"
                :md="20"
                :lg="4"
                v-for="(infor, i) in inforCardData"
                :key="`infor-${i}`"
                style="height: 120px;padding-bottom: 10px; "
              >
                <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
                  <count-to :end="infor.count" count-class="count-style" style=" font-size: 50px;"/>
                  <p>{{ infor.title }}</p>
                </infor-card>
              </i-col>
            </Row>
          </div>
          <card>
            <div id="barchart" style="height:281px;width:100%;"></div>
          </card>

        </Row>
        <Row style="margin-top:10px;">
          <i-col span="12">
            <Row align="bottom" style="margin-right:10px;">
              <card>
                <div id="curvechart" style="height:300px;width:100%;"></div>
              </card>

              <!-- <Card shadow class="paddingCardRightLeftUpdate">
                <p slot="title" font-weight="bold">
                  <Icon type="ios-warning"/>
                  <span style="font-weight:bold;">实时报警</span>
                </p>
                <div style="height:323px; color:#fff; width: 100%;">
                  <Row style="margin:10px; ">
                    <ul>
                      <li v-for="(item, index) in alarmList" :key="index" style="margin-top:5px;">
                        <Row>
                          <i-col span="1">
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
              </Card> -->

              <card style="margin-top:10px;">
                <div id="holechart" style="height:400px;width:100%;"></div>
              </card>

            </Row>
          </i-col>
          <i-col span="12">
            <card>
              <div id="pie_month" style="height:720px;width:100%;">
              </div>

              <tr>
                <td width="400px">
                  <Button type="primary" size="small" @click="up_month()">
                    <Icon type="md-arrow-dropleft"/>
                    上个月
                  </Button>
                </td>
                <td width="80%" align="center">当前月份:{{year}}/{{beginmonth}}
                <td>
                  <Button size="small" type="primary" @click="down_month()">下个月
                    <Icon type="md-arrow-dropright"/>
                  </Button>
                </td>
              </tr>

            </card>

          </i-col>

        </Row>


      </Row>
    </Content>
  </div>
</template>

<script>
  import InforCard from "_c/info-card";
  import CountTo from "_c/count-to";
  import echarts from 'echarts'
  import Tables from "_c/tables";
  import {
    getAlarmMessage,
    getAllDevicesStatus,
    getAllAlarmAnalysisTotal,
    getAnalysisSensorHome
  } from "@/api/home";
  import {on, off} from "@/libs/tools";

  const axios = require("axios");

  export default {
    name: "device_warning",
    components: {
      InforCard,
      CountTo,
      Tables,
      echarts,
    },

    data() {
      return {
        inforCardData: [
          {title: "人流道灯",icon: "md-person-add",count: 10,color: "#2d8cf0"},
          {title: "车行道灯", icon: "md-locate", count: 232, color: "#19be6b"},
          {title: "环境监测",icon: "md-help-circle",count: 142,color: "#ff9900"},
          {title: '基站', icon: 'md-share', count: 657, color: '#ed3f14'},
          {title: '车流雷达', icon: 'md-chatbubbles', count: 12, color: '#E46CBB'},
          {title: '人流监控', icon: 'md-map', count: 14, color: '#9A66E4'}
        ],
        curveData: [
          {date: "4.17", data1: 12, data2: 34, data3: 60},
          {date: "4.18", data1: 15, data2: 37, data3: 64},
          {date: "4.19", data1: 13, data2: 32, data3: 58},
          {date: "4.20", data1: 12, data2: 34, data3: 60},
          {date: "4.21", data1: 15, data2: 37, data3: 64},
          {date: "4.22", data1: 13, data2: 32, data3: 58},
        ],
        holeData:[
          {value:[390,220,15,9,0.5],name:2001},
          {value:[380,210,20,18,2],name:2002},
          {value:[370,200,25,27,4.5],name:2003},
          {value:[360,190,30,36,6],name:2004},
          {value:[350,180,35,45,7],name:2005},
          {value:[340,170,40,54,9],name:2006},
          {value:[330,160,45,63,12],name:2007},
          {value:[320,150,50,72,15],name:2008},
          {value:[310,140,55,81,18],name:2009},
          {value:[300,130,60,90,19],name:2010},
          {value:[290,120,65,99,22],name:2011},
          {value:[280,110,70,108,25],name:2012},
          {value:[270,100,75,117,28],name:2013},
        ],
        barData: [],
        piedata: [],
        alarmList: [],
        beginmonth: new Date().getMonth() + 1,
        beginmonth1: new Date().getMonth() + 1,
        endmonth: new Date().getMonth() + 2,
        endday: new Date().getDate(),
        year: new Date().getFullYear(),
        nowday: new Date().toLocaleDateString()

      };
    },
    methods: {
      inforCardData1(data){
        console.log(data)
        console.log(this.barData)
        this.inforCardData[0].count=data[0].running
        this.inforCardData[1].count=data[1].running
        this.inforCardData[2].count=data[2].running
        this.inforCardData[3].count=data[3].running
        this.inforCardData[4].count=data[4].running
        this.inforCardData[5].count=data[5].running},
      up_month() {
        if (this.beginmonth == 1) {
          this.beginmonth = 12;
          this.endmonth = 13;
          this.beginmonth1 = this.endmonth;
          this.year = this.year - 1;
          console.log("if ")
          console.log(this.year + "-" + this.beginmonth + "-1")
          console.log(this.year + "-" + this.beginmonth1 + "-" + this.endday)
        } else {
          var date = this.beginmonth - 1;
          this.beginmonth = date;
          console.log(this.year + "-" + this.beginmonth + "-1")
          var date1 = this.endmonth - 1;
          this.endmonth = date1;
          this.beginmonth1 = this.endmonth;
          this.endday = 1;
          console.log(this.year + "-" + this.beginmonth1 + "-" + this.endday)
        }
        this.getPieData();
      },
      down_month() {
        if (new Date().toLocaleDateString() < this.year + "/" + (this.beginmonth + 1)) {
          this.$Message.error('不能超过当前时间');
        } else {
          if (this.beginmonth == 12) {
            this.year = this.year + 1;
            this.beginmonth = 1;
            this.endmonth = 2;
            this.beginmonth1 = this.endmonth
            console.log(this.year + "-" + this.beginmonth + "-1")
            console.log(this.year + "-" + this.beginmonth1 + "-" + this.endday)
          } else {
            if (this.endmonth == (new Date().getMonth() + 1)) {
              var date = this.beginmonth + 1;
              this.beginmonth = date;
              var date1 = this.endmonth + 1;
              this.endmonth = date1;
              console.log(this.year + "-" + this.beginmonth + "-1")
              console.log(this.endmonth)
              this.beginmonth1 = new Date().getMonth() + 1
              this.endday = new Date().getDate()
              console.log("if")
              console.log(this.year + "-" + this.beginmonth1 + "-" + this.endday)
            } else {
              var date = this.beginmonth + 1;
              this.beginmonth = date;
              console.log(this.year + "-" + this.beginmonth + "-1")
              var date1 = this.endmonth + 1;
              this.endmonth = date1;
              this.beginmonth1 = this.endmonth;
              this.endday = 1;
              console.log(this.year + "-" + this.beginmonth1 + "-" + this.endday)
            }
          }
          this.getPieData();
        }
      },
      getVirtulData() {
        var date = +echarts.number.parseDate(this.year + "-" + this.beginmonth + "-1");
        var end = +echarts.number.parseDate(this.year + "-" + this.beginmonth1 + "-" + this.endday);
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime("yyyy-MM-dd", time),
            Math.floor(Math.random() * 10000)
          ]);
        }


        console.log(data)
        return data;
      },
      /* ----------------------------------------------*/
      drawMiddleLeftCurve() {
        console.log("=============================")
        console.log("报警信息分析")
        var cellSize = [90, 90];
        var scatterData = this.getVirtulData();
        var option = {
          title: {
            text: '报警信息分析',
          },
          tooltip: {},
          legend: {
            data: ["已处理", "正在处理", "未处理"],
            bottom: 20
          },
          calendar: {
            top: "middle",
            left: "center",
            orient: "vertical",
            cellSize: '95',
            yearLabel: {
              show: false,
              textStyle: {
                fontSize: 30
              }
            },
            dayLabel: {
              margin: 1,
              firstDay: 1,
              nameMap: [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六"
              ]
            },
            monthLabel: {
              show: false
            },
            range: [this.year + "-" + this.beginmonth]
          },
          series: [
            {
              id: "label",
              type: "scatter",
              coordinateSystem: "calendar",
              symbolSize: 1,
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    return echarts.format.formatTime("dd", params.value[0]);
                  },
                  offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                  textStyle: {
                    color: "#000",
                    fontSize: 11
                  }
                }
              },
              data: scatterData
            }
          ]
        };
        //初始化echarts实例

        var myChart = echarts.init(document.getElementById("pie_month"));
        //窗口初始化
        // window.onresize = myChart.resize;

        myChart.setOption(option, true);

        //使用制定的配置项和数据显示图表
        if (!app.inNode) {
          var _this = this;
          var pieInitialized;
          setTimeout(function () {
            pieInitialized = true;
            myChart.setOption({
              series: _this.getPieSeries(scatterData, myChart)
            });
          }, 100);

          window.addEventListener("resize", function(){
            if (pieInitialized) {
              console.log(2)
              myChart.setOption({
                series: _this.getPieSeriesUpdate(scatterData, myChart)
              });
            }
          });
          // app.onresize = function () {
          //   if (pieInitialized) {
          //     myChart.setOption({
          //       series: _this.getPieSeriesUpdate(scatterData, myChart)
          //     });
          //   }
          // };
        }
      },
      getPieData() {
        let uid = this.$store.state.user.userId;
        let token = this.$store.state.user.token;
        getAllAlarmAnalysisTotal({
          token: token,
          beginTime: this.year + "-" + this.beginmonth + "-1",
          endTime: this.year + "-" + this.beginmonth1 + "-" + this.endday
        })
          .then(res => {
            this.piedata = res.data;
            console.log("报警信息分析1");
            console.log(this.piedata);
            this.$nextTick(function () {
              this.drawMiddleLeftCurve()

            })

          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.$Message.error('获取告警图失败');
          });
      },
      getPieSeries(scatterData, chart) {
        var pieRadius = 35;
        /* let uid = this.$store.state.user.userId;
         let token = this.$store.state.user.token;
         getAllAlarmAnalysisTotal({
            token: token,
            beginTime:"2019-04-01",
            endTime:"2019-05-01"
          })
            .then(res => {
              this.date=res.data;
              console.log("++++++++++++++++++++++++++++++++++")
              console.log(this.date)
              console.log("在线统计信息")
              let date=this.date;*/


        let pieData = this.piedata;
        return echarts.util.map(scatterData, function (item, index) {
          var center = chart.convertToPixel("calendar", item);
          return {
            id: index + "pie",
            type: "pie",
            center: center,
            label: {
              normal: {
                formatter: "{c}",
                position: "inside"
              }
            },
            radius: pieRadius,
            data: [
              {name: "已处理", value: pieData[index].isDeal},
              {name: "正在处理", value: pieData[index].isDealing},
              {name: "未处理", value: pieData[index].isNotDeal}
            ]
          };
        });
        /*})
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取告警图失败');
        });*/


      },

      getPieSeriesUpdate(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
          var center = chart.convertToPixel("calendar", item);
          return {
            id: index + "pie",
            center: center
          };
        });
      },
      drawHole(id) {
        this.charts = echarts.init(document.getElementById(id), 'macarons')
        this.charts.setOption( {
          title : {
              text: '传感器数据',
              x:'left',
              y:'top'
          },
          tooltip : {
              trigger: 'item',
              backgroundColor : 'rgba(0,0,250,0.2)'
          },
          legend: {
            data: this.holeData.map(_ => _.name),
            //padding:[30,0,0,0],
            x:'center',
            y:'bottom'
          },
          // toolbox: {
          //     show : true,
          //     orient : 'vertical',
          //     y:'center',
          //     feature : {
          //         mark : {show: true},
          //         dataView : {show: true, readOnly: false},
          //         restore : {show: true},
          //         saveAsImage : {show: true}
          //     }
          // },
          polar : [
              {
                  indicator : [
                      { text: 'PM2.5', max: 100},
                      { text: 'PM10', max: 100},
                      { text: 'CO', max: 2},
                      { text: 'SO2', max: 100},
                      { text: '温度', max: 60},
                      { text: '湿度', max: 150},
                      { text: '风速', max: 100},
                      { text: '雨量', max: 100},
                      { text: '噪音', max: 150}
                    ],
                    center : ['50%', 180],
                    radius : 140,
                }
            ],
            calculable : false,
            series : [{ 
              name:'传感器',
              type:'radar',
              symbol:'none',
              itemStyle: {
                  normal: {
                      lineStyle: {
                        width:1
                      }
                  },
                  emphasis : {
                      areaStyle: {color:'rgba(0,250,0,0.3)'}
                  }
              },
              areaStyle: {
                  normal: {
                  color: "none"
                },
              },
              data:this.holeData
            }]
        })
      },

      drawCurve(id) {
        this.charts = echarts.init(document.getElementById(id), 'macarons')
        this.charts.setOption({
          title: {
            text: '用电统计',

          },
          tooltip: {
            trigger: 'axis'
          },
          "color": [
            "#32C5E9",
            "#67E0E3",
            "#9FE6B8",
          ],
          legend: {
            data: ['电流', '电压', '耗电量']
          },
          grid: {
            left: "5%",
            right: "1%",
            bottom: "0%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            color: ["#3398DB"],
            axisLabel: {
              textStyle: {
                color: "black"
              }
            },
            axisLine: {
              lineStyle: {
                color: 'black',
              }
            },
            boundaryGap: true,
            data: this.curveData.map(_ => _.date)
          },
          yAxis: [
            {
              name: '单位：次',
              color: ["#3398DB"],
              axisLabel: {
                textStyle: {
                  color: "black"
                }
              },
              type: "value"
            }
          ],
          series: [
            {
              name: '电流',
              type: 'line',
              stack: '电量0',
              label: {
                normal: {
                  color: "#67E0E3",
                  show: true,            //显示数字
                  position: 'top'        //这里可以自己选择位置
                }
              },
              // areaStyle: {
              //   normal: {
              //     color: "#32C5E9"
              //   }
              // },
              data: this.curveData.map(_ => _.data1)
            },
            {
              name: '电压',
              type: 'line',
              stack: '电量1',
              label: {
                normal: {
                  color: "#67E0E3",
                  show: true,            //显示数字
                  position: 'top'        //这里可以自己选择位置
                }
              },
              // areaStyle: {
              //   normal: {
              //     color: "#67E0E3"
              //   }
              // },
              data: this.curveData.map(_ => _.data2)
            },
            {
              name: '耗电量',
              type: 'line',
              stack: '电量2',
              label: {
                normal: {
                  color: "#9FE6B8",
                  show: true,            //显示数字
                  position: 'top'        //这里可以自己选择位置
                }
              },
              // areaStyle: {
              //   normal: {
              //     color: "#9FE6B8"
              //   }
              // },
              data: this.curveData.map(_ => _.data3)
            },
          ]
        })
      },
      drawbarchart(id) {
        this.charts = echarts.init(document.getElementById(id), 'macarons')
        this.charts.setOption({
          title: {
            text: '设备在线统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          "color": [
            "#32C5E9",
            "#67E0E3",
            "#9FE6B8",
          ],
          legend: {
            data: ['在线', '不在线', '已处理']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.barData.map(_ => _.deviceName)
            }
          ],
          yAxis: [
            {
              name: '单位：台',
              color: ["#3398DB"],
              axisLabel: {
                textStyle: {
                  color: "black"
                }
              },
              type: "value"
            }
          ],
          series: [
            {
              name: '在线',
              type: 'bar',
              barWidth: '30%',
              stack: '告警',
              data: this.barData.map(_ => _.running)
            },
            {
              name: '不在线',
              type: 'bar',
              barWidth: '30%',
              stack: '告警',
              data: this.barData.map(_ => _.notrunning)
            },
            // {
            //     name: '总计',
            //     type: 'bar',
            //     stack: '告警',
            //     label: {
            //         normal: {
            //             show: true,
            //             position: 'insideBottom',
            //             formatter:'{c}',
            //             textStyle:{ color:'#000' }
            //         }
            //     },
            //     itemStyle:{
            //         normal:{
            //             color:'rgba(128, 128, 128, 0)'
            //         }
            //     },
            //     data: this.barData.map(_ => _.total)
            // }
          ],
        })
      },
      //告警分析-------------------------------------------------------------
      getAlarm() {
        let uid = this.$store.state.user.userId;
        let token = this.$store.state.user.token;
        getAlarmMessage({
          token: token,
          deviceType: 4,
          isDeal: 0,
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
            this.$Message.error('获取告警信息失败');
          });
      },
      //报警信息处理
      AlarmFormate(data) {
        for (let i in data) {
          if (data[i]["deviceNo"].length > 19) {
            data[i]["deviceNo"] = data[i]["deviceNo"].substring(0, 17) + "...";
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
      //传感器多边形统计数据-------------------------------------------------------------
      getAnalysisSensorHome() {
        let uid = this.$store.state.user.userId;
        let token = this.$store.state.user.token;
        getAnalysisSensorHome({
          token: token,
        })
          .then(res => {
            console.log("=========================");
            console.log("传感器多边形统计数据:");
            console.log(res.data);
            this.holeData=res.data.result;
            this.$nextTick(function () {
              this.drawHole('holechart');
            })
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.$Message.error('获取传感器统计数据失败');
          });
      },
      //设备在线统计
      getAllDevicesStatus() {
        let uid = this.$store.state.user.userId;
        let token = this.$store.state.user.token;
        getAllDevicesStatus({
          token: token,
        })
          .then(res => {
            console.log("=========================");
            console.log("设备在线统计:");
            console.log(res.data.result);
            console.log(res.data.result[0].running)
            this.barData = res.data.result;
            this.AllDevicesStatusFormate(this.barData);
            this.inforCardData1(this.barData)

          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.$Message.error('获取设备在线统计信息失败');
          });
      },
      AllDevicesStatusFormate(data) {
        for (let i in data) {
          data[i].notrunning = data[i].total - data[i].running;
        }
        this.$nextTick(function () {
          this.drawbarchart('barchart');

        })
      },
      initData() {
        //this.getAlarm();
        this.getAnalysisSensorHome();
        this.getAllDevicesStatus();
        this.getPieData();
        this.$nextTick(function () {
          this.drawCurve('curvechart');
        })
      }
    },
    mounted() {
      this.initData();
      window.onresize = () => {
        let barchart = echarts.getInstanceByDom(document.getElementById('barchart'));
        barchart.resize();
        let curvechart = echarts.getInstanceByDom(document.getElementById('curvechart'));
        curvechart.resize();
        let holechart = echarts.getInstanceByDom(document.getElementById('holechart'));
        holechart.resize();
        let pie_month = echarts.getInstanceByDom(document.getElementById('pie_month'));
        pie_month.resize();
      };
    },
  };
</script>

<style lang="less" scoped>
  .ivu-layout {
    background: #001529;
  }

  .ivu-layout-content {
    background-color: transparent !important;
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

  ul {
    list-style: none;
  }

  .imgs {
    width: 100%;
    height: 769px;
  }

  .ivu-card {
    background-color: rgba(255, 255, 255, 0.8) !important;
    // border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 10px 10px;
  }
  .count-style {
    font-size: 50px;
  }
  .dark .ivu-card-body div,
  .ivu-card-head div {
    //background: black;
  }
</style>

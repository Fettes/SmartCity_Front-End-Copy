<template>
  <Layout>
    <Content style="padding:12px;">
      <Row :gutter="16">
        <i-col span="12">
          <Card class="analysis_big_chart">
            <p slot="title">
              <Icon type="md-options"></Icon>开关灯时间
              <button
                class="search-btn ivu-btn ivu-btn-primary ivu-btn-small"
                @click="showtimechoose=true"
                type="primary"
                style="float:right"
              >设置开关灯</button>
            </p>
            <Row>
              <i-col span="12">
                <div id="chartopenlight" style="width:410px; height: 300px;"></div>
              </i-col>
              <i-col span="12">
                <div id="chartcloselight" style="width:410px; height: 300px;"></div>
              </i-col>
            </Row>
          </Card>
          <drag-drawer
            title="设置开关灯"
            :closable="true"
            width="562px"
            class="lightDrawer"
            v-model="showtimechoose"
            min-width="30px"
            :inner="true"
            :transfer="false"
            :scrollable="true"
          >

            <div style="float:right;padding-top:5px;padding-right:5px;">
              <Button style="margin-right: 8px" @click="showtimechoose=false">取消</Button>
              <Button type="primary" @click="showtimechoose=false">下发</Button>
            </div>
          </drag-drawer>
        </i-col>

        <i-col span="12">
          <Card class="analysis_big_chart">
            <p slot="title">
              <Icon type="ios-bulb"/>亮灯率统计
            </p>
            <div id="chartlight" style="width:830px; height: 300px;"></div>
          </Card>
        </i-col>
      </Row>
    </Content>
  </Layout>
</template>

<script>
import echarts from "echarts";
import DragDrawer from "_c/drag-drawer";
import { getDataTime } from "@/api/light";

export default {
  name: "device_light_data_analysis",
  components: {
    echarts,
    DragDrawer
  },
  data() {
    return {
      //开关灯时间数据初始化
      openLight: [],
      closeLight: [],
      //抽屉初始化
      showtimechoose: false,
      //抽屉内部数据初始化
      formData: {
        OnOrOff1: false,
        brightness1: "",
        switchsetting1: false,
        beforeOrlate1: "",
        time1: "",
        type1: "",
        starttime1: "",
        OnOrOff2: false,
        brightness2: "",
        switchsetting2: false,
        beforeOrlate2: "",
        time2: "",
        type2: "",
        starttime2: "",
        OnOrOff3: false,
        brightness3: "",
        switchsetting3: false,
        beforeOrlate3: "",
        time3: "",
        type3: "",
        starttime3: "",
        OnOrOff4: false,
        brightness4: "",
        switchsetting4: false,
        beforeOrlate4: "",
        time4: "",
        type4: "",
        starttime4: ""
      },
      brightnesses: [
        { value: "0", label: "关灯" },
        { value: "10", label: "10%" },
        { value: "20", label: "20%" },
        { value: "30", label: "30%" },
        { value: "40", label: "40%" },
        { value: "50", label: "50%" },
        { value: "60", label: "60%" },
        { value: "70", label: "70%" },
        { value: "80", label: "80%" },
        { value: "90", label: "90%" },
        { value: "100", label: "100%" }
      ],
      timetype: [
        { value: "分钟", label: "分钟" },
        { value: "小时", label: "小时" }
      ],
      cityList: [
        { value: "相对日出提前", label: "相对日出提前" },
        { value: "相对日出延后", label: "相对日出延后" },
        { value: "相对日落提前", label: "相对日落提前" },
        { value: "相对日落延后", label: "相对日落延后" }
      ]
    };
  },

  methods: {
    //抽屉内双样式切换
    setting(id) {
      var traget = document.getElementById(id);
      if (traget.style.display == "none") {
        traget.style.display = "";
      } else {
        traget.style.display = "none";
      }
    },
    /* ----------------------------------------------*/
    //右上方图表数据获取
    getCurveLineData() {
      let token = this.$store.state.user.token;
      //获取开灯时间
      getDataTime({
        token: token,
        type: 1
      })
        .then(res => {
          console.log("=========================");
          console.log("开灯:");
          console.log(res.data.result);
          this.openLight = this.formatLightDataSeries(res.data.result);
          this.$nextTick(function() {
            this.drawLeftTopCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
      //获取关灯时间
      getDataTime({
        token: token,
        type: 0
      })
        .then(res => {
          console.log("=========================");
          console.log("关灯:");
          console.log(res.data.result);
          this.closeLight = this.formatLightDataSeries(res.data.result);
          this.$nextTick(function() {
            this.drawRightTopCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /* ----------------------------------------------*/
    //图表时间数据格式转化
    formatLightDataSeries(series) {
      let tempSeries = [];
      for (let i in series) {
        let temp = series[i].split(":");
        let m = parseFloat(temp[1]);
        tempSeries.push(m);
      }
      return tempSeries;
    },
    /* ----------------------------------------------*/
    //画开灯曲线
    drawLeftTopCurve() {
      var option = {
        title: {
          text: "开灯时间曲线",
          textAlign: "left",
          x: "left",
          y: "top",
          textStyle: {
            fontSize: "16",
            color: "black"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "black"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#0087ED"
            }
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value",
          interval: 5,
          axisLine: {
            lineStyle: {
              color: "#0087ED"
            }
          },
          axisLabel: {
            textStyle: {
              color: "black"
            },
            formatter: function(value) {
              var texts = [];
              if (value == 0) {
                texts.push("18:00");
              } else if (value == 10) {
                texts.push("18:10");
              } else if (value == 20) {
                texts.push("18:20");
              } else if (value == 30) {
                texts.push("18:30");
              } else if (value == 40) {
                texts.push("18:40");
              } else if (value == 50) {
                texts.push("18:50");
              } else if (value == 60) {
                texts.push("19:00");
              }
              return texts;
            }
          }
        },
        grid: {
          top: "15%",
          left: "2%",
          //right: "15%",
          bottom: "10%",
          containLabel: true
        },
        series: [
          {
            name: "时间",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#70c8d2",
                areaStyle: { color: "#2c635f", label: { show: true } }
              }
            },
            data: this.openLight
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(
        document.getElementById("chartopenlight"),
        "macarons"
      );
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    /* ----------------------------------------------*/
    //画关灯曲线
    drawRightTopCurve() {
      var option = {
        title: {
          text: "关灯时间曲线",
          textAlign: "left",
          x: "left",
          y: "top",
          textStyle: {
            fontSize: "16",
            color: "black"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        calculable: true,
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "black"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#0087ED"
            }
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value",
          interval: 5,
          axisLine: {
            lineStyle: {
              color: "#0087ED"
            }
          },
          axisLabel: {
            textStyle: {
              color: "black"
            },
            formatter: function(value) {
              //console.log("======>"+value)
              var texts = [];
              if (value == 0) {
                texts.push("06:00");
              } else if (value == 10) {
                texts.push("06:10");
              } else if (value == 20) {
                texts.push("06:20");
              } else if (value == 30) {
                texts.push("06:30");
              } else if (value == 40) {
                texts.push("06:40");
              } else if (value == 50) {
                texts.push("06:50");
              }
              return texts;
            }
          }
        },
        grid: {
          top: "15%",
          left: "2%",
          right: "15%",
          bottom: "10%",
          containLabel: true
        },
        series: [
          {
            name: "时间",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#70c8d2",
                areaStyle: { color: "#2c635f", label: { show: true } }
              }
            },
            data: this.closeLight
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartcloselight"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    /* ----------------------------------------------*/

    initData() {
      this.getCurveLineData();
      //this.drawLeftTopCurve();
      //this.drawRightTopCurve();
    }
  },

  mounted() {
    this.initData();
  }
};
</script>
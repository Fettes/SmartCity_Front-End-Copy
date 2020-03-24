<template>
  <div class="vfm">
    <Layout>
      <Content style="padding:12px;">
        <Row class="background-row">
          <Row style="margin-left:16px;margin-top:6px;margin-right:16px;margin-bottom:14px;">
            <p
              style="height:40px;text-align:center;font-size: 18px; font-family: 'Helvetica Neue', 'PingFang SC', sans-serif;font-weight: bold;"
            >路由状态分析</p>
            <!-------------------- 表格 --------------------->
            <Row class="user-table-row">
              <Table
                class="userTable"
                border
                ref="selection"
                :columns="controllerListColumns"
                :data="controllerListData"
              ></Table>
            </Row>
            <br>
            <Row
              class="paging"
              type="flex"
              justify="end"
              style="margin-bottom:7px;margin-right:50px;"
            >
              <Page
                ref="pager"
                id="pager"
                :total="totalItem"
                :current="pageNum"
                @on-change="turnItemPage"
                :page-size="tableSize"
                show-total
                show-elevator
              />
            </Row>
          </Row>
        </Row>
        <Modal
          class="chart_modal"
          v-model="historyChart"
          title="控制器历史状态表"
          ok-text="确认"
          cancel-text="取消"
          width="1300px;"
        >
          <span style="float:right">
            选择时间：
            <Select v-model="choosehistorytimetype" style="width:120px;margin-top:-3px;">
              <Option
                v-for="item in timetype"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <button
              class="search-btn ivu-btn ivu-btn-primary ivu-btn-default"
              @click="getHistoryStatus()"
              type="primary"
              style="margin-left:3px;height:30px;margin-top:-3px;"
            >更新图表</button>
          </span>
          <div
            id="historyStatus"
            style="margin-top:40px;margin-bottom:40px; width:1300px; height: 400px;"
          ></div>
        </Modal>
        <Row style="margin-top:15px;">
          <i-col span="24">
            <Card class="analysis_big_chart">
              <p slot="title" style="padding-top:8px;">
                <Icon type="ios-battery-charging"/>集中器运行状态
                <span style="float:right;">
                  <Select
                    v-model="chooseconcentrator"
                    style="width:150px;margin-top:-3px;margin-right:5px;"
                  >
                    <Option
                      v-for="item in concentratorSelectedList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <Select v-model="choosetimetype" style="width:120px;margin-top:-3px;">
                    <Option
                      v-for="item in timetype"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <button
                    class="search-btn ivu-btn ivu-btn-primary ivu-btn-default"
                    @click="getConcentratorStatus()"
                    type="primary"
                    style="margin-left:3px;height:30px;margin-top:-3px;"
                  >更新图表</button>
                </span>
              </p>
              <div id="concentratorStatus" style="width:100%; height: 400px;"></div>
            </Card>
          </i-col>
        </Row>
        <Row style="margin-top:15px;">
          <i-col span="24">
            <Card class="analysis_big_chart">
              <p slot="title" style="padding-top:8px;">
                <Icon type="ios-battery-charging"/>亮灯率统计
                <span style="float:right;">
                  <Select
                    v-model="chooselineratetype"
                    @on-change="clickChartType"
                    placeholder="请选择类型"
                    style="width:120px;margin-top:-3px;margin-right:5px;"
                  >
                    <Option
                      v-for="item in selectedLineRateType"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <Select
                    v-model="chooseyear"
                    placeholder="请选择年份"
                    style="width:120px;margin-top:-3px;margin-right:5px;"
                  >
                    <Option
                      v-for="item in selectedYear"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <span id="chooseMonthDiv">
                    <Select
                      v-model="choosemonth"
                      placeholder="请选择月份"
                      style="width:120px;margin-top:-5px;"
                    >
                      <Option
                        v-for="item in selectedMonth"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </span>
                  <button
                    class="search-btn ivu-btn ivu-btn-primary ivu-btn-default"
                    @click="checkValidInput()"
                    type="primary"
                    style="margin-left:3px;height:30px;margin-top:-3px;"
                  >更新图表</button>
                </span>
              </p>
              <div id="chartcurve" style="width:1600px; height: 400px;"></div>
            </Card>
          </i-col>
        </Row>
        <Row style="margin-top:15px;">
          <i-col span="24">
            <Card class="analysis_big_chart">
              <p slot="title" style="padding-top:8px;">
                <Icon type="ios-bulb"/>线损率统计
                <span style="float:right;">
                  <Select
                    v-model="chooselinefaulttype"
                    @on-change="clickLineFaultChartType"
                    placeholder="请选择类型"
                    style="width:120px;margin-top:-3px;margin-right:5px;"
                  >
                    <Option
                      v-for="item in selectedLineRateType"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <Select
                    v-model="chooseLineFaultYear"
                    placeholder="请选择年份"
                    style="width:120px;margin-top:-3px;margin-right:5px;"
                  >
                    <Option
                      v-for="item in selectedYear"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <span id="chooseLineFaultMonthDiv">
                    <Select
                      v-model="chooseLineFaultMonth"
                      placeholder="请选择月份"
                      style="width:120px;margin-top:-5px;"
                    >
                      <Option
                        v-for="item in selectedMonth"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </span>
                  <button
                    class="search-btn ivu-btn ivu-btn-primary ivu-btn-default"
                    @click="checkLineFaultValidInput()"
                    type="primary"
                    style="margin-left:3px;height:30px;margin-top:-3px;"
                  >更新图表</button>
                </span>
              </p>
              <div id="linefaultcurve" style="width:1600px; height: 400px;"></div>
            </Card>
          </i-col>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  concentratorList,
  controllerListAnalysis,
  concentratorStatus,
  controllerHistoryStatus,
  lineRateDataYear,
  lineRateDataMonth,
  lineFaultDataYear,
  lineFaultDataMonth
} from "@/api/light_parameter";
export default {
  name: "device_light_data_analysis",
  components: {
    echarts
  },
  data() {
    return {
      //表格翻页预设数据
      pageNum: 1,
      tableSize: 10, //获取数据条数
      totalItem: 12,
      historyChart: false,
      //集中器数据
      concentratorIDList: "",
      concentratorInfoList: [],
      concentratorSelectedList: [],
      //集中器表格表头
      controllerListColumns: [
        {
          title: "测量点号",
          key: "measuringPointNo",
          width: 140,
          sortable: true
        },
        {
          title: "所属集中器名称",
          key: "cname",
          width: 333
        },
        {
          title: "控制器在线情况",
          key: "status",
          width: 180,
          sortable: true
        },
        {
          title: "更新时间",
          key: "recentOnlineTime",
          width: 200
        },
        {
          title: "终端历史状态",
          width: 200,
          key: "history",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showHistoryRecord(params.row);
                    }
                  }
                },
                "查看历史记录"
              )
            ]);
          }
        },
        {
          title: "联系电话",
          width: 150,
          key: "mobilePhone"
        },
        {
          title: "厂商",
          width: 200,
          key: "factory"
        },
        {
          title: "备注",
          width: 150,
          key: "remarks"
        }
      ],
      //集中器数据
      controllerListData: [],
      yAxisData: [],
      totalData: [],
      //选择时间类型
      timetype: [
        { value: "1", label: "最近一天" },
        { value: "2", label: "最近一周" },
        { value: "3", label: "最近一月" },
        { value: "4", label: "最近一年" }
      ],
      //选中的集中器
      choosetimetype: "",
      chooseconcentrator: "",
      chooseconcentratorInText: "",
      //表格选中的的控制器
      choosehistorytimetype: "",
      chooseControllerMeasure: "",
      chooseControllerConcentrator: "",
      //控制器数据
      totalControllerData: "",
      chooseconcentratorInText2: "",
      //亮灯率数据
      selectedYear: [
        { value: "2018", label: "2018年" },
        { value: "2019", label: "2019年" },
        { value: "2020", label: "2020年" },
        { value: "2021", label: "2021年" },
        { value: "2022", label: "2022年" },
        { value: "2023", label: "2023年" },
        { value: "2024", label: "2024年" },
        { value: "2025", label: "2025年" },
        { value: "2026", label: "2026年" },
        { value: "2027", label: "2027年" },
        { value: "2028", label: "2028年" },
        { value: "2029", label: "2029年" }
      ],
      selectedMonth: [
        { value: "1", label: "1月" },
        { value: "2", label: "2月" },
        { value: "3", label: "3月" },
        { value: "4", label: "4月" },
        { value: "5", label: "5月" },
        { value: "6", label: "6月" },
        { value: "7", label: "7月" },
        { value: "8", label: "8月" },
        { value: "9", label: "9月" },
        { value: "10", label: "10月" },
        { value: "11", label: "11月" },
        { value: "12", label: "12月" }
      ],
      selectedLineRateType: [
        { value: "1", label: "按年统计" },
        { value: "2", label: "按月统计" }
      ],
      chooselineratetype: "",
      chooseyear: "",
      choosemonth: "",
      concentratorListForChart: [],
      lineRateDataYear: [],
      lineRateDataMonth: [],
      //线损率数据
      chooselinefaulttype: "",
      chooseLineFaultYear: "",
      chooseLineFaultMonth: "",
      concentratorListForChart2:[],
      lineFaultDataYear:[],
      lineFaultDataMonth:[],
    };
  },

  methods: {
    /* ----------------------------------------------*/
    //获取集中器列表()
    getConcentratorList() {
      let token = this.$store.state.user.token;
      concentratorList({
        token: token
      })
        .then(res => {
          const data = res.data.result;
          console.log("集中器列表：");
          console.log(data);
          this.formatConcentratorList(data);
          this.getAllControllerList();
          this.$nextTick(function() {
            this.setDefaultValue();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //默认打开时图表
    setDefaultValue() {
      //集中器运行状态默认
      this.chooseconcentrator = this.concentratorInfoList[0].cid;
      this.choosetimetype = "2";
      this.getConcentratorStatus();
      //亮灯率默认
      this.chooselineratetype = "1";
      this.chooseyear = "2019";
      var traget = document.getElementById("chooseMonthDiv");
      traget.style.display = "none";
      this.getLineRateDataYear();
      //线损率默认
      this.chooselinefaulttype="1";
      this.chooseLineFaultYear="2019";
      var traget = document.getElementById("chooseLineFaultMonthDiv");
      traget.style.display = "none";
      this.getLineFaultDataYear();
    },
    //获取集中器id String格式
    formatConcentratorList(data) {
      var menu = [];
      var menu2 = [];
      for (let i in data) {
        this.concentratorIDList =
          this.concentratorIDList + data[i].concentratorId + ",";
        var temp = new Object();
        var temp2 = new Object();
        temp["cid"] = data[i].concentratorId;
        temp["cname"] = data[i].cname;
        temp2["value"] = data[i].concentratorId;
        temp2["label"] = data[i].cname;
        menu.push(temp);
        menu2.push(temp2);
      }
      this.concentratorInfoList = menu;
      this.concentratorSelectedList = menu2;
    },
    /* ----------------------------------------------*/
    //列出所有控制器表格(7.1)
    getAllControllerList() {
      let token = this.$store.state.user.token;
      controllerListAnalysis({
        token: token,
        pageNum: this.pageNum,
        pageSize: this.tableSize,
        concentratorIds: this.concentratorIDList
      })
        .then(res => {
          const data = res.data.result;
          console.log("控制器列表：");
          console.log(res.data);
          this.totalItem = Number(res.data.total);
          this.controllerListData = this.formatControllerData(data);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatControllerData(data) {
      var temp = this.concentratorInfoList;
      for (let i in data) {
        for (let y in temp) {
          if (data[i].concentratorId == temp[y].cid) {
            data[i]["cname"] = temp[y].cname;
          }
        }
        if (data[i]["status"] == 0) {
          data[i]["status"] = "在线";
        }
        if (data[i]["status"] == 1) {
          data[i]["status"] = "不在线";
        }
        if (data[i]["status"] == 2) {
          data[i]["status"] = "未配置到终端";
        }
        if (data[i]["status"] == 8) {
          data[i]["status"] = "控制器故障";
        }
        if (data[i]["status"] == 16) {
          data[i]["status"] = "集中器不在线";
        }
        if (data[i]["status"] == 32) {
          data[i]["status"] = "控制器失控";
        }
        data[i]["recentOnlineTime"] = new Date(Number(data[i]["recentOnlineTime"])).Format(
          "yyyy-MM-dd HH:mm:ss"
        );
      }

      return data;
    },
    //翻页
    turnItemPage(pageNo) {
      this.pageNum = pageNo;
      this.getAllControllerList();
    },
    //按钮跳转并设置默认
    showHistoryRecord(data) {
      this.chooseControllerMeasure = data.measuringPointNo;
      this.chooseControllerConcentrator = data.concentratorId;
      this.choosehistorytimetype = "1";
      this.getHistoryStatus();
      this.historyChart = true;
    },
    /* ----------------------------------------------*/
    //集中器状态分析(8.1)
    getConcentratorStatus() {
      var temp = this.concentratorInfoList;
      for (let y in temp) {
        if (this.chooseconcentrator == temp[y].cid) {
          this.chooseconcentratorInText = temp[y].cname;
        }
      }
      let token = this.$store.state.user.token;
      concentratorStatus({
        token: token,
        type: this.choosetimetype,
        concentratorIds: this.chooseconcentrator
      })
        .then(res => {
          const data = res.data.result;
          this.formatConcentratorAnalysisData(data[0]);
          this.$nextTick(function() {
            this.drawLeftTopCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatConcentratorAnalysisData(data) {
      var tempcombine = [];
      for (let i in data) {
        var tempData = [];
        tempData.push(data[i].readTime);
        //将状态转为平均，优化图表y轴间距
        if (data[i].status == 0) {
          tempData.push(0);
        } else if (data[i].status == 1) {
          tempData.push(1);
        } else if (data[i].status == 2) {
          tempData.push(2);
        } else if (data[i].status == 8) {
          tempData.push(3);
        } else if (data[i].status == 16) {
          tempData.push(4);
        } else if (data[i].status == 32) {
          tempData.push(5);
        }
        tempcombine.push(tempData);
      }
      this.totalData = tempcombine;
    },
    drawLeftTopCurve() {
      var option = {
        title: {
          text: this.chooseconcentratorInText,
          textAlign: "left",
          x: "5px",
          y: "5px",
          textStyle: {
            fontSize: "16",
            color: "#143d5d"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var message = "";
            var statusInText = "";
            var date = new Date(params[0].value[0]);
            var readableDate =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds();
            if (params[0].value[1] == 0) {
              statusInText = "设备正常";
            } else if (params[0].value[1] == 1) {
              statusInText = "连接中断";
            } else if (params[0].value[1] == 2) {
              statusInText = "恢复连接";
            } else if (params[0].value[1] == 3) {
              statusInText = "未登录";
            } else if (params[0].value[1] == 4) {
              statusInText = "上电";
            } else if (params[0].value[1] == 5) {
              statusInText = "断电";
            }

            message =
              "读取时间：" + readableDate + "<br>" + "状态为：" + statusInText;
            return message;
          }
        },
        dataZoom: {
          y: 375,
          show: true,
          realtime: true,
          start: 0,
          end: 100
        },
        legend: {
          data: ["集中器状态"]
        },
        xAxis: {
          type: "time"
        },
        yAxis: {
          type: "value",
          axisTick: { show: false }, //去掉刻度
          splitLine: {
            //去掉背景水平网格线
            show: false
          },
          min: 0,
          max: 5,
          interval: 1,
          axisLabel: {
            // 自定义y轴刻度信息
            formatter: function(value) {
              var texts = [];
              if (value == 0) {
                texts.push("设备正常");
              } else if (value == 1) {
                texts.push("连接中断");
              } else if (value == 2) {
                texts.push("恢复连接");
              } else if (value == 3) {
                texts.push("未登录");
              } else if (value == 4) {
                texts.push("上电");
              } else if (value == 5) {
                texts.push("断电");
              } else texts.push("");
              return texts;
            }
          }
        },
        series: [
          {
            name: "集中器状态",
            type: "line",
            step: "start",
            data: this.totalData
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(
        document.getElementById("concentratorStatus"),
        "macarons"
      );
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    /* ----------------------------------------------*/
    //路由历史状态分析
    getHistoryStatus() {
      var temp = this.concentratorInfoList;
      for (let y in temp) {
        if (this.chooseControllerConcentrator == temp[y].cid) {
          this.chooseconcentratorInText2 = temp[y].cname;
        }
      }
      let token = this.$store.state.user.token;
      controllerHistoryStatus({
        token: token,
        type: this.choosehistorytimetype,
        measuringPointNo: this.chooseControllerMeasure,
        concentratorId: this.chooseControllerConcentrator
      })
        .then(res => {
          const data = res.data.result;
          this.formatControllerAnalysisData(data);
          this.$nextTick(function() {
            this.drawModalCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatControllerAnalysisData(data) {
      var tempcombine = [];
      for (let i in data) {
        var tempData = [];
        tempData.push(data[i].readTime);
        //将状态转为平均，优化图表y轴间距
        if (data[i].status == 0) {
          tempData.push(0);
        } else if (data[i].status == 1) {
          tempData.push(1);
        } else if (data[i].status == 2) {
          tempData.push(2);
        } else if (data[i].status == 8) {
          tempData.push(3);
        } else if (data[i].status == 16) {
          tempData.push(4);
        } else if (data[i].status == 32) {
          tempData.push(5);
        }
        tempcombine.push(tempData);
      }
      this.totalControllerData = tempcombine;
    },
    drawModalCurve() {
      var option = {
        title: {
          text: this.chooseconcentratorInText2,
          subtext: "测量点号" + this.chooseControllerMeasure,
          textAlign: "left",
          x: "10px",
          y: "0px",
          textStyle: {
            fontSize: "16",
            color: "#143d5d"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var message = "";
            var statusInText = "";
            var date = new Date(params[0].value[0]);
            var readableDate =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds();
            if (params[0].value[1] == 0) {
              statusInText = "在线";
            } else if (params[0].value[1] == 1) {
              statusInText = "不在线";
            } else if (params[0].value[1] == 2) {
              statusInText = "未配置到终端";
            } else if (params[0].value[1] == 3) {
              statusInText = "控制器故障";
            } else if (params[0].value[1] == 4) {
              statusInText = "集中器不在线";
            } else if (params[0].value[1] == 5) {
              statusInText = "控制器失控";
            }

            message =
              "读取时间：" + readableDate + "<br>" + "状态为：" + statusInText;
            return message;
          }
        },
        dataZoom: {
          y: 375,
          show: true,
          realtime: true,
          start: 0,
          end: 100
        },
        legend: {
          data: ["控制器状态"]
        },
        xAxis: {
          type: "time"
        },
        yAxis: {
          type: "value",
          axisTick: { show: false }, //去掉刻度
          splitLine: {
            //去掉背景水平网格线
            show: false
          },
          min: 0,
          max: 5,
          interval: 1,
          axisLabel: {
            // 自定义y轴刻度信息
            formatter: function(value) {
              var texts = [];
              if (value == 0) {
                texts.push("在线");
              } else if (value == 1) {
                texts.push("不在线");
              } else if (value == 2) {
                texts.push("未配置到终端");
              } else if (value == 3) {
                texts.push("控制器故障");
              } else if (value == 4) {
                texts.push("集中器不在线");
              } else if (value == 5) {
                texts.push("控制器失控");
              } else texts.push("");
              return texts;
            }
          }
        },
        series: [
          {
            name: "集中器状态",
            type: "line",
            step: "start",
            data: this.totalControllerData
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("historyStatus"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    /* ----------------------------------------------*/
    //亮灯率统计
    clickChartType(value) {
      if (value == "1") {
        var traget = document.getElementById("chooseMonthDiv");
        traget.style.display = "none";
      }
      if (value == "2") {
        var traget = document.getElementById("chooseMonthDiv");
        traget.style.display = "";
      }
    },
    checkValidInput() {
      if (this.chooselineratetype == "") {
        this.$Message.warning("请选择图表类别");
      } else if (this.chooseyear == "") {
        this.$Message.warning("请选择年份");
      } else if (this.chooselineratetype == "2" && this.choosemonth == "") {
        this.$Message.warning("请选择月份");
      } else if (this.chooselineratetype == "1") {
        var myChart = echarts.init(document.getElementById("chartcurve"));
        myChart.clear();
        this.getLineRateDataYear();
      } else if (this.chooselineratetype == "2") {
        var myChart = echarts.init(document.getElementById("chartcurve"));
        myChart.clear();
        this.getLineRateDataMonth();
      }
    },
    getLineRateDataYear() {
      let token = this.$store.state.user.token;
      lineRateDataYear({
        token: token,
        year: this.chooseyear,
        concentratorIds: this.concentratorIDList
      })
        .then(res => {
          const data = res.data.result;
          console.log("亮灯率年：");
          console.log(data);
          this.formatLineRataYearData(data);
          this.$nextTick(function() {
            this.drawLineRateYearCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatLineRataYearData(data) {
      var temp = this.concentratorInfoList;
      this.concentratorListForChart=[];
      for (let i in data) {
        for (let y in temp) {
          if (data[i][0].concentratorId == temp[y].cid) {
            this.concentratorListForChart.push(temp[y].cname);
          }
        }
      }
      for (let i in data) {
        var temp = [];
        for (let j in data[i]) {
          temp.push(data[i][j].rate);
        }
        this.lineRateDataYear.push(temp);
      }
    },
    drawLineRateYearCurve() {
      var tempseries = [];
      for (let i in this.concentratorListForChart) {
        var temp = new Object();
        temp["name"] = this.concentratorListForChart[i];
        temp["type"] = "line";
        temp["data"] = this.lineRateDataYear[0];
        tempseries.push(temp);
      }
      var option = {
        title: {
          text: "年亮灯率统计",
          subtext: this.chooseyear + "年",
          textAlign: "left",
          x: "5px",
          y: "5px",
          textStyle: {
            fontSize: "16",
            color: "#143d5d"
          }
        },
        tooltip: {
          formatter: function(params) {
            var message =
              "名称：" +
              params.seriesName +
              "<br>" +
              "亮灯率：" +
              params.value +
              "%";
            return message;
          }
        },
        legend: {
          data: this.concentratorListForChart
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          min: 0,
          max: 100,
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
        series: tempseries
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartcurve"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    getLineRateDataMonth() {
      let token = this.$store.state.user.token;
      lineRateDataMonth({
        token: token,
        year: this.chooseyear,
        month: this.choosemonth,
        concentratorIds: this.concentratorIDList
      })
        .then(res => {
          const data = res.data.result;
          console.log("亮灯率月：");
          console.log(data);
          this.formatLineRataMonthData(data);
          this.$nextTick(function() {
            this.drawLineRateMonthCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatLineRataMonthData(data) {
      var temp = this.concentratorInfoList;
      this.concentratorListForChart=[];
      for (let i in data) {
        for (let y in temp) {
          if (data[i][0].concentratorId == temp[y].cid) {
            this.concentratorListForChart.push(temp[y].cname);
          }
        }
      }
      for (let i in data) {
        var temp = [];
        for (let j in data[i]) {
          temp.push(data[i][j].rate);
        }
        this.lineRateDataMonth.push(temp);
      }
    },
    drawLineRateMonthCurve() {
      var tempseries = [];
      for (let i in this.concentratorListForChart) {
        var temp = new Object();
        temp["name"] = this.concentratorListForChart[i];
        temp["type"] = "line";
        temp["data"] = this.lineRateDataMonth[0];
        tempseries.push(temp);
      }
      var option = {
        title: {
          text: "月亮灯率统计",
          subtext: this.chooseyear + "年" + this.choosemonth + "月",
          textAlign: "left",
          x: "5px",
          y: "5px",
          textStyle: {
            fontSize: "16",
            color: "#143d5d"
          }
        },
        tooltip: {
          formatter: function(params) {
            var message =
              "名称：" +
              params.seriesName +
              "<br>" +
              "亮灯率：" +
              params.value +
              "%";
            return message;
          }
        },
        legend: {
          data: this.concentratorListForChart
        },
        xAxis: {
          data: [
            "1日",
            "2日",
            "3日",
            "4日",
            "5日",
            "6日",
            "7日",
            "8日",
            "9日",
            "10日",
            "11日",
            "12日",
            "13日",
            "14日",
            "15日",
            "16日",
            "17日",
            "18日",
            "19日",
            "20日",
            "21日",
            "22日",
            "23日",
            "24日",
            "25日",
            "26日",
            "27日",
            "28日",
            "29日",
            "30日",
            "31日"
          ]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
        series: tempseries
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartcurve"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    /* ----------------------------------------------*/
    //线损率统计
    clickLineFaultChartType(value) {
      if (value == "1") {
        var traget = document.getElementById("chooseLineFaultMonthDiv");
        traget.style.display = "none";
      }
      if (value == "2") {
        var traget = document.getElementById("chooseLineFaultMonthDiv");
        traget.style.display = "";
      }
    },
    checkLineFaultValidInput() {
      if (this.chooselinefaulttype == "") {
        this.$Message.warning("请选择图表类别");
      } else if (this.chooseLineFaultYear == "") {
        this.$Message.warning("请选择年份");
      } else if (
        this.chooselinefaulttype == "2" &&
        this.chooseLineFaultMonth == ""
      ) {
        this.$Message.warning("请选择月份");
      } else if (this.chooselinefaulttype == "1") {
        var myChart = echarts.init(document.getElementById("linefaultcurve"));
        myChart.clear();
        this.getLineFaultDataYear();
      } else if (this.chooselinefaulttype == "2") {
        var myChart = echarts.init(document.getElementById("linefaultcurve"));
        myChart.clear();
        this.getLineFaultDataMonth();
      }
    },
    getLineFaultDataYear() {
      let token = this.$store.state.user.token;
      lineFaultDataYear({
        token: token,
        year: this.chooseLineFaultYear,
        concentratorIds: this.concentratorIDList
      })
        .then(res => {
          const data = res.data.result;
          console.log("年线损率：");
          console.log(data);
          this.formatLineFaultYearData(data);
          this.$nextTick(function() {
            this.drawLineFaultYearCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatLineFaultYearData(data) {
      this.concentratorListForChart2=[];
      for (let i in data) {
          this.concentratorListForChart2.push(data[i][0].concentratorName);
      }
      for (let i in data) {
        var temp = [];
        for (let j in data[i]) {
          temp.push(data[i][j].monthRate);
        }
        this.lineFaultDataYear.push(temp);
      }
    },
    drawLineFaultYearCurve() {
      var tempseries = [];
      for (let i in this.concentratorListForChart2) {
        var temp = new Object();
        temp["name"] = this.concentratorListForChart2[i];
        temp["type"] = "line";
        temp["data"] = this.lineFaultDataYear[0];
        tempseries.push(temp);
      }
      var option = {
        title: {
          text: "年线损率统计",
          subtext: this.chooseyear + "年",
          textAlign: "left",
          x: "5px",
          y: "5px",
          textStyle: {
            fontSize: "16",
            color: "#143d5d"
          }
        },
        tooltip: {
          formatter: function(params) {
            var message =
              "名称：" +
              params.seriesName +
              "<br>" +
              "线损率：" +
              params.value +
              "%";
            return message;
          }
        },
        legend: {
          data: this.concentratorListForChart2
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          min: 0,
          max: 1,
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
        series: tempseries
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("linefaultcurve"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    getLineFaultDataMonth() {
      let token = this.$store.state.user.token;
      lineFaultDataMonth({
        token: token,
        year: this.chooseLineFaultYear,
        month: this.chooseLineFaultMonth,
        concentratorIds: this.concentratorIDList
      })
        .then(res => {
          const data = res.data.result;
          console.log("线损率月：");
          console.log(data);
          this.formatLineFaultMonthData(data);
          this.$nextTick(function() {
            this.drawLineFaultMonthCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatLineFaultMonthData(data) {
      this.concentratorListForChart2=[];
      var temp = this.concentratorInfoList;
      for (let i in data) {
        if(data[i]!=null){
          for (let y in temp) {
            if (data[i].concentratorId == temp[y].cid) {
              this.concentratorListForChart2.push(temp[y].cname);
            }
          }
        }
      }
      for(let i in data){
        if(data[i]!=null){
          let tempLineFaultArray = data[i].daylinefaultratio.split(",");
          var temp2= [];
          for(let j in tempLineFaultArray){
            var tempNumer = Number(tempLineFaultArray[j]);
            temp2.push(tempNumer);
          }
          this.lineFaultDataMonth.push(temp2);
        }
      }
    },
    drawLineFaultMonthCurve() {
      var tempseries2 = [];
      for (let i in this.concentratorListForChart2) {
        var temp = new Object();
        temp["name"] = this.concentratorListForChart2[i];
        temp["type"] = "line";
        temp["data"] = this.lineFaultDataMonth[0];
        tempseries2.push(temp);
      }
      var option = {
        title: {
          text: "月线损率统计",
          subtext: this.chooseyear + "年" + this.choosemonth + "月",
          textAlign: "left",
          x: "5px",
          y: "5px",
          textStyle: {
            fontSize: "16",
            color: "#143d5d"
          }
        },
        tooltip: {
          formatter: function(params) {
            var message =
              "名称：" +
              params.seriesName +
              "<br>" +
              "线损率：" +
              params.value +
              "%";
            return message;
          }
        },
        legend: {
          data: this.concentratorListForChart2
        },
        xAxis: {
          data: [
            "1日",
            "2日",
            "3日",
            "4日",
            "5日",
            "6日",
            "7日",
            "8日",
            "9日",
            "10日",
            "11日",
            "12日",
            "13日",
            "14日",
            "15日",
            "16日",
            "17日",
            "18日",
            "19日",
            "20日",
            "21日",
            "22日",
            "23日",
            "24日",
            "25日",
            "26日",
            "27日",
            "28日",
            "29日",
            "30日",
            "31日"
          ]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
        series: tempseries2
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("linefaultcurve"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },



    /* ----------------------------------------------*/
    getVirtulData() {
      var date = +echarts.number.parseDate("2017-02-01");
      var end = +echarts.number.parseDate("2017-03-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    },
    drawMiddleLeftCurve() {
      var cellSize = [80, 80];
      var scatterData = this.getVirtulData();
      var option = {
        tooltip: {},
        legend: {
          data: ["工作", "娱乐", "睡觉"],
          bottom: 20
        },
        calendar: {
          top: "middle",
          left: "center",
          orient: "vertical",
          cellSize: cellSize,
          yearLabel: {
            show: false,
            textStyle: {
              fontSize: 30
            }
          },
          dayLabel: {
            margin: 20,
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
          range: ["2017-02"]
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
                formatter: function(params) {
                  return echarts.format.formatTime("dd", params.value[0]);
                },
                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                textStyle: {
                  color: "#000",
                  fontSize: 14
                }
              }
            },
            data: scatterData
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("chartday"));
      //窗口初始化
      window.onresize = myChart.resize;

      myChart.setOption(option);

      //使用制定的配置项和数据显示图表
      if (!app.inNode) {
        var _this = this;
        var pieInitialized;
        setTimeout(function() {
          pieInitialized = true;
          myChart.setOption({
            series: _this.getPieSeries(scatterData, myChart)
          });
        }, 100);

        app.onresize = function() {
          if (pieInitialized) {
            myChart.setOption({
              series: _this.getPieSeriesUpdate(scatterData, myChart)
            });
          }
        };
      }
    },
    getPieSeries(scatterData, chart) {
      var pieRadius = 30;
      return echarts.util.map(scatterData, function(item, index) {
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
            { name: "工作", value: Math.round(Math.random() * 24) },
            { name: "娱乐", value: Math.round(Math.random() * 24) },
            { name: "睡觉", value: Math.round(Math.random() * 24) }
          ]
        };
      });
    },
    getPieSeriesUpdate(scatterData, chart) {
      return echarts.util.map(scatterData, function(item, index) {
        var center = chart.convertToPixel("calendar", item);
        return {
          id: index + "pie",
          center: center
        };
      });
    },
    /* ----------------------------------------------*/

    /* ----------------------------------------------*/
    initData() {
      //this.drawLeftTopCurve();
      //this.drawMiddleLeftCurve();
      //this.drawLineRateMonthCurve();
      this.getConcentratorList();
    }
  },

  mounted() {
    this.initData();
    window.onresize = () => {
      let chart1 = echarts.getInstanceByDom(
        document.getElementById("historyStatus")
      );
      chart1.resize();
      let chart2 = echarts.getInstanceByDom(
        document.getElementById("concentratorStatus")
      );
      chart2.resize();
      let chart3 = echarts.getInstanceByDom(
        document.getElementById("chartcurve")
      );
      chart3.resize();
    };
  }
};
</script>
<style lang="less" scoped>
.background-row {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px 10px 10px 10px;
}
</style>
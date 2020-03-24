<template>
  <div class="vfm">
    <Layout>
      <Content style="padding:12px">
        <Row :gutter="12">
          <!--------------- 左侧list ------------------->
          <i-col span="5">
            <Card class="paddingCardLeftUpdate">
              <p slot="title">
                <Icon type="ios-paper"></Icon>设备列表
              </p>
              <Tree :data="lightData" ref="mainTree" @on-select-change="chooseDevice"></Tree>
            </Card>
          </i-col>
          <i-col span="19">
            <Drawer v-model="showMap" width="100%" :closable="true" :inner="true" :transfer="false">
              <div ref="basicMapbox2" style=" height:100%; width:100%;"></div>
            </Drawer>
            <Row :gutter="12">
              <!------------ 中间图片 ------------->
              <i-col span="8">
                <Card :bordered="false" class="paddingCardMiddleUpdate">
                  <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    {{lightTitle}}样式
                  </p>
                  <div class="img-style" style="height:635px;">
                    <Row>
                      <img src="../../assets/images/light.png" class="imgs" id="image">
                    </Row>
                  </div>
                </Card>
              </i-col>
              <!------------------ 右侧上方chart --------------------->
              <i-col span="16">
                <Card class="paddingCardRightTopUpdate">
                  <p slot="title">
                    <Icon type="md-options"></Icon>控制面板
                  </p>
                  <div style="height:260px;">
                    <Row>
                      <i-col span="2">
                        <div class="smallTitle1">设备信息</div>
                        <div class="smallTitle2">调节</div>
                      </i-col>
                      <div id="lamp">
                        <i-col
                          span="10"
                          style="border-right: 1px solid;margin-top: 10px;border-image: linear-gradient(white, #119ae5, white) 1 60 1;"
                        >
                          <Row>
                            <p style="font-size:14px;margin-top:10px;">
                              集中器：
                              <span
                                style="color:#2c8cf0;padding-right:30px;"
                              >{{lampBasicInfo.concentrator_name}}</span>
                              灯杆编号：
                              <span
                                style="color:#2c8cf0;"
                              >{{lampBasicInfo.lpid}}</span>
                            </p>
                            <br>
                            <p>
                              编号：
                              <span style="color:#2c8cf0;">{{lampBasicInfo.caddress}}</span>
                            </p>
                            <br>
                            <p>
                              点击查看：
                              <Button
                                class="open-btn"
                                type="info"
                                style="width:100px;"
                                @click="selectedCurveButton()"
                              >曲线图</Button>
                            </p>
                          </Row>
                          <Row style="margin-top:50px;">
                            <p>
                              <Slider
                                v-model="lightDegree"
                                :tip-format="format"
                                style="margin-left:10px;margin-right:30px;"
                                @on-input="changeLightDegree"
                              ></Slider>
                            </p>
                            <p>
                              <Button
                                class="open-btn"
                                type="primary"
                                style="margin-left:120px;width:70px;"
                                @click="checkDevice"
                              >设定</Button>
                            </p>
                          </Row>
                        </i-col>
                        <i-col span="2">
                          <p
                            style="
                            width:10px;
                            color:#119ae5;
                            font-size:18px;
                            font-weight:bold;
                            margin-left:10px;
                            margin-top:20px;
                            font-family: 'Helvetica Neue', 'PingFang SC', sans-serif;
                            "
                          >控制器产品参数</p>
                        </i-col>
                        <i-col span="10">
                          <p style="color:#2c8cf0;font-size:14px;margin-top:20px;">
                            读取时间:
                            <span style="color:#2c8cf0;">{{lampBasicInfo.readTime}}</span>
                          </p>
                          <p style="font-size:14px;margin-top:20px;">
                            电流(A):
                            <span style="color:#2c8cf0;">{{lampBasicInfo.current}}</span>
                            <span style="float:right;margin-right:60px;">
                              电压(V):
                              <span style="color:#2c8cf0;">{{lampBasicInfo.voltage}}</span>
                            </span>
                          </p>
                          <p style="font-size:14px;margin-top:20px;">
                            功率(W):
                            <span style="color:#2c8cf0;">{{lampBasicInfo.power}}</span>
                            <span style="float:right;margin-right:60px;">
                              用电量(kWh):
                              <span style="color:#2c8cf0;">{{lampBasicInfo.coulometry}}</span>
                            </span>
                          </p>
                          <p style="font-size:14px;margin-top:20px;">
                            功率因数:
                            <span style="color:#2c8cf0;">{{lampBasicInfo.power_factor}}</span>
                          </p>
                          <br>
                          <p style="font-size:14px;margin-top:20px;">
                            灯具状态:
                            <span style="color:#2c8cf0;">{{lampBasicInfo.status}}</span>
                            <span style="float:right;margin-right:60px;">
                              <Button class="open-btn" type="primary" @click="toLoading2()">刷新</Button>
                              <Spin size="large" fix v-if="spinShow2"></Spin>
                            </span>
                          </p>
                        </i-col>
                      </div>
                      <div id="concentrator" style="display:none;">
                        <i-col
                          span="10"
                          style="border-right: 1px solid;margin-top: 10px;border-image: linear-gradient(white, #119ae5, white) 1 60 1;"
                        >
                          <Row>
                            <p style="font-size:14px;margin-top:10px;">
                              集中器：
                              <span
                                style="color:#2c8cf0;"
                              >{{concentratorInfo.concentrator_name}}</span>
                            </p>
                            <br>
                            <p>
                              节点状态：
                              集中器总数：
                              <span
                                style="color:#2c8cf0;"
                              >{{concentratorInfo.totalNum}}</span>
                              <span style="margin-left:20px;">在线总数：</span>
                              <span style="color:#2c8cf0;">{{concentratorInfo.onlineNum}}</span>
                            </p>
                            <br>
                          </Row>
                          <Row style="margin-top:50px;">
                            <p>
                              <Slider
                                v-model="lightDegree"
                                :tip-format="format"
                                style="margin-left:10px;margin-right:30px;"
                                @on-input="changeLightDegree"
                              ></Slider>
                            </p>
                            <p>
                              <Button
                                class="open-btn"
                                type="primary"
                                style="margin-left:120px;width:70px;"
                                @click="checkDevice"
                              >设定</Button>
                            </p>
                          </Row>
                        </i-col>
                        <i-col span="2">
                          <p
                            style="
                            width:10px;
                            color:#119ae5;
                            font-size:18px;
                            font-weight:bold;
                            margin-left:10px;
                            margin-top:20px;
                            font-family: 'Helvetica Neue', 'PingFang SC', sans-serif;
                            "
                          >集中器参数设置</p>
                        </i-col>
                        <i-col span="10">
                          <p style="color:#2c8cf0;font-size:14px;margin-top:20px;">
                            读取时间:
                            <span style="color:#2c8cf0;">{{concentratorInfo.readTime}}</span>
                          </p>
                          <!-- <p style="font-size:14px;margin-top:20px;">
                            电流(A):
                            <span style="color:#2c8cf0;">{{concentratorInfo.current}}</span>
                            <span style="float:right;margin-right:60px;">
                              电压(V):
                              <span style="color:#2c8cf0;">{{concentratorInfo.voltage}}</span>
                            </span>
                          </p>
                          <p style="font-size:14px;margin-top:20px;">
                            功率(W):
                            <span style="color:#2c8cf0;">{{concentratorInfo.power}}</span>
                            <span style="float:right;margin-right:60px;">
                              功率因数:
                              <span style="color:#2c8cf0;">{{concentratorInfo.power_factor}}</span>
                            </span>
                          </p>
                          <p style="font-size:14px;margin-top:20px;">
                            用电量(kWh):
                            <span style="color:#2c8cf0;">{{concentratorInfo.coulometry}}</span>
                          </p>-->
                          <br>
                          <p style="font-size:14px;margin-top:20px;">
                            有效测量点:
                            <span style="color:#2c8cf0;">{{concentratorInfo.onlineMeasured}}</span>
                            <span style="float:right;margin-right:60px;">
                              不在线测量点:
                              <span
                                style="color:#2c8cf0;"
                              >{{concentratorInfo.offlineMeasured}}</span>
                            </span>
                          </p>
                          <br>
                          <p style="font-size:14px;margin-top:12px;">
                            集中器状态:
                            <span style="color:#2c8cf0;">{{concentratorInfo.status}}</span>
                            <span style="float:right;margin-right:60px;">
                              <Button
                                style="width:80px"
                                class="open-btn"
                                type="primary"
                                @click="toLoading()"
                              >
                                <span>刷新</span>

                                <Spin size="large" fix v-if="spinShow"></Spin>
                              </Button>
                            </span>
                          </p>
                        </i-col>
                      </div>
                    </Row>
                  </div>
                </Card>

                <!------------------ 左侧下方card --------------------->
                <Row>
                  <i-col span="10">
                    <Card class="paddingCardMiddleUpdate" style="height:362px;margin-top:12px;">
                      <p slot="title">
                        <Icon type="ios-alert-outline"></Icon>GIS地图
                        <Button
                          size="small"
                          style="float:right"
                          type="primary"
                          @click="showMap = true;createMapLarge()"
                        >
                          <Icon type="md-pin"/>
                        </Button>
                      </p>
                      <div style="height:322px;width:100%;">
                        <div ref="basicMapbox" style="height:100%; width:100%;"></div>
                      </div>
                    </Card>
                  </i-col>
                  <i-col span="14">
                    <Card
                      class="paddingCardRightLeftUpdate"
                      style="height:362px;margin-top:12px;margin-left:12px;"
                    >
                      <p slot="title">
                        <Icon type="ios-warning"></Icon>报警
                      </p>
                      <div class="light_alert">
                        <ul>
                          <li
                            style="line-height:34px;"
                            v-for="(item, index) in alarmData"
                            :key="index"
                          >
                            <i-col span="2">
                              <span style="margin-right:10px" v-if="item.status == 1">
                                <Icon type="ios-radio-button-on" color="yellow" size="20"></Icon>
                              </span>
                              <span style="margin-right:10px" v-else>
                                <Icon type="ios-radio-button-on" color="red" size="20"></Icon>
                              </span>
                            </i-col>
                            <i-col span="4">
                              <span style="margin-right:10px">{{item.lamppost}}</span>
                            </i-col>
                            <i-col span="4">
                              <span style="margin-right:10px; ">{{item.name}}</span>
                            </i-col>
                            <i-col span="6">
                              <span style="margin-right:20px; color:#2c8cf0">{{item.problem}}</span>
                            </i-col>

                            <span>{{item.datetime}}</span>
                          </li>
                        </ul>
                      </div>
                    </Card>
                  </i-col>
                </Row>
              </i-col>
              <Modal
                class="chart_modal"
                v-model="concentratorChart"
                title="集中器/控制器 电压电流分析"
                ok-text="确认"
                cancel-text="取消"
                @on-cancel="cancelModal()"
                width="1300px;"
              >
                <span style="float:right;margin-right:30px;">
                  <span>
                    图表类型：
                    <Select
                      v-model="choosecharttype"
                      @on-change="clickChartType"
                      style="width:120px;margin-top:-3px;"
                    >
                      <Option
                        v-for="item in chartstyle"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </span>
                  <span id="chooseTime" style="margin-left:20px;">
                    选择时间：
                    <Select
                      v-model="choosetimetype"
                      @on-change="clickTimeType"
                      style="width:120px;margin-top:-3px;"
                    >
                      <Option
                        v-for="item in timetype"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </span>
                </span>
                <div
                  id="curveCharts"
                  style="margin-top:40px; margin-bottom:40px; width:1300px; height: 450px;"
                ></div>
                <div slot="footer" style="display:none"></div>
              </Modal>
            </Row>
            <!--------------- 下方list ------------------->
            <Row>
              <Card :bordered="false" class="paddingCardBottomUpdate" style="margin-top:12px;">
                <p slot="title">
                  <Icon type="md-bookmarks"></Icon>资产信息
                </p>
                <Row
                  :gutter="20"
                  v-model="deviceInfo"
                  class="deviceinfo"
                  style="height:68px;margin-left:25px;"
                >
                  <i-col span="4" style="border-right:1px dashed #2c8cf0; margin-top:15px;">
                    <ul>
                      <li>
                        <p>
                          <span>产品名称:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.productName }}</span>
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
                  <i-col
                    span="4"
                    offset="1"
                    style="border-right:1px dashed #2c8cf0; margin-top:15px;"
                  >
                    <ul>
                      <li>
                        <p>
                          <span>购买日期:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.buyDate }}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>维护日期:</span>
                          <span
                            style="color:#2c8cf0;margin-left:20px"
                          >{{ deviceInfo.maintenanceDate }}</span>
                        </p>
                      </li>
                    </ul>
                  </i-col>
                  <i-col
                    span="4"
                    offset="1"
                    style="border-right:1px dashed #2c8cf0; margin-top:15px;"
                  >
                    <ul>
                      <li>
                        <p>
                          <span>维护周期:</span>
                          <span
                            style="color:#2c8cf0;margin-left:20px"
                          >{{ deviceInfo.maintenancePeriod }}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>保修期限:</span>
                          <span
                            style="color:#2c8cf0;margin-left:20px"
                          >{{ deviceInfo.termOfService }}</span>
                        </p>
                      </li>
                    </ul>
                  </i-col>
                  <i-col
                    span="3"
                    offset="1"
                    style="border-right:1px dashed #2c8cf0; margin-top:15px;"
                  >
                    <ul>
                      <li>
                        <p>
                          <span>生产产家:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.factory }}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>联系员工:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contactName }}</span>
                        </p>
                      </li>
                    </ul>
                  </i-col>
                  <i-col span="5" offset="1" style="margin-top:15px;">
                    <ul>
                      <li>
                        <p>
                          <span>联系电话:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.mobilePhone }}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>联系邮箱:</span>
                          <span style="color:#2c8cf0;margin-left:20px">{{ deviceInfo.contactEmail }}</span>
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
import { ChartPie, ChartBar } from "_c/charts"; // ChartPie,
import Tables from "_c/tables";
import mapboxgl from "mapbox-gl";
import echarts from "echarts";
import { on, off } from "@/libs/tools";
import DragDrawer from "_c/drag-drawer";
//import Switch from '_c/switch'
// import Example from '../single-page/home/example.vue'
import {
  getAllDevices,
  getassets,
  getAlarmMessage,
  getDataTime,
  changeLampDegree,
  changeConcentratorDegree,
  getConcentroterInfo,
  getLampInfo,
  routerRead,
  electronicRead,
  dataCollecting,
  electronicHistoryRead
} from "@/api/light";
import { constants } from "crypto";
//MQTT
import mqtt from "mqtt";
var client;
const options = {
  connectTimeout: 40000,
  clientId: "web" + new Date().getTime(),
  username: "admin",
  password: "Pass_emqtt",
  clean: true
};
client = mqtt.connect("ws://39.108.249.215:8083/mqtt", options);

export default {
  name: "device_light",
  components: {
    InforCard,
    CountTo,
    //Tree,
    ChartPie,
    ChartBar,
    Tables,
    echarts,
    DragDrawer
    // Example
  },
  data() {
    return {
      //图表数据
      interval: "",
      concentratorChart: false,
      choosecharttype: "",
      choosetimetype: "",
      totalData: "",
      //地图数据
      concentratorLocatoin: [],
      lightPoleLocation: [],
      showMap: false,
      //左侧树数据
      lightData: [],
      currentLight: {},
      currentConcentrator: {},
      currentDevice: "",
      //集中器信息
      spinShow: false,
      spinShow2: false,
      concentratorInfo: {
        concentrator_name: "",
        onlineNum: "",
        readTime: "",
        totalNum: "",
        status: "",
        onlineMeasured: "",
        offlineMeasured: "",
        power: "",
        coulometry: "",
        current: "",
        voltage: "",
        power_factor: ""
      },
      concentratorDataForCurve: {
        power: "",
        coulometry: "",
        current: "",
        voltage: "",
        power_factor: ""
      },
      //灯具信息
      lampBasicInfo: {
        caddress: "",
        concentrator_name: "",
        coulometry: "",
        current: "",
        lpid: "",
        power: "",
        power_factor: "",
        read_time: "",
        status: "",
        voltage: ""
      },
      //开关灯亮度
      lightTitle: "",
      lightDegree: 0,
      allLightDegree: [],
      //下方资产信息
      deviceInfo: {
        productName: "",
        status: "",
        buyDate: "",
        maintenanceDate: "",
        maintenancePeriod: "",
        termOfService: "",
        factory: "",
        contactName: "",
        mobilePhone: "",
        contactEmail: ""
      },
      timetype: [
        { value: "1", label: "最近一天" },
        { value: "2", label: "最近一周" },
        { value: "3", label: "最近一月" },
        { value: "4", label: "最近一年" }
      ],
      chartstyle: [
        { value: "1", label: "实时数据" },
        { value: "2", label: "历史数据" }
      ],
      //报警信息
      alarmData: [
        {
          status: "",
          lamppost: "",
          name: "",
          problem: "",
          datetime: ""
        }
      ],
      // 开灯render
      // lightOn: (h, { root, node, data }) => {
      //   return h(
      //     "span",
      //     {
      //       style: {
      //         display: "inline-block",
      //         width: "60%"
      //       }
      //     },
      //     [
      //       h("span", [
      //         h("Icon", {
      //           props: {
      //             type: "md-bulb"
      //           },
      //           style: {
      //             marginRight: "8px",
      //             color: "yellow"
      //           }
      //         }),
      //         h(
      //           "span",
      //           {
      //             style: {
      //               color: "black",
      //               cursor: "pointer"
      //             },
      //             class: [
      //               "ivu-tree-title",
      //               {
      //                 ["ivu-tree-title-selected"]: data.selected
      //               }
      //             ],
      //             on: {
      //               click: () => {
      //                 console.log(data);
      //                 data = this.setData(data);
      //               }
      //             }
      //           },
      //           data.title
      //         )
      //       ])
      //     ]
      //   );
      // },
      // //关灯render
      // lightOff: (h, { root, node, data }) => {
      //   return h(
      //     "span",
      //     {
      //       style: {
      //         display: "inline-block",
      //         width: "60%"
      //       }
      //     },
      //     [
      //       h("span", [
      //         h("Icon", {
      //           props: {
      //             type: "ios-bulb-outline"
      //           },
      //           style: {
      //             marginRight: "8px",
      //             color: "yellow"
      //           }
      //         }),
      //         h(
      //           "span",
      //           {
      //             style: {
      //               color: "black",
      //               cursor: "pointer"
      //             },
      //             class: [
      //               "ivu-tree-title",
      //               {
      //                 ["ivu-tree-title-selected"]: data.selected
      //               }
      //             ],
      //             on: {
      //               click: () => {
      //                 console.log(data);
      //                 data = this.setData(data);
      //               }
      //             }
      //           },
      //           data.title
      //         )
      //       ])
      //     ]
      //   );
      // },
      // //故障灯render
      // lightError: (h, { root, node, data }) => {
      //   return h(
      //     "span",
      //     {
      //       style: {
      //         display: "inline-block",
      //         width: "60%"
      //       }
      //     },
      //     [
      //       h("span", [
      //         h("Icon", {
      //           props: {
      //             type: "ios-bulb-outline"
      //           },
      //           style: {
      //             marginRight: "8px",
      //             color: "red"
      //           }
      //         }),
      //         h(
      //           "span",
      //           {
      //             style: {
      //               color: "black",
      //               cursor: "pointer"
      //             },
      //             class: [
      //               "ivu-tree-title",
      //               {
      //                 ["ivu-tree-title-selected"]: data.selected
      //               }
      //             ],
      //             on: {
      //               click: () => {
      //                 console.log(data);
      //                 data = this.setData(data);
      //               }
      //             }
      //           },
      //           data.title
      //         )
      //       ])
      //     ]
      //   );
      // },
      // concentrator: (h, { root, node, data }) => {
      //   return h(
      //     "span",
      //     {
      //       style: {
      //         display: "inline-block",
      //         width: "60%",
      //         fontSize: "12pt"
      //       }
      //     },
      //     [h("span", [h("span", data.title)])]
      //   );
      // },
      showtimechoose: false,

      buttonProps: {
        type: "default",
        size: "small"
      },
      dom: null,
      dt_columns: [
        { title: "设备列表", key: "device_list" },
        { title: "设备状态", key: "device_status" },
        { title: "设备地址", key: "device_address" }
        // {title:'',key:''},
        // {title:'',key:''},
      ],
      dt_lightcolumns: [
        { title: "星期", key: "device_week" },
        { title: "日期", key: "device_date" },
        { title: "开灯时间", key: "device_open" },
        { title: "关灯时间", key: "device_close" }
      ]
    };
  },
  methods: {
    initMqtt() {
      // mqtt连接
      client.on("connect", e => {
        console.log("连接成功:");
        client.subscribe(
          "/smartCity/light/electronicData",
          { qos: 1 },
          error => {
            if (!error) {
              console.log("订阅成功");
            } else {
              console.log("订阅失败");
            }
            //client.publish("/smartCity/light/electronicData", "Hello mqtt");
          }
        );
      });
      // 接收消息处理
      client.on("message", (topic, message) => {
        console.log("收到来自", topic, "的消息", message.toString());
        this.$Message.success(message.toString());
      });
      // 断开发起重连
      client.on("reconnect", error => {
        console.log("正在重连:", error);
      });
      // 链接异常处理
      client.on("error", error => {
        console.log("连接失败:", error);
      });
    },
    /* ----------------------------------------------*/
    //双样式切换
    setting(id) {
      var traget = document.getElementById(id);
      if (traget.style.display == "none") {
        traget.style.display = "";
      } else {
        traget.style.display = "none";
      }
    },
    //亮度调节器优化
    format(val) {
      return "亮度: " + val + "%";
    },
    getDefaultNode() {
      var array = [];
      var data = this.$refs.mainTree.getSelectedNodes();
      //因为直选中一个，数组为0
      this.chooseDevice(data);
    },
    /* ----------------------------------------------*/
    //地数数据获取函数
    createMapRenderData(data) {
      var concentratorList = [];
      var lightPoleList = [];
      //获取集中器地图所需列表
      for (let i in data) {
        var tempCon = new Object();
        tempCon["cname"] = data[i]["name"];
        tempCon["logitude"] = data[i]["logitude"];
        tempCon["latitude"] = data[i]["latitude"];
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
        var tempLight = new Object();
        if (data[i]["children"] != null) {
          var tempchildren = data[i]["children"];
          for (let y in tempchildren) {
            if (tempchildren[y]["children"] != null) {
              tempLight["lname"] = tempchildren[y]["name"]; //灯杆名字
              tempLight["cname"] = tempchildren[y]["parentId"]; //集中器名字
              tempLight["logitude"] = tempchildren[y]["logitude"];
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
      console.log(this.concentratorLocatoin);
    },
    createMapLarge() {
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
        center: [113.54913, 22.19875], // 设置地图中心
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
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserLocation: true,
          zoom: 10
        })
      );
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
          this.concentratorLocatoin[i]["logitude"] +
          "," +
          this.concentratorLocatoin[i]["latitude"] +
          "]";
        //geometry
        var tempgeometry = new Object();
        temp1["geometry"] = tempgeometry;
        tempgeometry["type"] = "Point";
        var coordinatesarray = [];
        coordinatesarray.push(this.concentratorLocatoin[i]["logitude"]);
        coordinatesarray.push(this.concentratorLocatoin[i]["latitude"]);
        tempgeometry["coordinates"] = coordinatesarray;
        feature.push(temp1);
      }
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
          "所属集中器：" +
          this.lightPoleLocation[i]["cname"] +
          "<br>灯具坐标为：[" +
          this.lightPoleLocation[i]["logitude"] +
          "," +
          this.lightPoleLocation[i]["latitude"] +
          "]<br>灯具状态：" +
          this.lightPoleLocation[i]["status"];
        //geometry
        var tempgeometry = new Object();
        temp1["geometry"] = tempgeometry;
        tempgeometry["type"] = "Point";
        var coordinatesarray = [];
        coordinatesarray.push(this.lightPoleLocation[i]["logitude"]);
        coordinatesarray.push(this.lightPoleLocation[i]["latitude"]);
        tempgeometry["coordinates"] = coordinatesarray;
        feature.push(temp1);
      }
      return feature;
    },
    createMap(lat, lng) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiMjAxMGppbmciLCJhIjoiY2pyN3hwcWhiMDBrMjQzcGc1NndsaW1tbCJ9.BQoRib1rflv656nIy_5IEQ";
      // var coordinates = document.getElementById("coordinates");
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: "mapbox://styles/mapbox/light-v9",
        center: [lat, lng], // 设置地图中心
        zoom: 11, // 设置地图比例
        trackResize: true
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
    /* ----------------------------------------------*/
    //点击左侧树事件合集
    chooseDevice(data) {
      console.log(data);
      if (data[0].parentId != 0 && data[0].children == null) {
        //给flag赋值
        this.currentDevice = "lamp";
        //更换css
        var concss = document.getElementById("concentrator");
        concss.style.display = "none";
        var lampcss = document.getElementById("lamp");
        lampcss.style.display = "";
        //更改中间图片标题
        var title =
          data[0].childrenId.slice(0, data[0].childrenId.length - 2) +
          data[0].name;
        this.lightTitle = title;
        //当前灯杆赋值
        this.currentLight = data[0];
        //获取灯具控制器信息
        this.getLampInfoByLampID(this.currentLight);
      } else if (data[0].children != null && data[0].lightPoleId == null) {
        //给flag赋值
        this.currentDevice = "concentrator";
        //更换css
        var concss = document.getElementById("concentrator");
        concss.style.display = "";
        var lampcss = document.getElementById("lamp");
        lampcss.style.display = "none";
        //当前为集中器赋值
        this.currentConcentrator = data[0];
        //获取集中器信息
        this.getConcentroterInfoByLampID(this.currentConcentrator);
        //更改中间图片标题
        var title2 = data[0].name;
        this.lightTitle = title2;
        //点击刷新路由
        this.spinShow = true;
        this.routerStatusRead();
      } else {
        this.currentDevice = "lightPole";
      }
    },
    changeLightDegree(value) {
      var img = document.getElementById("image");
      img.style.opacity = value / 100;
    },
    /*-------------------------------------------------------------*/
    //控制面板信息
    //曲线图按钮跳转
    selectedCurveButton() {
      this.concentratorChart = true;
      //设置默认
      this.choosecharttype = "1";
      //选择时间框消失
      var traget = document.getElementById("chooseTime");
      traget.style.display = "none";
      //默认动态图
      this.drawRealTimeCurve();
    },
    //选择图标类型
    clickChartType(value) {
      if (value == "1") {
        var myChart = echarts.init(document.getElementById("curveCharts"));
        myChart.clear();
        var traget = document.getElementById("chooseTime");
        traget.style.display = "none";
        this.drawRealTimeCurve();
      }
      if (value == "2") {
        var myChart = echarts.init(document.getElementById("curveCharts"));
        myChart.clear();
        clearInterval(this.interval);
        var traget = document.getElementById("chooseTime");
        traget.style.display = "";
      }
    },
    //选择时间类型
    clickTimeType(value) {
      this.getElectronicHistoryData(value);
    },
    //曲线图（实时曲线图）
    drawRealTimeCurve() {
      var option = {
        title: {
          text: "当前集中器电压电流",
          subtext: this.currentLight.parentId
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: ["电压", "电流"]
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 2000);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}A"
            },
            name: "电流",
            max: 1,
            min: 0
          },
          {
            type: "value",
            axisLabel: {
              formatter: "{value}V"
            },
            name: "电压",
            max: 300,
            min: 0
          }
        ],
        series: [
          {
            name: "电压",
            type: "line",
            yAxisIndex: 1,
            data: ["", "", "", "", "", "", "", "", "", ""]
          },
          {
            name: "电流",
            type: "line",
            data: ["", "", "", "", "", "", "", "", "", ""]
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("curveCharts"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
      app.count = 16;
      let _this = this;
      _this.interval = setInterval(function() {
        //获取电压电流数据
        _this.getElectronicDataForChart();
        var axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        data0.shift();
        data0.push(_this.concentratorDataForCurve.voltage);
        data1.shift();
        data1.push(_this.concentratorDataForCurve.current);
        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        myChart.setOption(option);
      }, 2000);
    },
    //曲线图（历史曲线图）
    drawHistoryCurve() {
      var option = {
        title: {
          text: "控制器电压电流参数分析",
          subtext: "所属集中器：" + this.currentLight.parentId,
          textAlign: "left",
          x: "5px",
          y: "5px",
          textStyle: {
            fontSize: "16",
            color: "#143d5d"
          }
        },
        tooltip: {
          trigger: "axis"
          // formatter: function(params) {
          //   var message = "";
          //   var statusInText = "";
          //   var date = new Date(params[0].value[0]);
          //   var readableDate =
          //     date.getFullYear() +
          //     "-" +
          //     (date.getMonth() + 1) +
          //     "-" +
          //     date.getDate() +
          //     " " +
          //     date.getHours() +
          //     ":" +
          //     date.getMinutes() +
          //     ":" +
          //     date.getSeconds();
          //   if (params[0].value[1] == 0) {
          //     statusInText = "设备正常";
          //   } else if (params[0].value[1] == 1) {
          //     statusInText = "连接中断";
          //   } else if (params[0].value[1] == 2) {
          //     statusInText = "恢复连接";
          //   } else if (params[0].value[1] == 3) {
          //     statusInText = "未登录";
          //   } else if (params[0].value[1] == 4) {
          //     statusInText = "上电";
          //   } else if (params[0].value[1] == 5) {
          //     statusInText = "断电";
          //   }

          //   message =
          //     "读取时间：" + readableDate + "<br>" + "状态为：" + statusInText;
          //   return message;
          // }
        },
        dataZoom: {
          y: 430,
          show: true,
          realtime: true,
          start: 0,
          end: 100
        },
        legend: {
          data: ["电压"]
        },
        xAxis: {
          type: "time"
        },
        yAxis: {
          type: "value",
          min: -5,
          max: 300
        },
        series: [
          {
            name: "电压",
            type: "line",
            data: this.totalData
          }
        ]
      };
      //初始化echarts实例
      var myChart = echarts.init(document.getElementById("curveCharts"));
      //窗口初始化
      window.onresize = myChart.resize;
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    },
    //获取实时电流电压图表调用
    getElectronicDataForChart() {
      let token = this.$store.state.user.token;
      electronicRead({
        token: token,
        cids: this.currentLight.concentratorId,
        isForceRun: "yes",
        type: -1
      })
        .then(res => {
          this.formatElectronicDataForCurve(res.data.result.list[0]);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //获取历史电流电压图表调用
    getElectronicHistoryData(timetype) {
      let token = this.$store.state.user.token;
      electronicHistoryRead({
        token: token,
        controllerId: this.currentLight.controllerId,
        peroid: timetype,
        dataType: 49
      })
        .then(res => {
          console.log(res.data);
          this.formatHistoryAnalysisData(res.data.result);
          this.$nextTick(function() {
            this.drawHistoryCurve();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    formatHistoryAnalysisData(data) {
      var tempcombine = [];
      for (let i in data) {
        var tempData = [];
        tempData.push(data[i].collectStartTime);
        let seperatedData = data[i].data.split(",");
        tempData.push(seperatedData[0]);
        tempcombine.push(tempData);
        for (let j = 1; j <= 23; j++) {
          var tempData2 = [];
          var date = new Date(data[i].collectStartTime);
          date.setHours(date.getHours() + j);
          var time = date.getTime();
          tempData2.push(time);
          tempData2.push(seperatedData[j]);
          tempcombine.push(tempData2);
        }
      }
      this.totalData = tempcombine;
    },
    //关闭弹窗时调用
    cancelModal() {
      var myChart = echarts.init(document.getElementById("curveCharts"));
      clearInterval(this.interval);
      myChart.clear();
    },
    //调光时检测是否为集中器还是灯具
    checkDevice() {
      if (this.currentDevice == "concentrator") {
        this.concentratorDegreeChange();
      } else if (this.currentDevice == "lamp") {
        this.lampDegreeChange();
      } else {
        this.$Message.error("请选择灯具或集中器");
      }
    },
    //集中器亮度调节
    concentratorDegreeChange() {
      let token = this.$store.state.user.token;
      let cid = this.currentConcentrator.concentratorId;
      let percent = this.lightDegree;
      let duration = 2;
      changeConcentratorDegree({
        token: token,
        percent: percent,
        duration: duration,
        lightType: 0,
        cids: cid
      })
        .then(res => {
          const data = res.data.result;
          this.$Message.success("调光成功!");
        })
        .catch(err => {
          this.$Message.error("调光失败，请检查是否在线!");
        });
    },
    //灯具亮度调节
    lampDegreeChange() {
      let token = this.$store.state.user.token;
      let lid = this.currentLight.lampId;
      let percent = this.lightDegree;
      let duration = 2;
      changeLampDegree({
        token: token,
        percent: percent,
        duration: duration,
        lid: lid
      })
        .then(res => {
          const data = res.data.result;
          this.$Message.success("调光成功!");
        })
        .catch(err => {
          this.$Message.error("调光失败，请检查是否在线!");
        });
    },
    //获取集中器信息
    getConcentroterInfoByLampID(data) {
      let lid = data.children[0].children[0].lampId;
      let token = this.$store.state.user.token;
      getConcentroterInfo({
        token: token,
        id: lid
      })
        .then(res => {
          console.log("集中器信息：");
          this.concentratorInfo = this.formatConcentratorInfoData(
            res.data.result
          );
          console.log(this.concentratorInfo);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //集中器信息格式化
    formatConcentratorInfoData(infoData) {
      infoData["readTime"] = new Date(infoData["readTime"]).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      if (infoData["status"] == 0) {
        infoData["status"] = "设备正常";
      } else if (infoData["status"] == 1) {
        infoData["status"] = "连接中断";
      } else if (infoData["status"] == 2) {
        infoData["status"] = "恢复连接";
      } else if (infoData["status"] == 4) {
        infoData["status"] = "未登录";
      } else if (infoData["status"] == 8) {
        infoData["status"] = "上电";
      } else if (infoData["status"] == 16) {
        infoData["status"] = "断电";
      }
      return infoData;
    },
    //获取灯具信息
    getLampInfoByLampID(data) {
      let token = this.$store.state.user.token;
      getLampInfo({
        token: token,
        id: data.lampId
      })
        .then(res => {
          console.log("灯具信息：");
          console.log(res.data.result);
          this.lampBasicInfo = this.formatLampInfoData(res.data.result);
          console.log(this.lampBasicInfo);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //灯具信息格式化
    formatLampInfoData(infoData) {
      infoData["readTime"] = new Date(infoData["readTime"]).Format(
        "yyyy-MM-dd HH:mm:ss"
      );
      infoData["coulometry"] = infoData["coulometry"] + "";
      infoData["coulometry"] = infoData["coulometry"].substring(0, 6);
      infoData["voltage"] = infoData["voltage"] + "";
      infoData["voltage"] = infoData["voltage"].substring(0, 6);
      infoData["power_factor"] = infoData["power_factor"] + "";
      infoData["power_factor"] = infoData["power_factor"].substring(0, 6);
      infoData["power"] = infoData["power"] + "";
      infoData["power"] = infoData["power"].substring(0, 6);
      infoData["current"] = infoData["current"] + "";
      infoData["current"] = infoData["current"].substring(0, 6);
      if (infoData["status"] == 0) {
        infoData["status"] = "在线";
      } else if (infoData["status"] == 1) {
        infoData["status"] = "不在线";
      } else if (infoData["status"] == 2) {
        infoData["status"] = "未配置到终端";
      } else if (infoData["status"] == 4) {
        infoData["status"] = "控制器故障";
      } else if (infoData["status"] == 16) {
        infoData["status"] = "集中器不在线";
      } else if (infoData["status"] == 32) {
        infoData["status"] = "控制器失控";
      }
      return infoData;
    },
    /* ----------------------------------------------------- */
    //刷新数据
    toLoading() {
      this.spinShow = true;
      this.routerStatusRead();
    },
    toLoading2() {
      this.spinShow2 = true;
      this.lampStatusRead();
    },
    //刷新，获取路由
    routerStatusRead() {
      let token = this.$store.state.user.token;
      routerRead({
        token: token,
        concentratorIds: this.currentConcentrator.concentratorId
        //isForceRun:"yes",
        //type:-1
      })
        .then(res => {
          console.log("=========================");
          console.log("刷新路由:");
          console.log(res.data.result);
          var long = res.data.result.list.length;
          this.formatrouterStatus(res.data.result.list[long - 1]);
          this.$nextTick(function() {
            this.spinShow = false;
            //   this.concentratorElectronicData();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    concentratorElectronicData() {
      let token = this.$store.state.user.token;
      electronicRead({
        token: token,
        cids: this.currentConcentrator.concentratorId,
        isForceRun: "yes",
        type: -1
      })
        .then(res => {
          console.log("=========================");
          console.log("刷新路由电压:");
          console.log(res.data.result);
          this.formatElectronicData(res.data.result.list[0]);
          this.$nextTick(function() {
            this.spinShow = false;
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //格式化字符串
    formatrouterStatus(data) {
      let menu = {};
      let statusRetured = data.returnStatus;
      //对字符串分割
      let seperatedStatusRetured = statusRetured.split(",");
      //测量点字符串解析
      let onlineNumString = seperatedStatusRetured[0];
      let offlineNumString = seperatedStatusRetured[1];
      //获取数据
      let seperatedOnlineNumString = onlineNumString.split(":");
      let onlineMeasured = seperatedOnlineNumString[1];
      let seperatedOfflineNumString = offlineNumString.split(":");
      let offlineMeasured = seperatedOfflineNumString[1];
      let readTime = seperatedStatusRetured[2];
      //数据存入
      this.concentratorInfo["onlineMeasured"] = onlineMeasured;
      this.concentratorInfo["offlineMeasured"] = offlineMeasured;
      this.concentratorInfo["readTime"] = readTime;
    },
    //格式化电压电流
    formatElectronicData(data) {
      let statusRetured = data.returnStatus;
      //对字符串分割
      let seperatedStatusRetured = statusRetured.split(",");
      //数据字符串解析
      let coulometryString = seperatedStatusRetured[0];
      let currentString = seperatedStatusRetured[1];
      let power_factorString = seperatedStatusRetured[3];
      let powerString = seperatedStatusRetured[4];
      let voltageString = seperatedStatusRetured[5];
      //获取数据
      let seperatedcoulometryString = coulometryString.split(":");
      let coulometryMeasured = seperatedcoulometryString[1];
      let seperatedcurrentString = currentString.split(":");
      let currentMeasured = seperatedcurrentString[1];
      let seperatedpower_factorString = power_factorString.split(":");
      let power_factorMeasured = seperatedpower_factorString[1];
      let seperatedpowerString = powerString.split(":");
      let powerMeasured = seperatedpowerString[1];
      let seperatedvoltageString = voltageString.split(":");
      let voltageMeasured = seperatedvoltageString[1];
      //数据存入
      this.concentratorInfo["coulometry"] = coulometryMeasured.substring(0, 6);
      this.concentratorInfo["current"] = currentMeasured.substring(0, 6);
      this.concentratorInfo["power_factor"] = power_factorMeasured.substring(
        0,
        6
      );
      this.concentratorInfo["power"] = powerMeasured.substring(0, 6);
      this.concentratorInfo["voltage"] = voltageMeasured.substring(0, 6);
      //图表数据专用
      this.concentratorDataForCurve[
        "coulometry"
      ] = coulometryMeasured.substring(0, 6);
      this.concentratorDataForCurve["current"] = currentMeasured.substring(
        0,
        6
      );
      this.concentratorDataForCurve[
        "power_factor"
      ] = power_factorMeasured.substring(0, 6);
      this.concentratorDataForCurve["power"] = powerMeasured.substring(0, 6);
      this.concentratorDataForCurve["voltage"] = voltageMeasured.substring(
        0,
        6
      );
    },
    //格式化电压电流(图表专用)
    formatElectronicDataForCurve(data) {
      let statusRetured = data.returnStatus;
      //对字符串分割
      let seperatedStatusRetured = statusRetured.split(",");
      //数据字符串解析
      let coulometryString = seperatedStatusRetured[0];
      let currentString = seperatedStatusRetured[1];
      let power_factorString = seperatedStatusRetured[3];
      let powerString = seperatedStatusRetured[4];
      let voltageString = seperatedStatusRetured[5];
      //获取数据
      let seperatedcoulometryString = coulometryString.split(":");
      let coulometryMeasured = seperatedcoulometryString[1];
      let seperatedcurrentString = currentString.split(":");
      let currentMeasured = seperatedcurrentString[1];
      let seperatedpower_factorString = power_factorString.split(":");
      let power_factorMeasured = seperatedpower_factorString[1];
      let seperatedpowerString = powerString.split(":");
      let powerMeasured = seperatedpowerString[1];
      let seperatedvoltageString = voltageString.split(":");
      let temp = seperatedvoltageString[1];
      let seperatedtemp = temp.split("}");
      let voltageMeasured = seperatedtemp[0];
      //图表数据专用
      this.concentratorDataForCurve[
        "coulometry"
      ] = coulometryMeasured.substring(0, 6);
      this.concentratorDataForCurve["current"] = currentMeasured.substring(
        0,
        6
      );
      this.concentratorDataForCurve[
        "power_factor"
      ] = power_factorMeasured.substring(0, 6);
      this.concentratorDataForCurve["power"] = powerMeasured.substring(0, 6);
      this.concentratorDataForCurve["voltage"] = voltageMeasured.substring(
        0,
        6
      );
    },
    //刷新灯具
    lampStatusRead() {
      let token = this.$store.state.user.token;
      dataCollecting({
        token: token,
        cids: this.currentLight.concentratorId,
        isForceRun: "YES",
        type: 0
      })
        .then(res => {
          console.log("=========================");
          console.log("灯具信息收集:");
          console.log(res.data.result);
          //this.formatrouterStatus(res.data.result.list[1]);
          this.$nextTick(function() {
            this.spinShow2 = false;
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /* ----------------------------------------------------- */
    //获取左侧树的数据
    getDeviceList() {
      let token = this.$store.state.user.token;
      getAllDevices({
        token: token
      })
        .then(res => {
          const data = res.data.result;
          console.log(res.data.result);
          this.convertDiviceListFormat(data);
          this.createMapRenderData(data);
          this.createMap(data[0].logitude, data[0].latitude);
          this.$nextTick(function() {
            this.getDefaultNode();
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //左侧树 数据格式化
    convertDiviceListFormat(data) {
      let menu = [];
      for (let i in data) {
        data[i]["title"] = data[i]["name"];
        data[i]["expand"] = true;
        if (i == 0) {
          data[i]["selected"] = true;
        }
        //data[i]["render"] = this.concentrator;
        // deal with children
        let children = data[i]["children"];
        // console.log(children)
        if (children != null) {
          for (let y in children) {
            // console.log(children[y])
            children[y]["title"] = children[y]["name"];
            children[y]["expand"] = true;
            children[y]["concentratorId"] = data[i]["concentratorId"];
            // deal with sub children
            let child = data[i]["children"][y]["children"];
            // console.log(child)
            if (child != null) {
              for (let z in child) {
                child[z]["title"] = child[z]["name"];
                child[z]["expand"] = true;
                child[z]["selected"] = false;
                child[z]["concentratorId"] = data[i]["concentratorId"];
                // if (child[z]["status"] < 1) {
                //   child[z]["render"] = this.lightOff;
                // } else if (child[z]["status"] <= 100) {
                //   child[z]["render"] = this.lightOn;
                // } else {
                //   child[z]["render"] = this.lightError;
                // }
                data[i]["children"][y]["children"][z] = child[z];
              }
            }
            data[i]["children"][y] = children[y];
          }
        }
        menu.push(data[i]);
      }
      this.lightData = menu;
      return menu;
    },
    /*-------------------------------------------------------------*/
    //报警消息
    getAlarm() {
      let token = this.$store.state.user.token;
      getAlarmMessage({
        token: token
      })
        .then(res => {
          console.log("=========================");
          console.log("告警分析:");
          console.log(res.data);
          const data = res.data.result;
          this.converterrorlist(data);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    converterrorlist(data) {
      let menu = [];
      for (let i in data) {
        data[i]["status"] = data[i]["level"];
        data[i]["lamppost"] = data[i]["lpNo"];
        data[i]["name"] = data[i]["lightType"];
        data[i]["problem"] = data[i]["faultContent"];
        data[i]["datetime"] = new Date(data[i]["occurTime"]).Format(
          "yyyy-MM-dd HH:mm:ss"
        );
        menu.push(data[i]);
      }
      this.alarmData = menu;
      return menu;
    },
    /* ----------------------------------------------------- */
    //获取下方资产信息
    getDeviceInfo(deviceType, deviceID) {
      let token = this.$store.state.user.token;
      //let device_id = parseInt(deviceID);
      getassets({
        token: token,
        id: deviceID,
        type: deviceType
      })
        .then(res => {
          console.log("=========================");
          console.log("下方list:");
          console.log(res.data);
          this.applyToAsset(res.data.result);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    applyToAsset(assetData) {
      this.deviceInfo.productName = assetData.productName;
      this.deviceInfo.maintenancePeriod = assetData.maintenancePeriod;
      this.deviceInfo.termOfService = assetData.termOfService;
      this.deviceInfo.factory = assetData.factory;
      this.deviceInfo.contactName = assetData.contactName;
      this.deviceInfo.mobilePhone = assetData.mobilePhone;
      this.deviceInfo.contactEmail = assetData.contactEmail;
      if (assetData.status == 0) {
        this.deviceInfo.status = "设备断电";
      } else if (assetData.status == 1) {
        this.deviceInfo.status = "运行正常";
      } else if (assetData.status == 2) {
        this.deviceInfo.status = "设备离线";
      } else {
        this.deviceInfo.status = "错误状态";
      }

      var install = assetData.buyDate + "";
      var maintain = assetData.maintenanceDate + "";
      if (install.length > 10) {
        install = install.substring(0, install.length - 9);
      }
      if (maintain.length > 10) {
        maintain = maintain.substring(0, maintain.length - 9);
      }
      this.deviceInfo.buyDate = install;
      this.deviceInfo.maintenanceDate = maintain;
    },

    /* ----------------------------------------------------- */
    initData() {
      this.getDeviceList();
      this.getAlarm();
      this.getDeviceInfo(1, 1);
      this.initMqtt();
    }
  },
  mounted() {
    this.initData();
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
    //
  }
};
</script>

<style lang="less" scoped>
//更改tree高度
.ivu-tree {
  border-radius: 4px;
  min-height: 608px;
  padding-left: 28px;
  padding-top: 8px;
}
//去除页面边框
.layout {
  border: 0 !important;
}
//图片高度
.imgs {
  height: 527px;
  width: 80%;
  float: right;
}
//图片居中
.img-style {
  text-align: center;
}

.ivu-drawer-wrap-inner {
  padding-top: 10px;
}
.textcenter {
  text-align: center;
}
.card_image .ivu-card-body {
  text-align: center;
}
ul {
  list-style: none;
}
tr.ivu-table-row-hover td {
  background-color: burlywood;
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
</style>
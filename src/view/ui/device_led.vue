<template>
  <div class="vfm">
    <Layout>
      <Content style="padding: 5px;padding-left:0px;">
        <Row :gutter="10">
          <!-------左边表格------------------------------->
          <i-col span="5">
            <Card class="paddingCardLeftUpdate">
              <!----- 标题栏 ----->
              <p slot="title">
                <Icon type="ios-desktop-outline" size="24"></Icon>设备列表
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
                <Tree ref="mainTree" :data="AssetData" @on-select-change="chooseDevice"></Tree>
              </div>
            </Card>
          </i-col>
          <i-col span="19">
            <Drawer v-model="showMap" width="100%" :closable="true" :inner="true" :transfer="false">

              <div ref="basicMapbox2" style=" height:100%; width:100%;"></div>
            </Drawer>
            <Row>
              <!-------中间屏幕------------------------------->
              <i-col span="8">
                <Card class="paddingCardMiddleUpdate">
                  <!----- 标题栏 ----->
                  <p slot="title" align="center" class="ledViewTitle">
                    <Icon type="md-phone-landscape" size="24"></Icon>LED视图
                    <Icon type="ios-camera" style="float:right" size="28"></Icon>
                  </p>
                  <Row :gutter="16" style="height:579px">
                    <!----- 左边led屏幕 ----->
                    <i-col
                      span="24"
                      style="padding-top:15px; padding-left:24px;padding-right:24px;"
                    >
                      <div v-if="led_is_on">
                        <img id="ledImg" src="../../assets/images/device/led_on.png" class="device_img">
                      </div>
                      <div v-else>
                        <img src="../../assets/images/device/led_off.png" class="device_img">
                      </div>
                      <div id="screenLable" style="margin-top:15px">{{this.towards}}</div>
                    </i-col>
                  </Row>
                  <!----- 屏幕下的 switch ----->
                  <div align="center">
                    <i-switch
                      id="switch"
                      size="large"
                      :value="led_is_on"
                      @on-change="triggleDisplay"
                    >
                      <span slot="open">ON</span>
                      <span slot="close">OFF</span>
                    </i-switch>
                  </div>
                </Card>
              </i-col>
              <!------右中侧屏幕------------------------------->
              <i-col span="7">
                <!--- 右中上方card --->
                <Row style="margin-left:10px;">
                  <Card :bordered="false" class="paddingCardMiddleUpdate">
                    <p slot="title">
                      <Icon type="md-options" size="24"/>运行状态
                    </p>
                    <div style="padding:25px;">
                      <table width="350px">
                        <tr>
                          <td> 设备状态：
                            <span style="padding-left:10px;color:#2c8cf0">{{status}}</span>
                          </td>
                          <td>
                            屏幕朝向：
                            <span style="padding-left:10px;color:#2c8cf0">{{toward}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            当前亮度：
                            <span style="padding-left:10px;color:#2c8cf0">{{brightness}}</span>
                          </td>
                          <td>
                            当前音量：
                            <span style="padding-left:10px;color:#2c8cf0">{{volume}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                          当前节目：
                          <span style="padding-left:10px;color:#2c8cf0">{{infoProgram}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                          当前任务：
                          <span style="padding-left:10px;color:#2c8cf0">{{infoTask}}</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Card>
                </Row>
                <!--- 右中下方card --->
                <Row style="margin-left:10px;margin-top:10px">
                  <Card class="paddingCardMiddleUpdate">
                    <p slot="title">
                      <Icon type="ios-alert-outline"></Icon>GIS地图
                    </p>
                    <div style="height:442px;width:100%;" ref="basicMapbox">
                      <!-- <div ref="basicMapbox" style="height:100%; width:auto;">
                      </div>-->
                    </div>
                  </Card>
                </Row>
              </i-col>
              <!-------右侧屏幕------------------------------->
              <i-col span="9">
                <!--- 编辑drawer内容 --->
                <Drawer
                  :title="title"
                  class="subpageDrawer"
                  v-model="addShowDrawer"
                  width="100%"
                  :closable="true"
                  :inner="true"
                  :transfer="false"
                >
                  <Form @submit.prevent="submit">
                    <Row :gutter="32">
                      <i-col span="24">
                        <FormItem label="任务名称：" label-position="left">
                          <Input
                            prefix="ios-musical-notes"
                            placeholder="请输入任务名称"
                            v-model="task.name"
                          />
                        </FormItem>
                      </i-col>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="12">
                        <FormItem label="持续时间（单位/秒）：" label-position="left">
                          <Input placeholder="请输入持续时间" v-model="task.duration"/>
                        </FormItem>
                      </i-col>
                      <i-col span="12">
                        <FormItem label="设备数目：" label-position="left">
                          <Input placeholder="请输入设备数目" v-model="task.no"/>
                        </FormItem>
                      </i-col>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="12" class="datepicker">
                        <FormItem label="选择日期时间：" label-position="left">
                          <DatePicker
                            confirm
                            type="datetime"
                            placeholder="选择日期"
                            style="width: 100%"
                            placement="bottom-end"
                            v-model="task.date"
                          ></DatePicker>
                        </FormItem>
                      </i-col>
                    </Row>
                    <Row>
                      <FormItem label="播放日期：" label-position="left">
                        <i-col span="24">
                          <CheckboxGroup v-model="task.week" style="color:white;padding-left:1px;">
                            <Checkbox label="周一"></Checkbox>
                            <Checkbox label="周二"></Checkbox>
                            <Checkbox label="周三"></Checkbox>
                            <Checkbox label="周四"></Checkbox>
                            <Checkbox label="周五"></Checkbox>
                            <Checkbox label="周六"></Checkbox>
                            <Checkbox label="周日"></Checkbox>
                          </CheckboxGroup>
                        </i-col>
                      </FormItem>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="24">
                        <p style="color:#fff; font-size:16px;padding-bottom:3px;">
                          上传文件：
                          <Button
                            size="small"
                            style="float:right; border:none"
                            type="info"
                            ghost
                            @click="historyfile = true; getHistoryProgramme()"
                          >历史上传文件</Button>
                        </p>
                        <Upload
                          multiple
                          type="drag"
                          :format="['mp3','mp4','wmv']"
                          :on-format-error="handleFormatError"
                          :data="fileData"
                          action
                          :before-upload="handleBeforeUpload"
                          :headers="headers"
                        >
                          <div style="padding: 5px 0">
                            <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                            <p>点击或拖拽上传</p>
                          </div>
                        </Upload>
                        <p style="color:white">上传文件列表：</p>
                        <Scroll :on-reach-bottom="handleReachBottom" :height="100">
                          <Card :bordered="false" dis-hover class="listcard">
                            <ul>
                              <li
                                v-for="fileNameList in ledfile"
                                :key="fileNameList.listTheFile"
                              >{{fileNameList.listTheFile}}</li>
                            </ul>
                          </Card>
                        </Scroll>
                      </i-col>
                    </Row>
                  </Form>

                  <div class="ivu-drawer-footer">
                    <Button
                      style="margin-right: 8px;margin-bottom:8px;"
                      @click="addShowDrawer = false"
                    >Cancel</Button>
                    <Button
                      style="margin-bottom:8px;"
                      type="primary"
                      html-type="submit"
                      @click="submitform(), addShowDrawer = false"
                    >Submit</Button>
                  </div>
                </Drawer>
                <!--- 编辑 第二个 drawer内容 --->
                <Drawer
                  :title="title"
                  class="subpageEditDrawer"
                  v-model="editShowDrawer"
                  width="100%"
                  height="80%"
                  :closable="true"
                  :inner="true"
                  :transfer="false"
                >
                  <Form @submit.prevent="submit">
                    <Row :gutter="32">
                      <i-col span="24">
                        <FormItem label="任务名称：" label-position="left">
                          <Input
                            prefix="ios-musical-notes"
                            placeholder="请输入任务名称"
                            v-model="edittask.name"
                          />
                        </FormItem>
                      </i-col>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="12">
                        <FormItem label="持续时间（单位/秒）：" label-position="left">
                          <Input placeholder="请输入持续时间" v-model="edittask.duration"/>
                        </FormItem>
                      </i-col>
                      <i-col span="12">
                        <FormItem label="设备数目：" label-position="left">
                          <Input placeholder="请输入设备数目" v-model="edittask.no"/>
                        </FormItem>
                      </i-col>
                    </Row>
                    <Row :gutter="32">
                      <i-col span="12" class="datepicker">
                        <FormItem label="选择日期时间：" label-position="left">
                          <DatePicker
                            confirm
                            type="datetime"
                            placeholder="选择日期"
                            style="width: 100%"
                            placement="bottom-end"
                            v-model="edittask.playTime"
                          ></DatePicker>
                        </FormItem>
                      </i-col>
                    </Row>
                    <Row>
                      <FormItem label="播放日期：" label-position="left">
                        <i-col span="24">
                          <CheckboxGroup
                            v-model="edittask.weekDate"
                            style="color:white;padding-left:1px;"
                          >
                            <Checkbox label="周一"></Checkbox>
                            <Checkbox label="周二"></Checkbox>
                            <Checkbox label="周三"></Checkbox>
                            <Checkbox label="周四"></Checkbox>
                            <Checkbox label="周五"></Checkbox>
                            <Checkbox label="周六"></Checkbox>
                            <Checkbox label="周日"></Checkbox>
                          </CheckboxGroup>
                        </i-col>
                      </FormItem>
                    </Row>
                  </Form>

                  <div class="ivu-drawer-footer">
                    <Button style="margin-right: 8px" @click="editShowDrawer = false">Cancel</Button>
                    <Button
                      type="primary"
                      html-type="submit"
                      @click="editform(), editShowDrawer = false"
                    >Submit</Button>
                  </div>
                </Drawer>

                <Modal v-model="historyfile" title="历史上传文件" class="ledmodal">
                  <p slot="header" style="color:#fff;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>历史上传文件</span>
                  </p>
                  <Table
                    class="history_table"
                    style="margin-top:10px;"
                    ref="tables"
                    :columns="drawer_columns"
                    :data="historyUploadList"
                  ></Table>

                  <div slot="footer">
                    <Row :gutter="20" style="text-align:center;">
                      <i-col span="4" offset="6">
                        <Button class="search-btn" type="primary" size="small">上一页</Button>
                      </i-col>
                      <i-col span="4" offset="3">
                        <Button class="search-btn" type="primary" size="small">下一页</Button>
                      </i-col>
                    </Row>
                  </div>
                </Modal>

                <Card class="paddingCardRightMiddleUpdate" style="margin-left:10px;">
                  <!----- 标题栏 ----->
                  <p slot="title" align="center" class="streetLightTitle">
                    <Icon type="md-bulb" size="24"/>
                    {{showdatatitle}}
                    <!-- <Button
                      size="small"
                      style="float:right"
                      type="primary"
                      @click="addShowDrawer = true; uploadList = []; programIDList= []; ledfile=[];"
                    >添加任务</Button> -->
                  </p>

                  <!----- 主表格 ----->
                  <Row style="margin-left:1px;height:636px">
                    <Table
                      highlight-row
                      :row-class-name="rowClassName"
                      :height="551"
                      :data="showDatafromDB"
                      :columns="showColumn"
                      @on-row-click="clickTaskRow"
                    ></Table>
                    <Row style="text-align:center;">
                      <i-col span="4" offset="6">
                        <Button
                          class="search-btn"
                          type="primary"
                          size="small"
                          @click="taskLastPage()"
                        >上一页</Button>
                      </i-col>
                      <i-col span="4" offset="5">
                        <Button
                          class="search-btn"
                          type="primary"
                          size="small"
                          @click="taskNextPage()"
                        >下一页</Button>
                      </i-col>
                    </Row>
                  </Row>
                  <!----- 表格下方时间栏 ----->
                  <!-- <Row style="height:116px">
                    <i-col span="8">
                      <p style="text-align:center; margin-top:10px; font-size:15pt;">
                        <span style="color:#2c8cf0;">开始日期</span>
                      </p>
                      <div
                        style="text-align:center;font-size:12pt; margin-top:15px;margin-bottom:15px;"
                      >
                        <p>
                          <span style="padding-left:5px;color:#2c8cf0;">{{showInfo.playTime}}</span>
                        </p>
                      </div>
                    </i-col>
                    <i-col span="8">
                      <p style="text-align:center; margin-top:10px; font-size:15pt;">
                        <span style="color:#2c8cf0;">持续时间</span>
                      </p>
                      <div
                        style="text-align:center;font-size:12pt; margin-top:15px;margin-bottom:15px;"
                      >
                        <p>
                          单位(s)：
                          <span style="color:#2c8cf0;">{{showInfo.duration}}</span>
                        </p>
                      </div>
                    </i-col>
                    <i-col span="8">
                      <p style="text-align:center; margin-top:10px; font-size:15pt;">
                        <span style="color:#2c8cf0;">指定日期</span>
                      </p>
                      <div
                        style="text-align:center;font-size:12pt; margin-top:15px;margin-bottom:15px;"
                      >
                        <p>
                          <span style="color:#2c8cf0;">{{showInfo.weekDate}}</span>
                        </p>
                      </div>
                    </i-col>
                  </Row> -->
                </Card>
              </i-col>
            </Row>

            <!-------下方信息------------------------------->
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
                  <Col span="5" class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;margin-top:15px;">
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
                  <Col span="5"  class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;margin-top:15px;">
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
                  <Col span="4" class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;margin-top:15px;">
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
                  <Col span="5" class="listStyle" style="border-right:1px dashed #2c8cf0;padding-left:30px;margin-top:15px;">
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
                  <Col span="5" class="listStyle" style="padding-left:30px;margin-top:15px;">
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
import leddata from "./data/led_tabledata";
import Tables from "_c/tables";
import Notice from "iview";
import DragDrawer from "_c/drag-drawer";
import deviceInfoList from "./data/led_deviceinfodata";
import led_tabledata from "./data/led_tabledata";
import expandRow from "./device_led_table_expand.vue";

import datetime_picker from "./device_led_datetime_picker.vue";

import mapboxgl from "mapbox-gl";
import {
  getAllLedDevices,
  getAllTask,
  getassets,
  deleteshow,
  submitTask,
  putTask,
  getHistory,
  getTaskProgramList,
  getAssetDevices,
  getOperationState,
  deviceOperate
} from "@/api/led";

const axios = require("axios");

export default {
  name: "device_led",
  components: {
    InforCard,
    CountTo,
    expandRow,
    Tables,
    Notice,
    DragDrawer
    // Example
  },

  data() {
    return {
      showMap: false,
      concentratorLocatoin: [],
      lightPoleLocation: [],
      // fileData
      deviceType:"",
      deviceName:"",
      id:"25",
      taskPageNum:1,
      taskTotal:1,
      fileData: { length: 0.0, type: "", fileName: "", size: 0.0 },
      uploadList: [],
      historyUploadList: [],
      ledfile: [],
      currentDeviceID: "",
      currentDeviceName: "",
      programIDList: [],
      loadingStatus: false,
      AssetData: [],
      //运行状态
      status:"",
      toward:"",
      brightness:"",
      volume:"",
      infoTask:"",
      infoProgram:"",

      // header
      headers: {
        Authorization: this.$store.state.user.token,
        "Content-Type": "multipart/form-data"
      },

      // Device List Data Title
      dt_columns: [
        { title: "状态", align: "center", slot: "status", width: 80 },
        { title: "灯杆名称", align: "center", key: "name" },
        { title: "屏幕", align: "center", key: "towards" }
      ],

      //DB获得左侧列表数据
      dt_deviceDatafromDB: [],

      // 节目表数据标题
      showColumn: [
        {
          type: "expand",
          width: 15,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        { title: "任务名称", align: "center", key: "name", minWidth: 90 },
        {
          title: "开始日期",
          align: "center",
          key: "beginDate",
          minWidth: 100
        },
        { title: "开始时间", align: "center", key: "playTime", minWidth: 100 },
        { title: "持续时间", align: "center", key: "duration", minWidth: 80 },
        // {
        //   title: "操作",
        //   align: "center",
        //   key: "operation",
        //   render: (h, params) => {
        //     return h("div", [
        //       //edit 按钮
        //       h("Icon", {
        //         props: {
        //           type: "md-create"
        //         },
        //         style: {
        //           marginLeft: "5px",
        //           color: "rgba(100, 215, 183, 1)",
        //           cursor: "pointer",
        //           fontSize: "25px"
        //         },
        //         on: {
        //           click: () => {
        //             this.editShowDrawer = true;
        //             this.setData(params.row);
        //             //this.edit(params.index);
        //           }
        //         }
        //       }),
        //       //delete 按钮
        //       h("Icon", {
        //         props: {
        //           type: "md-trash"
        //         },
        //         style: {
        //           marginLeft: "5px",
        //           color: "red",
        //           cursor: "pointer",
        //           fontSize: "25px"
        //         },
        //         on: {
        //           click: () => {
        //             this.remove(params.index, params.row.id);
        //           }
        //         }
        //       })
        //       // h("span", params.row.name)
        //     ]);
        //   }
        // }
      ],

      //从数据库获取节目列表数据
      towards: "",
      showdatatitle: "",
      showDatafromDB: [],

      //从数据库获取节目详细信息
      showInfo: { weekDate: "" },

      //从数据库获取资产信息
      deviceInfo: {},

      //资产信息假数据
      // deviceInfo: {
      //   name: "爱尔视人行道灯",
      //   status: "正常运行",
      //   purchase_date: "2018-09-25",
      //   maintenance_date: "2019-09-25",
      //   maintenance_intervals: "3个月",
      //   warranty_period: "3年",
      //   producer: "爱尔视有限公司",
      //   contact_staff: "李工",
      //   contact_phone: "13578168700",
      //   contact_email: "ligong@gmail.com"
      // },

      //Drawer Data
      addShowDrawer: false,
      editShowDrawer: false,
      title: "⊕ 添加节目与定时",
      task: {
        name: "",
        duration: "",
        no: "",
        date: "",
        week: [],
        file: ""
      },
      edittask: {
        id: "",
        name: "",
        duration: "",
        no: "",
        playTime: "",
        weekDate: []
      },

      //modal data
      drawer_columns: [
        { title: "序号", key: "id", width: 70 },
        { title: "文件名称", key: "name", align: "center", width: 190 },
        { title: "大小", key: "size", align: "center", width: 100 },
        { title: "类型", key: "type", align: "center" },
        {
          title: "操作",
          key: "action",
          width: 70,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //弹窗取消
                      this.historyfile = false;
                      //点击使用
                      this.useProgramme(params.row);
                    }
                  }
                },
                "使用"
              )
            ]);
          }
        }
      ],

      led_tabledata: leddata.data,
      led_totalNum: leddata.data.length,
      deviceInfoList: deviceInfoList.data,
      currentDiviceStatus: {
        currentJob: "播放新年祝福视频",
        startTime: "2019-1-31 12:00:00",
        endTime: "2019-2-5 12:00:00"
      },
      led_is_on: true,
      //   drawer
      historyfile: false,
      detailDevice: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      }
    };
  },

  methods: {
    //选择默认Tree node
    getDefaultNode() {
      var array=[]
      var data = this.$refs.mainTree.getSelectedNodes();
      //因为直选中一个，数组为0
      this.chooseDevice(array,data[0]);
    },
    //运行状态
    OperationState(){
      let uid = this.$store.state.user.userId
      let token = this.$store.state.user.token
      if(this.id!="null"){
        getOperationState({
          token: token,
          assetId:this.id
        }).then(res => {
          console.log('=========================')
          console.log('运行状态:----------------')
          // 初始化
          console.log(res.data)
          //运行状态
          this.toward=res.data.towards
          this.brightness=res.data.brightness
          this.volume=res.data.volume
          if(res.data.infoTask==null){
            this.infoTask="无"
          }else{
          this.infoTask=res.data.infoTask.name
          }
          if(res.data.infoProgram==null){
            this.infoProgram="无";
            //更改图片
            document.getElementById('ledImg').src="http://localhost:4001/img/led_on.8ebe795c.png";
          }else{
            this.infoProgram=res.data.infoProgram.name;
            let src=res.data.infoProgram.image.substring(9,res.data.infoProgram.image.length);
            document.getElementById('ledImg').src="http://39.108.249.215"+src;
          }
          if(this.status==0){
            this.status="关闭"
          }else{
            this.status="开启"
          }



          // this.TranslateLoop(this.tableData);
        })
          .catch(err => {
            console.log('===========error==============')
            console.log(err)
          })
      }
    },
    //获取右侧列表


    handleReachBottom() {},
    //格式检查
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select mp4 or mp3."
      });
    },
    // handleBeforeUpload
    handleBeforeUpload(file) {
      this.fileData.fileName = file.name;
      this.fileData.size = parseFloat(file.size) / 1024;
      this.fileData.type = 2;
      let that = this;
      //获取文件时长
      var url = URL.createObjectURL(file);
      var audioElement = new Audio(url);
      var d;

      audioElement.addEventListener("loadedmetadata", function(_event) {
        d = audioElement.duration;
        that.fileData.length = d / 60;
        that.upload(file, url);
      });

      //return false;
    },

    //重写upload方法
    upload(file, url) {
      let token = this.$store.state.user.token;
      console.log(file);
      //获取当前时间
      var myDate = new Date().Format("yyyy-MM-dd HH:mm:ss");
      //创建 formData 对象
      let formData = new FormData();
      //向 formData 对象中添加文件
      formData.append("file", file);
      formData.append("length", this.fileData.length);
      formData.append("type", this.fileData.type);
      formData.append("size", this.fileData.size);
      formData.append("fileName", this.fileData.fileName);
      //组建filelist
      var filelist = new Object();
      var temp = new Object();
      (filelist.name = this.fileData.fileName),
        (temp.listTheFile = this.fileData.fileName),
        (filelist.size = this.fileData.size),
        (filelist.type = this.fileData.type),
        (filelist.length = this.fileData.length),
        (filelist.url = url),
        (filelist.createDate = myDate),
        this.uploadList.push(filelist);
      this.ledfile.push(temp);
      this.uploadFile(this.headers, formData);
    },

    // uploadFile
    uploadFile(headers, formData) {
      let that = this;
      axios
        .post(
          this.$config.baseUrl.dev + "info-publish/program/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.$store.state.user.token
            }
          }
        )
        .then(res => {
          this.programIDList.push(res.data.result);
          console.log(res.data.result);
          console.log("SUCCESS!!");
          that.$Message.info("上传成功");
        })
        .catch(function() {
          console.log("FAILURE!!");
          that.$Message.info("上传失败");
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

    //隔行变色
    rowClassName: function(row, index) {
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },

    //led控制器
    triggleDisplay() {
      if (!this.led_is_on){
        let uid = this.$store.state.user.userId;
        let token = this.$store.state.user.token;
        deviceOperate({
          token: token,
          assetId: this.id,
          onOff:1,
        })
          .then(res => {
            console.log("=========================");
            console.log("开启设备:");
            console.log(res.data);
            this.$Message.success('已开启');
            this.led_is_on = !this.led_is_on;
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.$Message.error('开启失败');
          });
      }else{
        let uid = this.$store.state.user.userId;
        let token = this.$store.state.user.token;
        deviceOperate({
          token: token,
          assetId: this.id,
          onOff:0,
        })
          .then(res => {
            console.log("=========================");
            console.log("关闭设备:");
            console.log(res.data);
            this.$Message.success('已关闭');
            this.led_is_on = !this.led_is_on;
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.$Message.error('关闭失败');
          });
      }
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
        //tempproperty["title"] = this.concentratorLocatoin[i]["cname"];
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
          /*"所属集中器：" +
          this.lightPoleLocation[i]["cname"] +*/
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
          let currentDevice = res.data.result[0]["deviceLightPoleDtoList"][0]["deviceAssetList"][0];
          this.deviceInfo = currentDevice;
          //地图坐标
          /*console.log("书的数据")
          let lat = parseFloat(res.data.result[0]["deviceLightPoleDtoList"][0].latitude);
          let lng = parseFloat(res.data.result[0]["deviceLightPoleDtoList"][0].longitude);
          this.createMap(lat, lng);*/
          console.log("树的数据");
          console.log(res.data.result);

          this.convertDiviceListFormat(data);
           this.createMapRenderData(data);
          this.createMap(data[0]["deviceLightPoleDtoList"][0].latitude, data[0]["deviceLightPoleDtoList"][0].longitude);
          this.$nextTick(function() {
               this.getDefaultNode()


            })
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
    /*getDeviceList2(pageNum) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      let pageNo = pageNum;
      let pageSize = 10;
      //console.log("uid: " + uid + "---token: " + token);

      getAllLedDevices({
        // "uid":uid,
        token: token,
        pageNo: pageNo,
        pageSize: pageSize
      })
        .then(res => {
          console.log("=========================");
          console.log("左侧list:");
          console.log(res.data.result);
          this.dt_deviceDatafromDB = res.data.result;
          //地图坐标
          let lat = parseFloat(res.data.result[0].latitude);
          let lng = parseFloat(res.data.result[0].longitude);
          this.createMap(lat, lng);
          //第一行高亮,预设id,默认task列表,默认资产信息表
          res.data.result[0]._highlight = true;
          this.currentDeviceID = res.data.result[0].id;
          this.currentDeviceName = res.data.result[0].name;
          this.id=res.data.result[0].id;

          this.getDeviceInfo(8, res.data.result[0].id);
          this.showdatatitle = res.data.result[0].name;
          this.towards = res.data.result[0].towards;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },*/
    //设备表格每行点击数据更新(括号内参数顺序不能变)
    chooseDevice(array,data) {

      if (data.deviceType != null) {
        console.log("123123")
        this.id = data.id;
        this.status=data.status
        this.deviceName=data.deviceName
        this.deviceType=data.deviceType
        //this.led_is_on=data.status
        this.OperationState()
        //this.getDeviceInfo()

        this.deviceInfo = data;
        this.DeviceInfoFormate(data);
        //地图更新
        let lat = parseFloat(data.latitude);
        let lng = parseFloat(data.longitude);
        console.log(data.latitude)
        console.log(lng)
        this.createMapLarge(lat, lng);
        this.createMap(lat, lng);


        //右侧表格数据更新
        let device_id = data.id;
        this.currentDeviceID = device_id;
        this.currentDeviceName= data.deviceName;
        this.taskPageNum=1;
        this.getTaskList(this.taskPageNum, device_id, data.deviceName);

      }
    },

      /*//地图标记点更新
      let lat = parseFloat(data[0].latitude);
      let lng = parseFloat(data[0].longitude);
      this.createMap(lat, lng);


      //资产信息更新
      let device_type = 8;
      this.getDeviceInfo(device_type, device_id);

*/

    /* ---------------------------------------------------*/
    //右侧表格数据获取
    getTaskList(pageNum, deviceID, deviceName) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      //let deviceId = 1;
      let pageNo = pageNum;
      let pageSize = 10;
      getAllTask({
        token: token,
        deviceId: deviceID,
        pageNo: pageNo,
        pageSize: pageSize
      })
        .then(res => {
          console.log("=========================");
          console.log("右侧list:");
          console.log(res.data);
          this.taskTotal = res.data.total;
          const data = res.data.result;
          this.gettaskprogram(data, deviceName);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    gettaskprogram(task, deviceName) {
      let token = this.$store.state.user.token;
      let menu = [];
      for (let i in task) {
        let temp = [];
        getTaskProgramList({
          token: token,
          taskId: task[i].id
        })
          .then(res => {
            const data = res.data.result;
            console.log("<><><><><>");
            console.log(res.data);
            for (let n in data) {
              temp.push(data[n].name);
            }
            task[i]["filenamelist"] = temp;
            task[i]["defaultshow"] = temp[0];
            task[i]["name"] = task[i]["name"];
            task[i]["weekDate"] = task[i]["weekDate"];
            task[i]["duration"] = task[i]["duration"];
            task[i]["playTime"] = task[i]["playTime"];
            task[i]["deviceName"] = deviceName;
            menu.push(task[i]);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }

      this.showDatafromDB = menu;
    },

    taskNextPage(){
      if (this.taskPageNum*10>this.taskTotal){
        this.$Message.warning('已经是最后一页了');
      }else{
        this.taskPageNum++;
      }
    },
    taskLastPage(){
      if (this.taskPageNum==1){
        this.$Message.warning('已经是第一页了');
      }
      else{
        this.taskPageNum--;
      }
    },

    //设备表格每行点击数据更新(括号内参数顺序不能变)
    clickTaskRow(data, index) {
      this.showInfo = data;

      //数字日期转文字日期
      let week = "";
      let weekLetter = "";
      week = "" + data.weekDate;
      if (week.indexOf("1") != -1) {
        weekLetter = "周一,";
      }
      if (week.indexOf("2") != -1) {
        weekLetter = weekLetter + "周二,";
      }
      if (week.indexOf("3") != -1) {
        weekLetter = weekLetter + "周三,";
      }
      if (week.indexOf("4") != -1) {
        weekLetter = weekLetter + "周四,";
      }
      if (week.indexOf("5") != -1) {
        weekLetter = weekLetter + "周五,";
      }
      if (week.indexOf("6") != -1) {
        weekLetter = weekLetter + "周六,";
      }
      if (week.indexOf("7") != -1) {
        weekLetter = weekLetter + "周日,";
      }
      //去掉句末逗号
      weekLetter = weekLetter.substr(0, weekLetter.length - 1);
      this.showInfo.weekDate = weekLetter;
    },
    //表格内容删除
    remove(index, id) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      this.showDatafromDB.splice(index, 1);
      deleteshow({
        token: token,
        id: id
      });
    },
    //edit前预设定
    setData(data) {
      console.log(data);
      this.edittask.id = data.id;
      this.edittask.name = data.name;
      this.edittask.duration = data.duration;
      this.edittask.playTime = data.playTime;
      //日期格式数字转文字
      let weekDate = [];
      if (data.weekDate.indexOf("1") != -1) {
        weekDate.push("周一");
      }
      if (data.weekDate.indexOf("2") != -1) {
        weekDate.push("周二");
      }
      if (data.weekDate.indexOf("3") != -1) {
        weekDate.push("周三");
      }
      if (data.weekDate.indexOf("4") != -1) {
        weekDate.push("周四");
      }
      if (data.weekDate.indexOf("5") != -1) {
        weekDate.push("周五");
      }
      if (data.weekDate.indexOf("6") != -1) {
        weekDate.push("周六");
      }
      if (data.weekDate.indexOf("7") != -1) {
        weekDate.push("周日");
      }
      this.edittask.weekDate = weekDate;
    },
    //表格内容编辑
    editform() {
      let token = this.$store.state.user.token;
      var editdata = this.edittask;
      //获取当前时间
      var myeditDate = new Date().Format("yyyy-MM-dd HH:mm:ss");
      //时间格式&调用方法
      var playTime = new Date(editdata.playTime).Format("yyyy-MM-dd HH:mm:ss");
      //日期格式文字转数字
      var week = JSON.stringify(editdata.weekDate);
      var weekDate = "";
      if (week.indexOf("一") != -1) {
        weekDate = "1,";
      }
      if (week.indexOf("二") != -1) {
        weekDate = weekDate + "2,";
      }
      if (week.indexOf("三") != -1) {
        weekDate = weekDate + "3,";
      }
      if (week.indexOf("四") != -1) {
        weekDate = weekDate + "4,";
      }
      if (week.indexOf("五") != -1) {
        weekDate = weekDate + "5,";
      }
      if (week.indexOf("六") != -1) {
        weekDate = weekDate + "6,";
      }
      if (week.indexOf("七") != -1) {
        weekDate = weekDate + "7,";
      }
      weekDate = weekDate.substr(0, weekDate.length - 1);

      putTask({
        token: token,
        id: editdata.id,
        name: editdata.name,
        createDate: myeditDate,
        duration: editdata.duration,
        playTime: playTime,
        weekDate: weekDate
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑成功");
          this.getTaskList(1, this.currentDeviceID, this.currentDeviceName);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //表格添加任务
    submitform() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      //获取当前时间
      var myDate = new Date().Format("yyyy-MM-dd HH:mm:ss");
      //获取表格数据
      var formData = this.task;
      //更换日期格式
      var week = JSON.stringify(formData.week);
      var weekDate = "";
      if (week.indexOf("一") != -1) {
        weekDate = "1,";
      }
      if (week.indexOf("二") != -1) {
        weekDate = weekDate + "2,";
      }
      if (week.indexOf("三") != -1) {
        weekDate = weekDate + "3,";
      }
      if (week.indexOf("四") != -1) {
        weekDate = weekDate + "4,";
      }
      if (week.indexOf("五") != -1) {
        weekDate = weekDate + "5,";
      }
      if (week.indexOf("六") != -1) {
        weekDate = weekDate + "6,";
      }
      if (week.indexOf("七") != -1) {
        weekDate = weekDate + "7,";
      }
      weekDate = weekDate.substr(0, weekDate.length - 1);
      //时间格式&调用方法
      var playTime = new Date(formData.date).Format("yyyy-MM-dd HH:mm:ss");
      submitTask({
        token: token,
        device_id: this.currentDeviceID,
        device_type: "led",
        name: formData.name,
        createDate: myDate,
        duration: formData.duration,
        playTime: playTime,
        weekDate: weekDate,
        infoProgramIDList: this.programIDList,
        infoProgramList: this.uploadList
      })
        .then(res => {
          console.log("=========================");
          console.log("上传成功");
          this.getTaskList(1, this.currentDeviceID, this.currentDeviceName);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    /* ---------------------------------------------------*/
    //文件相关接口
    getHistoryProgramme() {
      let token = this.$store.state.user.token;
      getHistory({
        token: token,
        pageNo: 1,
        pageSize: 5,
        type: 2 //mp3格式
      })
        .then(res => {
          console.log("=========================");
          console.log("文件列表:");
          console.log(res.data.result);
          const data = res.data.result;
          this.setFileListData(data);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    setFileListData(dataset) {
      let menu = [];
      for (let i in dataset) {
        dataset[i]["name"] = dataset[i]["name"];
        dataset[i]["id"] = dataset[i]["id"];
        dataset[i]["size"] = dataset[i]["size"] + "KB";
        if (dataset[i]["type"] == 2) {
          dataset[i]["type"] = ".mp3";
        } else {
          dataset[i]["type"] = "error";
        }
        menu.push(dataset[i]);
      }
      this.historyUploadList = menu;
    },
    useProgramme(row) {
      var temp = new Object();
      var filelist = new Object();
      temp.listTheFile = row.name;
      this.ledfile.push(temp);

      var temp = new Object();
      filelist.name = row.name;
      filelist.size = row.size.substr(0, row.size.length - 2);
      if (row.type == ".mp3") {
        filelist.type = 2;
      }
      filelist.length = row.length;
      filelist.url = row.url;
      filelist.createDate = row.createDate;
      this.uploadList.push(filelist);
      this.ledfile.push(temp);
      this.programIDList.push(row.id);
      console.log(this.uploadList);
    },

    /* ---------------------------------------------------*/
    //下方资产信息初步提取
    getDeviceInfo() {
      console.log(this.deviceType+"mmmmmmmmmmmmmmmmmmmmm")
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      //let device_id = parseInt(deviceID);
      getassets({
        token: token,
        deviceId: this.id,
        deviceType: this.deviceType
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
    //右侧任务列表-------------------------------------------------------
    //------------------------------------------------------------------


    initData() {
      this.getDeviceList(8);

    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
//table
.ivu-card-body {
  //字体颜色
  td,
  p,
  li {
    color: black;
  }
}
ul {
  list-style: none;
}

//LED 图片格式
.device_img {
  width: 100%;
  height: 504px;
  //border: 1px solid rgb(57, 169, 233);
}
//switch 按钮位置
#switch {
  margin-top: 20px;
  margin-bottom: 16px;
}
//Lable A,B格式
#screenLable {
  background-color: #1f85de;
  color: #fff;
  text-align: center;
  font-size: 20pt;
}
</style>

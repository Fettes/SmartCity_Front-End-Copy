<template>
  <div class="device_broadcast">
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
                    <Icon type="logo-instagram"/>广播状态
                  </p>

                  <Row style="height:635px;">
                    <Row>
                      <img src="../../assets/images/broadcast.png" class="imgs">
                    </Row>
                    <Row :gutter="20" style="text-align:center;">
                      <Button type="primary">
                        <Icon type="md-chatboxes" size="16"/>对话
                      </Button>
                    </Row>
                  </Row>
                </Card>
              </i-col>

              <i-col span="16">
                <drag-drawer
                  :mask-closable="false"
                  title="新建任务"
                  class="drawerBroadcast"
                  :closable="true"
                  width="100%"
                  minWidth="400"
                  v-model="createMissionDrawer"
                  min-width="30px"
                  :inner="true"
                  :transfer="false"
                  :scrollable="true"
                >
                  <Row>
                    <i-col span="15">
                      <Form style="margin-left:20px;margin-right:20px;margin-top:10px;">
                        <p style="font-size:15px;">
                          任务名称：
                          <Input
                            suffix="md-chatboxes"
                            v-model="createForm.missionName"
                            placeholder="输入任务名称"
                            style="width: auto;"
                          />
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          开始日期：
                          <DatePicker
                            id="startDate"
                            type="date"
                            v-model="createForm.startTime"
                            format="yyyy年MM月dd日"
                            placeholder="选择开始日期"
                            style="width: auto"
                          ></DatePicker>
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          结束日期：
                          <!-- v-model="timePicker.endTime" -->
                          <DatePicker
                            id="endDate"
                            type="date"
                            v-model="createForm.endTime"
                            format="yyyy年MM月dd日"
                            placeholder="选择结束日期"
                            style="width: auto"
                          ></DatePicker>
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          播放时间：
                          <TimePicker
                            type="time"
                            v-model="createForm.playTime"
                            placeholder="选择时间"
                            style="width: auto;"
                          ></TimePicker>
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          <CheckboxGroup v-model="createForm.days">
                            <span style="font-size:15px;">播放日期：</span>
                            <Checkbox label="0">周一</Checkbox>
                            <Checkbox label="1">周二</Checkbox>
                            <Checkbox label="2">周三</Checkbox>
                            <Checkbox label="3">周四</Checkbox>
                            <Checkbox label="4">周五</Checkbox>
                            <Checkbox label="5">周六</Checkbox>
                            <Checkbox label="6">周日</Checkbox>
                          </CheckboxGroup>
                        </p>
                        <!-- 上传 -->
                        <FormItem label="上传曲目：" prop="deviceNo" style="margin-top:10px;font-size:15px;">
                          <Upload
                            multiple
                            :before-upload="handleBeforeUpload"
                            :format="['mp3','wmv']"
                            :on-format-error="handleFormatError"
                            :data="fileData"
                            action
                            :headers="headers"
                          >
                            <Button icon="ios-cloud-upload-outline">上传文件</Button>
                          </Upload>
                        </FormItem>
                        <p>
                          <tables
                            class="mission_table"
                            height="300"
                            style="margin-top:10px;"
                            ref="tables"
                            v-model="programList"
                            @on-selection-change="selectionUpdate"
                            :row-class-name="rowClassName"
                            :columns="create_colums"
                          />
                        </p>
                      </Form>
                    </i-col>
                    <i-col span="9">
                      <p style="margin-top:10px;font-size:15px;margin-right:20px">
                        选择设备：
                        <tables
                          height="520"
                          style="margin-top:10px;"
                          ref="tables"
                          v-model="deviceList"
                          class="device_table"
                          @on-selection-change="deviceSelectionUpdate"
                          :row-class-name="rowClassName"
                          :columns="device_column"
                        />
                      </p>
                        <div class="demo-drawer-footer" style="margin-right:20px;float:right;margin-top:10px;">
                          <Button style="margin-right: 8px" @click="createMissionDrawer = false">取消</Button>
                          <Button style="margin-right: 8px" type="primary" @click="beforeUpload()">确定</Button>
                        </div>
                    </i-col>
                  </Row>
                </drag-drawer>

                <drag-drawer
                  :mask-closable="false"
                  title="编辑任务"
                  class="drawerBroadcast"
                  :closable="true"
                  width="100%"
                  v-model="editMissionDrawer"
                  min-width="30px"
                  :inner="true"
                  :transfer="false"
                  :scrollable="true"
                >
                  <Row>
                    <i-col span="15">
                      <Form style="margin-left:20px;margin-right:20px;margin-top:10px;">
                        <p style="font-size:15px;">
                          任务名称：
                          <Input
                            suffix="md-chatboxes"
                            v-model="editForm.missionName"
                            placeholder="输入任务名称"
                            style="width: auto;"
                          />
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          开始日期：
                          <DatePicker
                            id="startDate"
                            type="date"
                            v-model="editForm.startTime"
                            format="yyyy年MM月dd日"
                            placeholder="选择开始日期"
                            style="width: auto"
                          ></DatePicker>
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          结束日期：
                          <!-- v-model="timePicker.endTime" -->
                          <DatePicker
                            id="endDate"
                            type="date"
                            v-model="editForm.endTime"
                            format="yyyy年MM月dd日"
                            placeholder="选择结束日期"
                            style="width: auto"
                          ></DatePicker>
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          播放时间：
                          <TimePicker
                            type="time"
                            v-model="editForm.playTime"
                            placeholder="选择时间"
                            style="width: auto;"
                          ></TimePicker>
                        </p>
                        <p style="margin-top:10px;font-size:15px;">
                          <CheckboxGroup v-model="editForm.days">
                            <span style="font-size:15px;">播放日期：</span>
                            <Checkbox label="0">周一</Checkbox>
                            <Checkbox label="1">周二</Checkbox>
                            <Checkbox label="2">周三</Checkbox>
                            <Checkbox label="3">周四</Checkbox>
                            <Checkbox label="4">周五</Checkbox>
                            <Checkbox label="5">周六</Checkbox>
                            <Checkbox label="6">周日</Checkbox>
                          </CheckboxGroup>
                        </p>
                        <!-- 上传 -->
                        <FormItem label="上传曲目：" prop="deviceNo" style="margin-top:10px;font-size:15px;">
                          <Upload
                            multiple
                            :before-upload="handleBeforeUpload"
                            :format="['mp3','wmv']"
                            :on-format-error="handleFormatError"
                            :data="fileData"
                            action
                            :headers="headers"
                          >
                            <Button icon="ios-cloud-upload-outline">上传文件</Button>
                          </Upload>
                        </FormItem>
                        <p>
                          <tables
                            class="mission_table"
                            height="300"
                            style="margin-top:10px;"
                            ref="tables"
                            v-model="programList"
                            @on-selection-change="selectionUpdate"
                            :row-class-name="rowClassName"
                            :columns="create_colums"
                          />
                        </p>
                      </Form>
                    </i-col>
                    <i-col span="9">
                      <p style="margin-top:10px;font-size:15px;margin-right:20px">
                        选择设备：
                        <tables
                          height="520"
                          style="margin-top:10px;"
                          ref="tables"
                          class="device_table"
                          v-model="deviceList"
                          @on-selection-change="deviceSelectionUpdate"
                          :row-class-name="rowClassName"
                          :columns="device_column"
                        />
                      </p>
                        <div class="demo-drawer-footer" style="margin-right:20px;float:right;margin-top:10px;">
                          <Button style="margin-right: 8px" @click="editMissionDrawer = false">取消</Button>
                          <Button style="margin-right: 8px" type="primary" @click="beforeEditSubmit()">确定</Button>
                        </div>
                    </i-col>
                  </Row>
                </drag-drawer>

                <Card shadow class="paddingCardRightMiddleUpdate">
                  <p slot="title">
                    <Icon type="ios-pie"/>数据分析
                  </p>
                  <Row>
                    <i-col span="2" style="text-align:center;color:black;">播放时间</i-col>
                    <i-col span="22">
                      <div id="boxPlot" style="height:145px;width:100%;"></div>
                    </i-col>
                  </Row>

                  <Row>
                    <i-col span="2" style="text-align:center;color:black;">播放日期</i-col>
                    <i-col span="22">
                      <tables
                        class="percentage_table"
                        style="margin-bottom:5px;padding-right:10px;"
                        :show-header="false"
                        v-model="date_data"
                        :row-class-name="rowClassName"
                        :columns="date_columns"
                      />
                      <tables
                        class="percentage_table"
                        style="margin-bottom:10px;padding-right:10px;"
                        :show-header="false"
                        v-model="weekday_data"
                        :row-class-name="rowClassName"
                        :columns="weekday_columns"
                      />
                    </i-col>
                  </Row>
                </Card>

                <Row style="margin-top:10px;">
                  <!-- 任务列表
                  -->
                  <i-col span="11" style="padding-right:10px;">
                    <Modal v-model="clearMission" title="确定要清空任务列表吗" @on-ok="ok" @on-cancel="cancel">
                      <p>这会清除该任务，任务内容将不可恢复。</p>
                    </Modal>

                    <Card shadow class="paddingCardRightMiddleUpdate">
                      <p slot="title">
                        <Icon type="md-bookmarks"/>任务列表
                        <Icon
                          type="ios-trash"
                          style="float:right"
                          size="24"
                          @click="clearMission = true"
                        />
                        <Icon type="md-options" style="float:right" size="24" @click="beforeEditMission()"/>
                        <Icon type="md-add" style="float:right" size="24" @click="createMission()"/>
                      </p>
                      <div class="mission_table" style="height:375px;">
                        <tables
                          highlight-row
                          ref="tables"
                          v-model="dt_taskList"
                          :row-class-name="rowClassName"
                          :columns="col_taskList"
                          @on-current-change="chooseTask"
                        />
                        <br>
                        <Row style="text-align:center;">
                          <i-col span="4" offset="6">
                            <Button
                              class="search-btn"
                              type="primary"
                              size="small"
                              @click="pageListLast()"
                            >上一页</Button>
                          </i-col>
                          <i-col span="4" offset="4">
                            <Button
                              class="search-btn"
                              type="primary"
                              size="small"
                              @click="pageListNext()"
                            >下一页</Button>
                          </i-col>
                        </Row>
                      </div>
                    </Card>
                  </i-col>

                  <i-col span="13">
                    <drag-drawer
                      title="使用已有任务"
                      class="drawerBroadcast"
                      :closable="true"
                      width="100%"
                      v-model="addMissionDrawer"
                      min-width="30px"
                      :inner="true"
                      :transfer="false"
                      :scrollable="true"
                    >
                      <!-- <p :style="title">任务清单</p> -->
                      <div>
                        <!-- 已有任务 -->
                        <div>
                          <Button
                            class="search-btn"
                            @click="addMissionDrawer=false;createMissionDrawer=true;"
                            type="primary"
                            size="large"
                            style="margin:5px;"
                          >
                            <Icon type="md-add"/>新任务
                          </Button>
                          <Table
                            class="mission_table"
                            :row-class-name="rowClassName"
                            style="margin-top:10px;"
                            ref="tables"
                            :columns="drawer_columns"
                            :data="drawer_table"
                          ></Table>
                        </div>
                      </div>
                      <div class="demo-drawer-footer" style="float:right;margin-top:5px;">
                        <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                        <Button style="margin-right: 8px" type="primary" @click="value3 = false">确定</Button>
                      </div>
                    </drag-drawer>

                    <Card shadow class="paddingCardRightMiddleUpdate">
                      <p slot="title">
                        <Icon type="md-alarm"></Icon>节目列表
                      </p>
                      <div style="height:375px;">
                        <!-- 卡片 -->
                        <Row>
                          <i-col
                            span="8"
                            v-for="(infor, i) in inforCardData2"
                            :key="`infor-${i}`"
                            style="height: 50px;"
                          >
                            <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="22">
                              <p>{{ infor.name }}</p>
                              <p>{{ infor.title }}</p>
                            </infor-card>
                          </i-col>
                          <i-col
                            span="8"
                            v-for="(infor2, i) in inforCardData"
                            :key="`infor2-${i}`"
                            style="height: 50px;"
                          >
                            <infor-card
                              shadow
                              :color="infor2.color"
                              :icon="infor2.icon"
                              :icon-size="22"
                            >
                              <count-to :end="infor2.count" count-class="count-style"/>
                              <p>{{ infor2.title }}</p>
                            </infor-card>
                          </i-col>
                        </Row>

                        <!-- 定时任务table -->
                        <Row>
                          <div class="mission_table">
                            <tables
                              height="309"
                              highlight-row
                              ref="tables"
                              v-model="dt_missionlist"
                              :row-class-name="rowClassName"
                              :columns="col_missionlist"
                            />
                          </div>
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

        <!-- 删除灯杆 -->
        <Modal v-model="deleteProgramModal" title="删除节目" @on-ok="deleteProgramOk()" @on-cancel="deleteProgramModal=false;">
          <p>确认删除此节目吗？此操作不可恢复。</p>
        </Modal>

      </Content>
    </Layout>
  </div>
</template>
<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar, ChartBoxplot } from "_c/charts"; // ChartPie,
import Tables from "_c/tables";
// import Example from '../single-page/home/example.vue'
import mapboxgl from "mapbox-gl";
import Notice from "iview";
import echarts from "echarts";
import DragDrawer from "_c/drag-drawer";
import {
  getAllBroadcastDevices,
  getDeviceInfo,
  getProgram,
  deleteTask,
  getAllTasks,
  addNewTask,
  getTasksById,
  getProgramList,
  updateBroadcastTask,
  delProgram,
  getDevicesList
} from "@/api/broadcast";
const axios = require("axios");

export default {
  name: "device_boradcast",
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    ChartBoxplot,
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

      //弹窗
      addMissionDrawer: false,
      clearMission: false,
      createMissionDrawer: false,
      editMissionDrawer: false,
      deleteProgramModal: false,

      currentDeviceId: 1,
      currentTaskId: 1,
      currentTask:{},

      programTotal:0,
      deleteProgramName:0,
      taskPageNum: 1,

      //添加&编辑任务
      programList: [],
      deviceList: [],
      selectedProgram:[],
      selectedDevice:[],

      createForm: {
        days:[],
        startTime: "2019-01-01",
        endTime: "2019-12-30",
        playTime: "12:00:00"
      },
      
      editForm: {
        days:[],
        startTime: "",
        endTime: "",
        playTime: ""
      },

      // fileData
      fileData: { length: 0.0, type: "", fileName: "", size: 0.0 },
      uploadList: [],

      // header
      headers: {
        Authorization: this.$store.state.user.token,
        "Content-Type": "multipart/form-data"
      },

      weekday_columns: [
        { title: "Sunday", key: "Sunday" },
        { title: "Monday", key: "Monday" },
        { title: "Tuesday", key: "Tuesday" },
        { title: "Wednesday", key: "Wednesday" },
        { title: "Thursday", key: "Thursday" },
        { title: "Friday", key: "Friday" },
        { title: "Saturday", key: "Saturday" }
      ],
      weekday_data: [
        {
          Sunday: "周日",
          Monday: "周一",
          Tuesday: "周二",
          Wednesday: "周三",
          Thursday: "周四",
          Friday: "周五",
          Saturday: "周六",
          cellClassName: {
            Monday: "cell-highlight",
            Tuesday: "cell-highlight"
          }
        }
      ],
      weekday_dataFake: [
        {
          Monday: "cell-highlight",
          Tuesday: "cell-highlight"
        },
        {
          Wednesday: "cell-highlight",
          Tuesday: "cell-highlight",
          Thursday: "cell-highlight"
        },
        {
          Thursday: "cell-highlight",
          Friday: "cell-highlight"
        },
        {
          Sunday: "cell-highlight",
          Saturday: "cell-highlight"
        }
      ],
      date_columns: [
        { title: "1", key: "1" },
        { title: "2", key: "2" },
        { title: "3", key: "3" },
        { title: "4", key: "4" },
        { title: "5", key: "5" },
        { title: "6", key: "6" },
        { title: "7", key: "7" },
        { title: "8", key: "8" },
        { title: "9", key: "9" },
        { title: "10", key: "10" },
        { title: "11", key: "11" },
        { title: "12", key: "12" },
        { title: "13", key: "13" },
        { title: "14", key: "14" },
        { title: "15", key: "15" },
        { title: "16", key: "16" },
        { title: "17", key: "17" },
        { title: "18", key: "18" },
        { title: "19", key: "19" },
        { title: "20", key: "20" },
        { title: "21", key: "21" },
        { title: "22", key: "22" },
        { title: "23", key: "23" },
        { title: "24", key: "24" }
      ],
      date_data: [
        {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          13: "13",
          14: "14",
          15: "15",
          16: "16",
          17: "17",
          18: "18",
          19: "19",
          20: "20",
          21: "21",
          22: "22",
          23: "23",
          24: "24",
          cellClassName: {
            6: "cell-highlight",
            11: "cell-highlight"
          }
        }
      ],
      date_dataFake: [
        {
          6: "cell-highlight",
          11: "cell-highlight"
        },
        {
          12: "cell-highlight",
          13: "cell-highlight",
          14: "cell-highlight",
          15: "cell-highlight"
        },
        {
          18: "cell-highlight",
          19: "cell-highlight"
        },
        {
          22: "cell-highlight",
          23: "cell-highlight",
          10: "cell-highlight",
          11: "cell-highlight"
        }
      ],
      device_column: [
        { type: "selection", width: 50 },
        { title: "全选", key: "name", minWidth:120},
      ],
      create_colums: [
        { type: "selection", width: 50 },
        { title: "节目名称", key: "name", minWidth:80},
        { title: "播放时长", key: "length", minWidth:80},
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
                    type: "error"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteProgramName=params.row.name;
                      this.deleteProgramModal=true;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      create_data: [
        {
          id: "1",
          play_source: "奇妙能力歌",
          play_inOrder: "3:10:20"
        },
        {
          id: "2",
          play_source: "奇妙能力歌",
          play_inOrder: "3:10:20"
        }
      ],
      drawer_columns: [
        { title: "序号", key: "Id", width: 60 },
        { title: "任务名称", key: "taskname", align: "center" },
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
                      this.handleEditItem(params.index);
                    }
                  }
                },
                "使用"
              )
            ]);
          }
        }
      ],
      drawer_table: [
        {
          Id: "1",
          taskname: "Test 01"
        },
        {
          Id: "2",
          taskname: "Test 02"
        },
        {
          Id: "3",
          taskname: "Test 03"
        },
        {
          Id: "4",
          taskname: "Test 04"
        },
        {
          Id: "5",
          taskname: "Test 05"
        },
        {
          Id: "6",
          taskname: "Test 06"
        }
      ],
      col_missionlist: [
        // initRowIndex
        { title: "序号", key: "index" , minWidth:40},
        { title: "播放源", key: "files" , minWidth:80},
        { title: "播放时长", key: "filetimes" , minWidth:65},
        { title: "已选择设备", key: "targets" , minWidth:60}
      ],
      dt_missionlist: [
        // {
        //   id: '1',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '一号灯杆'
        // },
        // {
        //   id: '2',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '一号灯杆'
        // },
        // {
        //   id: '3',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '二号灯杆'
        // },
        // {
        //   id: '4',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '三号灯杆'
        // },
        // {
        //   id: '5',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '四号灯杆'
        // },
        // {
        //   id: '6',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '五号灯杆'
        // },
        // {
        //   id: '7',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '六号灯杆'
        // },
        // {
        //   id: '8',
        //   play_source: '奇妙能力歌',
        //   play_inOrder: '3:10:20',
        //   play_device: '七号灯杆'
        // }
      ],
      col_taskList: [
        { title: "任务名称", key: "name" ,minWidth:60},
        { title: "任务类型", key: "type" ,minWidth:65},
        { title: "开始时间", key: "sTime" ,minWidth:80},
        { title: "结束时间", key: "eTime" ,minWidth:80}
      ],
      dt_taskList: [],
      inforCardData: [
        {
          title: "任务序号",
          icon: "md-pin",
          count: 2,
          color: "#2d8cf0"
        },
        {
          title: "播放曲目数",
          icon: "md-musical-notes",
          count: 12,
          color: "#19be6b"
        }
      ],
      inforCardData2: [
        {
          title: "任务名称",
          icon: "md-share",
          name: "Test 01",
          color: "#ff9900"
        }
      ],
      showDrawerMap: false,
      showtimechoose: false,
      formData: {
        startdate: "",
        starttime: "",
        enddate: "",
        endtime: ""
      },
      dt_deviceTable: [],
      deviceInfo: {},
      runningInfoList: {
        name: "爱尔视雷达",
        status: "正常运行",
        serial_num: "151021001121",
        type: "雷达巴拉",
        power: "40KW",
        speed: "2秒每次"
      },
      boxplotData: [
        { value: [24, 30, 12, 35], name: "0:00" },
        { value: [40, 35, 30, 55] },
        { value: [60, 33, 38, 33, 40], name: "2:00" },
        { value: [40, 40, 32, 42], name: "3:00" },
        { value: [20, 30, 10, 35], name: "4:00" },
        { value: [40, 35, 30, 55], name: "5:00" },
        { value: [33, 38, 33, 40], name: "6:00" },
        { value: [30, 10, 33, 38], name: "7:00" },
        { value: [12, 24, 12, 30], name: "8:00" },
        { value: [14, 32, 18, 30], name: "9:00" },
        { value: [33, 35, 30, 32], name: "10:00" },
        { value: [40, 35, 30, 55], name: "11:00" },
        { value: [33, 38, 33, 40], name: "12:00" }
      ],
      boxplotDataFake: [
        [
          { value: [24, 30, 12, 35], name: "0:00" },
          { value: [40, 35, 30, 55] },
          { value: [60, 33, 38, 33, 40], name: "2:00" },
          { value: [40, 40, 32, 42], name: "3:00" },
          { value: [20, 30, 10, 35], name: "4:00" },
          { value: [40, 35, 30, 55], name: "5:00" },
          { value: [33, 38, 33, 40], name: "6:00" },
          { value: [30, 10, 33, 38], name: "7:00" },
          { value: [12, 24, 12, 30], name: "8:00" },
          { value: [14, 32, 18, 30], name: "9:00" },
          { value: [33, 35, 30, 32], name: "10:00" },
          { value: [40, 35, 30, 55], name: "11:00" },
          { value: [33, 38, 33, 40], name: "12:00" }
        ],
        [
          { value: [33, 30, 30, 35], name: "0:00" },
          { value: [30, 24, 22, 20] },
          { value: [12, 9, 14, 20], name: "2:00" },
          { value: [40, 40, 42, 42], name: "3:00" },
          { value: [24, 32, 20, 37], name: "4:00" },
          { value: [23, 24, 26, 30], name: "5:00" },
          { value: [20, 24, 28, 32], name: "6:00" },
          { value: [20, 40, 42, 42], name: "7:00" },
          { value: [40, 35, 30, 55], name: "8:00" },
          { value: [33, 38, 33, 40], name: "9:00" },
          { value: [40, 20, 32, 42], name: "10:00" },
          { value: [40, 35, 30, 25], name: "11:00" },
          { value: [43, 28, 33, 40], name: "12:00" }
        ],
        [
          { value: [12, 20, 24, 30], name: "0:00" },
          { value: [20, 24, 25, 55] },
          { value: [33, 38, 33, 40], name: "2:00" },
          { value: [40, 40, 32, 42], name: "3:00" },
          { value: [20, 28, 10, 32], name: "4:00" },
          { value: [10, 14, 16, 20], name: "5:00" },
          { value: [30, 33, 33, 40], name: "6:00" },
          { value: [40, 40, 32, 42], name: "7:00" },
          { value: [40, 35, 30, 55], name: "8:00" },
          { value: [33, 38, 33, 40], name: "9:00" },
          { value: [40, 40, 32, 42], name: "10:00" },
          { value: [30, 34, 32, 51], name: "11:00" },
          { value: [30, 32, 39, 27], name: "12:00" }
        ],
        [
          { value: [20, 30, 10, 35], name: "0:00" },
          { value: [40, 35, 30, 55] },
          { value: [20, 33, 38, 33, 40], name: "2:00" },
          { value: [40, 40, 32, 42], name: "3:00" },
          { value: [20, 30, 10, 35], name: "4:00" },
          { value: [40, 35, 30, 55], name: "5:00" },
          { value: [33, 38, 33, 40], name: "6:00" },
          { value: [33, 33, 22, 44], name: "7:00" },
          { value: [40, 35, 30, 55], name: "8:00" },
          { value: [33, 38, 33, 40], name: "9:00" },
          { value: [29, 23, 27, 19], name: "10:00" },
          { value: [39, 36, 33, 29], name: "11:00" },
          { value: [12, 14, 17, 20], name: "12:00" }
        ]
      ],
      list1: [
        {
          status: 1,
          lamppost: "1003",
          name: "雷达",
          problem: "不通电",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 1,
          lamppost: "1004",
          name: "雷达",
          problem: "不通电",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 2,
          lamppost: "1009",
          name: "雷达",
          problem: "不在线",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 0,
          lamppost: "1010",
          name: "雷达",
          problem: "不正常",
          datetime: "2018-12-12 09:12:12"
        },
        {
          status: 0,
          lamppost: "1010",
          name: "雷达",
          problem: "不正常",
          datetime: "2018-12-12 09:12:12"
        }
      ]
    };
  },
  methods: {
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
    ok() {
      this.deleteChoosenTask();
    },
    cancel() {
      this.$Message.info("已取消");
    },
    //盒箱图
    boxPlot(id) {
      this.charts = echarts.init(document.getElementById(id), "macarons");
      this.charts.setOption({
        title: {
          x: "center"
        },
        grid: {
          top: "5%",
          left: "0%",
          right: "0%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: this.boxplotData.map(_ => _.name),
          axisLine: false,
          axisLabel: {
            color: "black"
          },
          position: "top"
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: "k",
            data: this.boxplotData
          }
        ]
      });
    }, //地数数据获取函数
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
      console.log("-------------------------")
      console.log(this.concentratorLocatoin);
    },
    createMapLarge(lat,lng) {
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
      getAllBroadcastDevices({
        token: token,
        deviceType: 9
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
        let lat = parseFloat(current[0].latitude);
        let lng = parseFloat(current[0].longitude);
        console.log(lat)
        console.log(lng)
        this.createMapLarge(lat,lng)
        // //资产信息
        this.deviceInfo = current[0];
        this.DeviceInfoFormate(this.deviceInfo);
      }
    },

    //中间任务列表----------------------------------------------------------
    getTaskList(pageNum) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      let pageNo = pageNum;
      let pageSize = 7;
      getAllTasks({
        token: token,
        pageNo: pageNo,
        pageSize: pageSize
      })
        .then(res => {
          console.log("=========================");
          console.log("任务列表:");
          console.log(res.data.result);
          //初始化
          if (res.data.result.length == 0) {
            //尾页处理
            this.$Message.info("已经是最后一页了");
            this.taskPageNum--;
          } else {
            this.dt_taskList = res.data.result;
            this.currentTask = this.dt_taskList[0];
            this.currentTaskId = this.dt_taskList[0]["id"];
            this.getTaskContent(this.currentTaskId);
            for (let i = 0; i < res.data.result.length; i++) {
              this.dt_taskList[i]["type"] = "定时广播";
              let description = this.dt_taskList[i]["description"].split("|");
              this.dt_taskList[i]["sTime"] = description[2];
              this.dt_taskList[i]["eTime"] = description[3];
              this.dt_taskList[i]["index"] = 7 * (this.taskPageNum - 1) + i + 1;
            }
            //选中第一个
            this.dt_taskList[0]["_highlight"] = true;
          }
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //点击设备后更新页面信息
    chooseTask(currentRow, oldCurrentRow) {
      this.currentTask = currentRow;
      this.currentTaskId = currentRow.id;
      // 任务内容
      this.getTaskContent(this.currentTaskId);
      this.inforCardData[0].count = currentRow.index;
      //以下假数据
      this.boxplotData = this.boxplotDataFake[currentRow.index - 1];
      this.$nextTick(function() {
        this.boxPlot("boxPlot");
      });
      this.weekday_data[0].cellClassName = this.weekday_dataFake[
        currentRow.index - 1
      ];
      this.date_data[0].cellClassName = this.date_dataFake[
        currentRow.index - 1
      ];
    },

    //翻页-上一页
    pageListLast() {
      console.log(this.taskPageNum);
      if (this.taskPageNum == 1) {
        this.$Message.info("已经是第一页了");
      } else {
        this.taskPageNum--;
        this.getTaskList(this.taskPageNum);
      }
    },
    //翻页-下一页
    pageListNext() {
      //if (this.taskPageNum*7<this.taskPageLength){
      this.taskPageNum++;
      this.getTaskList(this.taskPageNum);
      // }else{
      //   this.$Message.info('已经是最后一页了');
      // }
      console.log(this.taskPageNum);
    },

    //节目列表----------------------------------------------------------
    getTaskContent(Id) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      console.log(Id);
      getTasksById({
        token: token,
        taskId: Id
      })
        .then(res => {
          console.log("=========================");
          console.log("节目列表:");
          console.log(res.data.result);
          //初始化
          this.inforCardData2[0].name = res.data.result.name;
          this.dt_missionlist = [];
          let files = res.data.result.commands[0].files.split("<");
          let period = res.data.result.commands[0].filetimes.split("<");
          for (let i = 0; i < files.length - 1; i++) {
            var newMission = new Object();
            let fileName = files[i].split("//");
            newMission.files = fileName[1];
            newMission.filetimes = period[i];
            newMission.targets = res.data.result.commands[0].targets
              .split("<")
              .join(",");
            newMission.targets = newMission.targets.substring(
              0,
              newMission.targets.length - 1
            );
            newMission.index = i + 1;
            this.dt_missionlist.push(newMission);
          }
          this.inforCardData[1].count = files.length - 1;
        })
        .catch(err => {
          this.$Message.warning('获取节目信息失败');
          console.log("===========error==============");
          console.log(err);
        });
    },

    //删----------------------------------------------------------------
    deleteChoosenTask() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteTask({
        token: token,
        taskId: this.currentTaskId
      })
        .then(res => {
          this.$Message.info("已清除任务");
          this.getTaskList(this.taskPageNum);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },


    //新建任务----------------------------------------------------------
    //-----------------------------------------------------------------
    createMission() {
      //清空抽屉
      let temp = new Date().Format("yyyy-MM-dd");
      this.createForm.endTime = temp.substring(0, temp.length - 6) + "-12-30";
      this.createForm.startTime = temp.substring(0, temp.length - 6) + "-01-01";
      this.createForm.playTime = "12:00:00";
      //this.createForm.days = [];
      this.createForm.missionName = "";
      this.selectedProgram = [];
      this.selectedDevice = [];
      this.getProgramList();
      this.getDevicesList()
      this.createMissionDrawer = true;
    },

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
        let minutes = Math.floor(d / 60);
        let second = Math.floor(d - minutes * 60);
        that.fileData.length = minutes + ":" + second;
        that.upload(file, url);
      });
    },
    //文件上传
    //重写upload方法
    upload(file, url) {
      let token = this.$store.state.user.token;
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
      // var filelist = new Object();
      // var temp = new Object();
      // (filelist.name = this.fileData.fileName),
      //   (temp.listTheFile = this.fileData.fileName),
      //   (filelist.size = this.fileData.size),
      //   (filelist.type = this.fileData.type),
      //   (filelist.length = this.fileData.length),
      //   (filelist.url = url),
      //   (filelist.createDate = myDate),
      //   this.uploadList.push(filelist);
      this.$Message.success("已上传，请稍等");
      this.uploadFile(this.headers, formData);
      console.log(this.uploadList);
    },

    // uploadFile
    uploadFile(headers, formData) {
      let that = this;
      axios
        .post(
          "http://qsiotsys.com/api/smart-city/info-publish/broadcast/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.$store.state.user.token
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
          that.$Message.success("上传成功");
          //刷新列表
          that.getProgramList();
        })
        .catch(function() {
          console.log("FAILURE!!");
          that.$Message.info("上传失败");
        });
    },
    //格式检查
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " + file.name + " is incorrect, please select mp3."
      });
    },
    //删除文件按钮
    // remove(index) {
    //   this.uploadList.splice(index, 1);
    //   this.$Message.info("已删除");
    // },
    //Validation-添加任务
    beforeUpload() {
      if (this.selectedDevice.length==0){
        this.$Message.error("请选择设备！");
      }else if (this.selectedProgram.length==0){
        this.$Message.error("请选择节目！");
      }else if(this.createForm.missionName == ""){
        this.$Message.error("请填写任务名称！");
      }else if(this.createForm.startTime == ""){
        this.$Message.error("请选择开始日期！");
      }else if(this.createForm.endTime == ""){
        this.$Message.error("请选择结束日期！");
      }else if(this.createForm.playTime == ""){
        this.$Message.error("请选择播放时间！");
      }else if(this.createForm.days == []){
        this.$Message.error("请选择播放日期！");
      }else {
        this.uploadNewMission();
      }
    },

    //添加任务
    uploadNewMission() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      let scheduletype = "1";
      let weekdays = "";
      for (let i = 0; i < this.createForm.days.length; i++) {
        weekdays = weekdays + this.createForm.days[i] + "<";
      }
      if (weekdays == "1<2<3<4<5<6<7<") {
        scheduletype = "0";
        weekdays = "";
      }
      let files = "";
      for (let i in this.selectedProgram) {
        files = files + "//" + this.selectedProgram[i].name + "<";
      }
      let targets = "";
      for (let i in this.selectedDevice) {
        targets = targets + this.selectedDevice[i].tid + "<";
      } 
      addNewTask({
        token: token,
        "jsondata[taskname]": this.createForm.missionName,
        "jsondata[triggers]": [
          {
            startdate: this.createForm.startTime,
            enddate: this.createForm.endTime,
            starttime: this.createForm.playTime.split(":").join("-"),
            scheduletype: scheduletype,
            weekdays: weekdays
          }
        ],
        "jsondata[commands]": [
          {
            targets: targets,
            files: files,
            type: "3",
          }
        ]
      })
        .then(res => {
          this.$Message.success("任务创建成功");
          console.log("=========================");
          console.log("上传新任务:");
          console.log(res.data);
          this.getTaskList(this.taskPageNum);
          this.createMissionDrawer = false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //查询所有节目列表
    getProgramList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getProgramList({
        token: token,
        pageNo: 1,
        pageSize: 100,
      })
        .then(res => {
          console.log("=========================");
          console.log("所有节目列表:");
          console.log(res.data);
          this.programList=res.data.result;
          this.programTotal=Number(res.data.total);
        })
        .catch(err => {
          this.$Message.warning('获取节目列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },

    //抽屉-设备列表
    getDevicesList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getDevicesList({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("所有设备列表:");
          console.log(res.data);
          this.deviceList=res.data.result;
        })
        .catch(err => {
          this.deviceList=[];
          this.$Message.warning('获取设备列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },

    //删除节目
    deleteProgramOk(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      delProgram({
        token: token,
        name: this.deleteProgramName,
      })
        .then(res => {
          console.log("=========================");
          console.log("删除节目:");
          this.$Message.success('删除成功');
          console.log(res.data);
          //刷新
          this.getProgramList();
        })
        .catch(err => {
          this.$Message.warning('删除失败');
          console.log("===========error==============");
          console.log(err);
        });
    },

    deviceSelectionUpdate(selection){
      this.selectedDevice = selection;
    },

    selectionUpdate(selection){
      this.selectedProgram = selection;
    },

    //编辑任务--------------------------------------------------------
    //---------------------------------------------------------------
    //编辑任务-初始化抽屉表单内容
    beforeEditMission(){
      this.editForm.missionName = this.currentTask.name;
      this.editForm.taskId = this.currentTask.id;
      let description = this.currentTask.description.split("|");
      this.editForm.startTime = description[2];
      this.editForm.endTime = description[3];
      this.editForm.playTime = description[4];
      //星期
      this.editForm.days=[];
      if (description[5] == ""){
        this.editForm.days = [];
      }else {
        this.editForm.days = description[5].substring(0,description[5].length-1).split("<");
      }
      //console.log(this.editForm.days);
      //上传列表
      // this.uploadList = [];
      // this.uploadList = this.dt_missionlist;
      // for (let i in this.uploadList){
      //   this.uploadList[i].name = this.uploadList[i].files;
      //   this.uploadList[i].length = this.uploadList[i].filetimes;
      // }
      this.selectedProgram = [];
      this.selectedDevice = [];
      this.getProgramList();
      this.getDevicesList()
      this.editMissionDrawer = true;
    },

    //Validation-编辑任务
    beforeEditSubmit(){
      if (this.selectedDevice.length==0){
        this.$Message.error("请选择设备！");
      }else if (this.selectedProgram.length==0){
        this.$Message.error("请选择节目！");
      }else if(this.editForm.missionName == ""){
        this.$Message.error("请填写任务名称！");
      }else if(this.editForm.startTime == ""){
        this.$Message.error("请选择开始日期！");
      }else if(this.editForm.endTime == ""){
        this.$Message.error("请选择结束日期！");
      }else if(this.editForm.playTime == ""){
        this.$Message.error("请选择播放时间！");
      }else if(this.editForm.days == []){
        this.$Message.error("请选择播放日期！");
      }else {
        this.editSubmit();
      }
    },

    //提交编辑结果
    editSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      let scheduletype = "1";
      let weekdays = "";
      for (let i = 0; i < this.editForm.days.length; i++) {
        weekdays = weekdays + this.editForm.days[i] + "<";
      }
      if (weekdays == "1<2<3<4<5<6<7<") {
        scheduletype = "0";
        weekdays = "";
      }
      let files = "";
      for (let i in this.selectedProgram) {
        files = files + "//" + this.selectedProgram[i].name + "<";
      }
      let targets = "";
      for (let i in this.selectedDevice) {
        targets = targets + this.selectedDevice[i].tid + "<";
      } 
      updateBroadcastTask({
        token: token,
        "jsondata[taskId]": this.editForm.taskId,
        "jsondata[taskname]": this.editForm.missionName,
        "jsondata[triggers]": [
          {
            startdate: this.editForm.startTime,
            enddate: this.editForm.endTime,
            starttime: this.editForm.playTime.split(":").join("-"),
            scheduletype: scheduletype,
            weekdays: weekdays
          }
        ],
        "jsondata[commands]": [
          {
            targets: targets,
            files: files,
            filetimes: "60",
            type: "3",
            talksourceid: "0",
            talktargetid: "3"
          }
        ]
      })
        .then(res => {
          this.$Message.success("任务修改成功");
          console.log("=========================");
          console.log("编辑任务提交:");
          console.log(res.data);
          this.getTaskList(this.taskPageNum);
          this.editMissionDrawer = false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //设备资产信息----------------------------------------------------------
    //---------------------------------------------------------------------
    getDeviceInfo(deviceId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getDeviceInfo({
        token: token,
        deviceId: deviceId,
        deviceType: 9
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

    //页面初始化
    initData() {
      this.$nextTick(function() {
        this.boxPlot("boxPlot");
      });
      this.getDeviceList();
      this.taskPageNum = 1;
      this.getTaskList(this.taskPageNum);
      window.onresize = () => {
        let boxPlot = echarts.getInstanceByDom(document.getElementById('boxPlot'));
        boxPlot.resize();
      };
    }
  },
  mounted() {
    this.initData();

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
//上传框

.imgs {
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  width: 80%;
  height: 557px;
  float: right;
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
.ivu-layout-content {
  background-color: transparent !important;
}
.deviceinfo li span {
  margin-right: 20px;
}
.coordinates {
  background: rgba(0, 0, 0, 0.5);
  //color: #fff;
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

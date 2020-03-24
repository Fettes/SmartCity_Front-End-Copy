<template>
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
          <Row style="font-size:14px;">
            <span style="margin-left:5px;">
              <Button class="manage-btn" type="primary" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="beforeNewMission()"><Icon type="md-add" size="20"/>创建任务</Button>
            </span>
          </Row>
          <br>
          <Row class="user-table-row">
            <Table class="userTable" border ref="selection" :columns="tablecolumns" :data="tabledata" style="margin-left:5px;margin-right:5px;"></Table>
          </Row>
          <br>
          <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
            <Page ref="pager" id="pager" :total="totalNum" :current="pageNum" @on-change="turnPage" :page-size="tableSize" show-total show-elevator/>
          </Row>
        </Row>
      </Row>
    </Content>


    <!-- 新建任务弹窗 -->
    <Modal v-model="newMission" footer-hide width="1000px" :mask-closable="false" class="mission-modal">
      <Row style="padding-left:20px;padding-right:20px">
        <i-col span="12" style="padding-right:20px">
          <p style="font-size:20px;">任务信息 <Icon type="md-arrow-dropdown" /></p>
          <hr>
          <br>
          <div id="task_info_div">
            <Form ref="task_info" :model="task_info" :rules="taskRule">
              <FormItem label="任务名称" prop="name">
                <Input v-model="task_info.name" placeholder="请输入任务名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="播放时长" prop="duration">
                <Input v-model="task_info.duration" placeholder="请输入播放时长" style="width: 300px"/>
              </FormItem>
              <FormItem label="任务类型" prop="isInstant">
                <Select v-model="task_info.isInstant" @on-change="isInstantChange()" placeholder="请选择任务类型" style="width: auto">
                  <Option value="1">实时</Option>
                  <Option value="0">定时</Option>
                </Select>
              </FormItem>


              <div id="timeDiv">
                <FormItem label="开始时间" prop="startTime">
                  <DatePicker
                    type="datetime"
                    v-model="task_info.startTime"
                    format="yyyy年MM月dd日 HH:mm:ss"
                    placeholder="选择时间"
                    style="width: auto"></DatePicker>
                </FormItem>
                <FormItem label="结束时间" prop="endTime">
                  <DatePicker
                    type="datetime"
                    v-model="task_info.endTime"
                    format="yyyy年MM月dd日 HH:mm:ss"
                    placeholder="选择时间"
                    style="width: auto"></DatePicker>
                </FormItem>
                <FormItem label="播放星期" prop="days">
                  <CheckboxGroup v-model="task_info.days">
                    <Checkbox label="1">周一</Checkbox>
                    <Checkbox label="2">周二</Checkbox>
                    <Checkbox label="3">周三</Checkbox>
                    <Checkbox label="4">周四</Checkbox>
                    <Checkbox label="5">周五</Checkbox>
                    <Checkbox label="6">周六</Checkbox>
                    <Checkbox label="7">周日</Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem label="播放时间" prop="playTime">
                  <TimePicker
                    type="time"
                    v-model="task_info.playTime"
                    format="HH:mm:ss"
                    placeholder="选择时间"
                    style="width: auto"></TimePicker>
                </FormItem>
              </div>
            </Form>
          </div>
        </i-col>
        <i-col span="12" >
          <p style="font-size:20px;" @click="openDeviceDiv()">设备信息 <Icon id="deviceClose" type="md-arrow-dropleft" /><Icon id="deviceOpen" type="md-arrow-dropdown" /></p>
          <hr>
          <br>
          <div id="device_info_div">
            <Form ref="device_info" :model="device_info" >
              <FormItem label="设备类型">
                <Select v-model="device_info.deviceType" @on-change="deviceTypeChange()" placeholder="请选择资产类型" style="width: 200px">
                    <Option value="9">广播音柱</Option>
                    <Option value="8">LED</Option>
                    <Option value="10">LCD</Option>
                </Select>
              </FormItem>
            </Form>
            <div class="device_table" style="margin-left:40px;">
              <Tree :data="dt_deviceTable" show-checkbox @on-check-change="onDeviceSelect"></Tree>
            </div>
          </div>
          <p style="font-size:20px;" @click="openProgramDiv()">节目信息 <Icon id="programClose" type="md-arrow-dropleft" /><Icon id="programOpen" type="md-arrow-dropdown" /></p>
          <hr>
          <br>
          <div id="program_info_div" >
            <Form ref="program_info" :model="program_info">
              <FormItem label="节目类型">
                <Select v-model="program_info.fileType" @on-change="ProgramTypeChange()" placeholder="请选择节目类型" style="width: 200px">
                  <Option value="0">全部</Option>
                  <Option value="1">视频文件</Option>
                  <Option value="2">音频文件</Option>
                  <Option value="3">图片</Option>
                  <Option value="4">文字</Option>
                  <Option value="5">其他</Option>
                </Select>
              </FormItem>
            </Form>
            <div class="device_table" style="margin-left:40px;">
              <Tree :data="dt_programTable" show-checkbox @on-check-change="onProgramSelect"></Tree>
            </div>
          </div>
          <br>
        </i-col>

      </Row>
      <Row>
        <div style="float:right">
        <Button type="primary" @click="beforeNewMissionSubmit()">提交</Button>
        </div>
      </Row>
    </Modal>

    <!-- 修改任务弹窗 -->
    <Modal v-model="editMission" footer-hide width="1000px" :mask-closable="false" class="mission-modal">
      <Row style="padding-left:20px;padding-right:20px">
        <i-col span="12" style="padding-right:20px;height:100%">
          <p style="font-size:20px;">任务信息 <Icon type="md-arrow-dropdown" />
            <Button type="success" @click="editSubmit()" size="small" style="float:right;margin-right:10px;background-color:#60cb95;border: 1px solid #60cb95">保存</Button>
          </p>
          <hr>
          <br>
          <div id="task_info_div_edit">
            <Form ref="task_info_edit" :model="task_info_edit" :rules="taskEditRule">
              <FormItem label="任务名称" prop="name">
                <Input v-model="task_info_edit.name" placeholder="请输入任务名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="播放时长" prop="duration">
                <Input v-model="task_info_edit.duration" placeholder="请输入播放时长" style="width: 300px"/>
              </FormItem>
              <FormItem label="任务类型" prop="isInstant">
                <Select v-model="task_info_edit.isInstant" @on-change="isInstantChangeEdit()" placeholder="请选择任务类型" style="width: auto">
                  <Option value="1">实时</Option>
                  <Option value="0">定时</Option>
                </Select>
              </FormItem>

              <div id="timeDiv_edit">
                <FormItem label="开始时间" prop="startTime">
                  <DatePicker
                    type="datetime"
                    v-model="task_info_edit.startTime"
                    format="yyyy年MM月dd日 HH:mm:ss"
                    placeholder="选择时间"
                    style="width: auto"></DatePicker>
                </FormItem>
                <FormItem label="结束时间" prop="endTime">
                  <DatePicker
                    type="datetime"
                    v-model="task_info_edit.endTime"
                    format="yyyy年MM月dd日 HH:mm:ss"
                    placeholder="选择时间"
                    style="width: auto"></DatePicker>
                </FormItem>
                <FormItem label="播放星期" prop="days">
                  <CheckboxGroup v-model="task_info_edit.days">
                    <Checkbox label="1">周一</Checkbox>
                    <Checkbox label="2">周二</Checkbox>
                    <Checkbox label="3">周三</Checkbox>
                    <Checkbox label="4">周四</Checkbox>
                    <Checkbox label="5">周五</Checkbox>
                    <Checkbox label="6">周六</Checkbox>
                    <Checkbox label="7">周日</Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem label="播放时间" prop="playTime">
                  <TimePicker
                    type="time"
                    v-model="task_info_edit.playTime"
                    format="HH:mm:ss"
                    placeholder="选择时间"
                    style="width: auto"></TimePicker>
                </FormItem>
              </div>
            </Form>
          </div>
        </i-col>

        <i-col span="12" >
          <p style="font-size:20px;" @click="openEditDeviceDiv()">设备信息 
            <Icon id="editDeviceClose" type="md-arrow-dropleft" />
            <Icon id="editDeviceOpen" type="md-arrow-dropdown" />
            <Button @click="editDeviceSubmit()" type="success" size="small" style="float:right;margin-right:10px;background-color:#60cb95;border: 1px solid #60cb95">保存</Button>
          </p>
          <hr>
          <br>
          <div id="device_info_div_edit">
            <Form ref="device_info_edit" :model="device_info_edit" >
              <FormItem label="设备类型">
                <Select v-model="device_info_edit.deviceType" @on-change="editDeviceTypeChange()" placeholder="请选择资产类型" style="width: 200px">
                    <Option value="9">广播音柱</Option>
                    <Option value="8">LED</Option>
                    <Option value="10">LCD</Option>
                </Select>
              </FormItem>
            </Form>
            <div class="device_table" style="margin-left:40px;">
              <Tree :data="dt_editDeviceTable" show-checkbox @on-check-change="onEditDeviceSelect"></Tree>
            </div>
          </div>
          <br>
          <p style="font-size:20px;" @click="openEditProgramDiv()">节目信息 
            <Icon id="editProgramClose" type="md-arrow-dropleft" />
            <Icon id="editProgramOpen" type="md-arrow-dropdown" />
            <Button type="success" @click="editProgramSubmit()" size="small" style="float:right;margin-right:10px;background-color:#60cb95;border: 1px solid #60cb95">保存</Button>
          </p>
          <hr>
          <br>
          <div id="program_info_div_edit" >
            <Form ref="program_info_edit" :model="program_info_edit">
              <FormItem label="节目类型">
                <Select v-model="program_info_edit.fileType" @on-change="editProgramTypeChange()" placeholder="请选择节目类型" style="width: 200px">
                  <Option value="0">全部</Option>
                  <Option value="1">视频文件</Option>
                  <Option value="2">音频文件</Option>
                  <Option value="3">图片</Option>
                  <Option value="4">文字</Option>
                  <Option value="5">其他</Option>
                </Select>
              </FormItem>
            </Form>
            <div class="device_table" style="margin-left:40px;">
              <Tree :data="dt_editProgramTable" show-checkbox @on-check-change="onEditProgramSelect"></Tree>
            </div>
          </div>
          <br>

        </i-col>

      </Row>
    </Modal>


    <Modal v-model="deleteTask" title="删除" @on-ok="ok" @on-cancel="cancel">
      <p>这会删除该任务，操作不可恢复。</p>
    </Modal>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";
import { on, off } from "@/libs/tools";
import {getTasks, deleteTask, getTaskById, updateProgram, updateDevice, editTask, startTask, addMission, stopTask, getDevices, getPrograms, getTextList} from "@/api/mission_manage";
const axios = require("axios");

export default {

  name: "device_warning",
  components: {
    InforCard,
    CountTo,
    Tables
    // Example
  },

  data() {
    return {
      totalNum: 12, //table 数据条数
      pageNum: 1,
      maxPage: 2,
      tableSize: 11,
      searchOn: false,
      newMission: false,
      deleteTask: false,
      editMission:false,
      deleteTaskIndex:0,
      dt_deviceTable:[],
      dt_editDeviceTable:[],
      dt_programTable:[],
      dt_editProgramTable:[],
      task_info_edit:{},
      //新建任务
      task_info:{
        isInstant:"0",
      },
      program_info:{},
      program_info_edit:{},
      device_info:{
        deviceType:"1",
      },
      device_info_edit:{},
      selectedDevice:[],
      editSelectedDevice:[],
      selectedProgram:[],
      editSelectedProgram:[],
      taskRule:{
        name: [
          { required: true, message: '请选择任务名称', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '请输入播放时长', trigger: 'blur' }
        ],
      },
      taskEditRule:{
        name: [
          { required: true, message: '请选择任务名称', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '请输入播放时长', trigger: 'blur' }
        ],
      },
      tablecolumns: [
        // {
        //   title: "启用",
        //   key: "switch",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "i-switch",
        //         {
        //           props: {
        //             value:params.row.status==1
        //           },
        //           style: {
        //           },
        //           on: {
        //             'on-change': (value) => {
        //               this.change(value,params.row.id)
        //             }
        //           }
        //         },
        //       )
        //     ]);
        //   },
        //   width: 100,
        // },
        {
            title: 'ID',
            key: 'id',
            minWidth:80
        },
        {
            title: '任务名称',
            key: 'name',
            sortable: true,
            minWidth: 120
        },
        {
            title: '播放时间',
            key: 'playTime',
            sortable: true,
            minWidth: 120
        },
        {
            title: '播放星期 ',
            minWidth: 120,
            key: 'weekDate'
        },
        {
            title: '任务长度',
            minWidth: 120,
            key: 'duration',
            sortable: true
        },        
        {
            title: '创建时间 ',
            minWidth: 150,
            key: 'createDate'
        },        
        {
            title: '更新时间 ',
            minWidth: 150,
            key: 'updateDate'
        },
        {
          title: "编辑",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Icon",
                {
                  props: {
                    type: "md-create",
                    size: 26
                  },
                  style: {
                    color: "#d2a35b",
                  },
                  on: {
                    click: () => {
                      this.beforeEdit(params.index);
                    }
                  }
                },
              )
            ]);
          },
          width: 100,
        },
        {
          title: "删除",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Icon",
                {
                  props: {
                    type: "ios-trash",
                    size: 26
                  },
                  style: {
                    color: "#d64c4c",
                  },
                  on: {
                    click: () => {
                      this.deleteTaskIndex = params.index;
                      this.deleteTask = true;
                    }
                  }
                },
              )
            ]);
          },
          width: 100,
        },
      ],
      tabledata: [],
    };
  },

  methods: {
    //任务列表----------------------------------------------------------
    getTaskList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getTasks({
        token: token,
        pageNo: this.pageNum,
        pageSize: this.tableSize
      })
        .then(res => {
          console.log("=========================");
          console.log("任务列表:");
          console.log(res.data);
          //初始化
          this.totalNum=Number(res.data.total);
          this.tabledata = res.data.result;
        })
        .catch(err => {
          this.$Message.error('获取任务列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    //翻页--------------------------------------------------------------
    turnPage(pageNo){
      this.pageNum=pageNo;
      console.log(pageNo);
      this.getTaskList();
    },
    //开关-启/停用任务
    change (status,id) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;

      if (status){
        startTask({
          token: token,
          taskId: id
        })
          .then(res => {
            console.log("=========================");
            console.log("任务启用:");
            console.log("ID:"+id);
            console.log(res.data);
            this.getTaskList();
            this.$Message.success('已启用任务');
          })
          .catch(err => {
            this.$Message.error('启用失败');
            console.log("===========error==============");
            console.log(err);
          });
      }else{
        stopTask({
          token: token,
          taskId: id
        })
          .then(res => {
            console.log("=========================");
            console.log("任务停用:");
            console.log("ID:"+id);
            console.log(res.data);
            this.getTaskList();
            this.$Message.success('已停用任务');
          })
          .catch(err => {
            this.$Message.error('停用失败');
            console.log("===========error==============");
            console.log(err);
          });
      }
      //this.$Message.info('开关状态：' + status);
      //console.log(status); 
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    //删除--------------------------------------------------------------
    ok(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteTask({
        token: token,
        id: this.tabledata[this.deleteTaskIndex].id
      })
        .then(res => {
          console.log("=========================");
          console.log("任务已删除:");
          console.log("ID:"+this.tabledata[this.deleteTaskIndex].id);
          console.log(res.data);
          this.getTaskList();
          this.$Message.success('已删除任务');
        })
        .catch(err => {
          this.$Message.error('任务删除失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    cancel(){
      this.deleteTask=false;
    },
    //修改--------------------------------------------------------------
    beforeEdit(index){
      this.task_info_edit={};
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getTaskById({
        token: token,
        id: this.tabledata[index].id,
      })
        .then(res => {
          console.log("=========================");
          console.log("修改任务:");
          console.log(res.data.result[0]);
          //初始化弹窗表单
          this.task_info_edit=res.data.result[0];
          this.initEditForm();
          if (this.task_info_edit.isInstant!="1"){
            this.task_info_edit.days=this.task_info_edit.weekDate.split(",")
          }
          this.isInstantChangeEdit();
          //打开弹窗
          this.editMission=true;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取数据失败');
        });
    },
    //初始化编辑弹窗
    initEditForm(){
      this.task_info_edit.duration=this.task_info_edit.duration+"";
      this.task_info_edit.isInstant=this.task_info_edit.isInstant+"";
      this.task_info_edit.startTime=this.task_info_edit.beginDate;
      this.task_info_edit.endTime=this.task_info_edit.endDate;
      this.task_info_edit.days=[];
      this.device_info_edit.deviceType="";
      this.program_info_edit.fileType="0";
      this.device_info_edit.deviceType=this.task_info_edit.deviceTypeValue+"";
      try{
        if (this.task_info_edit.infoProgramOrderList[0].type!=null){
          this.program_info_edit.fileType=this.task_info_edit.infoProgramOrderList[0].type+"";
        }
      }catch(e){
        console.log(e);
      }
      this.editProgramTypeChange();
      this.getEditDevicesList();
      document.getElementById('editDeviceOpen').style.display="";
      document.getElementById('editDeviceClose').style.display="none";
      document.getElementById('editProgramOpen').style.display="none";
      document.getElementById('editProgramClose').style.display="";
      document.getElementById('program_info_div_edit').style.display="none";
      document.getElementById('device_info_div_edit').style.display="";
    },
    //勾选已选中的设备
    initDeviceTree(){
      if (this.task_info_edit.device_id!=null){
        for (let i in this.dt_editDeviceTable){
          for (let j in this.dt_editDeviceTable[i].children){
            for (let k in this.dt_editDeviceTable[i].children[j].children){
              for (let l in this.task_info_edit.device_id){
                if (this.dt_editDeviceTable[i].children[j].children[k].id==this.task_info_edit.device_id[l]){
                  //console.log(this.task_info_edit.device_id[l]);
                  this.$set(this.dt_editDeviceTable[i].children[j].children[k],"checked",true);
                }
              }
            }
          }
        }
      }
      this.task_info_edit.device_id=null;
    },
    //勾选已选中的节目
    initProgramTree(){
      console.log(this.dt_editProgramTable);
      console.log(this.task_info_edit.infoProgramOrderList)
      for (let i in this.dt_editProgramTable){
        for (let j in this.task_info_edit.infoProgramOrderList){
          if (this.dt_editProgramTable[i].id==this.task_info_edit.infoProgramOrderList[j].id){
            this.$set(this.dt_editProgramTable[i],"checked",true);
          }
        }
      }
    },
    //点击设备info
    openEditDeviceDiv(){
      document.getElementById('editDeviceOpen').style.display="";
      document.getElementById('editDeviceClose').style.display="none";
      document.getElementById('editProgramOpen').style.display="none";
      document.getElementById('editProgramClose').style.display="";
      document.getElementById('program_info_div_edit').style.display="none";
      document.getElementById('device_info_div_edit').style.display="";
    },
    //点击节目info
    openEditProgramDiv(){
      document.getElementById('editProgramOpen').style.display="";
      document.getElementById('editProgramClose').style.display="none";
      document.getElementById('editDeviceOpen').style.display="none";
      document.getElementById('editDeviceClose').style.display="";
      document.getElementById('device_info_div_edit').style.display="none";
      document.getElementById('program_info_div_edit').style.display="";
    },
    //设备树
    getEditDevicesList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getDevices({
        token: token,
        deviceType: Number(this.device_info_edit.deviceType),
      })
        .then(res => {
          console.log("=========================");
          console.log("设备列表:");
          console.log(res.data.result);
          this.dt_editDeviceTable=this.convertDiviceListFormat(res.data.result);
          //勾选已选中设备-只在第一次执行完整函数
          this.initDeviceTree();
        })
        .catch(err => {
          this.$Message.error('获取设备列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    //节目表
    getEditProgramList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getPrograms({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("节目列表:");
          console.log(res.data.result);
          this.dt_editProgramTable=this.convertDiviceListFormat(res.data.result);
          //勾选已选中的节目，第一次执行有效
          this.initProgramTree();
        })
        .catch(err => {
          this.$Message.error('获取节目列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    getEditProgramListByType(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getPrograms({
        token: token,
        type: Number(this.program_info_edit.fileType),
      })
        .then(res => {
          console.log("=========================");
          console.log("节目列表:");
          console.log(res.data.result);
          this.dt_editProgramTable=this.convertDiviceListFormat(res.data.result);
          //勾选已选中的节目，第一次执行有效
          this.initProgramTree();
        })
        .catch(err => {
          this.$Message.error('获取节目列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    getEditProgramTextList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getTextList({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("节目列表:");
          console.log(res.data.result);
          this.dt_editProgramTable=res.data.result;
          //勾选已选中的节目，第一次执行有效
          this.initProgramTree();
        })
        .catch(err => {
          this.$Message.error('获取节目列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    //选中设备时
    onEditDeviceSelect(data){
      this.editSelectedDevice=[];
      for (let i in data){
        if (data[i].deviceType!=null){
          this.editSelectedDevice.unshift(data[i]);
        }
      }
    },
    onEditProgramSelect(data){
      this.editSelectedProgram=data;
    },
    //提交修改
    editSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      console.log(this.task_info_edit.days);
      if (this.task_info_edit.isInstant=="0"){
        //星期
        let weekdays = "";
        for (let i = 0; i < this.task_info_edit.days.length; i++) {
          weekdays = weekdays + this.task_info_edit.days[i] + ",";
        }
        if (weekdays!=""){
          weekdays=weekdays.substring(0,weekdays.length-1);
        }
        editTask({
          token: token,
          id: this.task_info_edit.id,
          duration: Number(this.task_info_edit.duration),
          name: this.task_info_edit.name,
          isInstant: this.task_info_edit.isInstant,
          weekDate: weekdays,
          beginDate: (new Date(this.task_info_edit.startTime)).Format("yyyy-MM-dd HH:mm:ss"),
          endDate: (new Date(this.task_info_edit.endTime)).Format("yyyy-MM-dd HH:mm:ss"),
          playTime: this.task_info_edit.playTime,
        })
          .then(res => {
            console.log("=========================");
            console.log("修改任务:");
            console.log(res.data);
            console.log(this.task_info_edit);
            this.getTaskList();
            this.editMission=false;
            this.$Message.success('修改成功');
          })
          .catch(err => {
            this.$Message.error('修改失败');
            console.log("===========error==============");
            console.log(err);
          });
      //实时
      }else if (this.task_info_edit.isInstant=="1"){
        editTask({
          token: token,
          id: this.task_info_edit.id,
          duration: Number(this.task_info_edit.duration),
          name: this.task_info_edit.name,
          isInstant: this.task_info_edit.isInstant
        })
          .then(res => {
            console.log("=========================");
            console.log("修改任务:");
            console.log(res.data);
            console.log(this.task_info_edit);
            this.getTaskList();
            this.$Message.success('修改成功');
          })
          .catch(err => {
            this.$Message.error('修改失败');
            console.log("===========error==============");
            console.log(err);
          });
      }else{
        this.$Message.error('任务类型错误');
      }
    },
    //修改设备提交
    editDeviceSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      //设备ID表
      var deviceIdList=[];
      for (let i in this.editSelectedDevice){
        deviceIdList.unshift(this.editSelectedDevice[i].id);
      }
      if (deviceIdList.length==0){
        this.$Message.warning('暂无修改或未选择设备');
      }else{
        updateDevice({
            token: token,
            deviceId: deviceIdList,
            deviceType: this.device_info_edit.deviceType,
            taskId: this.task_info_edit.id,
          })
            .then(res => {
              console.log("=========================");
              console.log("修改设备:");
              console.log(res.data);
              console.log(deviceIdList);
              console.log(this.device_info_edit.deviceType);
              console.log(this.task_info_edit.id);
              this.getTaskList();
              this.$Message.success('修改成功');
            })
            .catch(err => {
              this.$Message.error('修改失败');
              console.log("===========error==============");
              console.log(err);
            });
      }
    },
    //修改节目提交
    editProgramSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      //节目ID表
      var infoProgramIDList=[];
      for (let k in this.editSelectedProgram){
        var program=new Object();
        program.order=0;
        program.programId=this.editSelectedProgram[k].id;
        program.repeatTime=1;
        program.programType=this.editSelectedProgram[k].type;
        infoProgramIDList.unshift(program);
      }
      console.log(infoProgramIDList)
      if (infoProgramIDList.length==0){
        this.$Message.warning('暂无修改或未选择设备');
      }else{
        updateProgram({
            token: token,
            infoProgramIDList: infoProgramIDList,
            taskId: this.task_info_edit.id,
          })
            .then(res => {
              console.log("=========================");
              console.log("修改设备:");
              console.log(res.data);
              console.log(infoProgramIDList);
              console.log(this.task_info_edit.id);
              this.getTaskList();
              this.$Message.success('修改成功');
            })
            .catch(err => {
              this.$Message.error('修改失败');
              console.log("===========error==============");
              console.log(err);
            });
      }
    },
    //改变设备类型时
    editDeviceTypeChange(){
      this.getEditDevicesList();
    },
    //改变节目类型时
    editProgramTypeChange(){
      if (this.program_info_edit.fileType=="0"){
        this.getEditProgramList();
      }else if (this.program_info_edit.fileType=="4"){
        this.getEditProgramTextList();
      }else{
        this.getEditProgramListByType();
      }
    },
    //修改-改变任务类型时调用
    isInstantChangeEdit(){
      if (this.task_info_edit.isInstant=="1"){
        document.getElementById('timeDiv_edit').style.display="none";
      }else if(this.task_info_edit.isInstant=="0"){
        document.getElementById('timeDiv_edit').style.display="";
      }
    },
    //新建任务-----------------------------------------------------------
    beforeNewMission(){
      this.$refs['program_info'].resetFields();
      this.$refs['device_info'].resetFields();
      //reset task_info(to avoid bug)
      this.task_info.name="";
      this.task_info.duration="";
      this.task_info.startTime="";
      this.task_info.endTime="";
      this.task_info.playTime="";

      this.task_info.isInstant="0";
      this.device_info.deviceType="9";
      this.program_info.fileType="0";
      this.getDevicesList();
      this.getProgramList();
      document.getElementById('timeDiv').style.display="";
      document.getElementById('deviceOpen').style.display="";
      document.getElementById('deviceClose').style.display="none";
      document.getElementById('programOpen').style.display="none";
      document.getElementById('programClose').style.display="";
      document.getElementById('program_info_div').style.display="none";
      document.getElementById('device_info_div').style.display="";
      this.newMission=true;
    },
    //点击设备info
    openDeviceDiv(){
      document.getElementById('deviceOpen').style.display="";
      document.getElementById('deviceClose').style.display="none";
      document.getElementById('programOpen').style.display="none";
      document.getElementById('programClose').style.display="";
      document.getElementById('program_info_div').style.display="none";
      document.getElementById('device_info_div').style.display="";
    },
    //点击节目info
    openProgramDiv(){
      document.getElementById('programOpen').style.display="";
      document.getElementById('programClose').style.display="none";
      document.getElementById('deviceOpen').style.display="none";
      document.getElementById('deviceClose').style.display="";
      document.getElementById('device_info_div').style.display="none";
      document.getElementById('program_info_div').style.display="";
    },
    //改变设备类型时
    deviceTypeChange(){
      this.getDevicesList();
    },
    //改变任务类型
    isInstantChange(){
      if (this.task_info.isInstant=="1"){
        document.getElementById('timeDiv').style.display="none";
      }else if(this.task_info.isInstant=="0"){
        document.getElementById('timeDiv').style.display="";
      }
    },
    //改变节目类型时
    ProgramTypeChange(){
      if (this.program_info.fileType=="0"){
        this.getProgramList();
      }else if (this.program_info.fileType=="4"){
        this.getProgramTextList();
      }else{
        this.getProgramListByType();
      }
    },
    //选中设备时
    onDeviceSelect(data){
      this.selectedDevice=[];
      for (let i in data){
        if (data[i].deviceType!=null){
          this.selectedDevice.unshift(data[i]);
        }
      }
    },
    onProgramSelect(data){
      this.selectedProgram=data;
    },
    //设备树
    getDevicesList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getDevices({
        token: token,
        deviceType: this.device_info.deviceType,
      })
        .then(res => {
          console.log("=========================");
          console.log("设备列表:");
          console.log(res.data.result);
          this.dt_deviceTable=this.convertDiviceListFormat(res.data.result);
        })
        .catch(err => {
          this.$Message.error('获取设备列表失败');
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
                if (i==0&y==0&x==0){
                  data[i]["children"][y]["children"][x]["selected"]=true;
                }
                data[i]["children"][y]["children"][x]["title"] = data[i]["children"][y]["children"][x]["deviceName"];
              }
            }
          }
        }
      }
      return data;
    },
    //节目表
    getProgramList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getPrograms({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("节目列表:");
          console.log(res.data.result);
          this.dt_programTable=this.convertDiviceListFormat(res.data.result);
        })
        .catch(err => {
          this.$Message.error('获取节目列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    getProgramListByType(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getPrograms({
        token: token,
        type: Number(this.program_info.fileType),
      })
        .then(res => {
          console.log("=========================");
          console.log("节目列表:");
          console.log(res.data.result);
          this.dt_programTable=this.convertDiviceListFormat(res.data.result);
        })
        .catch(err => {
          this.$Message.error('获取节目列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    getProgramTextList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getTextList({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("节目列表:");
          console.log(res.data.result);
          this.dt_programTable=res.data.result;
        })
        .catch(err => {
          this.$Message.error('获取节目列表失败');
          console.log("===========error==============");
          console.log(err);
        });
    },
    //新建任务表格Validation
    beforeNewMissionSubmit(){
      this.$refs["task_info"].validate((valid) => {
        if (valid) {
          if (this.task_info.isInstant=="0"){
            if (this.task_info.startTime==""){
              this.$Message.error('请填写开始时间');
            }else if (this.task_info.endTime==""){
              this.$Message.error('请填写结束时间');
            }else if (this.task_info.playTime==""){
              this.$Message.error('请填写播放时间');
            }else if (this.task_info.days==undefined){
              this.$Message.error('请选择播放星期');
            }else if (this.task_info.days.length==0){
              this.$Message.error('请选择播放星期');
            }else if (this.selectedDevice.length==0){
              this.$Message.error('请选择任务设备');
            }else if (this.selectedProgram.length==0){
              this.$Message.error('请选择任务节目');
            }else{
              this.submitNewMission();
            }
          }else if (this.task_info.isInstant=="1"){
            if (this.selectedDevice.length==0){
              this.$Message.error('请选择任务设备');
            }else if (this.selectedProgram.length==0){
              this.$Message.error('请选择任务节目');
            }else{
              this.submitNewMission();
            }
          }
        } else {
          this.$Message.error('请填写任务信息!');
        }
      })
    },
    submitNewMission(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;

      //设备ID表
      var deviceIdList=[];
      for (let j in this.selectedDevice){
        deviceIdList.unshift(this.selectedDevice[j].id);
      }

      //节目ID表
      var infoProgramIDList=[];
      for (let k in this.selectedProgram){
        var program=new Object();
        program.order=0;
        program.programId=this.selectedProgram[k].id;
        program.repeatTime=1;
        program.programType=this.selectedProgram[k].type;
        infoProgramIDList.unshift(program);
      }

      //定时
      if (this.task_info.isInstant=="0"){
        //星期
        let weekdays = "";
        for (let i = 0; i < this.task_info.days.length; i++) {
          weekdays = weekdays + this.task_info.days[i] + ",";
        }
        if (weekdays!=""){
          weekdays=weekdays.substring(0,weekdays.length-1);
        }

        addMission({
          token: token,
          name: this.task_info.name,
          duration: Number(this.task_info.duration),
          isInstant: this.task_info.isInstant,
          playTime: this.task_info.playTime,
          weekDate: weekdays,
          beginDate: (new Date(this.task_info.startTime)).Format("yyyy-MM-dd HH:mm:ss"),
          endDate: (new Date(this.task_info.endTime)).Format("yyyy-MM-dd HH:mm:ss"),
          device_type: this.device_info.deviceType,
          deviceIdList: deviceIdList,
          infoProgramIDList: infoProgramIDList,
        })
          .then(res => {
            console.log("=========================");
            console.log("添加节目:");
            console.log(res.data);
            this.getTaskList();
            this.newMission=false;
            this.$Message.success('任务添加成功');
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.newMission=false;
            this.$Message.error('任务添加失败');
          });
      //实时
      }else if (this.task_info.isInstant=="1"){
        addMission({
          token: token,
          name: this.task_info.name,
          duration: Number(this.task_info.duration),
          isInstant: this.task_info.isInstant,
          device_type: this.device_info.deviceType,
          deviceIdList: deviceIdList,
          infoProgramIDList: infoProgramIDList,
        })
          .then(res => {
            console.log("=========================");
            console.log("添加节目:");
            console.log(res.data);
            this.getTaskList();
            this.newMission=false;
            this.$Message.success('任务添加成功');
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.newMission=false;
            this.$Message.error('任务添加失败');
          });
      }else{
        this.$Message.error('任务类型错误');
      }
    },
    //初始化
    initData(){
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      //获取任务列表
      this.getTaskList();
    }
  },
  mounted() {
    this.initData();
  },
};
</script>

<style lang="less" scoped>

.background-row{
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(225, 225, 225, 1);
  border-radius: 10px 10px 10px 10px;
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
.ivu-layout-content{
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
</style>

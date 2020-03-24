<template>
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
          <p style="font-size:14px;">
            <span style="margin-right:5px;">
              <span style="margin-left:15px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>告警名称 </span>
              <Select v-model="searchData.alarmType" placeholder="请选择告警名称" style="width: auto;margin-left:5px;">
                <Option value="0">未知类型</Option>
                <Option value="1">设备断电</Option>
                <Option value="2">设备离线</Option>
                <Option value="3">设备运行异常</Option>
                <Option value="4">水浸告警</Option>
                <Option value="5">高温告警</Option>
                <Option value="6">高湿告警</Option>
                <Option value="7">维护过期</Option>
                <Option value="8">空气污染</Option>
              </Select>
            </span>
            <span style="margin-right:5px;">
              <span style="margin-left:15px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>设备类型 </span>
              <Select v-model="searchData.deviceType" placeholder="请选择设备类型" style="width: auto;margin-left:5px;">
                <Option value="0">未知设备</Option>
                <Option value="1">人行道灯</Option>
                <Option value="2">车行道灯</Option>
                <Option value="3">传感器</Option>
                <Option value="4">车流</Option>
                <Option value="5">人流</Option>
                <Option value="6">警用摄像机</Option>
                <Option value="7">交通摄像机</Option>
                <Option value="8">LED</Option>
                <Option value="9">广播音柱</Option>
                <Option value="10">LCD</Option>
                <Option value="11">WiFi AP</Option>
                <Option value="12">工控机</Option>
                <Option value="13">基站</Option>
                <Option value="14">广播对讲机</Option>
                <Option value="15">一键报警</Option>
              </Select>
            </span>
            <span style="margin-right:5px;">
              <span style="margin-left:15px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>处理进度 </span>
              <Select v-model="searchData.isDeal" placeholder="请选择处理进度" style="width: auto;margin-left:5px;">
                <Option value="0">未处理</Option>
                <Option value="1">处理中</Option>
                <Option value="2">已处理</Option>
              </Select>
            </span>
            <span style="margin-right:5px;">
              <span style="margin-left:15px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/>开始时间 </span> 
              <DatePicker v-model="searchData.startTime" format="yyyy年MM月dd日" type="date" placeholder="选择起始时间" style="width: auto;margin-left:5px;"></DatePicker>
            </span>
            <span style="margin-right:5px;">
              <span style="margin-left:15px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/>结束时间 </span> 
              <DatePicker v-model="searchData.endTime" format="yyyy年MM月dd日" type="date" placeholder="选择结束时间" style="width: auto;margin-left:5px;"></DatePicker>
            </span>
            <span style="margin-right:25px;float:right;">
              <Button style="width:100px;font-size:16px;" @click="initData()">重置</Button>
            </span>
            <span style="margin-right:5px;float:right;">
              <Button style="width:100px;font-size:16px;background-color:#119AE5;" @click="search()" type="primary"><Icon type="md-search" size="20" style="color:white"/>搜索</Button>
            </span>
          </p>
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

    <!-- 告警处理 -->
    <Modal v-model="dealWarningWindow" footer-hide>
      <p slot="header" style="text-align:center">
        <span>告警处理</span>
      </p>
      <div>
        <Form ref="dealWarningForm" :model="dealWarningForm" :label-width="100">
          
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="dealWarningForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="报警名称" prop="alarmType">
            <Input v-model="dealWarningForm.alarmType" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="处理情况" prop="isDeal">
            <Select v-model="dealWarningForm.isDeal" placeholder="请选择处理情况" style="width: 300px">
              <Option value="0">未处理</Option>
              <Option value="1">处理中</Option>
              <Option value="2">已处理</Option>
            </Select>
          </FormItem>
          <FormItem label="处理结果" prop="result">
            <Input v-model="dealWarningForm.result" placeholder="请输入处理结果..." type="textarea" :autosize="{minRows: 3,maxRows: 6}" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="updateWarning()">完成</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";
import { on, off } from "@/libs/tools";
import {getAlarmMessage, getAlarmList, getAllAlarm, deal} from "@/api/warning";
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
      //操作按钮的弹窗
      dealWarningWindow:false,
      searchData:{
        alarmType:'',
        deviceType:'',
        isDeal:0,
        startTime:"",
        endTime:"",
      },
      dealWarningForm:{
        isDeal:'',
        result:'',
        alarmName:'',
        id:'',
      },
      tablecolumns: [
        {
            title: 'ID',
            key: 'id',
            minWidth:80
        },
        {
            title: '灯杆名字',
            key: 'lightPoleName',
            minWidth: 170,
            sortable: true
        },
        {
            title: '设备编号',
            key: 'deviceNo',
            minWidth: 140,
            sortable: true
        },
        {
            title: '设备类型',
            width: 120,
            key: 'deviceType',
            sortable: true
        },
        {
            title: '报警类型',
            width: 150,
            key: 'alarmType',
            sortable: true
        },
        {
            title: '报警时间',
            key: 'alarmTime',
            minWidth: 170,
            sortable: true
        },
        {
            title: '优先级',
            key: 'priorityT',
            width: 110,
            sortable: true
        },
        {
            title: '处理人',
            key: 'dealPerson',
            minWidth: 120,
        },
        {
            title: '是否处理',
            minWidth: 120,
            key: 'isDealTranslated',
            sortable: true
        },
        {
            title: '处理结果',
            minWidth: 110,
            key: 'result',
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                  },
                  style: {
                    marginRight: "5px",
                    backgroundColor: "#60cb95",
                    color: "white",
                    border: "1px solid #60cb95"
                  },
                  on: {
                    click: () => {
                      this.dealWarning(params.index);
                    }
                  }
                },
                "处理"
              )
            ]);
          },
          width: 100,
        }
      ],
      tabledata: [],
    };
  },

  methods: {
    //告警列表----------------------------------------------------------
    getAlarmList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      if (!this.searchOn){
        getAlarmMessage({
          token: token,
          pageNo: this.pageNum,
          pageSize: this.tableSize
        })
          .then(res => {
            console.log("=========================");
            console.log("告警列表:");
            console.log(res.data);
            //初始化
            this.totalNum=res.data.total;
            this.tabledata = res.data.result;
            this.dealFormate(this.tabledata);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }else{
        var sTime=null;
        var eTime=null;
        if (this.searchData.startTime!=""){
          sTime = (new Date(this.searchData.startTime)).Format("yyyy-MM-dd")+" 00:00:00";
        }
        if (this.searchData.endTime!=""){
          eTime = (new Date(this.searchData.endTime)).Format("yyyy-MM-dd")+" 23:59:59";
        }
        getAlarmMessage({
          token: token,
          pageNo: this.pageNum,
          pageSize: this.tableSize,
          beginTime: sTime,
          endTime: eTime,
          deviceType: this.searchData.deviceType,
          isDeal: this.searchData.isDeal,
          alarmType: this.searchData.alarmType
        })
          .then(res => {
            console.log("=========================");
            console.log("告警列表:");
            console.log(res.data);
            //初始化
            this.totalNum=res.data.total;
            this.tabledata = res.data.result;
            this.dealFormate(this.tabledata);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }
    },
    //运行状态-文字转换
    dealFormate(data){
      for(let i in data){
        if (data[i]['isDeal']==0){
          data[i]['isDealTranslated']="未处理";
        }
        if (data[i]['isDeal']==1){
          data[i]['isDealTranslated']="处理中";
        }
        if (data[i]['isDeal']==2){
          data[i]['isDealTranslated']="已处理";
        }
        if (data[i]['priority']==0){
          data[i]['priorityT']="normal";
        }
        if (data[i]['priority']==1){
          data[i]['priorityT']="warn";
        }
        if (data[i]['priority']==2){
          data[i]['priorityT']="alarm";
        }
      }
    },
    //翻页--------------------------------------------------------------
    turnPage(pageNo){
      this.pageNum=pageNo;
      console.log(pageNo);
      this.getAlarmList();
    },
    //设备类型更改转换
    FormateDeviceType(data){
      if(data.deviceType=="未知设备")
        data.deviceType = 0;
      if(data.deviceType=="人行道灯")
        data.deviceType = 1;
      if(data.deviceType=="车行道灯")
        data.deviceType = 2;
      if(data.deviceType=="传感器")
        data.deviceType = 3;
      if(data.deviceType=="车流")
        data.deviceType = 4;
      if(data.deviceType=="人流")
        data.deviceType = 5;
      if(data.deviceType=="警用摄像机")
        data.deviceType = 6;
      if(data.deviceType=="交通摄像机")
        data.deviceType = 7;
      if(data.deviceType=="led")
        data.deviceType = 8;
      if(data.deviceType=="广播音柱")
        data.deviceType = 9;
      if(data.deviceType=="lcd")
        data.deviceType = 10;
      if(data.deviceType=="WiFi AP")
        data.deviceType = 11;
      if(data.deviceType=="工控机")
        data.deviceType = 12;
      if(data.deviceType=="基站")
        data.deviceType = 13;
      if(data.deviceType=="广播对讲机")
        data.deviceType = 14;
      if(data.deviceType=="一键报警")
        data.deviceType = 15;
    },
    //搜索--------------------------------------------------------------
    search(){
      if (this.searchData.startTime>this.searchData.endTime){
        this.$Message.error('开始时间请勿晚于结束时间！');
      }else{
        this.searchOn=true;
        this.getAlarmList();
      }
    },

    //告警处理----------------------------------------------------------
    dealWarning(index){
      this.handleReset('dealWarningForm');
      this.dealWarningForm.isDeal=this.tabledata[index].isDeal+"";
      this.dealWarningForm.lightPoleName=this.tabledata[index].lightPoleName;
      this.dealWarningForm.alarmType=this.tabledata[index].alarmType;
      this.dealWarningForm.id=this.tabledata[index].id;
      this.dealWarningForm.result=this.tabledata[index].result;
      this.dealWarningWindow=true;
    },

    updateWarning(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      console.log(this.dealWarningForm.id);
      console.log(this.dealWarningForm.isDeal);
      console.log(this.dealWarningForm.result);
      deal({
        token: token,
        alarmId: this.dealWarningForm.id,
        isDeal: Number(this.dealWarningForm.isDeal),
        result: this.dealWarningForm.result
      })
        .then(res => {
          console.log("=========================");
          console.log("处理告警:");
          console.log(this.dealWarningForm);
          this.getAlarmList();
          this.$Message.success('处理成功');
          this.dealWarningWindow=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    handleReset (name) {
      this.$refs[name].resetFields();
    },
    //初始化
    initData(){
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      //清空搜素条件
      this.searchOn = false;
      this.searchData.alarmType='';
      this.searchData.deviceType='';
      this.searchData.isDeal='';
      this.searchData.startTime= "";
      this.searchData.endTime = "";
      //获取设备列表
      this.getAlarmList();
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
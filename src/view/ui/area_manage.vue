<template>
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
          <Row style="font-size:14px;margin-left:5px;">
            <Button class="manage-btn" type="primary" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="beforeAdd()"><Icon type="md-add" size="20"/>新建区域</Button>
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

        <!-- 灯杆管理抽屉 -->
        <Drawer width="75%" v-model="poleManageDrawer">
          <p slot="header">
            <span>灯杆管理 - {{ areaName }}</span>
          </p>
          <div>
            <br>
            <Row style="font-size:14px;margin-left:5px;">
              <span style="margin-right:17px;">
                <Button class="manage-btn" type="primary" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="beforeAddPole()"><Icon type="md-add" size="20"/>添加灯杆</Button>
              </span>
              <span style="margin-right:17px;">
                <Button class="manage-btn" type="warning" style="font-size:16px;background-color:#d2a35b;border: 1px solid #d2a35b" @click="beforeEditPole()"><Icon type="md-create" size="20"/>编辑信息</Button>
              </span>
              <span style="margin-right:17px;">
                <Button  class="manage-btn" type="error" style="font-size:16px;background-color:#d64c4c;border: 1px solid #d64c4c" @click="beforeDeletePole()"><Icon type="md-trash" size="20" />删除灯杆</Button>
              </span>
              <span>
                <Button  class="manage-btn" type="primary" style="font-size:16px;background-color:#3fa8e4;border: 1px solid #3fa8e4" @click="beforeChangeArea()"><Icon type="md-trash" size="20" />更改区域</Button>
              </span>
            </Row>
            <br>
            <Row class="user-table-row">
              <Table class="userTable"  @on-selection-change="selectionUpdate" border ref="selection" :columns="poleColumns" :data="poleData" style="margin-left:5px;margin-right:5px;"></Table>
            </Row>
          </div>
        </Drawer>

        <!-- 添加灯杆 -->
        <Drawer :mask-closable="false" width="30%" v-model="addPoleDrawer">
          <p slot="header">
            <span>添加灯杆</span>
          </p>
          <div>
            <Form ref="addPoleForm" :model="addPoleForm" :rules="addPoleRule" :label-width="80">
              <FormItem label="灯杆名称" prop="name">
                <Input v-model="addPoleForm.name" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="灯杆位置" prop="location">
                <Input v-model="addPoleForm.location" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="经 度 " prop="latitude">
                <Input v-model="addPoleForm.latitude" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="纬 度 " prop="longitude">
                <Input v-model="addPoleForm.longitude" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="安装时间" prop="installTime">
                <DatePicker
                  type="datetime"
                  v-model="addPoleForm.installTime"
                  format="yyyy年MM月dd日 HH:mm:ss"
                  placeholder="选择时间"
                  style="width: auto"></DatePicker>
              </FormItem>
              <FormItem label="维护时间" prop="maintenanceDate">
                <DatePicker
                  type="datetime"
                  v-model="addPoleForm.maintenanceDate"
                  format="yyyy年MM月dd日 HH:mm:ss"
                  placeholder="选择时间"
                  style="width: auto"></DatePicker>
              </FormItem>
              <FormItem label="维护周期" prop="maintenancePeriod">
                <Input v-model="addPoleForm.maintenancePeriod" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="保修期" prop="guaranteeTime">
                <Input v-model="addPoleForm.guaranteeTime" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
            </Form>
          </div>
          <div class="footer">
            <Button style="margin-right: 8px" @click="addPoleDrawer = false">取消</Button>
            <Button type="primary" @click="beforeAddPoleSubmit()">创建</Button>
          </div>
        </Drawer>

        <!-- 修改灯杆 -->
        <Drawer :mask-closable="false" width="30%" v-model="editPoleDrawer">
          <p slot="header">
            <span>编辑灯杆</span>
          </p>
          <div>
            <Form ref="editPoleForm" :model="editPoleForm" :rules="addPoleRule" :label-width="80">
              <FormItem label="灯杆名称" prop="name">
                <Input v-model="editPoleForm.name" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="灯杆位置" prop="location">
                <Input v-model="editPoleForm.location" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="经 度 " prop="latitude">
                <Input v-model="editPoleForm.latitude" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="纬 度 " prop="longitude">
                <Input v-model="editPoleForm.longitude" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="安装时间" prop="installTime">
                <DatePicker
                  type="datetime"
                  v-model="editPoleForm.installTime"
                  format="yyyy年MM月dd日 HH:mm:ss"
                  placeholder="选择时间"
                  style="width: auto"></DatePicker>
              </FormItem>
              <FormItem label="维护时间" prop="maintenanceDate">
                <DatePicker
                  type="datetime"
                  v-model="editPoleForm.maintenanceDate"
                  format="yyyy年MM月dd日 HH:mm:ss"
                  placeholder="选择时间"
                  style="width: auto"></DatePicker>
              </FormItem>
              <FormItem label="维护周期" prop="maintenancePeriod">
                <Input v-model="editPoleForm.maintenancePeriod" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
              <FormItem label="保修期" prop="guaranteeTime">
                <Input v-model="editPoleForm.guaranteeTime" placeholder="请输入灯杆名称" style="width: 300px"/>
              </FormItem>
            </Form>
          </div>
          <div class="footer">
            <Button style="margin-right: 8px" @click="editPoleDrawer = false">取消</Button>
            <Button type="primary" @click="beforeEditPoleSubmit()">保存</Button>
          </div>
        </Drawer>

      </Row>
    </Content>

    <!-- 更改区域 -->
    <Modal v-model="changeAreaModal" :mask-closable="false" footer-hide>
      <p slot="header" style="text-align:center">
        <span>更改区域</span>
      </p>
      <div>
        <Row class="mission_table">
          <Table :show-header="false" border ref="selection2" :columns="changeAreaColumns" @on-selection-change="changeAreaSelection" :data="changeAreaData" style="margin-left:5px;margin-right:5px;"></Table>
        </Row>
        <br>
        <Row>
          <Button type="primary" @click="beforeChangeAreaSubmit()" style="float:right">确认</Button>
        </Row>
      </div>
    </Modal>


    <!-- 区域编辑 -->
    <Modal v-model="editModal" :mask-closable="false" footer-hide>
      <p slot="header" style="text-align:center">
        <span>区域编辑</span>
      </p>
      <div>
        <Form ref="editForm" :model="editForm" :label-width="100" :rules="editRule">
          <FormItem label="区域名称" prop="name">
            <Input v-model="editForm.name" style="width: 300px"/>
          </FormItem>
          <FormItem label="区域位置" prop="location">
            <Input v-model="editForm.location" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleEditSubmit()">完成</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 新建区域 -->
    <Modal v-model="addModal" :mask-closable="false" footer-hide>
      <p slot="header" style="text-align:center">
        <span>新建区域</span>
      </p>
      <div>
        <Form ref="addForm" :model="addForm" :label-width="100" :rules="editRule">
          <FormItem label="区域名称" prop="name">
            <Input v-model="addForm.name" style="width: 300px"/>
          </FormItem>
          <FormItem label="区域位置" prop="location">
            <Input v-model="addForm.location" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleAddSubmit()">完成</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 删除区域 -->
    <Modal v-model="deleteModal" title="删除区域" @on-ok="deleteOk" @on-cancel="deleteCancel">
      <p>这会删除该区域，操作不可恢复。</p>
    </Modal>

    <!-- 删除灯杆 -->
    <Modal v-model="deletePoleModal" title="删除灯杆" @on-ok="deletePoleOk" @on-cancel="deletePoleModal=false;">
      <p>确认删除选中灯杆吗？此操作不可恢复。</p>
    </Modal>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";
import { on, off } from "@/libs/tools";
import {
  getAreaList,
  editArea,
  addArea,
  deleteArea,
  addLightPole,
  updateLightPole,
  deleteLightPole
  } from "@/api/area";
const axios = require("axios");

export default {
  name: "device_area_manage",
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
      currentAreaIndex: 0,
      searchOn: false,
      deleteId: 1,
      //弹窗
      editModal: false,
      addModal: false,
      deleteModal: false,
      deletePoleModal: false,
      changeAreaModal: false,
      //抽屉
      poleManageDrawer: false,
      addPoleDrawer: false,
      editPoleDrawer: false,
      areaName: "暂无名称",
      editForm: {},
      addForm:{},
      addPoleForm:{},
      editPoleForm:{},
      //灯杆选中项目
      selectedPole:[],
      changeAreaSelected:[],
      changeAreaData:[],
      changeAreaColumns:[
        {
          type:"selection",
          width: 50,
        },
        {
          title: '区域列表',
          key: 'name',
          minWidth: 150,
        },
      ],
      poleColumns: [
        {
          type:"selection",
          width: 50,
        },
        {
          title: 'ID',
          key: 'id',
          minWidth: 80,
        },
        {
          title: '灯杆名称',
          key: 'name',
          minWidth: 180,
          sortable: true
        },
        {
          title: '灯杆位置',
          key: 'location',
          minWidth: 200,
          sortable: true
        },
        {
          title: '经度',
          minWidth: 60,
          key: 'latitude',
          sortable: true
        },
        {
          title: '纬度',
          minWidth: 60,
          key: 'longitude',
          sortable: true
        },
        {
          title: '安装时间',
          minWidth: 150,
          key: 'installTime',
          sortable: true
        },
        {
          title: '维护日期',
          minWidth: 150,
          key: 'maintenanceDate',
          sortable: true
        },
        {
          title: '维护周期',
          minWidth: 60,
          key: 'maintenancePeriod',
          sortable: true
        },
        {
          title: '保修期',
          key: 'guaranteeTime',
          minWidth: 60,
          sortable: true
        },
      ],
      tablecolumns: [
        {
          title: 'ID',
          key: 'id',
          minWidth: 80,
        },
        {
          title: '区域名称',
          key: 'name',
          minWidth: 150,
          sortable: true
        },
        {
          title: '区域位置',
          key: 'location',
          minWidth: 200,
          sortable: true
        },
        {
          title: '灯杆数量',
          minWidth: 100,
          key: 'lightNum',
          sortable: true
        },
        {
          title: "灯杆管理",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Icon",
                {
                  props: {
                    type: "md-cog",
                    size: 26
                  },
                  style: {
                    color: "#60cb95",
                  },
                  on: {
                    click: () => {
                      this.currentAreaIndex=params.index;
                      this.beforePoleDrawer();
                    }
                  }
                },
              ) 
            ]);
          },
          width: 100,
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
                      this.deleteId = this.tabledata[params.index].id;
                      this.deleteModal = true;
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
      poleData: [],
      editRule:{
        name: [
          { required: true, message: '请输入区域名称', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请输入区域地址', trigger: 'change' }
        ],
      },
      addPoleRule:{
        name: [
          { required: true, message: '请输入灯杆名称', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请输入灯杆地址', trigger: 'change' }
        ],
      },
    };
  },

  methods: {
    //区域列表----------------------------------------------------------
    getAreaList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getAreaList({
        token: token,
        pageNo: this.pageNum,
        pageSize: this.tableSize
      })
        .then(res => {
          console.log("=========================");
          console.log("区域列表:");
          console.log(res.data);
          //初始化
          this.totalNum=res.data.total;
          this.tabledata = res.data.result;
          this.lightNumFormate(this.tabledata);
          //灯杆表格内数据
          this.poleData=this.tabledata[this.currentAreaIndex].deviceLightPoleDtoList;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取区域列表失败');
        });
    },
    //灯杆数量
    lightNumFormate(data){
      for (let i in data){
        if (data[i].deviceLightPoleDtoList!=null){
          data[i].lightNum=data[i].deviceLightPoleDtoList.length;
        }
      }
    },
    //翻页--------------------------------------------------------------
    turnPage(pageNo){
      this.pageNum=pageNo;
      console.log(pageNo);
      this.getAreaList();
    },
    //搜索--------------------------------------------------------------
    search(){
      this.searchOn=true;
      this.getAreaList();
    },

    //添加----------------------------------------------------------
    beforeAdd(){
      this.$refs["addForm"].resetFields();
      this.addModal=true;
    },
    //验证
    handleAddSubmit() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.addArea();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    addArea() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      addArea({
        token: token,
        name:this.addForm.name,
        location:this.addForm.location,
        id:this.addForm.id,
      })
        .then(res => {
          console.log("=========================");
          console.log("创建区域:");
          console.log(res);
          this.$Message.success('创建成功！');
          this.addModal=false;
          this.getAreaList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.success('创建失败');
          this.addModal=false;
        });
    },
    //修改----------------------------------------------------------
    beforeEdit(index){
      this.$refs["editForm"].resetFields();
      this.editForm.name=this.tabledata[index].name;
      this.editForm.location=this.tabledata[index].location;
      this.editForm.id=this.tabledata[index].id;
      this.editModal=true;
    },
    //验证
    handleEditSubmit() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.editArea();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    //提交
    editArea() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      editArea({
        token: token,
        name:this.editForm.name,
        location:this.editForm.location,
        id:this.editForm.id,
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑区域:");
          console.log(res);
          this.$Message.success('编辑成功！');
          this.editModal=false;
          this.getAreaList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.success('保存失败');
          this.editModal=false;
        });
    },

    //删除----------------------------------------------------------
    deleteOk(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteArea({
        token: token,
        id:this.deleteId,
      })
        .then(res => {
          console.log("=========================");
          console.log("删除区域:");
          console.log(res);
          this.$Message.success('删除成功！');
          this.deleteModal=false;
          this.getAreaList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('删除失败');
          this.deleteModal=false;
        });
    },
    deleteCancel(){
      this.deleteModal=false;
    },
    //灯杆管理------------------------------------------------------------
    beforePoleDrawer(){
      this.poleData=this.tabledata[this.currentAreaIndex].deviceLightPoleDtoList;
      this.areaName=this.tabledata[this.currentAreaIndex].name;
      this.poleManageDrawer=true;
    },
    //设备选中
    selectionUpdate(selection){
      this.selectedPole=selection;
    },
    beforeAddPole(){
      this.$refs["addPoleForm"].resetFields();
      this.addPoleForm.areaId=this.tabledata[this.currentAreaIndex].id;
      this.addPoleDrawer=true;
    },
    beforeAddPoleSubmit(){
      this.$refs["addPoleForm"].validate((valid) => {
        if (valid) {
          this.addPoleSubmit();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    addPoleSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      if (this.addPoleForm.installTime!=""){
        this.addPoleForm.installTime=(new Date(this.addPoleForm.installTime)).Format("yyyy-MM-dd HH:mm:ss")
      }
      if (this.addPoleForm.maintenanceDate!=""){
        this.addPoleForm.maintenanceDate=(new Date(this.addPoleForm.maintenanceDate)).Format("yyyy-MM-dd HH:mm:ss")
      }
      addLightPole({
        token: token,
        name: this.addPoleForm.name,
        location: this.addPoleForm.location,
        latitude: this.addPoleForm.latitude,
        longitude: this.addPoleForm.longitude,
        installTime: this.addPoleForm.installTime,
        maintenanceDate: this.addPoleForm.maintenanceDate,
        maintenancePeriod: this.addPoleForm.maintenancePeriod,
        guaranteeTime: this.addPoleForm.guaranteeTime,
        areaId: this.addPoleForm.areaId,
      })
        .then(res => {
          console.log("=========================");
          console.log("添加灯杆:");
          console.log(res);
          this.$Message.success('添加成功！');
          this.getAreaList();
          this.addPoleDrawer=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('添加失败');
          this.addPoleDrawer=false;
        });
    },
    //灯杆改--------------------------------------------------
    beforeEditPole(){
      if(this.selectedPole.length==1){
        //初始化表单内容
        this.$refs["editPoleForm"].resetFields();
        this.editPoleForm.id=this.selectedPole[0].id;
        this.editPoleForm.name=this.selectedPole[0].name;
        this.editPoleForm.location=this.selectedPole[0].location;
        this.editPoleForm.latitude=this.selectedPole[0].latitude;
        this.editPoleForm.longitude=this.selectedPole[0].longitude;
        this.editPoleForm.installTime=this.selectedPole[0].installTime;
        this.editPoleForm.maintenanceDate=this.selectedPole[0].maintenanceDate;
        this.editPoleForm.maintenancePeriod=this.selectedPole[0].maintenancePeriod;
        this.editPoleForm.guaranteeTime=this.selectedPole[0].guaranteeTime;
        this.editPoleDrawer=true;
      } else{
        this.$Message.warning('请选择单个灯杆进行修改!');
      }
    },
    beforeEditPoleSubmit(){
      this.$refs["editPoleForm"].validate((valid) => {
        if (valid) {
          this.editPoleSubmit();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    editPoleSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      if (this.editPoleForm.installTime!=""){
        this.editPoleForm.installTime=(new Date(this.editPoleForm.installTime)).Format("yyyy-MM-dd HH:mm:ss")
      }
      if (this.editPoleForm.maintenanceDate!=""){
        this.editPoleForm.maintenanceDate=(new Date(this.editPoleForm.maintenanceDate)).Format("yyyy-MM-dd HH:mm:ss")
      }
      updateLightPole({
        token: token,
        name: this.editPoleForm.name,
        location: this.editPoleForm.location,
        latitude: this.editPoleForm.latitude,
        longitude: this.editPoleForm.longitude,
        installTime: this.editPoleForm.installTime,
        maintenanceDate: this.editPoleForm.maintenanceDate,
        maintenancePeriod: this.editPoleForm.maintenancePeriod,
        guaranteeTime: this.editPoleForm.guaranteeTime,
        id: this.editPoleForm.id,
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑灯杆:");
          console.log(res);
          this.$Message.success('编辑成功！');
          this.getAreaList();
          this.editPoleDrawer=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('编辑失败');
          this.editPoleDrawer=false;
        });
    },
    //更改区域-------------------------------------------------------
    beforeChangeArea(){
      if (this.selectedPole.length==0){
        this.$Message.warning('请选择要更改的灯杆');
      }else{
        this.changeAreaData=this.tabledata;
        this.changeAreaModal=true;
      }
    },
    //更改所选的区域时
    changeAreaSelection(selection){
      this.changeAreaSelected=selection;
    },
    beforeChangeAreaSubmit(){
      if (this.changeAreaSelected.length==0){
        this.$Message.warning('请选择要更改到的区域');
      }else if (this.changeAreaSelected.length>1){
        this.$Message.warning('请勿选择多个区域！');
      }else{
        for (let i in this.selectedPole){
          this.changeAreaSubmit(this.selectedPole[i].id);
        }
        this.$Message.success('操作成功');
      }
    },
    changeAreaSubmit(id){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      updateLightPole({
        token: token,
        areaId: this.changeAreaSelected[0].id,
        id: id,
      })
        .then(res => {
          console.log("=========================");
          console.log("更改区域:");
          console.log(res);
          this.getAreaList();
          this.changeAreaModal=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('更改失败');
          this.changeAreaModal=false;
        });
    },
    //灯杆删---------------------------------------------------------
    beforeDeletePole(){
      if (this.selectedPole.length==0){
        this.$Message.warning('请选择要删除的灯杆');
      }else{
        this.deletePoleModal=true;
      }
    },
    deletePoleOk(){
      for (let i in this.selectedPole){
        this.deleteLightPole(this.selectedPole[i].id);
      }
      this.deletePoleModal=false;
      this.$Message.success('操作成功');
    },
    deleteLightPole(lightPoleId){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteLightPole({
        token: token,
        lightPoleId: lightPoleId,
      })
        .then(res => {
          console.log("=========================");
          console.log("删除灯杆:"+lightPoleId);
          console.log(res);
          this.getAreaList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //初始化-------------------------------------------------------------
    initData(){
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      //清空搜素条件
      this.searchOn = false;
      //获取设备列表
      this.getAreaList();
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
.footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>
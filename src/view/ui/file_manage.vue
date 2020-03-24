<template>
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px'}">
        <Tabs value="name1" >
          <TabPane label="文件管理" name="name1">
            <Row class="background-row">
              <Row style="margin-left:26px;margin-top:16px;margin-right:26px;margin-bottom:14px;">
                <Row style="font-size:14px;">
                  <span style="margin-left:5px;">
                    <Button type="success" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="resetForm();addProgram=true"><Icon type="md-add" size="20"/>新增节目</Button>
                  </span>
                  <span style="margin-right:25px;margin-top:5px;float:right;">
                    <span style="margin-left:15px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>文件类型搜索 </span>
                    <Select v-model="searchData.fileType" placeholder="请选择文件类型" @on-change="search()" style="width: auto;margin-left:5px;">
                      <Option value=0>全部</Option>
                      <Option value=1>视频文件</Option>
                      <Option value=2>音频文件</Option>
                      <Option value=3>图片</Option>
                      <!-- <Option value=4>文字</Option> -->
                      <Option value=5>其他</Option>
                    </Select>
                  </span>
                </Row>
                <br>
                <Row class="user-table-row">
                  <Table class="userTable"  border ref="selection" :columns="tablecolumns" :data="tabledata" style="margin-left:5px;margin-right:5px;"></Table>
                </Row>
                <br>
                <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
                  <Page ref="pager" id="pager" :total="totalNum" :current="pageNum" @on-change="turnPage" :page-size="tableSize" show-total show-elevator/>
                </Row>
              </Row>
            </Row>
          </TabPane>

          
          <TabPane label="文本管理" name="name2">
            <Row class="background-row">
              <Row style="margin-left:26px;margin-top:16px;margin-right:26px;margin-bottom:14px;">
                <Row style="font-size:14px;">
                  <span style="margin-left:5px;">
                    <Button type="success" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="resetTextForm();addText=true"><Icon type="md-add" size="20"/>新增节目</Button>
                  </span>
                </Row>
                <br>
                <Row class="user-table-row">
                  <Table class="userTable" border ref="selection" :columns="tablecolumns_text" :data="tabledata_text" style="margin-left:5px;margin-right:5px;"></Table>
                </Row>
                <br>
                <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
                  <Page ref="pager2" id="pager" :total="totalTextNum" :current="textPageNum" @on-change="turnTextPage" :page-size="textTableSize" show-total show-elevator/>
                </Row>
              </Row>
            </Row>
          </TabPane>
        </Tabs>
    </Content>

    <!-- 文件编辑 -->
    <Modal v-model="editFormModal" :mask-closable="false" footer-hide>
      <p slot="header" style="text-align:center">
        <span>文件编辑</span>
      </p>
      <div>
        <Form ref="editForm" :model="editForm"  :rules="editRule">
          <FormItem label="节目名称" prop="name" :label-width="80">
            <Input v-model="editForm.name" style="width: 300px"/>
          </FormItem>
          <FormItem style="text-align:center">
            <Button type="primary" @click="beforeFileEditSubmit()">完成</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <Modal v-model="deleteFile" title="删除" @on-ok="ok" @on-cancel="cancel">
      <p>这会删除该文件，操作不可恢复。</p>
    </Modal>

    <Modal v-model="deleteText" title="删除" @on-ok="deletTextSubmit" @on-cancel="cancelText">
      <p>这会删除该文本，操作不可恢复。</p>
    </Modal>


    <Modal v-model="addProgram" title="新增节目" footer-hide>
      <Form  ref="addProgramForm" :model="addProgramForm">
        <FormItem label="节目类型" prop="type">
          <Select v-model="addProgramForm.type" placeholder="请选择文件类型" style="width: 300px;">
            <Option value="1">视频文件</Option>
            <Option value="2">音频文件</Option>
            <Option value="3">图片</Option>
          </Select>
        </FormItem>

        <div id="uploadDiv">
          <FormItem label="节目名称" prop="name">
            <Input v-model="addProgramForm.name" placeholder="请输入节目名称" style="width: 300px"/>
          </FormItem>
          <p>节目内容</p>
          <br>
          <FormItem>
            <Upload
              multiple
              :before-upload="handleBeforeUpload"
              type="drag"
              :format="['mp3','mp4','jpg','jpeg','png']"
              :data="fileData"
              action>
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或拖拽文件上传</p>
              </div>
            </Upload>
          </FormItem>
        </div>
      </Form>
    </Modal>


    
    <Modal v-model="addText" width="700px" title="新增文本" :mask-closable="false" :styles="{top: '50px'}">
      <Form  ref="addTextForm" :model="addTextForm" :rules="addRule" >
        <FormItem label="节目类型" prop="type" :label-width="80">
          <Select v-model="addTextForm.type" placeholder="请选择文件类型" style="width: 300px;" disabled>
            <Option value="4">文字</Option>
          </Select>
        </FormItem>
        <div id="fullText">          
          <FormItem label="节目名称" prop="name" :label-width="80">
            <Input v-model="addTextForm.name" placeholder="请输入节目名称" style="width: 300px"/>
          </FormItem>
          <FormItem label="对齐方式" prop="align" :label-width="80">
            <Select v-model="addTextForm.align"  placeholder="请选择对齐方式" style="width: 300px;">
              <Option value="top">上对齐</Option>
              <Option value="center">居中</Option>
              <Option value="bottom">下对齐</Option>
            </Select>
          </FormItem>
          <FormItem label="滚动方向" prop="direction" :label-width="80"> 
            <Select v-model="addTextForm.direction"  placeholder="请选择滚动方向" style="width: 300px;">
              <Option value="left">向左</Option>
              <Option value="right">向右</Option>
            </Select>
          </FormItem> 
          <FormItem label="滚动次数" prop="num" :label-width="80">
            <Input v-model="addTextForm.num" placeholder="请输入滚动次数" style="width: 300px"/>
          </FormItem>   
          <FormItem label="步进间隔" prop="interval" :label-width="80">
            <Input v-model="addTextForm.interval" placeholder="请输入步进间隔" style="width: 300px"/>
          </FormItem>          
       
          <FormItem label="步进距离" prop="step" :label-width="80">
            <Input v-model="addTextForm.step" placeholder="请输入步进距离" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <div id="editorElem" style="text-align:left"></div>
          </FormItem>
          <Button @click="handleAddSubmit('addTextForm')" long   type="primary" >提交</Button>
        </div>
      </Form>
      <p slot="footer"></p>
    </Modal>



    <Modal v-model="editText" width="700px" title="编辑文本" :mask-closable="false" :styles="{top: '50px'}">
      <Form  ref="editTextForm" :model="editTextForm" :rules="addRule">
        <FormItem label="节目类型" prop="type" :label-width="80">
          <Select v-model="editTextForm.type" placeholder="请选择文件类型" style="width: 300px;" disabled>
            <Option value="4">文字</Option>
          </Select>
        </FormItem>
        <div id="fullText">          
          <FormItem label="节目名称" prop="name" :label-width="80">
            <Input v-model="editTextForm.name" placeholder="请输入节目名称" style="width: 300px"/>
          </FormItem>
          <FormItem label="对齐方式" prop="align" :label-width="80">
            <Select v-model="editTextForm.align"  placeholder="请选择对齐方式" style="width: 300px;">
              <Option value="top">上对齐</Option>
              <Option value="center">居中</Option>
              <Option value="bottom">下对齐</Option>
            </Select>
          </FormItem>
          <FormItem label="滚动方向" prop="direction" :label-width="80">
            <Select v-model="editTextForm.direction"  placeholder="请选择滚动方向" style="width: 300px;">
              <Option value="left">向左</Option>
              <Option value="right">向右</Option>
            </Select>
          </FormItem> 
          <FormItem label="滚动次数" prop="num" :label-width="80">
            <Input v-model="editTextForm.num" placeholder="请输入滚动次数" style="width: 300px"/>
          </FormItem>   
          <FormItem label="步进间隔" prop="interval" :label-width="80">
            <Input v-model="editTextForm.interval" placeholder="请输入步进间隔" style="width: 300px"/>
          </FormItem>          
       
          <FormItem label="步进距离" prop="step" :label-width="80">
            <Input v-model="editTextForm.step" placeholder="请输入步进距离" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <div id="editorElem2" style="text-align:left"></div>
          </FormItem>
          <Button @click="handleEditSubmit()" long  type="primary" >提交</Button>
        </div>
      </Form>
      <p slot="footer"></p>
    </Modal>


  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";
import Editor from 'wangeditor';
import 'wangeditor/release/wangEditor.min.css';
import { on, off } from "@/libs/tools";
import {getPrograms, deleteFile, editFile, uploadText, getTextList, deleteText, updateText} from "@/api/file_manage";
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
      totalNum: 11, //table 数据条数
      totalTextNum: 7,
      pageNum: 1,
      textPageNum: 1,
      tableSize: 11,
      textTableSize: 11,
      searchOn: false,
      deleteFile: false,
      deleteText:false,
      addProgram:false,
      addText:false,
      editText:false,
      editFormModal: false,
      deleteFileIndex:0,
      deleteTextIndex:0,
      editTextIndex:0,
      editorSaver:0,
      editorSaver:2,
      editForm:{},

      addProgramForm:{
        type:"1",
        name:""
      },

      addTextForm:{
        type:"4",
        name:"",
        content:"",
        align:"center",
        direction: "left",
        interval: 0,
        num: 0,
        step: 0,
      },

      editTextForm:{
        type:"4",
        name:"",
        align:"center",
        direction: "left",
        interval: 0,
        num: 0,
        id:0,
        step: 0,
      },
      
      addRule: {
        name: [
          { required: true, message: '请输入节目名称', trigger: 'blur' }
        ],
        interval: [
          { required: true, message: '请输入步进间隔', trigger: 'blur', type:'number' }
        ],
        num: [
          { required: true, message: '请输入滚动次数', trigger: 'blur', type:'number' }
        ],
        step: [
          { required: true, message: '请输入步进距离', trigger: 'blur', type:'number' }
        ],
      },

      editRule:{
        name: [
          { required: true, message: '请输入节目名称', trigger: 'blur' }
        ],
      },

      // fileData
      fileData: { fileName: "李易峰 - 请跟我联络.mp3", type: "2", length: 21.21, size: 32.32 , taskName:null},

      //操作按钮的弹窗
      searchData:{
        fileType:0
      },
      tablecolumns: [
        {
            title: 'ID',
            key: 'id',
            minWidth:80
        },
        {
            title: '节目名称',
            key: 'name',
            sortable: true,
            minWidth:180
        },
        {
            title: '文件类型',
            minWidth: 120,
            key: 'fileType',
            sortable: true
        },
        {
            title: '文件大小',
            minWidth: 120,
            key: 'size',
            sortable: true
        },
        {
            title: '创建时间 ',
            key: 'createDate',
            sortable: true,
            minWidth:160
        },
        {
            title: '节目长度',
            key: 'length',
            minWidth:120
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
                      this.beforeFileEdit(params.index);
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
                      this.deleteFileIndex = params.index;
                      this.deleteFile = true;
                    }
                  }
                },
              )
            ]);
          },
          width: 100,
        }
      ],
      tabledata: [],
      tablecolumns_text: [
        {
            title: 'ID',
            key: 'id',
            minWidth:80
        },
        {
            title: '任务名称',
            key: 'title',
            minWidth:120,
        },
        {
            title: '对齐方式',
            key: 'alignT',
            sortable: true,
            minWidth:100,
        },
        {
            title: '滚动方向',
            key: 'directionT',
            sortable: true,
            minWidth:100,
        },
        {
            title: '步进间隔',
            key: 'interval',
            sortable: true,
            minWidth:100,
        },
        {
            title: '滚动次数 ',
            key: 'num',
            sortable: true,
            minWidth:100,
        },
        {
            title: '步进距离',
            key: 'step',
            minWidth:100,
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
                    size: 26,
                    value:params.row.ad==1
                  },
                  style: {
                    color: "#d2a35b",
                  },
                  on: {
                    click: () => {
                      this.editTextIndex=params.index;
                      this.beforeEdit();
                    }
                  }
                },
              )
            ]);
          },
          width: 100,
        },
        {
          title: "删除文本",
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
                      this.deleteTextIndex = params.index;
                      this.deleteText = true;
                    }
                  }
                },
              )
            ]);
          },
          width: 100,
        }
      ],
      tabledata_text: [],
    };
  },

  methods: {
    //文件列表----------------------------------------------------------
    getFileList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      if (!this.searchOn){
        getPrograms({
          token: token,
          pageNo: this.pageNum,
          pageSize: this.tableSize
        })
          .then(res => {
            console.log("=========================");
            console.log("文件列表:");
            console.log(res.data);
            //初始化
            this.totalNum=Number(res.data.total);
            this.tabledata = res.data.result;
            this.fileTypeFormate(this.tabledata);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
            this.$Message.error('获取文件列表失败');
          });
      }else{
        getPrograms({
          token: token,
          pageNo: this.pageNum,
          pageSize: this.tableSize,
          type: this.searchData.fileType
        })
          .then(res => {
            console.log("=========================");
            console.log("文件列表:");
            console.log(res.data);
            //初始化
            this.totalNum=Number(res.data.total);
            this.tabledata = res.data.result;
            this.fileTypeFormate(this.tabledata);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }
    },
    //文件类型转换
    fileTypeFormate(data){
      for (let i in data){
        if (data[i].type==1){
          data[i].fileType="视频文件";
        }
        if (data[i].type==2){
          data[i].fileType="音频文件";
        }
        if (data[i].type==3){
          data[i].fileType="图片";
        }
        if (data[i].type==4){
          data[i].fileType="文字";
        }
        if (data[i].type==5){
          data[i].fileType="其他";
        }
      }
    },
    //文本列表
    getTextList(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getTextList({
        token: token,
        pageNo: this.textPageNum,
        pageSize: this.textTableSize
      })
        .then(res => {
          console.log("=========================");
          console.log("文本列表:");
          console.log(res.data);
          //初始化
          this.totalTextNum=Number(res.data.total);
          this.tabledata_text = res.data.result;
          this.TraslateTextProps(this.tabledata_text);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    TraslateTextProps(data){
      for (let i in data){
        if (data[i]["align"]=="top"){
          data[i]["alignT"]="上对齐";
        }
        if (data[i]["align"]=="center"){
          data[i]["alignT"]="居中";
        }
        if (data[i]["align"]=="bottom"){
          data[i]["alignT"]="下对齐";
        }
        if (data[i]["direction"]=="left"){
          data[i]["directionT"]="向左";
        }
        if (data[i]["direction"]=="right"){
          data[i]["directionT"]="向右";
        }
      }
    },
    //翻页--------------------------------------------------------------
    turnPage(pageNo){
      this.pageNum=pageNo;
      console.log(pageNo);
      this.getFileList();
    },
    turnTextPage(pageNo){
      this.textPageNum=pageNo;
      console.log(pageNo);
      this.getTextList();
    },
    //新建任务----------------------------------------------------------
    //清空表格内容
    resetForm(){
      this.addProgramForm.name = "";
      this.addProgramForm.type = "1";
    },
    resetTextForm(){
      this.$refs['addTextForm'].resetFields();
      this.addTextForm.name = "";
      this.addTextForm.type = "4";
      this.addTextForm.content = "";
      this.addTextForm.align = "center";
      this.addTextForm.direction = "left";
      this.addTextForm.interval = 0;
      this.addTextForm.num = 0;
      this.addTextForm.step = 0;
      this.editorSaver.txt.html('<p><br></p>');
    },
    handleBeforeUpload(file) {
      this.fileData.fileName = file.name;
      this.fileData.size = parseFloat(file.size) / 1024;
      //文件类型解析
      this.fileData.type=Number(this.addProgramForm.type);
      // this.fileData.type=this.fileTypeDecrept(file.name);
      let that = this;
      //节目名称
      if (this.addProgramForm.name!=""){
        this.fileData.taskName=this.addProgramForm.name;
      }else{
        this.fileData.taskName=null;
      }
      //获取文件时长
      var url = URL.createObjectURL(file);
      //图片
      if (this.addProgramForm.type==3){
        this.fileData.length = 0;
        this.upload(file, url);
      }
      //媒体文件
      else{
        var audioElement = new Audio(url);
        var d;
        audioElement.addEventListener("loadedmetadata", function(_event) {
          d = audioElement.duration;
          that.fileData.length = d;
          that.upload(file, url);
        });
      }
    },
    //文件类型解析
    fileTypeDecrept(fileName){
      let flieArr = fileName.split('.');
      let suffix = flieArr[flieArr.length - 1];
      if (suffix=="mp3"){
        return 2;
      }else if (suffix=="mp4"){
        return 1;
      }else if (suffix=="png"||suffix=="jpg"||suffix=="jpeg"){
        return 3;
      }else if (suffix=="txt"){
        return 4
      }else{
        return 5;
      }
    },
    //文件上传
    //重写upload方法
    upload(file, url) {
      let token = this.$store.state.user.token;
      //创建 formData 对象
      let formData = new FormData();
      //向 formData 对象中添加文件
      formData.append("file", file);
      formData.append("length", this.fileData.length);
      formData.append("type", this.fileData.type);
      formData.append("size", this.fileData.size);
      if (this.fileData.taskName==null){
        formData.append("fileName", this.fileData.fileName);
      }else{
        formData.append("fileName", this.fileData.taskName);
      }
      this.uploadFile(this.headers, formData);
    },

    // uploadFile
    uploadFile(headers, formData) {
      let that = this;
      axios
        .post(
          "http://qsiotsys.com/api/smart-city/info-publish/program/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: this.$store.state.user.token
            }
          }
        )
        .then(res => {
          console.log(res.data);
          this.getFileList();
          that.$Message.success("上传成功");
          this.addProgram=false;
        })
        .catch(err => {
          console.log(err.response.data.message);
          that.$Message.info("上传失败");
          this.addProgram=false;
        });
    },
    //编辑文件
    beforeFileEdit(index){
      this.$refs['editForm'].resetFields();
      this.editForm.name=this.tabledata[index].name;
      this.editForm.id=this.tabledata[index].id;
      this.editFormModal=true;
    },
    beforeFileEditSubmit(){
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.fileEditSubmit();
        } else {
          this.$Message.error('节目名称不能为空!');
        }
      })
    },
    fileEditSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      editFile({
        token: token,
        name:this.editForm.name,
        id:this.editForm.id,
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑文件:");
          console.log(res.data);
          this.getFileList();
          this.$Message.success("修改成功");
          this.editFormModal=false;
        })
        .catch(err => {
          console.log("===========error==============");
          this.$Message.error("修改失败");
          console.log(err);
          this.editFormModal=false;
        });
    },
    //新增富文本
    handleAddSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.handleSubmit();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    handleSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      uploadText({
        token: token,
        title:this.addTextForm.name,
        align: this.addTextForm.align,
        content: this.addTextForm.content,
        direction: this.addTextForm.direction,
        interval: this.addTextForm.interval,
        num: this.addTextForm.num,
        step: this.addTextForm.step,
      })
        .then(res => {
          console.log("=========================");
          console.log("上传富文本:");
          console.log(res.data);
          this.getTextList();
          this.$Message.success("上传成功");
          this.addText=false;
        })
        .catch(err => {
          console.log("===========error==============");
          this.$Message.error("上传失败");
          console.log(err);
          this.addText=false;
        });
    },
    //编辑文本--------------------------------------------------------------
    beforeEdit(){
      this.$refs['editTextForm'].resetFields();
      this.editTextForm.id=this.tabledata_text[this.editTextIndex].id;
      this.editTextForm.name=this.tabledata_text[this.editTextIndex].title;
      this.editTextForm.type="4";
      this.editorSaver2.txt.html(this.tabledata_text[this.editTextIndex].content);
      this.editTextForm.content=this.tabledata_text[this.editTextIndex].content;
      this.editTextForm.align=this.tabledata_text[this.editTextIndex].align;
      this.editTextForm.direction=this.tabledata_text[this.editTextIndex].direction;
      this.editTextForm.interval=this.tabledata_text[this.editTextIndex].interval;
      this.editTextForm.num=this.tabledata_text[this.editTextIndex].num;
      this.editTextForm.step=this.tabledata_text[this.editTextIndex].step;
      this.editText=true;
    },
    handleEditSubmit() {
      this.$refs['editTextForm'].validate((valid) => {
        if (valid) {
          this.editSubmit();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    editSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      updateText({
        token: token,
        id: this.editTextForm.id,
        title: this.editTextForm.name,
        align: this.editTextForm.align,
        content: this.editTextForm.content,
        direction: this.editTextForm.direction,
        interval: this.editTextForm.interval,
        num: this.editTextForm.num,
        step: this.editTextForm.step,
      })
        .then(res => {
          console.log("=========================");
          console.log("更新富文本:");
          console.log(res.data);
          this.getTextList();
          this.$Message.success("更新成功");
          this.editText=false;
        })
        .catch(err => {
          console.log("===========error==============");
          this.$Message.error("更新失败");
          console.log(err);
          this.editText=false;
        });
    },
    //搜索--------------------------------------------------------------
    search(){
      if (this.searchData.fileType==0){
        this.pageNum=1;
        this.$refs.pager.current = 1;
        this.searchOn=false;
        this.getFileList();
      }else{
        //回到第一页
        this.pageNum=1;
        this.$refs.pager.current = 1;
        this.searchOn=true;
        this.getFileList();
      }
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    //删除--------------------------------------------------------------
    //文件
    ok(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteFile({
        token: token,
        id: this.tabledata[this.deleteFileIndex].id
      })
        .then(res => {
          console.log("=========================");
          console.log("文件已删除:");
          console.log("ID:"+this.tabledata[this.deleteFileIndex].id);
          console.log(res.data);
          this.getFileList();
          this.$Message.success('已删除文件');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    cancel(){
      this.deleteFile=false;
    },
    //文本
    deletTextSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteText({
        token: token,
        id: this.tabledata_text[this.deleteTextIndex].id
      })
        .then(res => {
          console.log("=========================");
          console.log("文件已删除:");
          console.log("ID:"+this.tabledata_text[this.deleteTextIndex].id);
          console.log(res.data);
          this.getTextList();
          this.$Message.success('已删除文件');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    cancelText(){
      this.deleteText=false;
    },
    //初始化
    initData(){
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      this.textPageNum=1;
      this.$refs.pager2.current = 1;
      //清空搜素条件
      this.searchOn = false;
      //获取文件列表
      this.getFileList();
      this.getTextList();
    }
  },
  mounted() {
    this.initData();
    //富文本
    this.editorSaver = new Editor('#editorElem')
    this.editorSaver.customConfig.onchange = (html) => {
      this.addTextForm.content = html;
    }
    this.editorSaver.create()
    this.editorSaver2 = new Editor('#editorElem2')
    this.editorSaver2.customConfig.onchange = (html) => {
      this.editTextForm.content = html;
    }
    this.editorSaver2.create()
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

<template>
  <div class="search">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
          <Row>

            <Select class="userSelection" v-model="selectedOption" style="width:100px;margin-right:5px;margin-left:50px;">
                <Option v-for="item in searchList" :value="item.value" :key="item.value">
                  <template>
                    <span v-if="item.id === 0">
                      <Icon type="ios-contact" size="16"></Icon>
                    </span>
                    <span v-else-if="item.id === 1">
                      <Icon type="ios-call" size="16"></Icon>
                    </span>
                    <span v-else>
                      <Icon type="ios-mail" size="16"></Icon>
                    </span>
                  </template>
                  {{ item.label }}
                </Option>
            </Select>
            <Input v-model="keyword" placeholder="请输入搜索文字..." style="width: 300px"/>
            <Button type="primary" class="search_btn" style="width:100px;font-size:16px;background-color:#119AE5;" @click="search()"><Icon type:item.icon size="20"/>搜索</Button>
            <Button class="search_btn" @click="initData()" style="width:100px;font-size:16px;">重置</Button>
            <Button type="primary" icon="md-add" @click="handleAddUser('handleAddUser')" style="width:140px;float:right;font-size:16px;background-color:#119AE5;">添加用户</Button>
          </Row>
          <br>
          <Row class="user-table-row">
            <Table class="userTable" highlight-row ref="currentRowTable" border :columns="tablecolumns" :data="tabledata"></Table>
            <!-- <Button @click="handleClearCurrentRow">Clear</Button> -->
          </Row>
          <br>
          <Row class="paging" type="flex" justify="end" style="margin-bottom:10px;margin-right:50px;">
            <Page ref="pager" id="pager" :total="totalNum" :current="UserPageNum" @on-change="turnPage" :page-size="tableSize" show-total show-elevator/>
          </Row>

          <Modal v-model="addUser" @on-ok="asyncOK" footer-hide :loading="loading">
            <p slot="header" style="text-align:center">
              <span>添加用户</span>
            </p>
            <div>
              <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <FormItem label="用户名" prop="displayName">
                  <Input v-model="formItem.displayName" placeholder="请输入用户名" style="width: 300px"/>
                </FormItem>
                <FormItem label="性别" prop="gender">
                  <RadioGroup v-model="formItem.gender" >
                    <Radio label="1">男</Radio>
                    <Radio label="0">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="角色" prop="roles">
                  <!--<Select v-model="formItem.roles" placeholder="Select role" multiple style="width: 300px">
                    <Option value="001">admin</Option>
                    <Option value="002">super_admin</Option>
                    <Option value="003">user</Option>
                  </Select>-->
                  <Input v-model="formItem.roles_name" placeholder="请选择权限" multiple style="width: 300px"/>

                  <Button type="primary"  @click="handleAddUser1(false)">选择权限</Button>
                </FormItem>
                <!-- <FormItem label="状态" prop="status">
                  <Input v-model="formItem.status" placeholder="请输入状态"/>
                </FormItem> -->
                <FormItem label="电话" prop="tel">
                  <Input v-model="formItem.tel" placeholder="请输入电话" style="width: 300px"/>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                  <Input v-model="formItem.email" placeholder="请输入邮箱" style="width: 300px"/>
                </FormItem>
                <FormItem label="地址" prop="address">
                  <Input v-model="formItem.address" placeholder="请输入地址" style="width: 300px"/>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleAddSubmit('formItem')">提交</Button>
                  <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
                </FormItem>
              </Form>
            </div>
          </Modal>

          <Modal v-model="addUser1" @on-ok="asyncOK" footer-hide :loading="loading"  width="40">
            <p slot="header" style="text-align:center">
              <span>选择角色</span>
            </p>
            <div>
              <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <Table @on-selection-change="roletable"  class="userTable" highlight-row ref="selection" border :columns="role_tablecolumns" :data="role_tabledata"></Table>
                <!--@on-change="turnRoleUserPage"-->

                <FormItem>
                    <div>
                      <tr>
                        <td width="1500px"><Page ref="pager2" id="pager2" :total="roleUserTotalNum" :current="roleUserPageNum"  :page-size="roleUserTableSize" show-total show-elevator width="90"/>
                        </td>

                        <td><Button  style="margin-left: 8px" @click="closeAddUser1()">确定</Button></td>
                      </tr>
                  </div>
                </FormItem>
              </Form>
            </div>
          </Modal>

          <Modal v-model="editUser" footer-hide @on-ok="asyncOK" :loading="loading">
            <p slot="header" style="text-align:center">
              <span>修改用户</span>
            </p>
            <div>
              <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
                <FormItem label="用户名" prop="displayName">
                  <Input v-model="formItem.displayName" placeholder="请输入用户名" style="width: 300px"/>
                </FormItem>
                <FormItem label="性别" prop="gender">
                  <RadioGroup v-model="formItem.gender">
                    <Radio label="1">男</Radio>
                    <Radio label="0">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="角色" prop="roles">

                  <Input v-model="formItem.roles_name" placeholder="请选择权限" multiple style="width: 300px"/>

                  <Button type="primary"  @click="handleAddUser1(false)">选择权限</Button>

                </FormItem>
                <!-- <FormItem label="状态" prop="status">
                  <Input v-model="formItem.status" placeholder="请输入状态"/>
                </FormItem> -->
                <FormItem label="电话" prop="tel">
                  <Input v-model="formItem.tel" placeholder="请输入电话" style="width: 300px"/>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                  <Input v-model="formItem.email" placeholder="请输入邮箱" style="width: 300px"/>
                </FormItem>
                <FormItem label="地址" prop="address">
                  <Input v-model="formItem.address" placeholder="请输入地址" style="width: 300px"/>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleEditSubmit('formItem')">提交</Button>
                  <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
                </FormItem>
              </Form>
            </div>
          </Modal>

          <Modal v-model="editPerm" @on-ok="asyncOK" :loading="loading" :width="800">
            <p slot="header" style="text-align:center">
              <span>编辑权限</span>
            </p>

            <div>
              <Tree :data="permData" show-checkbox></Tree>
            </div>
          </Modal>
          <div></div>
        </Row>
      </Row>


      <!-- 删除用户 -->
      <Modal
        v-model="deleteUserWarning"
        title="确定要删除这个用户吗"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>这会删除的此用户的所有信息，信息将不可恢复。</p>
      </Modal>


    </Content>
  </div>
</template>

<script>
import treedata from "./data/perm_treedata";
import {getAllUser, addUser, deleteUser, updateUser,getRoles} from "@/api/user_management";
import Button from "iview/src/components/button/button";
const axios = require("axios");

export default {
  components: {Button},
  name: "user-manage",
  data() {
    return {
      roleUserTableSize: 10,
      roleUserTotalNum:0,
      roleUserPageNum:1,
      tableSize1: 10,
      role_tabledata:[],
      addUser1:false,
      keyword: "",
      UserPageNum:1,
      tableSize:10,
      searchOn:false,
      deleteUserWarning: false,
      selectedUserId:1,
      selectedOption: 'username',
      selectedUser:[],
      searchList: [
          {
              value: 'username',
              label: '用户名',
              id: 0,
          },
          {
              value: 'phone',
              label: '电话',
              id: 1,
          },
          {
              value: 'email',
              label: '邮箱',
              id: 2,
          }
      ],
      role_tablecolumns: [
        {
        type: 'selection',
        width: 60,
        align: 'center'
        },
        {
          title: '角色代码',
          key: 'code',
          minWidth: 50,
          sortable: true
        },
        {
          title: '角色名称',
          key: 'name',
          minWidth: 80,
          sortable: true
        },
        {
          title: '状态名称',
          minWidth: 50,
          key: 'statusName',
          sortable: true
        },
        {
          title: '描述',
          minWidth: 100,
          key: 'description',
          sortable: true
        }],
      tablecolumns: [
        // {
        //   type: "selection",
        //   width: 50,
        //   align: "center"
        // },
        // {
        //   title: "ID",
        //   key: "userId",
        //   //width: 60,
        // },
        {
          title: "用户名",
          key: "displayName",
          minWidth:120,
          fixed: 'left'
        },
        {
          title: "性別",
          key: "gender-translated",
          minWidth:80
        },
        {
          title: "角色",
          key: "roles",
          minWidth:120
        },
        {
          title: "状态",
          key: "statusName",
          minWidth:100
        },
        {
          title: "地址",
          width: 350,
          key: "address"
        },
        {
          title: "电话",
          width: 130,
          key: "tel"
        },
        {
          title: "邮箱",
          width: 180,
          key: "email"
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
                    type: "default",
                  },
                  style: {
                    marginRight: "5px",
                    backgroundColor: "#d2a35b",
                    color: "white",
                    border: "1px solid #d2a35b"
                  },
                  on: {
                    click: () => {
                      this.handleEditUser(params.index);
                    }
                  }
                },
                "编辑用户"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                  },
                  style: {
                    marginRight: "5px",
                    backgroundColor: "#d64c4c",
                    color: "white",
                    border: "1px solid #d64c4c"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除用户"
              )
            ]);
          },
          width: 210,
        }
      ],
      tabledata: [],
      addUser: false,
      editUser: false,
      editPerm: false,
      loading: true,
      totalNum: 0,

      formItem: {
        userId:"",
        address: "",
        displayName: "",
        email: "",
        gender: "",
        tel:"",
        roles:[],
        roles_name:[]
      },
      ruleValidate: {
        email: [
          {
            required: true,
            message: "请输入邮箱！",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱格式！", trigger: "blur" }
        ],

        /*roles: [
          { required: true, message: "请选择用户类型！", trigger: "change" }
        ],*/

        gender: [
          { required: true, message: "请选择性别！", trigger: "change" }
        ],
        address: [
          {
            required: true,
            message: "请输入地址！",
            trigger: "blur"
          }
        ],
        displayName: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "blur"
          }
        ],
        userId: [
          {
            required: true,
            message: "请选择用户ID！",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入电话！",
            trigger: "blur"
          }
        ]
      },
      permData: treedata.data
    };
  },
  methods: {
    roletable(selection){
      var list=[];
      var list2=[]
      //console.log(selection)
      for(var i in selection){
        list.push(selection[i].code)
        list2.push(selection[i].name)
      }
      this.formItem.roles=list
      this.formItem.roles_name=list2
     console.log(this.formItem.roles)
      console.log(this.formItem.roles_name)

    },
    //角色列表----------------------------------------------------------
    getRoles() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getRoles({
        token: token,
        page: this.roleUserPageNum,
        size: this.roleUserTableSize
      })
        .then(res => {
          console.log("=========================");
          console.log("区域列表:");
          console.log(res.data);
          //初始化
          this.roleUserTotalNum=Number(res.data.total);
          this.role_tabledata = res.data.result;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //用户管理----------------------------------------------------------
    getUserList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      if (!this.searchOn){
        getAllUser({
          token: token,
          page: this.UserPageNum,
          size: this.tableSize1
        })
          .then(res => {
            console.log("=========================");
            console.log("用户列表:");
            console.log(res.data);
            //初始化
            this.tabledata = res.data.result;
            this.formateGender(this.tabledata);
            this.totalNum=Number(res.data.total);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }else{
        console.log(this.selectedOption+"------"+this.keyword);
        if (this.selectedOption=="username"){
          getAllUser({
            token: token,
            page: this.UserPageNum,
            size: this.tableSize,
            displayName: this.keyword
          })
            .then(res => {
              console.log("=========================");
              console.log("用户列表-搜索用户名:");
              console.log(res.data);
              //初始化
              this.tabledata = res.data.result;
              this.formateGender(this.tabledata);
              this.totalNum=Number(res.data.total);
            })
            .catch(err => {
              console.log("===========error==============");
              console.log(err);
            });
        }else if(this.selectedOption=="phone"){
          getAllUser({
            token: token,
            page: this.UserPageNum,
            size: this.tableSize,
            tel : this.keyword
          })
            .then(res => {
              console.log("=========================");
              console.log("用户列表-搜索电话:");
              console.log(res.data);
              //初始化
              this.tabledata = res.data.result;
              this.formateGender(this.tabledata);
              this.totalNum=Number(res.data.total);
            })
            .catch(err => {
              console.log("===========error==============");
              console.log(err);
            });
        }else if(this.selectedOption=="email"){
          getAllUser({
            token: token,
            page: this.UserPageNum,
            size: this.tableSize,
            email: this.keyword
          })
            .then(res => {
              console.log("=========================");
              console.log("用户列表-搜索邮箱:");
              console.log(res.data);
              //初始化
              this.tabledata = res.data.result;
              this.formateGender(this.tabledata);
              this.totalNum=Number(res.data.total);
            })
            .catch(err => {
              console.log("===========error==============");
              console.log(err);
            });
        }
      }
    },
    //性别转中文
    formateGender(data){
      for (let i in data){
        if (data[i]["gender"]==1){
          data[i]["gender-translated"]="男";
        }else if (data[i]["gender"]==0){
          data[i]["gender-translated"]="女";
        }
        //data[i]["roles-formate"]=data[i]["roles"][0];
      }
    },
    //搜索----------------------------------------------------------
    search(){
      this.searchOn=true;
      this.getUserList();
    },
    //翻页--------------------------------------------------------------
    turnPage(pageNo){
      this.UserPageNum=pageNo;
      console.log(pageNo);
      this.getUserList();
    },
    //用户选中
    selectionUpdate(selection){
      this.selectedUser=selection;
    },
    //增----------------------------------------------------------------
    addNewUser() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      console.log(this.formItem);
      addUser({
        token: token,
        tel: this.formItem.tel,
        gender: this.formItem.gender,
        address: this.formItem.address,
        email: this.formItem.email,
        displayName: this.formItem.displayName,
        roles: this.formItem.roles,
      })
        .then(res => {
          console.log("=========================");
          console.log("添加用户:");
          console.log(res.data);
          if (res.data.message=="用户已存在"){
            this.$Message.error('用户已存在');
          } else{
            this.$Message.success('添加成功');
            this.getUserList();
          }
          this.handleReset(this.formItem);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //删----------------------------------------------------------------
    deleteChoosenUser(userId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteUser({
        token: token,
        userId: userId
      })
        .then(res => {
          this.getUserList();
          this.$Message.success('已删除用户');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //删除用户按钮
    remove(index) {
      this.selectedUserId=this.tabledata[index].userId;
      this.deleteUserWarning=true;
    },
    ok () {
      this.deleteChoosenUser(this.selectedUserId);
    },
    cancel () {
      this.$Message.info('已取消');
    },

    //改----------------------------------------------------------------
    editSeletedUser(userId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      updateUser({
        token: token,
        tel: this.formItem.tel,
        gender: Number(this.formItem.gender),
        address: this.formItem.address,
        email: this.formItem.email,
        roles:this.formItem.roles,
        displayName: this.formItem.displayName,
        userId: userId,
        roles: i,
      })
        .then(res => {
          console.log("=========================");
          console.log("修改用户:");
          console.log(this.formItem);
          console.log(res.data);
          this.$Message.success('修改成功');
          this.getUserList();//刷新页面
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //-----------------------------------------------------------------

    asyncOK(modal) {
      setTimeout(() => {
        if (modal == "addUser") {
          this.addUser = false;
        } else if (modal == "editUser") {
          this.editUser = false;
        } else if (modal == "editPerm") {
          this.editPerm = false;
        }
      }, 1000);
    },

    handleAddUser() {
      this.resetFormItem();
      this.addUser = true;
    },
    handleAddUser1(status) {
      this.$refs.selection.selectAll(status);
      this.addUser1 = true;
    },

    closeAddUser1() {
      this.addUser1 = false;
    },
    handleAddSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.asyncOK("addUser");
          this.addNewUser();
        } else {
          this.$Message.error("请填写完整信息！");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleEditUser(index) {
      this.selectedUserId=this.tabledata[index].userId;
      this.formItem = {

        //role: this.tabledata[index].role,
        address: this.tabledata[index].address,
        displayName: this.tabledata[index].displayName,
        roles:this.tabledata[index].roles,
        email: this.tabledata[index].email,
        gender: this.tabledata[index].gender+"",
        tel: this.tabledata[index].tel
      };
      this.editUser = true;
    },
    handleEditSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          this.editSeletedUser(this.selectedUserId);
          this.asyncOK("editUser");
        } else {
          this.$Message.error("请填写完整信息！");
        }
      });
    },
    resetFormItem() {
      this.formItem.roles = [];
      this.formItem.address = "";
      this.formItem.displayName = "";
      this.formItem.status = "";
      this.formItem.email = "";
      this.formItem.gender = "";
      this.formItem.tel = "";
    },
    handleEditPerm(index) {
      console.log(index);
      this.editPerm = true;
      // this.asyncOK("editPerm");
    },
    initData(){
      //回到第一页
      this.UserPageNum=1;
      this.$refs.pager.current = 1;
      //清空搜素条件
      this.searchOn=false;
      this.keyword = "";
      //获取用户列表
      this.getUserList();
      this.getRoles();
    },
  },
  mounted(){
    this.initData();
  }
};
</script>

<style lang="less" scoped>
.search label {
  font-size: 16px;
  margin-right: 20px;
  color: white;
}
.search .search_btn {
  margin-left: 20px;
}
.paging .ivu-page-total {
  color: white !important;
}
.ivu-page-options-elevator {
  color: white;
}
.background-row{
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(225, 225, 225, 1);
  border-radius: 10px 10px 10px 10px;
}
.layout {
  background: #001529;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
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

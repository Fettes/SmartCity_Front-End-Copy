<template>
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
          <Tabs value="name1" class="PropertyTab" >
            <TabPane label="角色管理" name="name1">
              <Row style="margin-left:19px;margin-right:19px;margin-bottom:7px;">
                <br>
                <Row style="font-size:14px;margin-left:5px;margin-right:5px;">
                  <Button class="manage-btn" type="primary" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95;float:left" @click="beforeAdd()"><Icon type="md-add" size="20"/>新增角色</Button>
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
            </TabPane>
            <TabPane label="菜单管理" name="name2">
              <Row>
                <i-col span="8">
                  <Row style="margin-left:20px;font-size:16px;">
                    <br>
                    <Tree :data="treeData" @on-select-change="TreeClick"></Tree>
                  </Row>
                </i-col>
                <i-col span="16">
                  <br>
                  <p style="font-size:20px;margin-left:30px;">菜单信息</p>
                  <br>
                  <Form ref="menuForm" :model="menuForm" :label-width="100" :rules="editMenuRule">
                    <FormItem label="菜单名称" prop="title">
                      <Input v-model="menuForm.title" placeholder="请输入菜单名称" style="width: 350px"/>
                    </FormItem>
                    <FormItem label="菜单代号" prop="code">
                      <Input v-model="menuForm.code" placeholder="请输入菜单代号" style="width: 350px" disabled/>
                    </FormItem>
                    <FormItem label="状态" prop="status">
                      <Select v-model="menuForm.status" placeholder="请选择菜单状态" style="width: 350px">
                          <Option value="0">未启用</Option>
                          <Option value="1">已启用</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="描述" prop="description">
                      <Input v-model="menuForm.description" placeholder="请输入菜单描述..." type="textarea" :autosize="{minRows: 3,maxRows: 6}" style="width: 350px"/>
                    </FormItem>   
                    <FormItem>
                      <Button type="primary" @click="beforeUpdateMenu()">保存修改</Button>
                      <Button type="error" style="margin-left: 8px;background-color:#d64c4c;border: 1px solid #d64c4c;color:white;" @click="beforeDeleteMenu()">删除菜单</Button>
                      <Button type="success" style="margin-left: 8px;background-color:#60cb95;border: 1px solid #60cb95" @click="beforeAddMenu()">添加子菜单</Button>
                      <Button type="warning" style="margin-left: 8px;background-color:#d2a35b;border: 1px solid #d2a35b" @click="beforeRoleManage()">管理权限</Button>
                    </FormItem>
                  </Form>
                </i-col>
              </Row>
            </TabPane>
          </Tabs>
        </Row>

        <!-- 用户管理抽屉 -->
        <Drawer width="75%" v-model="userManageDrawer">
          <p slot="header">
            <span>用户管理 - {{roleName}}</span>
          </p>
          <div>
            <br>
            <Row style="font-size:14px;margin-left:5px;">
              <span style="margin-right:17px;">
                <Button class="manage-btn" type="primary" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="beforeAddRoleUser()"><Icon type="md-add" size="20"/>添加用户</Button>
              </span>
              <span style="margin-right:17px;">
                <Button  class="manage-btn" type="error" style="font-size:16px;background-color:#d64c4c;border: 1px solid #d64c4c" @click="beforeDeleteRoleUser()"><Icon type="md-trash" size="20" />删除用户</Button>
              </span>
            </Row>
            <br>
            <Row class="user-table-row">
              <Table class="userTable"  @on-selection-change="selectionUpdate" border ref="selection" :columns="roleUserColumns" :data="roleUserData" style="margin-left:5px;margin-right:5px;"></Table>
            </Row>
            <br>
            <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
              <Page ref="pager3" id="pager3" :total="roleUserTotalNum" :current="roleUserPageNum" @on-change="turnRoleUserPage" :page-size="roleUserTableSize" show-total show-elevator/>
            </Row>
          </div>
        </Drawer>

        <!-- 未添加用户抽屉 -->
        <Drawer width="50%" v-model="restUserDrawer">
          <p slot="header">
            <span>添加用户</span>
          </p>
          <div>
            <br>
            <Row class="user-table-row">
              <Table class="userTable"  @on-selection-change="restUserSelectionUpdate" border ref="selection" :columns="restUserColumns" :data="restUserData" style="margin-left:5px;margin-right:5px;"></Table>
            </Row>
            <br>
            <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
              <Page ref="pager2" id="pager2" :total="restUserTotalNum" :current="restUserPageNum" @on-change="turnRestUserPage" :page-size="restUserTableSize" show-total show-elevator/>
            </Row>
          </div>
          <div class="footer">
            <Button style="margin-right: 8px" @click="restUserDrawer = false">取消</Button>
            <Button type="primary" @click="beforeAddRoleUserSubmit()">添加</Button>
          </div>
        </Drawer>


        <!-- 权限管理抽屉 -->
        <Drawer width="75%" v-model="roleManageDrawer">
          <p slot="header">
            <span>权限管理 - {{menuName}}</span>
          </p>
          <div>
            <br>
            <Row style="font-size:14px;margin-left:5px;">
              <span style="margin-right:17px;">
                <Button class="manage-btn" type="primary" style="font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="beforeAddMenuRole()"><Icon type="md-add" size="20" />添加角色</Button>
              </span>
              <span style="margin-right:17px;">
                <Button  class="manage-btn" type="error" style="font-size:16px;background-color:#d64c4c;border: 1px solid #d64c4c" @click="beforeDeleteMenuRole()"><Icon type="md-trash" size="20" />删除角色</Button>
              </span>
            </Row>
            <br>
            <Row class="user-table-row">
              <Table class="userTable"  @on-selection-change="roleSelectionUpdate" border ref="selection" :columns="roleManageColumns" :data="roleManageData" style="margin-left:5px;margin-right:5px;"></Table>
            </Row>
            <br>
            <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
              <Page ref="pager4" id="pager4" :total="roleTotalNum" :current="rolePageNum" @on-change="turnRolePage" :page-size="roleTableSize" show-total show-elevator/>
            </Row>
          </div>
        </Drawer>

        <!-- 未添加角色抽屉 -->
        <Drawer width="50%" v-model="restRoleDrawer">
          <p slot="header">
            <span>添加角色</span>
          </p>
          <div>
            <br>
            <Row class="user-table-row">
              <Table class="userTable"  @on-selection-change="restRoleSelectionUpdate" border ref="selection" :columns="restRoleColumns" :data="restRoleData" style="margin-left:5px;margin-right:5px;"></Table>
            </Row>
            <br>
            <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
              <Page ref="pager5" id="pager5" :total="restRoleTotalNum" :current="restRolePageNum" @on-change="turnRestRolePage" :page-size="restRoleTableSize" show-total show-elevator/>
            </Row>
          </div>
          <div class="footer">
            <Button style="margin-right: 8px" @click="restRoleDrawer = false">取消</Button>
            <Button type="primary" @click="beforeAddMenuRoleSubmit()">添加</Button>
          </div>
        </Drawer>

      </Row>
    </Content>

    <!-- 角色权限 -->
    <Modal v-model="roleMenuModal" :mask-closable="false" footer-hide width="300px">
      <p slot="header" style="text-align:left">
        <span>角色权限</span>
      </p>
      <div>
        <Row style="margin-left:20px">
          <Tree :data="roleMenuTree" show-checkbox @on-check-change="roleMenuChange"></Tree>
        </Row>
        <br>
        <Row>
          <Button style="float:right" type="primary" @click="roleMenuModal=false">关闭</Button>
        </Row>
        <Spin size="large" fix v-if="roleMenuShow"></Spin>
      </div>
    </Modal>

    <!-- 编辑角色 -->
    <Modal v-model="editModal" :mask-closable="false" footer-hide>
      <p slot="header" style="text-align:center">
        <span>编辑角色</span>
      </p>
      <div>
        <Form ref="editForm" :model="editForm" :label-width="100" :rules="editRule">
          <FormItem label="角色代码" prop="code">
            <Input v-model="editForm.code" style="width: 300px"  disabled/>
          </FormItem>
          <FormItem label="角色名称" prop="name">
            <Input v-model="editForm.name" style="width: 300px"/>
          </FormItem>
          <FormItem label="状态" prop="status">
            <Select v-model="editForm.status" placeholder="请选择状态" style="width: 300px">
              <Option value="true">有效</Option>
              <Option value="false">无效</Option>
            </Select>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input v-model="editForm.description" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleEditSubmit()">完成</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 新建角色 -->
    <Modal v-model="addModal" :mask-closable="false" footer-hide>
      <p slot="header" style="text-align:center">
        <span>新建角色</span>
      </p>
      <div>
        <Form ref="addForm" :model="addForm" :label-width="100" :rules="editRule">
          <FormItem label="角色代码" prop="code">
            <Input v-model="addForm.code" style="width: 300px"/>
          </FormItem>
          <FormItem label="角色名称" prop="name">
            <Input v-model="addForm.name" style="width: 300px"/>
          </FormItem>
          <FormItem label="状态" prop="status">
            <Select v-model="addForm.status" placeholder="请选择状态" style="width: 300px">
              <Option value="true">有效</Option>
              <Option value="false">无效</Option>
            </Select>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input v-model="addForm.description" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleAddSubmit()">创建</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 添加子菜单 -->
    <Modal v-model="addMenuModal" :mask-closable="false" footer-hide>
      <p slot="header" style="text-align:center">
        <span>添加子菜单</span>
      </p>
      <div>
        <Form ref="addMenuForm" :model="addMenuForm" :label-width="100" :rules="addMenuRule">
          <FormItem label="菜单名称" prop="title">
            <Input v-model="addMenuForm.title" placeholder="请输入菜单名称" style="width: 300px"/>
          </FormItem>
          <FormItem label="菜单代号" prop="code">
            <Input v-model="addMenuForm.code" placeholder="请输入菜单代号" style="width: 300px"/>
          </FormItem>
          <FormItem label="状态" prop="status">
            <Select v-model="addMenuForm.status" placeholder="请选择菜单状态" style="width: 300px">
              <Option value="0">未启用</Option>
              <Option value="1">已启用</Option>
            </Select>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input v-model="addMenuForm.description" placeholder="请输入菜单描述..." type="textarea" :autosize="{minRows: 3,maxRows: 6}" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="beforeAddMenuSubmit()">创建</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 删除角色 -->
    <Modal v-model="deleteModal" title="删除角色" @on-ok="deleteRole()" @on-cancel="deleteCancel()">
      <p>这会删除该角色，此操作不可恢复。</p>
    </Modal>

    <!-- 删除角色的用户 -->
    <Modal v-model="deleteRoleUserModal" title="删除角色下用户" @on-ok="deleteRoleUserOk()" @on-cancel="deleteRoleUserCancel()">
      <p>将这些用户从此角色中删除，此操作不可恢复。</p>
    </Modal>
    
    <!-- 删除菜单 -->
    <Modal v-model="deleteMenuModal" title="删除菜单" @on-ok="deleteMenuOk()" @on-cancel="deleteMenuCancel()">
      <p>这将删除所选页面，此操作不可恢复。</p>
    </Modal>

    <!-- 删除角色的用户 -->
    <Modal v-model="deleteMenuRoleModal" title="删除菜单下角色" @on-ok="deleteMenuRoleOk()" @on-cancel="deleteMenuRoleCancel()">
      <p>将这些角色从此菜单权限中删除，此操作不可恢复。</p>
    </Modal>

  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";
import { on, off } from "@/libs/tools";
import {
  getRoles,
  updateRole,
  createRole,
  deleteRole,
  getUserByRole,
  getMenus,
  delUserRole,
  getUserExcludeRole,
  addUserRole,
  updateMenu,
  deleteMenu,
  createMenu,
  getRoleMenus,
  deleteRoleMenu,
  addRoleMenu,
  getMenuRole,
  getExcludeRoles
  } from "@/api/role_manage";
const axios = require("axios");

export default {
  name: "device_role_manage",
  components: {
    InforCard,
    CountTo,
    Tables
    // Example
  },

  data() {
    return {
      totalNum: 12, //table 数据条数
      roleUserTotalNum: 0,
      restUserTotalNum: 0,
      roleTotalNum: 0,
      restRoleTotalNum: 0,
      pageNum: 1,
      roleUserPageNum: 1,
      restUserPageNum: 1,
      rolePageNum: 1,
      restRolePageNum: 1,
      tableSize: 9,
      roleUserTableSize: 12,
      restUserTableSize: 12,
      roleTableSize: 12,
      restRoleTableSize: 12,
      searchOn: false,
      deleteRoleCode: 1,
      currentRoleCode:1,
      roleName: "未定义",
      menuName: "未定义",
      //弹窗
      editModal: false,
      addModal: false,
      deleteModal: false,
      deleteRoleUserModal: false,
      addMenuModal: false,
      deleteMenuModal: false,
      roleMenuModal: false,
      deleteMenuRoleModal: false,
      //抽屉
      userManageDrawer: false,
      restUserDrawer: false,
      roleManageDrawer: false,
      restRoleDrawer: false,
      //加载
      roleMenuShow: false,

      editForm: {},
      addForm:{},
      menuForm:{},
      addMenuForm:{},
      tablecolumns: [
        {
            title: 'ID',
            width: 80,
            key: 'id',
        },
        {
          title: '角色代码',
          key: 'code',
          minWidth: 100,
          sortable: true
        },
        {
          title: '角色名称',
          key: 'name',
          minWidth: 100,
          sortable: true
        },
        {
          title: '状态名称',
          minWidth: 100,
          key: 'statusName',
          sortable: true
        },
        {
          title: '描述',
          minWidth: 150,
          key: 'description',
          sortable: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          minWidth: 150,
          sortable: true
        },
        {
          title: '修改时间',
          minWidth: 150,
          key: 'modifiedTime',
          sortable: true
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
                    backgroundColor: "#60cb95",
                    color: "white",
                    border: "1px solid #60cb95"
                  },
                  on: {
                    click: () => {
                      this.beforeEditUser(params.index);
                    }
                  }
                },
                "编辑用户"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                  },
                  style: {
                    marginRight: "5px",
                    backgroundColor: "#3fa8e4",
                    color: "white",
                    border: "1px solid #3fa8e4"
                  },
                  on: {
                    click: () => {
                      this.beforeRoleMenu(params.index);
                    }
                  }
                },
                "编辑菜单"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                  },
                  style: {
                    marginRight: "5px",
                    backgroundColor: "#d2a35b",
                    color: "white",
                    border: "1px solid #d2a35b"
                  },
                  on: {
                    click: () => {
                      this.beforeEdit(params.index);
                    }
                  }
                },
                "编辑角色"
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
                      this.deleteRoleCode=this.tabledata[params.index].code
                      this.deleteModal=true;
                    }
                  }
                },
                "删除角色"
              )
            ]);
          },
          width: 400,
        }
      ],
      roleUserColumns: [
        {
          type: "selection",
          width: 50
        },
        {
          title: '用户名称',
          key: 'displayName',
          minWidth: 100
        },
        {
          title: '性别',
          width: 100,
          key: 'genderTranslated',
          sortable: true
        },
        {
          title: '状态',
          width: 100,
          key: 'status',
          sortable: true
        },
        {
          title: '电话',
          key: 'tel',
          minWidth: 150,
          sortable: true
        },
        {
          title: '邮箱',
          minWidth: 150,
          key: 'email',
          sortable: true
        },
        {
          title: '地址',
          minWidth: 150,
          key: 'address',
          sortable: true
        },
      ],
      restUserColumns: [
        {
          type: "selection",
          width: 50
        },
        {
          title: '用户名称',
          key: 'displayName',
          minWidth: 100
        },
        {
          title: '性别',
          width: 100,
          key: 'genderTranslated',
          sortable: true
        },
        {
          title: '状态',
          width: 100,
          key: 'status',
          sortable: true
        },
        {
          title: '电话',
          key: 'tel',
          minWidth: 150,
          sortable: true
        },
        {
          title: '邮箱',
          minWidth: 150,
          key: 'email',
          sortable: true
        },
        {
          title: '地址',
          minWidth: 150,
          key: 'address',
          sortable: true
        },
      ],
      roleManageColumns:[
        {
          type: "selection",
          width: 50
        },
        {
          title: '角色代码',
          key: 'code',
          minWidth: 100,
          sortable: true
        },
        {
          title: '角色名称',
          key: 'name',
          minWidth: 100,
          sortable: true
        },
        {
          title: '状态名称',
          minWidth: 100,
          key: 'statusName',
          sortable: true
        },
        {
          title: '描述',
          minWidth: 150,
          key: 'description',
          sortable: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          minWidth: 150,
          sortable: true
        },
        {
          title: '修改时间',
          minWidth: 150,
          key: 'modifiedTime',
          sortable: true
        },
      ],
      restRoleColumns:[
        {
          type: "selection",
          width: 50
        },
        {
          title: '角色代码',
          key: 'code',
          minWidth: 100,
          sortable: true
        },
        {
          title: '角色名称',
          key: 'name',
          minWidth: 100,
          sortable: true
        },
        {
          title: '状态名称',
          minWidth: 100,
          key: 'statusName',
          sortable: true
        },
        {
          title: '描述',
          minWidth: 150,
          key: 'description',
          sortable: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          minWidth: 150,
          sortable: true
        },
        {
          title: '修改时间',
          minWidth: 150,
          key: 'modifiedTime',
          sortable: true
        },
      ],
      //table/tree data
      tabledata: [],
      roleMenuTree: [],
      treeData: [],
      roleUserData: [],
      restUserData: [],
      roleManageData:[],
      restRoleData: [],
      selectedRoleUser:[],
      selectedRestUser:[],
      selectedMenu: [],
      selectedRole:[],
      selectedRestRole: [],
      editRule:{
        name: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ],
        code: [
          { required: true, message: '角色代码不能为空', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选中角色状态', trigger: 'change' }
        ],
      },
      addMenuRule:{
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'change' }
        ],
        code: [
          { required: true, message: '菜单代码不能为空', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选中菜单状态', trigger: 'change' }
        ],
      },
      editMenuRule:{
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'change' }
        ],
        code: [
          { required: true, message: '菜单代码不能为空', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选中菜单状态', trigger: 'change' }
        ],
      },
    };
  },

  methods: {
    //区域列表----------------------------------------------------------
    getRoles() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getRoles({
        token: token,
        page: this.pageNum,
        size: this.tableSize
      })
        .then(res => {
          console.log("=========================");
          console.log("角色列表:");
          console.log(res.data);
          //初始化
          this.totalNum=Number(res.data.total);
          this.tabledata = res.data.result;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //翻页--------------------------------------------------------------
    turnPage(pageNo){
      this.pageNum=pageNo;
      console.log(pageNo);
      this.getRoles();
    },
    //搜索--------------------------------------------------------------
    search(){
      this.searchOn=true;
      this.getRoles();
    },

    //添加----------------------------------------------------------
    beforeAdd(){
      this.$refs["addForm"].resetFields();
      this.addModal=true;
    },
    handleAddSubmit(){
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.addRole();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    addRole(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      createRole({
        token: token,
        code: this.addForm.code,
        description: this.addForm.description,
        name: this.addForm.name,
        status: this.addForm.status,
      })
        .then(res => {
          console.log("=========================");
          console.log("添加角色:");
          console.log(res.data);
          this.$Message.success('添加成功');
          this.getRoles();
          this.addModal=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('添加失败');
          this.addModal=false;
        });
    },

    //修改------------------------------------------------------------------
    beforeEdit(index){
      this.$refs["editForm"].resetFields();
      this.editForm.code=this.tabledata[index].code;
      this.editForm.name=this.tabledata[index].name;
      this.editForm.description=this.tabledata[index].description;
      this.editForm.status=this.tabledata[index].status+"";
      this.editForm.statusName=this.tabledata[index].statusName;
      this.editModal=true;
    },
    handleEditSubmit(){
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.editRole();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    editRole(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      updateRole({
        token: token,
        code: this.editForm.code,
        description: this.editForm.description,
        name: this.editForm.name,
        status: this.editForm.status,
        statusName: this.editForm.statusName,
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑角色:");
          console.log(res.data);
          this.$Message.success('编辑成功');
          this.getRoles();
          this.editModal=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('编辑失败');
          this.editModal=false;
        });
    },
    //删除------------------------------------------------------------------
    deleteRole(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteRole({
        token: token,
        roleCode: this.deleteRoleCode,
      })
        .then(res => {
          console.log("=========================");
          console.log("删除角色:");
          console.log(res.data);
          this.$Message.success('删除成功');
          this.getRoles();
          this.deleteModal=false;
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
    //编辑用户-----------------------------------------------------------
    //开启抽屉前
    beforeEditUser(index){
      this.currentRoleCode=this.tabledata[index].code;
      this.roleName=this.tabledata[index].name;
      this.selectedRoleUser=[];
      //回到第一页
      this.roleUserPageNum=1;
      this.$refs.pager2.current = 1;
      this.getUserByRole();
      this.userManageDrawer=true;
    },
    //获取该角色下的用户列表
    getUserByRole() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getUserByRole({
        token: token,
        roleCode: this.currentRoleCode,
        pageNo: this.roleUserPageNum,
        pageSize: this.roleUserTableSize,
      })
        .then(res => {
          console.log("=========================");
          console.log("用户列表:");
          console.log(res.data);
          //初始化
          this.roleUserTotalNum=Number(res.data.total);
          this.roleUserData = res.data.result;
          this.formateGender(this.roleUserData);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取角色下用户列表失败');
        });
    },
    //性别转中文
    formateGender(data){
      for (let i in data){
        if (data[i]["gender"]==1){
          data[i]["genderTranslated"]="男";
        }else if (data[i]["gender"]==0){
          data[i]["genderTranslated"]="女";
        }
      }
    },
    //选中用户
    selectionUpdate(selection){
      this.selectedRoleUser = selection;
    },
    //翻页
    turnRoleUserPage(pageNo){
      this.roleUserPageNum = pageNo;
      console.log(pageNo);
      this.getUserByRole();
    },
    //删除
    beforeDeleteRoleUser(){
      if (this.selectedRoleUser.length==0){
        this.$Message.warning('请选择要删除的用户');
      }else{
        this.deleteRoleUserModal = true;
      }
    },
    deleteRoleUserOk(){
      let data=[];
      for (let i in this.selectedRoleUser){
        let item = new Object;
        item.userId=this.selectedRoleUser[i].userId;
        item.roleCode=this.currentRoleCode;
        data.unshift(item);
      }
      this.DeleteRoleUser(data);
    },
    deleteRoleUserCancel(){
      this.deleteRoleUserModal = false;
    },
    DeleteRoleUser(data){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      delUserRole({
        token: token,
        data,
      })
        .then(res => {
          console.log("=========================");
          console.log("删除用户:");
          console.log(res.data);
          this.$Message.success('删除成功');
          this.getUserByRole();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('删除用户失败');
        });
    },
    //添加用户---------------------------------------------------------------
    //初始化抽屉
    beforeAddRoleUser(){
      this.restUserPageNum=1;
      this.$refs.pager3.current = 1;
      this.selectedRestUser=[];
      this.getUserExcludeRole();
      this.restUserDrawer=true;
    },
    //获取剩余用户列表
    getUserExcludeRole() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getUserExcludeRole({
        token: token,
        roleCode: this.currentRoleCode,
        pageNo: this.restUserPageNum,
        pageSize: this.restUserTableSize,
      })
        .then(res => {
          console.log("=========================");
          console.log("未添加用户列表:");
          console.log(res.data);
          //初始化
          this.restUserTotalNum=Number(res.data.total);
          this.restUserData = res.data.result;
          this.formateGender(this.restUserData);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取未添加用户列表失败');
        });
    },
    //翻页
    turnRestUserPage(pageNo){
      this.restUserPageNum = pageNo;
      console.log(pageNo);
      this.getUserExcludeRole();
    },
    //选中后执行
    restUserSelectionUpdate(selection){
      this.selectedRestUser=selection;
    },
    //提交
    beforeAddRoleUserSubmit(){
      if (this.selectedRestUser.length==0){
        this.$Message.warning('请选择要添加的用户');
      }else{
        let data=[];
        for (let i in this.selectedRestUser){
          let item = new Object;
          item.userId=this.selectedRestUser[i].userId;
          item.roleCode=this.currentRoleCode;
          data.unshift(item);
        }
        this.addUserRole(data);
      }
    },
    addUserRole(data) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      console.log(data);
      addUserRole({
        token: token,
        data,
      })
        .then(res => {
          console.log("=========================");
          console.log("添加用户:");
          console.log(res.data);
          this.getUserByRole();
          this.restUserDrawer=false;
          this.$Message.success('添加用户成功！');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.restUserDrawer=true;
          this.$Message.error('添加用户失败');
        });
    },

    //编辑菜单------------------------------------------------------------
    //-------------------------------------------------------------------
    getRoleMenuTree(code){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getRoleMenus({
        token: token,
        roleCode: code,
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑角色菜单:");
          console.log(res.data);
          this.roleMenuTree = res.data.result;
          this.openTree(this.roleMenuTree);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('查询角色菜单失败');
        });
    },
    beforeRoleMenu(index){
      this.currentRoleCode=this.tabledata[index].code;
      this.getRoleMenuTree(this.currentRoleCode);
      this.roleMenuModal=true;
    },
    //角色菜单更改时
    roleMenuChange(allCurrent,current){
      this.roleMenuShow=true;
      if (current.checked==false){
        this.deleteRoleMenu(current.code);
      }else if(current.checked==true){
        this.addRoleMenu(current.code);
      }
    },
    //删除角色菜单
    deleteRoleMenu(menuCode){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteRoleMenu({
        token: token,
        roleCode: this.currentRoleCode,
        menuCode: menuCode
      })
        .then(res => {
          console.log("=========================");
          console.log("删除角色菜单:");
          console.log(res.data);
          this.getRoleMenuTree(this.currentRoleCode);
          this.roleMenuShow=false;
          this.$Message.success('删除角色菜单成功');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.roleMenuShow=false;
          this.$Message.error('删除角色菜单失败');
        });
    },
    //添加角色菜单
    addRoleMenu(menuCode){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      addRoleMenu({
        token: token,
        roleCode: this.currentRoleCode,
        menuCode: menuCode
      })
        .then(res => {
          console.log("=========================");
          console.log("添加角色菜单:");
          console.log(res.data);
          this.getRoleMenuTree(this.currentRoleCode);
          this.roleMenuShow=false;
          this.$Message.success('添加角色菜单成功');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.roleMenuShow=false;
          this.$Message.error('添加角色菜单失败');
        });
    },


    //菜单管理页面----------------------------------------------------------
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    getMenus(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getMenus({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("查询菜单:");
          console.log(res.data);
          this.treeData = res.data.result;
          this.openTree(this.treeData);
          this.selectedMenu=[];
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('查询菜单失败');
        });
    },
    openTree(data){
      for (let i in data){
        this.$set(data[i],"expand",true);
        // for (let j in data[i].children){
        //   this.$set(data[i]["children"][j],"expand",true);
        //   for (let k in data[i]["children"][j]["children"]){
        //     this.$set(data[i]["children"][j]["children"][k],"expand",true);
        //   }
        // }
      }
    },
    TreeClick(current,current2){
      this.selectedMenu=current;
      if (this.selectedMenu.length!=0){
        this.$refs["menuForm"].resetFields();
        this.menuForm.code=current[0].code;
        this.menuForm.title=current[0].title;
        this.menuForm.status=current[0].status+"";
        this.menuForm.description=current[0].description;
        this.menuForm.parentCode=current[0].parentCode;
        this.menuForm.menuLevel=current[0].menuLevel;
        this.$forceUpdate("menuForm");
      }
    },
    //修改菜单
    beforeUpdateMenu(){
      if (this.selectedMenu.length==0){
        this.$Message.warning('请选择你要修改的菜单');
      }else if(this.selectedMenu.length==1){
        this.$refs["menuForm"].validate((valid) => {
          if (valid) {
            this.updateMenu();
          } else {
            this.$Message.error('请填写完整信息!');
          }
        })
      }
    },
    updateMenu(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      updateMenu({
        token: token,
        code: this.menuForm.code,
        description: this.menuForm.description,
        menuLevel: this.menuForm.menuLevel+1,
        title: this.menuForm.title,
        status: Number(this.menuForm.status),
        parentCode: this.menuForm.parentCode
      })
        .then(res => {
          console.log("=========================");
          console.log("修改菜单:");
          console.log(res.data);
          this.$Message.success('修改成功');
          this.getMenus();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('修改失败');
        });
    },
    //删除菜单
    beforeDeleteMenu(){
      if (this.selectedMenu.length==0){
        this.$Message.warning('请选择你要删除的菜单');
      }else if(this.selectedMenu.length==1){
        if (this.selectedMenu[0].parentCode=="0"){
          this.$Message.warning('根目录不可删除！');
        }else{
          this.deleteMenuModal = true;
        }
      }
    },
    deleteMenuOk(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteMenu({
        token: token,
        menuCode: this.menuForm.code,
      })
        .then(res => {
          console.log("=========================");
          console.log("删除菜单:");
          console.log(res.data);
          this.$Message.success('删除成功');
          this.getMenus();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('删除失败');
        });
    },
    deleteMenuCancel(){
      this.deleteMenuModal = false;
    },
    //添加子菜单
    beforeAddMenu(){
      if (this.selectedMenu.length==0){
        this.$Message.warning('请选择父菜单');
      }else if(this.selectedMenu.length==1){
        this.$refs["addMenuForm"].resetFields();
        this.addMenuForm.status="1";
        this.addMenuForm.parentCode=this.menuForm.code;
        this.addMenuForm.menuLevel=this.menuForm.menuLevel+1;
        this.addMenuModal=true;
      }
    },
    beforeAddMenuSubmit(){
      this.$refs["addMenuForm"].validate((valid) => {
        if (valid) {
          this.AddMenuSubmit();
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    AddMenuSubmit(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      createMenu({
        token: token,
        code: this.addMenuForm.code,
        description: this.addMenuForm.description,
        menuLevel: this.addMenuForm.menuLevel,
        title: this.addMenuForm.title,
        status: Number(this.addMenuForm.status),
        parentCode: this.addMenuForm.parentCode
      })
        .then(res => {
          console.log("=========================");
          console.log("添加子菜单:");
          console.log(res.data);
          this.$Message.success('添加成功');
          this.getMenus();
          this.addMenuModal=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('添加失败');
          this.addMenuModal=false;
        });
    },

    //管理权限-管理菜单下的角色-------------------------------------------
    //------------------------------------------------------------------
    //开启抽屉前
    beforeRoleManage(){
      if (this.selectedMenu.length==0){
        this.$Message.warning('请选择你要管理权限的菜单');
      }else if(this.selectedMenu.length==1){
        this.menuName=this.menuForm.title;
        this.selectedRole=[];
        //回到第一页
        this.rolePageNum=1;
        this.$refs.pager4.current = 1;
        this.getMenuRole();
        this.roleManageDrawer = true;
      }
    },
    getMenuRole(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getMenuRole({
        token: token,
        menuCode: this.menuForm.code,
        pageNo: this.rolePageNum,
        pageSize: this.roleTableSize
      })
        .then(res => {
          console.log("=========================");
          console.log("获取菜单下的角色列表:");
          console.log(res.data);
          this.selectedRole=[];
          this.roleTotalNum=Number(res.data.total);
          this.roleManageData = res.data.result;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取菜单下的角色列表失败');
        });
    },
    //已有角色选中
    roleSelectionUpdate(selection){
      this.selectedRole=selection;
    },
    //已有角色翻页
    turnRolePage(pageNo){
      this.rolePageNum = pageNo;
      console.log(pageNo);
      this.getMenuRole();
    },
    //添加用户-----------------------------------------------------------
    beforeAddMenuRole(){
      this.restRolePageNum=1;
      this.$refs.pager5.current = 1;
      this.selectedRole=[];
      this.getExcludeRoles();
      this.restRoleDrawer=true;
    },
    //选择剩余角色时
    restRoleSelectionUpdate(selection){
      this.selectedRestRole=selection;
    },
    getExcludeRoles(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getExcludeRoles({
        token: token,
        menuCode: this.menuForm.code,
        pageNo: this.restRolePageNum,
        pageSize: this.restRoleTableSize
      })
        .then(res => {
          console.log("=========================");
          console.log("获取菜单下的未添加角色列表:");
          console.log(res.data);
          this.selectedRestRole=[];
          this.restRoleTotalNum=Number(res.data.total);
          this.restRoleData = res.data.result;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取未添加的角色列表失败');
        });
    },
    //翻页
    turnRestRolePage(pageNo){
      this.restRolePageNum = pageNo;
      console.log(pageNo);
      this.getExcludeRoles();
    },
    //添加提交前
    beforeAddMenuRoleSubmit(){
      if (this.selectedRestRole.length==0){
        this.$Message.warning('请选择要添加的角色');
      }else{
        for (let i in this.selectedRestRole){
          this.AddMenuRoleSubmit(this.selectedRestRole[i].code);
        }
      }
    },
    AddMenuRoleSubmit(roleCode){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      addRoleMenu({
        token: token,
        menuCode: this.menuForm.code,
        roleCode: roleCode,
      })
        .then(res => {
          console.log("=========================");
          console.log("添加可访问菜单的角色:");
          console.log(res.data);
          this.getMenuRole();
          this.restRoleDrawer=false;
          this.$Message.success('添加角色成功');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('添加角色失败');
        });
    },
    //删除---------------------------------------------------------------
    beforeDeleteMenuRole(){
      if (this.selectedRole.length==0){
        this.$Message.warning('请选择要删除的角色');
      }else{
        this.deleteMenuRoleModal = true;
      }
    },
    //确定
    deleteMenuRoleOk(){
      for (let i in this.selectedRole){
        this.DeleteMenuRoleSubmit(this.selectedRole[i].code);
      }
    },
    //取消
    deleteMenuRoleCancel(){
      this.deleteMenuRoleModal = false;
    },
    DeleteMenuRoleSubmit(roleCode){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteRoleMenu({
        token: token,
        menuCode: this.menuForm.code,
        roleCode: roleCode,
      })
        .then(res => {
          console.log("=========================");
          console.log("删除可访问菜单的角色:");
          console.log(res.data);
          this.getMenuRole();
          this.$Message.success('删除成功');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('删除用户失败');
        });
    },


    //初始化-------------------------------------------------------------
    initData(){
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      //清空搜素条件
      this.searchOn = false;
      //获取角色列表
      this.getRoles();
      //查询菜单
      this.getMenus();
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
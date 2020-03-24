<template>
<!--<div id="operation_log" class="layout dark">
  <Content :style="{padding: '12px', minHeight: '280px'}">
    <Row class="background-row">
      <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
  <Tabs value="name1" class="PropertyTab">
  <TabPane label="系统日志查询" name="name1">
    <span style="margin-right:60px;">
      <span style="margin-left:15px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>标题 </span>
    <Input v-model="titlequery" placeholder="标题" style="width: 300px" />
    </span>
    <span style="margin-right:60px;">
      <span style="margin-left:15px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>操作人 </span>
    <Input v-model="createUserNamequery" placeholder="操作人" style="width: 300px" />
       </span>
    <span style="margin-right:60px;">
              <span style="margin-left:15px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/>开始时间 </span>
              <DatePicker v-model="startTime" format="yyyy年MM月dd日" type="date" placeholder="选择起始时间" style="width: auto;margin-left:5px;"></DatePicker>
            </span>
    <span style="margin-right:60px;">
              <span style="margin-left:15px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/>结束时间 </span>
              <DatePicker v-model="endTime" format="yyyy年MM月dd日" type="date" placeholder="选择结束时间" style="width: auto;margin-left:5px;"></DatePicker>
            </span>

    <Button icon="md-search" type="primary" @click="databind">搜索</Button>
    <Table stripe ref="currentRowTable" :columns="columns1" :data="tableData"></Table>
    <br>
    <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
      <Page ref="pager1" id="pager1" :total="installTotalNum" :current="installPageNum" @on-change="turnPage" :page-size="installTableSize" show-total show-elevator/>
    </Row>
  </TabPane>
  <TabPane label="告警日志查询" name="name2">告警日志查询内容</TabPane>
  <TabPane label="业务日志查询" name="name3">业务日志查询内容</TabPane>
</Tabs>
    </Row>
    </Row>
  </Content>
</div>-->
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
          <Tabs value="name1" class="PropertyTab" >
            <!--系统日志-->
            <TabPane label="系统日志" name="name1">
              <Row style="font-size:14px;">
                <br>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/> <Input v-model="titlequery" placeholder="请输入标题" style="width: auto;;margin-left:5px;" /></span>

                </i-col>
                <i-col span="4" >
                  <span style="font-size:16px;"><Input v-model="createUserNamequery" placeholder="请输入操作人" style="width: auto;;margin-left:5px;" /></span>
                </i-col>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/> </span>
                  <DatePicker v-model="startTime" format="yyyy年MM月dd日" type="date" placeholder="选择起始时间" style="width: auto;margin-left:5px;"></DatePicker>
                </i-col>
                <i-col span="5" >
                  <span style="font-size:16px;"> </span>
                  <DatePicker v-model="endTime" format="yyyy年MM月dd日" type="date" placeholder="选择结束时间" style="width: auto;margin-left:15px;"></DatePicker>
                </i-col>
                <i-col span="5" >
                  <Button icon="md-search" type="primary" @click="databind">搜索</Button>
                </i-col>
              </Row>
               <br>
              <Table class="propertyTable"  border ref="currentRowTable" :columns="columns" :data="tableData" style="margin-left:19px;margin-right:19px;"></Table>
              <br>
              <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
                <Page ref="pager1" id="pager1" :total="systemTotalNum" :current="systemPageNum" @on-change="turnPage" :page-size="pageSize" show-total show-elevator/>
              </Row>
            </TabPane>

            <!-- 告警日志 -->
            <TabPane label="告警日志" name="name2">
              <Row style="font-size:14px;">
                <br>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/> <Input v-model="titlequery1" placeholder="请输入标题" style="width: auto;;margin-left:5px;" /></span>
                </i-col>
                <i-col span="4" >
                  <span style="font-size:16px;"><Input v-model="createUserNamequery1" placeholder="请输入操作人" style="width: auto;;margin-left:5px;" /></span>
                </i-col>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/> </span>
                  <DatePicker v-model="startTime1" format="yyyy年MM月dd日" type="date" placeholder="选择起始时间" style="width: auto;margin-left:5px;"></DatePicker>
                </i-col>
                <i-col span="5" >
                  <span style="font-size:16px;"> </span>
                  <DatePicker v-model="endTime1" format="yyyy年MM月dd日" type="date" placeholder="选择结束时间" style="width: auto;margin-left:15px;"></DatePicker>
                </i-col>
                <i-col span="5" >
                  <Button icon="md-search" type="primary" @click="databind1">搜索</Button>
                </i-col>
              </Row>
              <br>

              <Table class="propertyTable"  border ref="currentRowTable" :columns="columns1" :data="tableData1" style="margin-left:19px;margin-right:19px;"></Table>
              <br>
              <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
                <Page ref="pager2" id="pager2" :total="alarmTotalNum"  @on-change="turnPage1" :page-size="pageSize" show-total show-elevator/>
              </Row>
            </TabPane>

            <TabPane label="业务日志" name="name3" >
              <Row style="font-size:14px;">
                <br>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/> <Input v-model="titlequery2" placeholder="请输入标题" style="width: auto;;margin-left:5px;" /></span>
                </i-col>
                <i-col span="4" >
                  <span style="font-size:16px;"><Input v-model="createUserNamequery2" placeholder="请输入操作人" style="width: auto;;margin-left:5px;" /></span>
                </i-col>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/> </span>
                  <DatePicker v-model="startTime2" format="yyyy年MM月dd日" type="date" placeholder="选择起始时间" style="width: auto;margin-left:5px;"></DatePicker>
                </i-col>
                <i-col span="5" >
                  <span style="font-size:16px;"> </span>
                  <DatePicker v-model="endTime2" format="yyyy年MM月dd日" type="date" placeholder="选择结束时间" style="width: auto;margin-left:15px;"></DatePicker>
                </i-col>
                <i-col span="5" >
                  <Button icon="md-search" type="primary" @click="databind2">搜索</Button>
                </i-col>
              </Row>
              <br>

              <Table class="propertyTable"  border ref="currentRowTable" :columns="columns2" :data="tableData2" style="margin-left:19px;margin-right:19px;"></Table>
              <br>
              <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
                <Page ref="pager3" id="pager3" :total="businessTotalNum" :current="businessPageNum" @on-change="turnPage2" :page-size="pageSize" show-total show-elevator/>
              </Row>
            </TabPane>
          </Tabs>
        </Row>
      </Row>
    </Content>

  </div>
</template>

<script>
import { getLogger ,alarmLogger ,businessLogger} from '@/api/logger'
export default {
  name: 'operation_log',
  data() {
    return {
      pageSize: 10, // 每页行数
      //系统日志
      startTime: '', // 开始时间查询框
      endTime: '', // 结束时间查询框
      systemTotalNum: 12, // 总行数
      systemPageNum: 1, // 页码数
      titlequery: '', // 标题查询框
      createUserNamequery: '', // 操作人查询框
      tableData: [],
      systemOn: false,
      //告警日志
      startTime1: '', // 开始时间查询框
      endTime1: '', // 结束时间查询框
      alarmTotalNum: 12, // 总行数
      alarmPageNum: 1, // 页码数
      titlequery1: '', // 标题查询框
      createUserNamequery1: '', // 操作人查询框
      tableData1: [],
      alarmOn: false,
      //业务日志
      startTime2: '', // 开始时间查询框
      endTime2: '', // 结束时间查询框
      businessTotalNum: 12, // 总行数
      businessPageNum: 1, // 页码数
      titlequery2: '', // 标题查询框
      createUserNamequery2: '', // 操作人查询框
      tableData2: [],
      businessOn: false,
      columns: [
        {
          title: 'id',
          key: 'id',
          width: '100px'
        },
        {
          title: '操作人',
          key: 'createUserName',
          width: '200px'
        },
        {
          title: '标题',
          key: 'title',
          width: '200px'
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: '300px'
        },
        {
          title: '内容',
          key: 'content'
        }],
      columns1: [
        {
          title: 'id',
          key: 'id',
          width: '100px'
        },
        {
          title: '操作人',
          key: 'createUserName',
          width: '200px'
        },
        {
          title: '标题',
          key: 'title',
          width: '200px'
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: '300px'
        },
        {
          title: '内容',
          key: 'content'
        }
        ],
      columns2: [
        {
          title: 'id',
          key: 'id',
          width: '100px'
        },
        {
          title: '操作人',
          key: 'createUserName',
          width: '200px'
        },
        {
          title: '标题',
          key: 'title',
          width: '200px'
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: '300px'
        },
        {
          title: '内容',
          key: 'content'
        }
        ]
    }
},
  methods: {
    // 系统搜索
    databind: function () {
      this.systemOn = true
      this.getsystemList()
    },
    // 告警搜索
    databind1: function () {
      this.alarmOn = true
      this.getalarmList()
    },
    // 业务搜索
    databind2: function () {
      this.businessOn = true
      this.gebusinessList()
    },
    // 系统数据查询和表格绑定
    getsystemList () {
      let uid = this.$store.state.user.userId
      let token = this.$store.state.user.token
      if (!this.systemOn) {
        getLogger({
          token: token,
          pageNo: this.systemPageNum,
          pageSize: this.pageSize
        })
          .then(res => {
            console.log('=========================')
            console.log('操作日志:----------------')
            console.log(res.data)
            // 初始化

            this.systemTotalNum = Number(res.data.total);
            this.tableData = res.data.result
            // this.TranslateLoop(this.tableData);
          })
          .catch(err => {
            console.log('===========error==============')
            console.log(err)
          })
      } else {
        var stime = null
        var etime = null
        if (this.startTime != '') {
          stime = (new Date(this.startTime)).Format('yyyy-MM-dd') + ' 00:00:00'
        }
        if (this.endTime != '') {
          etime = (new Date(this.endTime)).Format('yyyy-MM-dd') + ' 23:59:59'
        }
        console.log(this.startTime + '=========================')
        console.log(this.endTime + '=========================')
        getLogger({
          token: token,
          pageNo: this.systemPageNum,
          pageSize: this.pageSize,
          title: this.titlequery,
          createUserName: this.createUserNamequery,
          beginTime: stime,
          endTime: etime

        })
          .then(res => {
            console.log('=========================')
            console.log('操作日志:')
            console.log(res.data)
            // 初始化

            this.systemTotalNum = Number(res.data.total);
            this.tableData = res.data.result
            // this.TranslateLoop(this.tableData);
          })
          .catch(err => {
            console.log('===========error==============')
            console.log(err)
          })
      }
    },
    // 告警数据查询和表格绑定
    getalarmList () {
      let uid = this.$store.state.user.userId
      let token = this.$store.state.user.token
      if (!this.alarmOn) {
        alarmLogger({
          token: token,
          pageNo: this.alarmPageNum,
          pageSize: this.pageSize
        })
          .then(res => {
            console.log('=========================')
            console.log('告警日志:----------------')
            console.log(res.data)
            // 初始化

            this.alarmTotalNum =Number(res.data.total);
            this.tableData1 = res.data.result
            // this.TranslateLoop(this.tableData);
          })
          .catch(err => {
            console.log('===========error==============')
            console.log(err)
          })
      } else {
        var stime1 = null
        var etime1 = null
        if (this.startTime1 != '') {
          stime1 = (new Date(this.startTime1)).Format('yyyy-MM-dd') + ' 00:00:00'
        }
        if (this.endTime1 != '') {
          etime1 = (new Date(this.endTime1)).Format('yyyy-MM-dd') + ' 23:59:59'
        }
        console.log(this.startTime1 + '=========================')
        console.log(this.endTime1 + '=========================')
        alarmLogger({
          token: token,
          pageNo: this.alarmPageNum,
          pageSize: this.pageSize,
          title: this.titlequery1,
          createUserName: this.createUserNamequery1,
          beginTime: stime1,
          endTime: etime1

        })
          .then(res => {
            console.log('=========================')
            console.log('告警日志:')
            console.log(res.data)
            // 初始化

            this.alarmTotalNum = Number(res.data.total);
            this.tableData1 = res.data.result
            // this.TranslateLoop(this.tableData);
          })
          .catch(err => {
            console.log('===========error==============')
            console.log(err)
          })
      }
    },
    // 业务数据查询和表格绑定
    gebusinessList () {
      let uid = this.$store.state.user.userId
      let token = this.$store.state.user.token
      if (!this.businessOn) {
        businessLogger({
          token: token,
          pageNo: this.businessPageNum,
          pageSize: this.pageSize
        })
          .then(res => {
            console.log('=========================')
            console.log('业务日志:----------------')
            console.log(res.data)
            // 初始化

            this.businessTotalNum = Number(res.data.total);
            this.tableData2 = res.data.result
            // this.TranslateLoop(this.tableData);
          })
          .catch(err => {
            console.log('===========error==============')
            console.log(err)
          })
      } else {
        var stime2 = null
        var etime2 = null
        if (this.startTime2 != '') {
          stime2 = (new Date(this.startTime2)).Format('yyyy-MM-dd') + ' 00:00:00'
        }
        if (this.endTime2 != '') {
          etime2 = (new Date(this.endTime2)).Format('yyyy-MM-dd') + ' 23:59:59'
        }
        console.log(this.startTime2 + '=========================')
        console.log(this.endTime2 + '=========================')
        businessLogger({
          token: token,
          pageNo: this.businessPageNum,
          pageSize: this.pageSize,
          title: this.titlequery2,
          createUserName: this.createUserNamequery2,
          beginTime: stime2,
          endTime: etime2

        })
          .then(res => {
            console.log('=========================')
            console.log('告警日志:')
            console.log(res.data)
            // 初始化

            this.businessTotalNum = Number(res.data.total);
            this.tableData2 = res.data.result
            // this.TranslateLoop(this.tableData);
          })
          .catch(err => {
            console.log('===========error==============')
            console.log(err)
          })
      }
      },
    TranslateLoop (data) {
      for (let i in data) {
        this.translateDeviceType(data[i])
      }
    },
    // 翻页--------------------------------------------------------------
    turnPage (pageNo) {
      this.systemPageNum = pageNo
      console.log(pageNo)
      this.getsystemList()
    },
    // 翻页--------------------------------------------------------------
    turnPage1 (pageNo) {
      this.alarmPageNum = pageNo
      console.log(pageNo)
      this.getalarmList()
    },
    // 翻页--------------------------------------------------------------
    turnPage2 (pageNo) {
      this.businessPageNum = pageNo
      console.log(pageNo)
      this.gebusinessList()
    },
    initData () {
      // 回到第一页
      this.$refs.pager1.current = 1
      // 清空搜素条件
      this.titlequery = ''
      // 获取用户列表
      this.getsystemList()
      this.getalarmList()
      this.gebusinessList()
    }

  },
  mounted () {

    this.initData()
  }

}
</script>
<style lang="less" scoped>
  .background-row{
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 10px 10px;
  }
</style>

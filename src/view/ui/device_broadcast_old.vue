<template>
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px',}">
      <Row :gutter="10">
        <i-col span="6">
              <Card :bordered="false" class="paddingCardLeft">
                <p slot="title">
                  <Icon type="ios-film-outline"/>  设备列表
                  <Icon type="md-pin" style="float:right" size="28"/>
                </p>
                <div style="height:368px;">
                  <div>
                    <img src="../../assets/images/device/yinzhu.jpg" class="imgs">
                  </div>

                  <Row style="text-align:center;">
                    <Button class="search-btn" type="primary" style="float:center;">
                      <Icon type="md-chatbubbles"></Icon>对话
                    </Button>
                  </Row>
                </div>
              </Card>

          <!-- 选择控制设备 -->
          <Card shadow class="paddingCardLeft">
            <p slot="title">
              <Icon type="ios-film-outline"></Icon> 选择控制设备
            </p>
            <Table
              height="305 "
              ref="selection"
              highlight-row
              :show-header="false"
              :row-class-name="rowClassName"
              :columns="device_columns"
              :data="dt_device"
              ></Table>
          </Card>

        <!-- 任务列表 -->
        </i-col>
        <i-col :md="24" :lg="18">
          <Row>
            <i-col :md="24" :lg="10">
              <Card shadow class="paddingcard">
                <p slot="title" style="text-align:center;">
                  <Icon type="ios-paper"></Icon> 任务列表
                  <Icon type="md-add" style="float:left" size="24" @click=" createMissionModal = true; isShow=false;"/>
                  <Icon type="ios-trash" style="float:right" size="24" @click="clearMission = true"/>
                </p>



                <div class="device_table">
                  <!-- 新建任务 -->
                  <Table :row-class-name="rowClassName" ref="tables" :columns="dt_columns" :data="data"></Table>
                  <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                    <i-col span="4" offset="6">
                      <Button class="search-btn" type="primary" size="small">上一页</Button>
                    </i-col>
                    <i-col span="4" offset="3">
                      <Button class="search-btn" type="primary" size="small">下一页</Button>
                    </i-col>
                  </Row>
                </div>
              </Card>
            </i-col>

            <!-- 定时任务 -->
            <i-col :md="24" :lg="14">
              <Card shadow class="paddingcard" style="margin-left:10px">
                <p slot="title">
                  <Icon type="md-clock"></Icon> 定时任务
                </p>
                <Row :gutter="20">

                  <i-col
                    :xs="24"
                    :md="12"
                    :lg="8"
                    v-for="(infor, i) in inforCardData2"
                    :key="`infor-${i}`"
                    style="height: 120px;padding-bottom: 10px; "
                  >
                    <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
                      <p style="margin-top: 20px; font-size: 25px;">{{ infor.name }}</p>
                      <p style="margin-top: 15px;">{{ infor.title }}</p>
                    </infor-card>
                  </i-col>

                  <!-- 卡片jhgjhgh -->
                  <i-col
                    :xs="24"
                    :md="12"
                    :lg="8"
                    v-for="(infor, i) in inforCardData"
                    :key="`infor-${i}`"
                    style="height: 120px;padding-bottom: 10px; "
                  >
                    <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
                      <count-to :end="infor.count" count-class="count-style"/>
                      <!-- <div v-html="info.message"></div> -->
                      <p>{{ infor.title }}</p>
                    </infor-card>
                  </i-col>

                <!-- 定时任务内容 -->
                </Row>
                <Row :gutter="20">
                  <i-col :xs="24" :md="12" :lg="12">
                    <div class="device_table">
                      <tables height=290 ref="tables" v-model="dt_tableData1" :row-class-name="rowClassName" :columns="column1"/>
                    </div>
                  </i-col>
                  <i-col :xs="24" :md="12" :lg="12">
                    <div class="device_table">
                      <tables height=290 ref="tables" v-model="dt_tableData2" :row-class-name="rowClassName" :columns="column2"/>
                    </div>
                  </i-col>
                </Row>

                <Row :gutter="20" style="text-align:center;margin-top: 20px;">
                  <i-col span="4" offset="10">
                    <Button class="search-btn" type="primary">开始测试</Button>
                  </i-col>
                </Row>
              </Card>
            </i-col>
          </Row>



         <!-- 定时详情 -->
          <Row>
            <Card shadow class="paddingcard">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon> 定 时 详 情
              </p>
              
              <!-- 播放时间 -->
              <Row :gutter="20" style="color:white;text-align:left; margin-left: 20px; margin-top: 10px;">
                <i-col :md="24" :lg="2">
                  <br/>
                  <p>
                    播放时间
                  </p>
                  <p>
                    播放日期
                  </p>
                </i-col>
                <i-col :md="24" :lg="22">
                  <p><img src="../../assets/images/device/broadcast_img.png" class="imgs"></p>
                  <Row style="text-align:left; margin-top: 10px;">
                      <tables class="table-percentage" :show-header=false v-model="weekday_data" :row-class-name="rowClassName" :columns="weekday_columns"/>
                  </Row>
                  <Row style="text-align:left; margin-top: 10px;">
                    <ButtonGroup style="margin-left: 20px;">
                      <Button class="btn-hour" disabled >1</Button>
                      <Button class="btn-hour" disabled >2</Button>
                      <Button class="btn-hour" disabled >3</Button>
                      <Button class="btn-hour" disabled >4</Button>
                      <Button class="btn-hour" disabled >5</Button>
                      <Button class="btn-hour" disabled >6</Button>
                      <Button class="btn-hour" disabled >7</Button>
                      <Button class="btn-hour" disabled >8</Button>
                      <Button class="btn-hour" disabled >9</Button>
                      <Button class="btn-hour">10</Button>
                      <Button class="btn-hour">11</Button>
                      <Button class="btn-hour">12</Button>
                      <Button class="btn-hour" disabled >13</Button>
                      <Button class="btn-hour" disabled >14</Button>
                      <Button class="btn-hour" disabled >15</Button>
                      <Button class="btn-hour" disabled >16</Button>
                      <Button class="btn-hour" disabled >17</Button>
                      <Button class="btn-hour" disabled >18</Button>
                      <Button class="btn-hour" disabled >19</Button>
                      <Button class="btn-hour" disabled >20</Button>
                      <Button class="btn-hour" disabled >21</Button>
                      <Button class="btn-hour" disabled >22</Button>
                      <Button class="btn-hour" disabled >23</Button>
                      <Button class="btn-hour" disabled >24</Button>
                    </ButtonGroup>
                  </Row>




                  <!--播放日期 -->
                  <Row style="text-align:left; margin-top: 10px;">
                    <ButtonGroup style="margin-left: 20px;">
                      <Button class="btn-week" disabled >周 日</Button>
                      <Button class="btn-week" disabled >周 一</Button>
                      <Button class="btn-week">周 二</Button>
                      <Button class="btn-week">周 三</Button>
                      <Button class="btn-week" disabled >周 四</Button>
                      <Button class="btn-week" disabled >周 五</Button>
                      <Button class="btn-week" disabled >周 六</Button>
                    </ButtonGroup>
                  </Row>
                </i-col>
              </Row>
              
              

            </Card>
          </Row>
        </i-col>
      </Row>


          <!-- <!-- 定时详情 
          <Row>
            <Card shadow class="paddingcard">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon> 定 时 详 情
              </p>
              <!--播放日期 
                <Row :gutter="20" style="color:white;text-align:left; margin-left: 20px; margin-top: 10px;">
                  <Col span="2" style="margin-top: 10px;">播放时间</Col>
                  <Col span="22">
                    <Slider v-model="SliderTime1" range disabled></Slider>
                  </Col>
                </Row>

                <Row :gutter="20" style="color:white;text-align:left; margin-left: 20px; margin-top: 10px;">
                  <Col span="2" style="margin-top: 10px;">播放日期</Col>
                  <Col span="22">
                    <Slider v-model="SliderTime2" range disabled></Slider>
                  </Col>
                </Row>

            </Card>
          </Row>
        </i-col>
      </Row> -->

      <!-- 清空任务警告对话框 -->
      <Modal
          v-model="clearMission"
          title="确定要清空任务列表吗"
          @on-ok="ok"
          @on-cancel="cancel">
          <p>这会清除任务列表中所有任务，内容将不可恢复。</p>
      </Modal>




      <!-- 新建任务抽屉 -->
      <Drawer :closable="false" width="25%" v-model="createMissionDrawer">
        <div>
          <div>
            <p style="text-align:center;font-size:30px;">新建任务</p>
            <hr style="margin-bottom:10px;" />
            <p style="font-size:15px;">
              任务名称： <Input prefix="ios-contact" placeholder="输入任务名称" style="width: auto;" />
            </p>
            <p style="margin-top:10px;font-size:15px;">
              播放时间： <TimePicker confirm type="time" placeholder="选择时间"></TimePicker>
              <DatePicker type="date" placeholder="选择日期" style="width: 150px;"></DatePicker>
            </p>

            <!-- 上传 -->
            <p style="margin-top:10px;font-size:15px;">上传曲目：
              <Upload
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>点击上传或拖拽文件到此处</p>
                  </div>
              </Upload>
            </p>
            <p>
              <tables height=200 ref="tables" v-model="dt_tableData1" :row-class-name="rowClassName" :columns="column_drawer1"/>
            </p>
          <div style="text-align:center;margin-top:10px;">
            <Button class="search-btn" type="primary" size="large">创建</Button>
          </div>
          </div>

          <!-- 已有任务 -->
          <div style="margin-top:30px;">
            <p style="text-align:center;font-size:30px;">使用已有任务</p>
            <hr style="margin-bottom:10px;" />
            <Table  :row-class-name="rowClassName" height=250 ref="tables" :columns="drawer_columns" :data="drawerTable"></Table>
          </div>
        </div>
      </Drawer>



      <!-- 添加任务弹窗 -->
      <Modal v-model="createMissionModal"  @on-ok="asyncOK" :loading="loading">
        <div>
          <!-- 已有任务 -->
          <div v-if="!isShow">
            <p style="text-align:center;font-size:30px;">使用已有任务</p>
            <hr style="margin-bottom:10px;" />
            <Button class="search-btn" @click="isShow=true" type="primary" size="large"><Icon type="md-add"/>新任务</Button>
            <Table :row-class-name="rowClassName" style="margin-top:10px;" height=300 ref="tables" :columns="drawer_columns" :data="drawerTable"></Table>         
          </div>


          <div v-if="isShow" id="show">
            <p style="text-align:center;font-size:30px;">新建任务</p>
            <hr style="margin-bottom:10px;" />
            <p style="font-size:15px;">
              任务名称： <Input suffix="md-chatboxes" placeholder="输入任务名称" style="width: auto;" />
            </p>
            <p style="margin-top:10px;font-size:15px;">
              播放时间： <TimePicker confirm type="time" placeholder="选择时间"></TimePicker>
              <!-- <DatePicker type="date" placeholder="选择日期" style="width: 150px;"></DatePicker> -->
            </p>
            <p style="margin-top:10px;font-size:15px;">
              <CheckboxGroup v-model="week">
                <span style="font-size:15px;">播放日期：  </span>
                <Checkbox label="周一"></Checkbox>
                <Checkbox label="周二"></Checkbox>
                <Checkbox label="周三"></Checkbox>
                <Checkbox label="周四"></Checkbox>
                <Checkbox label="周五"></Checkbox>
                <Checkbox label="周六"></Checkbox>
                <Checkbox label="周日"></Checkbox>
              </CheckboxGroup>
            </p>
            <p style="margin-top:10px;font-size:15px;">
              任务类型： <Input suffix="ios-bookmark" placeholder="输入任务类型" style="width: auto;" />
            </p>

            <!-- 上传 -->
            <p style="margin-top:10px;font-size:15px;">上传曲目：
              <Upload
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p style="color:black;">点击上传或拖拽文件到此处</p>
                  </div>
              </Upload>
            </p>
            <p>
              <tables height=300 ref="tables" v-model="dt_tableData1" :row-class-name="rowClassName" :columns="column_drawer1"/>
            </p>
            <!-- <div style="text-align:center;margin-top:10px;">
              <Button class="search-btn" type="primary" size="large">创建</Button>
            </div> -->
          </div>


        </div>
      </Modal>



    </Content>
  </div>
</template>

<script scope>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts' // ChartPie,
import Tables from '_c/tables'
// import Example from '../single-page/home/example.vue'
export default {
  name: 'device_broadcast',
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    Tables
    // Example
  },
  data () {
    return {
      isShow: false,
      createMissionModal: false,
      clearMission: false,
      createMissionDrawer: false,
      SliderTime1: [20, 50],
      SliderTime2: [30, 70],
      dt_columns: [
        { title: '序号', key: 'Id', width: 60 },
        { title: '任务名称', key: 'taskname', align: 'center' },
        { title: "任务类型", key: "tasktype" },
        // { title: "操作", key: "operate", type: "template", template: "likes" }
        {
          title: '操作',
          key: 'action',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleEditItem(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
        // {title:'',key:''},
        // {title:'',key:''},
      ],
      drawer_columns: [
        { title: '序号', key: 'Id', width: 60 },
        { title: '任务名称', key: 'taskname', align: 'center' },
        {
          title: '操作',
          key: 'action',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleEditItem(params.index)
                    }
                  }
                },
                '使用'
              )
            ])
          }
        }
      ],
      weekday_columns: [
        { title: '1',key:'1' },
        { title: '2',key:'2' },
        { title: '3',key:'3' },
        { title: '4',key:'4' },
        { title: '5',key:'5' },
        { title: '6',key:'6' },
        { title: '7',key:'7' },
      ],
      device_columns: [
        {
          title: '全选',
          key: 'device'
        }
      ],
      inforCardData: [
        {
          title: '任务序号',
          icon: 'md-pin',
          count: 2,
          color: '#2d8cf0'
        },
        { title: '播放曲目数', icon: 'md-musical-notes', count: 12, color: '#19be6b' }
      ],
      inforCardData2: [
        { title: '任务名称', icon: 'md-share', name: 'Test 01', color: '#ff9900' }
      ],
      data: [
        {
          Id: '1',
          taskname: 'Test 01',
          tasktype: "文本"
        },
        {
          Id: '2',
          taskname: 'Test 02',
          tasktype: "定时"
        },
        {
          Id: '3',
          taskname: 'Test 03',
          tasktype: "文本"
        },
        {
          Id: '4',
          taskname: 'Test 04',
          tasktype: "文本"
        },
        {
          Id: '5',
          taskname: 'Test 05',
          tasktype: "定时"
        },
        {
          Id: '6',
          taskname: 'Test 06',
          tasktype: "定时"
        },
        {
          Id: '7',
          taskname: 'Test 07',
          tasktype: "定时"
        },
        {
          Id: '8',
          taskname: 'Test 08',
          tasktype: "文本"
        }
      ],
      drawerTable: [
        {
          Id: '1',
          taskname: 'Test 01',
          tasktype: "文本"
        },
        {
          Id: '2',
          taskname: 'Test 02',
          tasktype: "定时"
        },
        {
          Id: '3',
          taskname: 'Test 03',
          tasktype: "文本"
        },
        {
          Id: '4',
          taskname: 'Test 04',
          tasktype: "文本"
        },
        {
          Id: '5',
          taskname: 'Test 05',
          tasktype: "定时"
        },
        {
          Id: '6',
          taskname: 'Test 06',
          tasktype: "定时"
        },
        {
          Id: '7',
          taskname: 'Test 07',
          tasktype: "定时"
        },
        {
          Id: '8',
          taskname: 'Test 08',
          tasktype: "文本"
        }
      ],
      column2: [
        { title: '序号', key: 'id' },
        { title: '已选择设备', key: 'selectedDevice' }
      ],
      dt_tableData2: [
        {
          id: '1',
          selectedDevice: '一号灯杆'
        },
        {
          id: '2',
          selectedDevice: '二号灯杆'
        },
        {
          id: '3',
          selectedDevice: '三号灯杆'
        },
        {
          id: '4',
          selectedDevice: '四号灯杆'
        },
        {
          id: '5',
          selectedDevice: '五号灯杆'
        },
        {
          id: '6',
          selectedDevice: '六号灯杆'
        }
      ],
      weekday_data: [
        {
          1: '周日',
          2: '周一',
          3: '周二',
          4: '周三',
          5: '周四',
          6: '周五',
          7: '周六',
        },
      ],
      dt_device: [
        {
          id: '1',
          device: '一号灯杆'
        },
        {
          id: '2',
          device: '二号灯杆'
        },
        {
          id: '3',
          device: '三号灯杆'
        },
        {
          id: '4',
          device: '四号灯杆'
        },
        {
          id: '5',
          device: '五号灯杆'
        },
        {
          id: '6',
          device: '六号灯杆'
        }
      ],
      column1: [
        { title: '序号', key: 'id', width: 60 },
        { title: '播放源', key: 'play_source' },
        { title: '播放时长', key: 'play_inOrder' }
      ],
      column_drawer1: [
        { title: '序号', key: 'id', width: 60 },
        { title: '播放源', key: 'play_source' },
        { title: '播放时长', key: 'play_inOrder' },
        {
          title: '操作',
          key: 'action',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleEditItem(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      dt_tableData1: [
        {
          id: '1',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        },
        {
          id: '2',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        },
        {
          id: '3',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        },
        {
          id: '4',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        }
      ],
      td_drawer1: [
        {
          id: '1',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        },
        {
          id: '2',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        },
        {
          id: '3',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        },
        {
          id: '4',
          play_source: '奇妙能力歌',
          play_inOrder: '3:10:20'
        }
      ]
    }
  },
  methods: {

    display(id){  
        var traget=document.getElementById(id);  
        if(traget.style.display=="none"){  
            traget.style.display="";  
        }else{  
            traget.style.display="none";  
       }  
    },
    light(id){  
        var traget=document.getElementById(id);
        traget.style.backgroundColor=white;
        traget.style.color="black";
        traget.style.width="200px";
    },
    rowClassName: function (row, index) {
      if (index % 2 == 0) {
        return 'ivu-table-stripe-even'
      } else return 'ivu-table-stripe-odd'
    },
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.list1[this.list1.length - 1]
          for (let i = 1; i < 11; i++) {
            this.list1.push(last + i)
          }
          resolve()
        }, 2000)
      })
    },
    ok () {
      this.$Message.info('已清空任务列表')
    },
    cancel () {
      this.$Message.info('已取消')
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less" scoped>
.ivu-modal-body table th{
  color:black;
}
.ivu-modal-body table td{
  color:black;
  background-color: white !important;
}

.ivu-drawer-body table th{
  color:white;
}
.ivu-drawer-body table td{
  color:white;
}
//抽屉字体颜色
.ivu-drawer-wrap input {
    color: black !important;
}

//抽屉背景色
.ivu-drawer-body{
  background-color: #002546;
}
//滑块
.ivu-slider-disabled .ivu-slider-bar {
    background-color: #2d8cf0;
}
.ivu-slider-disabled .ivu-slider-stop {
    background-color: #2d8cf0;
}
//自定义进度条按钮
.btn-week{
  //width: 155px;
  background-color:white;
  color:#09101d;
}
.btn-week[disabled]{
  cursor:0;
  background-color: rgba(0, 0, 0, 0);
}
.btn-hour{
  //width: 46px;
  background-color:white;
  color:white;
}
.btn-hour[disabled]{
    background-color: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
}
.ivu-table{
  background-color:rgba(0, 0, 0, 0);
}

.ivu-drawer-wrap-inner{
  padding-top: 10px;
}
.textcenter{
  text-align: center;
}
//无边框Table(Card Class)
.count-style {
  font-size: 50px;
}
.card_image .ivu-card-body {
  text-align: center;

  //height:100%;
}
.imgs {
  text-align:center;
  width: 100%;
  height: 300px;
}
.ivu-table th{
  color:rgba(0, 0, 0, 0);
}
/*偶数行*/
  .ivu-table-stripe-even td{
    background-color: #133e66!important;
  }
  /*奇数行*/
  .ivu-table-stripe-odd td{
    background-color: #052d4c!important;
  }
   .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td{
    background-color: #1F85DE !important;
  }
  .theimage{
    padding:0px !important;
  }
ul {
  list-style: none;
}
.dark tr.ivu-table-row-hover td {
  background-color: #1F85DE;
}

.layout {
  //border: 1px solid #d7dde4;
  background: #002546;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  // max-height: 500px;
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

.deviceinfo li span {
  margin-right: 20px;
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
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-bottom-left {
  display: none;
}

// //选中高亮
// tr.ivu-table-row-highlight td {
//   background-color: burlywood;
// }

// //悬浮高亮
// tr.ivu-table-row-hover td {
//   background-color: burlywood;
// }
</style>

<template>
  <div class="dark">
    <Row :gutter="10">
      <i-col span="5">
        <Card shadow>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>设备列表
          </p>
          <div class="device_table">
            <Table highlight-row ref="tables" :columns="dt_columns" :data="dt_tableData">
              <template slot-scope="{ row, index }" slot="status">
                <p v-if="row.status === 0">
                  <Icon type="ios-radio-button-on" color="green" size="24"></Icon>
                </p>
                <p v-else-if="row.status === 1">
                  <Icon type="ios-radio-button-on" color="yellow" size="24"></Icon>
                </p>
                <p v-else>
                  <Icon type="ios-radio-button-on" color="red" size="24"></Icon>
                </p>
              </template>

              <template slot-scope="{ row, index }" slot="lamppost">
                <p>{{ row.lamppost }}</p>
              </template>

              <template slot-scope="{ row, index }" slot="name">
                <p>{{ row.name }}</p>
              </template>
            </Table>
            <Row :gutter="20" style="text-align:center;margin-top: 10px;">
              <i-col span="4" offset="4">
                <Button class="search-btn" type="primary" size="small">上一页</Button>
              </i-col>
              <i-col span="4" offset="3">
                <Button class="search-btn" type="primary" size="small">下一页</Button>
              </i-col>
            </Row>
          </div>
        </Card>
      </i-col>

      <i-col span="5" style="margin-bottom: 20px;">
        <Card shadow>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>雷达样式
          </p>
          <img src="../../assets/images/device/radar.png" class="imgs">
          <!--<div class="card_img"> 
                <image src="../images/radar.png" class='img'>
                </image>
          </div>-->
          <Row :gutter="20" style="text-align:center;margin-top: 10px;">
            <i-col span="4" offset="6">
              <Button class="search-btn" type="primary">开启</Button>
            </i-col>
            <i-col span="4" offset="3">
              <Button class="search-btn" type="primary">关闭</Button>
            </i-col>
          </Row>
        </Card>

        <Card shadow>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>资产信息
          </p>
          <ul v-model="deviceInfo">
            <li>
              <p>产品名称: {{ deviceInfo.name }}</p>
            </li>
            <li>
              <p>运行状态: {{ deviceInfo.status }}</p>
            </li>
            <li>
              <p>购买日期: {{ deviceInfo.purchase_date }}</p>
            </li>
            <li>
              <p>维护日期: {{ deviceInfo.maintenance_date }}</p>
            </li>
            <li>
              <p>维护周期: {{ deviceInfo.maintenance_intervals }}</p>
            </li>
            <li>
              <p>保修期限: {{ deviceInfo.warranty_period }}</p>
            </li>
            <li>
              <p>生产产家: {{ deviceInfo.producer }}</p>
            </li>
            <li>
              <p>联系员工: {{ deviceInfo.contact_staff }}</p>
            </li>
            <li>
              <p>联系电话: {{ deviceInfo.contact_phone }}</p>
            </li>
            <li>
              <p>联系邮箱: {{ deviceInfo.contact_email }}</p>
            </li>
          </ul>
          <!-- <ul v-model="deviceInfo">
                <li >
                    <Row :gutter="10" style="text-align:center;margin-top: 10px;">
                        <i-col span='6'>
                            <p>产品名称: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.name }}</p>
                        </i-col>
                        <i-col span='6'>
                            <p>运行状态: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.status }}</p>
                        </i-col>
                    </Row>
                     <Row :gutter="10" style="text-align:center;margin-top: 10px;">
                        <i-col span='6'>
                            <p>购买日期: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.purchase_date }}</p>
                        </i-col>
                        <i-col span='6'>
                            <p>维护日期: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.maintenance_date }}</p>
                        </i-col>
                    </Row>
                     <Row :gutter="10" style="text-align:center;margin-top: 10px;">
                        <i-col span='6'>
                            <p>维护周期: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.maintenance_intervals }}</p>
                        </i-col>
                        <i-col span='6'>
                            <p>保修期限: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.warranty_period }}</p>
                        </i-col>
                    </Row>
                    <Row :gutter="10" style="text-align:center;margin-top: 10px;">
                        <i-col span='6'>
                            <p>生产产家: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.producer }}</p>
                        </i-col>
                        <i-col span='6'>
                            <p>联系员工: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.contact_staff }}</p>
                        </i-col>
                    </Row>
                    <Row :gutter="10" style="text-align:center;margin-top: 10px;">
                        <i-col span='6'>
                            <p>联系电话: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.contact_phone }}</p>
                        </i-col>
                        <i-col span='6'>
                            <p>联系邮箱: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ deviceInfo.contact_email }}</p>
                        </i-col>
                    </Row>
                </li>
          </ul>-->
        </Card>
      </i-col>

      <i-col span="12" style="margin-bottom: 20px;">
        <Card shadow>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>运行状态
          </p>
          <ul>
            <li v-for="item in runningInfoList" :key="item.id">
              <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                <i-col span="6">
                  <p>{{ item.title1 }}:</p>
                </i-col>
                <i-col span="6">
                  <p>{{ item.content1 }}</p>
                </i-col>
                <i-col span="6">
                  <p>{{ item.title2 }}:</p>
                </i-col>
                <i-col span="6">
                  <p>{{ item.content2 }}</p>
                </i-col>
              </Row>
            </li>
          </ul>
        </Card>

        <Card shadow>
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>数据分析
          </p>

          <chart-pie style="height: 280px;" :value="pieData" text="车流量统计示图"></chart-pie>
        </Card>
      </i-col>
    </Row>
    
  </div>

  
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar } from "_c/charts"; //ChartPie,
import Tables from "_c/tables";
//import Example from '../single-page/home/example.vue'
export default {
  name: "device_stru",
  components: {
    InforCard,
    CountTo,
    // tree,
    ChartPie,
    ChartBar,
    Tables
    //Example
  },
  data() {
    return {
      dt_columns: [
        { title: "状态", slot: "status" },
        { title: "灯柱", slot: "lamppost" },
        { title: "名称", slot: "name" }
        // {title:'设备状态',key:'device_status'},
        // {title:'',key:''},
        // {title:'',key:''},
      ],
      dt_tableData: [
        {
          status: 0,
          lamppost: "1001",
          name: "雷达"
        },
        {
          status: 0,
          lamppost: "1002",
          name: "雷达"
        },
        {
          status: 1,
          lamppost: "1003",
          name: "雷达"
        },
        {
          status: 1,
          lamppost: "1004",
          name: "雷达"
        },
        {
          status: 0,
          lamppost: "1005",
          name: "雷达"
        },
        {
          status: 0,
          lamppost: "1006",
          name: "雷达"
        },
        {
          status: 0,
          lamppost: "1007",
          name: "雷达"
        },
        {
          status: 0,
          lamppost: "1008",
          name: "雷达"
        },
        {
          status: 0,
          lamppost: "1009",
          name: "雷达"
        },
        {
          status: 2,
          lamppost: "1010",
          name: "雷达"
        }
      ],
      deviceInfo: {
        name: "爱尔视雷达",
        status: "正常运行",
        purchase_date: "2018-09-25",
        maintenance_date: "2019-09-25",
        maintenance_intervals: "3个月",
        warranty_period: "3年",
        producer: "爱尔视有限公司",
        contact_staff: "李工",
        contact_phone: "13578168700",
        contact_email: "ligong@gmail.com"
      },
      runningInfoList: [
        {
          title1: "产品名称",
          content1: "爱尔视雷达",
          title2: "运行状态",
          content2: "正常运行"
        },
        {
          title1: "序列号",
          content1: "151021001121",
          title2: "设备类型",
          content2: "雷达巴拉"
        },
        {
          title1: "设备功率",
          content1: "40KW",
          title2: "检测速度",
          content2: "2秒每次"
        }
      ],
      pieData: [
        { value: 335, name: "大型车流量" },
        { value: 310, name: "中型车流量" },
        { value: 234, name: "中型车流量" },
        { value: 135, name: "机动车流量" },
        { value: 1548, name: "行人流量" }
      ]
    };
  },
  mounted() {
    //
  }
};
</script>

<style lang="less" scope>
.count-style {
  font-size: 50px;
}
.card_img {
  text-align: center;
  //width:100%;
  //height:100%;
}
.imgs {
  width: 100%;
  height: 300px;
}
.ivu-card-body,
.ivu-card-head {
  background: #09101d;
  .device_table {
    padding: 0px;
    background: #09101d;
  }
  p {
    color: white;
  }
  .ivu-table th,
  td {
    background: #09101d;
    color: white;
  }
}

//.right-area,.zk-table__cell-inner,.zk-table__body-cell, .zk-table__footer-cell, .zk-table__header-cell,.ivu-card-body,.dark{
//  background: #09101D;
//}
ul {
  list-style: none;
}

// .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td{
//     background-color:burlywood;
// }
.dark tr.ivu-table-row-hover td {
  background-color: burlywood;
}
.dark {
  min-height: 800px;
}
</style>
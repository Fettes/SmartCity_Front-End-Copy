<template>
  <div class="dark">

    <Row :gutter="20" >
      <i-col :md="24" :lg="8">
        <Card shadow>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                设备列表
            </p>
            <div class="device_table">
                <tables ref="tables" v-model="dt_tableData" :columns="dt_columns"/>
                <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                    <i-col span='4' offset="6">
                        <Button class="search-btn" type="primary">
                            上一页
                        </Button>
                    </i-col>
                    <i-col span='4' offset="3">
                        <Button class="search-btn" type="primary">
                            下一页
                        </Button>
                    </i-col>
                </Row>
            </div>
        </Card>
      </i-col>

      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                雷达样式
            </p>
            <img src="../../assets/images/device/radar.png" class='imgs' />
           <!--<div class="card_img">
                <image src="../images/radar.png" class='img'>
                </image>
            </div> -->
            <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                    <i-col span='4' offset="6">
                        <Button class="search-btn" type="primary">
                            开启
                        </Button>
                    </i-col>
                    <i-col span='4' offset="3">
                        <Button class="search-btn" type="primary">
                            关闭
                        </Button>
                    </i-col>
                </Row>
        </Card>

        <Card shadow>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                资产信息
            </p>
            <ul>
                <li v-for="item in deviceInfoList" :key="item.id">
                    <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                        <i-col span='6'>
                            <p>{{ item.title1 }}: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ item.content1 }}</p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ item.title2 }}: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ item.content2 }}</p>
                        </i-col>
                    </Row>

                </li>
            </ul>

        </Card>
      </i-col>

      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
         <p slot="title">
                <Icon type="ios-film-outline"></Icon>
               运行状态
            </p>
            <ul>
                <li v-for="item in runningInfoList">
                    <Row :gutter="20" style="text-align:center;margin-top: 10px;">
                        <i-col span='6'>
                            <p>{{ item.title1 }}: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ item.content1 }}</p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ item.title2 }}: </p>
                        </i-col>
                        <i-col span='6'>
                            <p>{{ item.content2 }}</p>
                        </i-col>
                    </Row>
                </li>
            </ul>
        </Card>

        <Card shadow>
         <p slot="title">
               <Icon type="ios-film-outline"></Icon>
               数据分析
            </p>

                <chart-pie style="height: 280px;" :value="pieData" text="车流量统计示图"></chart-pie>

        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <!-- <example style="height: 310px;"/> -->

      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'// ChartPie,
import Tables from '_c/tables'
// import Example from '../single-page/home/example.vue'
export default {
  name: 'device_stru',
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
      dt_columns: [
        { title: '设备列表', key: 'device_list' },
        { title: '设备状态', key: 'device_status' }
        // {title:'',key:''},
        // {title:'',key:''},
      ],
      dt_tableData: [
        {
          device_list: '雷达1001',
          device_status: '探测中'
        }, {
          device_list: '雷达1002',
          device_status: '探测中'
        }, {
          device_list: '雷达1003',
          device_status: '探测中'
        }, {
          device_list: '雷达1004',
          device_status: '探测中'
        }, {
          device_list: '雷达1005',
          device_status: '探测中'
        }, {
          device_list: '雷达1006',
          device_status: '探测中'
        }, {
          device_list: '雷达1007',
          device_status: '探测中'
        }, {
          device_list: '雷达1008',
          device_status: '探测中'
        }, {
          device_list: '雷达1009',
          device_status: '探测中'
        }, {
          device_list: '雷达1010',
          device_status: '探测中'
        }, {
          device_list: '雷达1011',
          device_status: '探测中'
        }
      ],
      deviceInfoList: [
        {
          title1: '产品名称',
          content1: '爱尔视雷达',
          title2: '运行状态',
          content2: '正常运行'
        }, {
          title1: '购买日期',
          content1: '2018-09-25',
          title2: '维护日期',
          content2: '2019-09-25'
        }, {
          title1: '维护周期',
          content1: '3个月',
          title2: '保修期限',
          content2: '3年'
        }, {
          title1: '生产产家',
          content1: '爱尔视有限公司',
          title2: '联系员工',
          content2: '李工'
        }, {
          title1: '联系电话',
          content1: '13578168700',
          title2: '联系邮箱',
          content2: 'ligong@.com'
        }],
      runningInfoList: [
        {
          title1: '产品名称',
          content1: '爱尔视雷达',
          title2: '运行状态',
          content2: '正常运行'
        }, {
          title1: '序列号',
          content1: '151021001121',
          title2: '设备类型',
          content2: '雷达巴拉'
        }, {
          title1: '设备功率',
          content1: '40KW',
          title2: '检测速度',
          content2: '2秒每次'
        }
      ],
      pieData: [
        { value: 335, name: '大型车流量' },
        { value: 310, name: '中型车流量' },
        { value: 234, name: '中型车流量' },
        { value: 135, name: '机动车流量' },
        { value: 1548, name: '行人流量' }
      ]
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less" scope>
.count-style{
  font-size: 50px;
}
.card_img{
    text-align:center;
    //width:100%;
    //height:100%;
}
.imgs{
    width:100%;
    height:300px;
}
.ivu-card-body,
.ivu-card-head{
    background:#09101D;
    .device_table{
        padding:0px;
        background:#09101D;
    }
    p{
        color:white;
    }
    .ivu-table th,td{
        background:#09101D;
        color:white;
    }
}

//.right-area,.zk-table__cell-inner,.zk-table__body-cell, .zk-table__footer-cell, .zk-table__header-cell,.ivu-card-body,.dark{
//  background: #09101D;
//}
ul{
    list-style:none;
}

// .ivu-table-row-highlight td, .ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td, tr.ivu-table-row-highlight.ivu-table-row-hover td{
//     background-color:burlywood;
// }
.dark tr.ivu-table-row-hover td{
    background-color: burlywood;
}
</style>

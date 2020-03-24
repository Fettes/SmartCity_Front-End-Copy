<template>
  <div class="dark">
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <div class="dark">
          <Row :gutter="20">
            <i-col
              :xs="24"
              :md="16"
              :lg="8"
              v-for="(infor, i) in inforCardData"
              :key="`infor-${i}`"
              style="height: 120px;padding-bottom: 10px; "
            >
              <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
                <count-to :end="infor.count" count-class="count-style"/>
                <p>{{ infor.title }}</p>
              </infor-card>
            </i-col>
          </Row>
        </div>
        <div class="dark">
          <Card shadow>
            <tree-table
              expand-key="devicetype"
              :expand-type="false"
              :selectable="false"
              :columns="columns"
              :data="data"
            >
              <template slot="likes" slot-scope="scope">
                <Button @click="handle(scope)" size="small">操作</Button>
              </template>
            </tree-table>
          </Card>
        </div>
      </i-col>
      <!-- <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 600px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>-->
    </Row>
    <Row>
      <Card shadow>
        <!-- <example style="height: 310px;"/> -->
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar } from "_c/charts";
// import Example from './example.vue'
export default {
  name: "device_home",
  components: {
    InforCard,
    CountTo,
    // tree,
    // ChartPie,
    ChartBar
    // Example
  },
  data() {
    return {
      inforCardData: [
        {
          title: "灯杆总数",
          icon: "md-person-add",
          count: 803,
          color: "#2d8cf0"
        },
        { title: "通电数量", icon: "md-locate", count: 232, color: "#19be6b" },
        {
          title: "通网数量",
          icon: "md-help-circle",
          count: 142,
          color: "#ff9900"
        }
        // { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        // { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        // { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      columns: [
        {
          title: "名称",
          key: "name",
          width: "120px"
        },
        {
          title: "设备类型",
          key: "devicetype",
          minWidth: "120px",
          width: 60
        },
        {
          title: "IP地址",
          key: "IPAddress"
        },
        {
          title: "设备状态",
          key: "devicestatu"
        },
        {
          title: "操作",
          key: "operate",
          minWidth: "120px",
          type: "template",
          template: "likes"
        }
      ],
      data: [
        {
          name: "灯杆一号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC一号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED一号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响一号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆二号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC二号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED二号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响二号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆一号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC一号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED一号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响一号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆二号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC二号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED二号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响二号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆一号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC一号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED一号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响一号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆二号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC二号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED二号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响二号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆一号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC一号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED一号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响一号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆二号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC二号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED二号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响二号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆一号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC一号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED一号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响一号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆二号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC二号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED二号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响二号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆二号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC二号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED二号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响二号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        },
        {
          name: "灯杆二号",
          devicetype: "灯杆",
          IPAddress: "",
          devicestatu: "在线",
          // likes: ['football', 'basketball'],
          // score: 10,
          children: [
            {
              name: "PC二号",
              devicetype: "PC",
              IPAddress: "",
              devicestatu: "在线",
              children: [
                {
                  name: "LED二号",
                  devicetype: "LED",
                  IPAddress: "",
                  devicestatu: "在线"
                },
                {
                  name: "音响二号",
                  devicetype: "音响",
                  IPAddress: "",
                  devicestatu: "在线"
                }
              ]
            }
          ]
        }
      ]
      // pieData: [
      //   { value: 335, name: '直接访问' },
      //   { value: 310, name: '邮件营销' },
      //   { value: 234, name: '联盟广告' },
      //   { value: 135, name: '视频广告' },
      //   { value: 1548, name: '搜索引擎' }
      // ],
      // barData: {
      //   Mon: 13253,
      //   Tue: 34235,
      //   Wed: 26321,
      //   Thu: 12340,
      //   Fri: 24643,
      //   Sat: 1322,
      //   Sun: 1324
      // }
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
.dark .ivu-card-body div,
.ivu-card-head div {
  //background: black;
}
//.right-area,.zk-table__cell-inner,.zk-table__body-cell, .zk-table__footer-cell, .zk-table__header-cell,.ivu-card-body,.dark{
//  background: #09101D;
//}
</style>

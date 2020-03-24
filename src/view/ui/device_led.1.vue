<template>
  <div class="led">
    <Row :gutter="8">
      <Col span="8">
        <Card shadow>
          <div slot="title">
            <Icon type="ios-film-outline"></Icon>设备列表
          </div>

          <div>
            <Row>
              <Col span="4" offset="3">
                <Button @click="openAll">批量开启</Button>
              </Col>
              <Col span="4" offset="6">
                <Button @click="closeAll">批量关闭</Button>
              </Col>
            </Row>
            <br>

            <Table
              highlight-row
              ref="selection"
              border
              :columns="tablecolumns"
              :data="led_tabledata"
              @on-row-click="detailDevice = true"
            ></Table>
          </div>
          <br>
          <div>
            <Row class="paging" type="flex" justify="end">
              <Page :total="led_totalNum" size="small" show-total/>
            </Row>
            <br>
          </div>
        </Card>
      </Col>
      <Col span="16">
        <Card shadow>
          <div slot="title">
            <Icon type="ios-film-outline"></Icon>LED 样式
          </div>

          <div v-if="led_is_on">
            <img src="../../assets/images/device/led_on.png" class="device_img">
          </div>
          <div v-else>
            <img src="../../assets/images/device/led_off.png" class="device_img">
          </div>
          <Row :gutter="20" style="text-align:center;margin-top: 10px;">
            <!-- <Col span="4" offset="6">
              <Button type="primary" @click="turnOnDisplay(true)">开启</Button>
            </Col>-->
            <Col>
              <i-switch size="large" :value="led_is_on" @on-change="triggleDisplay">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-switch>
            </Col>
          </Row>
          <Row></Row>
        </Card>

        <Card shadow>
          <div slot="title">
            <Icon type="ios-film-outline"></Icon>资产信息
          </div>

          <div>
            <ul>
              <li v-for="item in deviceInfoList">
                <Row :gutter="20">
                  <Col span="8">{{item.title}} :</Col>
                  <Col>{{item.content}}</Col>
                </Row>
              </li>
            </ul>
          </div>
        </Card>

        <Card shadow>
          <div slot="title">
            <Icon type="ios-film-outline"></Icon>运行状态
          </div>

          <div>
            <ul>
              <li>
                <Row :gutter="20">
                  <Col span="8">当前任务:</Col>
                  <Col>{{currentDiviceStatus.currentJob}}</Col>
                </Row>
              </li>
              <li>
                <Row :gutter="20">
                  <Col span="8">开始时间:</Col>
                  <Col>{{currentDiviceStatus.startTime}}</Col>
                </Row>
              </li>
              <li>
                <Row :gutter="20">
                  <Col span="8">结束时间:</Col>
                  <Col>{{currentDiviceStatus.endTime}}</Col>
                </Row>
              </li>
            </ul>
          </div>
        </Card>
      </Col>
      <!-- <Col span="8">
        <Card shadow>
          <div slot="title">
            <Icon type="ios-film-outline"></Icon>运行状态
          </div>

          <div>
            <ul>
              <ul>
                <li>
                  <Row :gutter="20">
                    <Col span="8">当前任务:</Col>
                    <Col>{{currentDiviceStatus.currentJob}}</Col>
                  </Row>
                </li>
                <li>
                  <Row :gutter="20">
                    <Col span="8">开始时间:</Col>
                    <Col>{{currentDiviceStatus.startTime}}</Col>
                  </Row>
                </li>
                <li>
                  <Row :gutter="20">
                    <Col span="8">结束时间:</Col>
                    <Col>{{currentDiviceStatus.endTime}}</Col>
                  </Row>
                </li>
              </ul>
            </ul>
          </div>
        </Card>
      </Col>-->
    </Row>
    <div>
      <!-- <Button @click="detailDevice = true" type="primary">View Profile</Button> -->
      <Drawer :closable="false" width="1040" v-model="detailDevice">
        <p :style="pStyle">任务清单</p>
        <div class="item-list">
          <Table :columns="task_table_column" :data="tasklist">
            <div slot="action">xxx</div>
          </Table>
        </div>
        <Divider/>
      </Drawer>
    </div>
  </div>
</template>

<script>
import leddata from "./data/led_tabledata";
import deviceInfoList from "./data/led_deviceinfodata";
import led_tabledata from "./data/led_tabledata";
import expandRow from "./device_led_table_expand.vue";
import datetime_picker from "./device_led_datetime_picker.vue";
export default {
  name: "device_led",
  data() {
    return {
      tablecolumns: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        { title: "设备列表", key: "item" },
        { title: "设备状态", key: "status" }
      ],
      led_tabledata: leddata.data,
      led_totalNum: leddata.data.length,
      deviceInfoList: deviceInfoList.data,
      currentDiviceStatus: {
        currentJob: "播放新年祝福视频",
        startTime: "2019-1-31 12:00:00",
        endTime: "2019-2-5 12:00:00"
      },
      led_is_on: true,
      //   drawer
      detailDevice: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      task_table_column: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          type: "index",
          width: 50,
          align: "center"
        },
        { title: "任务名称", key: "jobname" },
        { title: "是否定时", width: 90, key: "timing" },
        {
          title: "定时设置",

          key: "timingsetting",
          render: (h, params) => {
            return h(datetime_picker, {
              props: {}
            });
          }
        },
        {
          title: "实时投放",
          width: 90,
          key: "playnow",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.playNow(params);
                  }
                }
              },
              "实时投放"
            );
          }
        }
      ],
      tasklist: [
        {
          jobname: "新中国新世界",
          timing: "否",

          file_name: "video001.mp4",
          run_cycle: "4 weeks",
          end_time: "2019-2-5 12:00:00"
        },
        {
          jobname: "新中国新世界",
          timing: "否",
          file_name: "video001.mp4",
          run_cycle: "4 weeks",
          end_time: "2019-2-5 12:00:00"
        },
        {
          jobname: "新中国新世界",
          timing: "否",
          file_name: "video001.mp4",
          run_cycle: "4 weeks",
          end_time: "2019-2-5 12:00:00"
        },
        {
          jobname: "新中国新世界",
          timing: "否",
          file_name: "video001.mp4",
          run_cycle: "4 weeks",
          end_time: "2019-2-5 12:00:00"
        },
        {
          jobname: "新中国新世界",
          timing: "否",
          file_name: "video001.mp4",
          run_cycle: "4 weeks",
          end_time: "2019-2-5 12:00:00"
        },
        {
          jobname: "新中国新世界",
          timing: "否",
          file_name: "video001.mp4",
          run_cycle: "4 weeks",
          end_time: "2019-2-5 12:00:00"
        }
      ]
    };
  },

  methods: {
    triggleDisplay() {
      setTimeout(() => {
        this.led_is_on = !this.led_is_on;
        if (this.led_is_on) {
          this.$Message.success("LED is on !");
        } else {
          this.$Message.success("LED is off !");
        }
      }, 1000);
    },
    openAll() {
      console.log(this.$refs.selection.getSelection());

      let selected_data = this.$refs.selection.getSelection();
      for (const i in selected_data) {
        //   let x  = led_tabledata.find(item => {
        //       if(item.name )
        //   })
        console.log("----" + selected_data[i]);
        let temp = selected_data[i];
        let x = this.led_tabledata.find(item => {
          if (item.item == temp.item) {
            item.status = "正常";
            return true;
          } else {
            return false;
          }
        });
      }

      //   this.led_tabledata = this.led_tabledata.filter(function(x) {
      //     x.status = "关闭";
      //     return x;
      //   });
    },
    closeAll() {
      let selected_data = this.$refs.selection.getSelection();
      for (const i in selected_data) {
        //   let x  = led_tabledata.find(item => {
        //       if(item.name )
        //   })
        console.log("----" + selected_data[i]);
        let temp = selected_data[i];
        let x = this.led_tabledata.find(item => {
          if (item.item == temp.item) {
            item.status = "关闭";
            return true;
          } else {
            return false;
          }
        });
      }
    },
    playNow(params) {
      console.log(JSON.stringify(params));
      this.$Message.success("即将播放" + params.index);
    }
  }
};
</script>

<style  lang="less" scope>
.ivu-card-body,
.ivu-card-head {
  background: #09101d;
  .device_table {
    padding: 0px;
    background: #09101d;
  }
  div {
    color: white;
  }
  .ivu-table th,
  td {
    background: #09101d;
    color: white;
  }
}
.led tr.ivu-table-row-hover td {
  background-color: burlywood;
}

.paging .ivu-page-total {
  color: white !important;
}
.device_img {
  width: 100%;
  height: 300px;
}

li {
  display: inline;
}

.item-list {
  font-size: 14px;
}
.item-list .ivu-col {
  margin-bottom: 12px;
}
</style>

<template>
  <div class="layout">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row>
          <Row>

            <i-col span="12">
            <!-- 饼状图Pie1 -->
              <Card style="margin-right:5px;">
                <Row>
                  <i-col span="8">
                    <div id="pie1" style="height:200px;width:100%;"></div>
                  </i-col>
                  <i-col span="8">
                    <div id="pie2" style="height:200px;width:100%;"></div>
                  </i-col>
                  <i-col span="8">
                    <div id="pie3" style="height:200px;width:100%;"></div>
                  </i-col>
                </Row>
              </Card>
            </i-col>


            <i-col span="12">
            <!-- 饼状图Pie1 -->
              <Card style="margin-right:5px;">
                <Row>
                  <i-col span="16">
                    <div id="piechart" style="height:200px;width:100%;"></div> 
                  </i-col>
                  <i-col span="8">
                    <Row style="margin-right:10px;margin-left:5px;">
                      <Row >
                        <p style="font-size:14px;">起始时间</p>
                        <DatePicker id="startDate" type="date" v-model="pieSelector.startTime" format="yyyy年MM月dd日" size="small" placeholder="选择日期" style="width: 100%" ></DatePicker>
                        <!-- <TimePicker id="startTime" type="time" size="small" class="timetext" placeholder="选择时间" style="width: 50%" v-model="formData.starttime"></TimePicker> -->
                      </Row>
                      <Row style="margin-top:5px;">
                        <p style="font-size:14px;">结束时间</p>
                        <DatePicker id="endDate" type="date" v-model="pieSelector.endTime" format="yyyy年MM月dd日" size="small" placeholder="选择日期" style="width: 100%" ></DatePicker>
                        <!-- <TimePicker id="endTime" format="yyyy-MM-dd" class="timetext" size="small" type="time" placeholder="选择时间" style="width: 50%" v-model="formData.endtime"></TimePicker> -->
                      </Row>
                      <Row style="margin-top:5px;margin-bottom:10px;">
                        <p style="font-size:14px;">设备类型</p>
                        <Select v-model="pieSelector.deviceType" placeholder="请选择设备类型" size="small" style="width: auto;">
                          <Option value="1">人行道灯</Option>
                          <Option value="2">车行道灯</Option>
                          <Option value="3">传感器</Option>
                          <Option value="4">车流</Option>
                          <Option value="5">人流</Option>
                          <Option value="6">警用摄像机</Option>
                          <Option value="7">交通摄像机</Option>
                          <Option value="8">LED</Option>
                          <Option value="9">广播音柱</Option>
                          <Option value="10">LCD</Option>
                          <Option value="11">WiFi AP</Option>
                          <Option value="12">工控机</Option>
                          <Option value="13">基站</Option>
                          <Option value="14">广播对讲机</Option>
                          <Option value="15">一键报警</Option>
                        </Select>
                      </Row>
                      <Row style="text-align:left">
                        <Button type="primary" @click="getPie()" size="small">应用</Button>
                      </Row>
                    </Row>
                  </i-col>
                </Row>
              </Card>
            </i-col>


            <!-- 饼状图Pie2 -->
            <!-- <i-col span="12">
              <Card>
                <Row>
                  <i-col span="16">
                    <div id="piechart2" style="height:200px;width:100%;"></div> 
                  </i-col>
                  <i-col span="8">
                    <Row style="margin-right:10px;margin-left:5px;">
                      <Row >
                        <p style="font-size:14px;">起始时间</p>
                        <DatePicker id="startDate" type="date" v-model="pieSelector2.startTime" format="yyyy年MM月dd日" size="small" placeholder="选择日期" style="width: 100%" ></DatePicker>
                      </Row>
                      <Row style="margin-top:5px;">
                        <p style="font-size:14px;">结束时间</p>
                        <DatePicker id="endDate" type="date" v-model="pieSelector2.endTime" format="yyyy年MM月dd日" size="small" placeholder="选择日期" style="width: 100%" ></DatePicker>
                      </Row>
                      <Row style="margin-top:5px;margin-bottom:10px;">
                        <p style="font-size:14px;">设备类型</p>
                        <Select v-model="pieSelector2.deviceType" placeholder="请选择设备类型" size="small" style="width: auto;">
                          <Option value="1">人行道灯</Option>
                          <Option value="2">车行道灯</Option>
                          <Option value="3">传感器</Option>
                          <Option value="4">车流</Option>
                          <Option value="5">人流</Option>
                          <Option value="6">警用摄像机</Option>
                          <Option value="7">交通摄像机</Option>
                          <Option value="8">LED</Option>
                          <Option value="9">广播音柱</Option>
                          <Option value="10">LCD</Option>
                          <Option value="11">WiFi AP</Option>
                          <Option value="12">工控机</Option>
                          <Option value="13">基站</Option>
                          <Option value="14">广播对讲机</Option>
                          <Option value="15">一键报警</Option>
                        </Select>
                      </Row>
                      <Row style="text-align:left">
                        <Button type="primary" @click="getPie2()" size="small">应用</Button>
                      </Row>
                    </Row>
                  </i-col>
                </Row>
              </Card>
            </i-col> -->


          </Row>



          <!-- 折线图 -->
          <Card>
            <Row>
              <i-col span="20">
                <div id="curvechart" style="height:250px;width:100%;"></div>
              </i-col>
              <i-col span="4">
                <Row style="margin-right:10px;margin-left:5px;">
                  <br>
                  <Row style="margin-top:5px;">
                    <p style="font-size:14px;">选择日期</p>
                    <DatePicker id="endDate" type="date" v-model="curveSelector.endTime" format="yyyy年MM月dd日" size="small" placeholder="选择日期" style="width: 100%" ></DatePicker>
                    <!-- <TimePicker id="endTime" format="yyyy-MM-dd" class="timetext" size="small" type="time" placeholder="选择时间" style="width: 50%" v-model="formData.endtime"></TimePicker> -->
                  </Row>
                  <Row style="margin-top:5px;margin-bottom:10px;">
                    <p style="font-size:14px;">设备类型</p>
                    <Select v-model="curveSelector.deviceType" placeholder="请选择设备类型" size="small" style="width: auto;">
                      <Option value="1">人行道灯</Option>
                      <Option value="2">车行道灯</Option>
                      <Option value="3">传感器</Option>
                      <Option value="4">车流</Option>
                      <Option value="5">人流</Option>
                      <Option value="6">警用摄像机</Option>
                      <Option value="7">交通摄像机</Option>
                      <Option value="8">LED</Option>
                      <Option value="9">广播音柱</Option>
                      <Option value="10">LCD</Option>
                      <Option value="11">WiFi AP</Option>
                      <Option value="12">工控机</Option>
                      <Option value="13">基站</Option>
                      <Option value="14">广播对讲机</Option>
                      <Option value="15">一键报警</Option>
                    </Select>
                  </Row>
                  <Row style="text-align:left">
                    <Button type="primary" @click="getCurve()" size="small">应用</Button>
                  </Row>
                </Row>
              </i-col>
            </Row>
          </Card>

          <!-- 条形图 -->
          <Card>
            <Row>
              <i-col span="20">
                <div id="barchart" style="height:250px;width:100%;"></div>  
              </i-col>
              <i-col span="4">
                <Row style="margin-right:10px;margin-left:5px;">
                  <Row>
                    <br>
                    <p style="font-size:14px;">起始时间</p>
                    <DatePicker id="startDate" type="date" v-model="barSelector.startTime" format="yyyy年MM月dd日" size="small" placeholder="选择日期" style="width: 100%" ></DatePicker>
                    <!-- <TimePicker id="startTime" type="time" size="small" class="timetext" placeholder="选择时间" style="width: 50%" v-model="formData.starttime"></TimePicker> -->
                  </Row>
                  <Row style="margin-top:10px;margin-bottom:10px;">
                    <p style="font-size:14px;">结束时间</p>
                    <DatePicker id="endDate" type="date" v-model="barSelector.endTime" format="yyyy年MM月dd日" size="small" placeholder="选择日期" style="width: 100%" ></DatePicker>
                    <!-- <TimePicker id="endTime" format="yyyy-MM-dd" class="timetext" size="small" type="time" placeholder="选择时间" style="width: 50%" v-model="formData.endtime"></TimePicker> -->
                  </Row>
                  <Row style="text-align:left">
                    <Button type="primary" @click="getAlarmAnalysisByDevice()" size="small">应用</Button>
                  </Row>
                </Row>
              </i-col>
            </Row>
          </Card>




        </Row>
      </Row>
    </Content>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import echarts from 'echarts'
import Tables from "_c/tables";
import { on, off } from "@/libs/tools";
import {getAlarmMessage, getAlarmList, getAllAlarm,getAlarmAnalysisDevice,getAlarmAnalysisDate,getAlarmAnalysis} from "@/api/warning";
const axios = require("axios");

export default {
  name: "device_warning",
  components: {
    InforCard,
    CountTo,
    Tables,
    echarts
    // Example
  },

  data() {
    return {
      smallPieData1: [
        { value: 333, name: '已处理' },
        { value: 350, name: '未处理' },
      ],      
      smallPieData2: [
        { value: 280, name: '已处理' },
        { value: 334, name: '未处理' },
      ],
      smallPieData3: [
        { value: 310, name: '已处理' },
        { value: 335, name: '未处理' },
      ],
      pieData: [
        { value: 310, name: '已处理' },
        { value: 335, name: '未处理' },
      ],
      pieData2: [
        { value: 310, name: '已处理' },
        { value: 335, name: '未处理' },
      ],
      pieTotal:0,
      pieTotal2:0,
      barData: [],
      curveData:[],
      pieSelector:{
        startTime:"2019-01-01",
        endTime:"2019-04-04",
        deviceType:"4",
      },
      // pieSelector2:{
      //   startTime:"2019-01-01",
      //   endTime:"2019-04-04",
      //   deviceType:"5",
      // },
      curveSelector:{
        endTime:"2019-04-04",
        deviceType:"4",
      },
      barSelector:{
        startTime:"2019-01-01",
        endTime:"2019-04-04"
      }
    };
  },
  methods: {
    //饼状图1----------------------------------------------------------
    getPie() {
      if (this.pieSelector.startTime>=this.pieSelector.endTime){
        this.$Message.error('请输入正确的时间！');
        return
      }
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getAlarmAnalysis({
        token: token,
        currentTime: this.pieSelector.endTime,
        previousTime: this.pieSelector.startTime,
        deviceType: this.pieSelector.deviceType
      })
        .then(res => {
          console.log("=========================");
          console.log("饼状图:");
          console.log(res.data);
          if (res.data.length==0){
            this.pieData[0].value=0;
            this.pieData[1].value=0;
            this.pieTotal=0;
          }else{
            this.pieData[0].value=res.data[1].count;
            this.pieData[1].value=res.data[0].count;
            this.pieTotal=this.pieData[0].value+this.pieData[1].value;
          }
          this.$nextTick(function() {
            this.drawpiechart('piechart',this.pieData,this.pieTotal)
          })
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    
    //饼状图2----------------------------------------------------------
    // getPie2() {
    //   if (this.pieSelector2.startTime>=this.pieSelector2.endTime){
    //     this.$Message.error('请输入正确的时间！');
    //     return
    //   }
    //   let uid = this.$store.state.user.userId;
    //   let token = this.$store.state.user.token;
    //   getAlarmAnalysis({
    //     token: token,
    //     currentTime: this.pieSelector2.endTime,
    //     previousTime: this.pieSelector2.startTime,
    //     deviceType: this.pieSelector2.deviceType
    //   })
    //     .then(res => {
    //       console.log("=========================");
    //       console.log("饼状图2:");
    //       console.log(res.data);
    //       if (res.data.length==0){
    //         this.pieData2[0].value=0;
    //         this.pieData2[1].value=0;
    //         this.pieTotal2=0;
    //       }else{
    //         this.pieData2[0].value=res.data[1].count;
    //         this.pieData2[1].value=res.data[0].count;
    //         this.pieTotal2=this.pieData2[0].value+this.pieData2[1].value;
    //       }
    //       console.log(this.pieData2);
    //       this.$nextTick(function() {
    //         this.drawpiechart('piechart2',this.pieData2,this.pieTotal2)
    //       })
    //     })
    //     .catch(err => {
    //       console.log("===========error==============");
    //       console.log(err);
    //     });
    // },
    //条形图----------------------------------------------------------
    getAlarmAnalysisByDevice() {
      if (this.barSelector.startTime>=this.barSelector.endTime){
        this.$Message.error('请输入正确的时间！');
        return
      }
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getAlarmAnalysisDevice({
        token: token,
        currentTime: this.barSelector.endTime,
        previousTime: this.barSelector.startTime,
      })
        .then(res => {
          console.log("=========================");
          console.log("条形图:");
          console.log(res.data);
          this.barData=res.data;
          this.translateDeviceType(this.barData);
          this.$nextTick(function() {
            this.drawbarchart('barchart')
          })
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //折线图----------------------------------------------------------
    getCurve() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      let cTime = new Date(this.curveSelector.endTime).Format("yyyy-MM-dd HH:mm:ss");
      getAlarmAnalysisDate({
        token: token,
        currentTime: cTime,
        deviceType:this.curveSelector.deviceType
      })
        .then(res => {
          console.log("=========================");
          console.log("折线图:");
          console.log(res.data);
          this.curveData=res.data;
          this.$nextTick(function() {
            this.drawCurve('curvechart')
          })
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    translateDeviceType(data){
      for(let i in data){
        if(data[i].deviceType==0)
          data[i].deviceType = "未知设备";
        if(data[i].deviceType==1)
          data[i].deviceType = "人行道灯";
        if(data[i].deviceType==2)
          data[i].deviceType = "车行道灯";
        if(data[i].deviceType==3)
          data[i].deviceType = "传感器";
        if(data[i].deviceType==4)
          data[i].deviceType = "车流";
        if(data[i].deviceType==5)
          data[i].deviceType = "人流";
        if(data[i].deviceType==6)
          data[i].deviceType = "警用摄像机";
        if(data[i].deviceType==7)
          data[i].deviceType = "交通摄像机";
        if(data[i].deviceType==8)
          data[i].deviceType = "LED";
        if(data[i].deviceType==9)
          data[i].deviceType = "广播音柱";
        if(data[i].deviceType==10)
          data[i].deviceType = "LCD";
        if(data[i].deviceType==11)
          data[i].deviceType = "WiFi AP";
        if(data[i].deviceType==12)
          data[i].deviceType = "工控机";
        if(data[i].deviceType==13)
          data[i].deviceType = "基站";
        if(data[i].deviceType==14)
          data[i].deviceType = "广播对讲机";
        if(data[i].deviceType==15)
          data[i].deviceType = "一键报警";
      }
    },
    drawbarchart(id){
      this.charts = echarts.init(document.getElementById(id),'macarons')
      this.charts.setOption({
        title: {
          text: '设备告警统计'
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        "color": [
            "#32C5E9",
            "#67E0E3",
            "#9FE6B8",
          ],
        legend: {
          data:['未处理','处理中','已处理']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : this.barData.map(_ => _.deviceType)
          }
        ],
        yAxis: [
          {
            name: '单位：次',
            color: ["#3398DB"],
            axisLabel: {
              textStyle: {
                color: "black"
              }
            },
            type: "value"
          }
        ],
        series : [
          {
            name:'已处理',
            type:'bar',
            barWidth:'30%',
            stack: '告警',
            data: this.barData.map(_ => _.isDeal)
          },
          {
            name:'处理中',
            type:'bar',
            barWidth:'30%',
            stack: '告警',
            data: this.barData.map(_ => _.isDealing)
          },
          {
            name:'未处理',
            type:'bar',
            barWidth:'30%',
            stack: '告警',
            data: this.barData.map(_ => _.isNotDeal),
            label:{
              color: 'red',
              //show:true,            //显示数字
              position: 'top',      //这里可以自己选择位置
              formatter: function(params) {//格式化柱状图显示label
                // console.log(this.series)
                
                return params.value+params.dataIndex;
              }
            },
          },
        ]
      })
    },
    drawpie(id,data,title){
      this.charts = echarts.init(document.getElementById(id),'macarons')
      this.charts.setOption({
        title: [
        {
          text: title,
          x: 'center',
        }
        ],

        series: [
          
            {
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 8,
                  "color": [
                    [0.20,"#9FE6B8"],
                    [0.80,"#32C5E9"],
                    [2,"#FB9093"],
                  ],
                },
            },
            splitLine: {           // 分隔线
              length:10,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width:2
            },
            title: {
              show:false,
              offsetCenter: [0, '-30%'],       // x, y，单位px
                
            },
              name: '业务指标',
              type: 'gauge',
              detail: {formatter:'{value}%',
                fontSize:14
              },
              data: [{value: 50, name: '完成率'}]
            }
        ]
      })
    },
    drawpiechart(id,data,total){
      this.charts = echarts.init(document.getElementById(id),'macarons')
      this.charts.setOption({
        title: {
          text: total+"次",
          subtext: this.subtext,
          textStyle: {
            color: '#7999CF'
          },
          x: 'center',
          y: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        "color": [
          // "#19be6b",
          // "#2d8cf0",
          "#9FE6B8",
          "#FF9F7F",
          "#ff9900",
          "#E46CBB",
          "#9A66E4",
          "#ed3f14"
        ],
        legend: {
          orient: 'vertical',
          left: 'left',
          data: data,
          textStyle:{//图例文字的样式
            "color": [
              "#2d8cf0",
              "#19be6b",
              "#ff9900",
              "#E46CBB",
              "#9A66E4",
              "#ed3f14"
            ],
          }
        },
        series: [
          {
            name:"告警",
            type: 'pie',
            radius : ['50%', '70%'],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label:{
              normal:{
                  show: true,
                  formatter: '{b}: {c}({d}%)'
              }
            }
          }
        ]
      })
    },
    drawCurve(id){
      this.charts = echarts.init(document.getElementById(id),'macarons')
        this.charts.setOption({
          title: {
            text: '告警趋势统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          "color": [
            "#32C5E9",
            "#67E0E3",
            "#9FE6B8",
            ],
          legend: {
            data:['未处理','处理中','已处理']
          },
          grid: {
            left: "1.2%",
            right: "1%",
            bottom: "0%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            color: ["#3398DB"],
            axisLabel: {
              textStyle: {
                color: "black"
              }
            },
            axisLine:{
              lineStyle:{
                color:'black',
              }
            },
            boundaryGap: true,
            data: this.curveData.map(_ => _.alarmDate)
          },
          yAxis: [
            {
              name: '单位：次',
              color: ["#3398DB"],
              axisLabel: {
                textStyle: {
                  color: "black"
                }
              },
              type: "value"
            }
          ],
          series: [
            {
              name:'已处理',
              type:'line',
              stack: '告警0',
              label:{
                normal:{
                  color: "#67E0E3",
                  show:true,            //显示数字
                  position: 'top'        //这里可以自己选择位置
                }
              },
              // areaStyle: {
              //   normal: {
              //     color: "green"
              //   }
              // },
              data: this.curveData.map(_ => _.isDeal)
            },
            {
              name:'处理中',
              type:'line',
              stack: '告警1',
              label:{
                normal:{
                  color: "#67E0E3",
                  show:true,            //显示数字
                  position: 'top'        //这里可以自己选择位置
                }
              },
              // areaStyle: {
              //   normal: {
              //     color: "green"
              //   }
              // },
              data: this.curveData.map(_ => _.isDealing)
            },
            {
              name:'未处理',
              type:'line',
              stack: '告警2',
              label:{
                normal:{
                  color: "#9FE6B8",
                  show:true,            //显示数字
                  position: 'top'        //这里可以自己选择位置
                }
              },
              // areaStyle: {
              //   normal: {
              //     color: "yellow"
              //   }
              // },
              data: this.curveData.map(_ => _.isNotDeal)
            },
          ]
      })
    },
    setTime(){
      let endDate = (new Date()).Format("yyyy-MM-dd");
      let startDate = (new Date()).Format("yyyy-MM-dd")+"";
      startDate=startDate.substring(0, startDate.length-6)+"-01-01";
      this.pieSelector.startTime = startDate;
      this.pieSelector.endTime = endDate;
      // this.pieSelector2.startTime = startDate;
      // this.pieSelector2.endTime = endDate;
      this.barSelector.startTime = startDate;
      this.barSelector.endTime = endDate;
      this.curveSelector.endTime = endDate;
    },
    initData(){
      this.setTime();
      this.getPie();
      // this.getPie2();
      this.getAlarmAnalysisByDevice();
      this.getCurve();
      this.$nextTick(function() {
        this.drawpie('pie1',this.smallPieData1,"告警设备数目：9")
        this.drawpie('pie2',this.smallPieData2,"路灯故障数目：23")
        this.drawpie('pie3',this.smallPieData3,"设备离线数目：100")
      })
    }
  },
  mounted() {
    this.initData();
    window.onresize = () => {
      let pie1 = echarts.getInstanceByDom(document.getElementById('pie1'));
      pie1.resize();
      let pie2 = echarts.getInstanceByDom(document.getElementById('pie2'));
      pie2.resize();
      let pie3 = echarts.getInstanceByDom(document.getElementById('pie3'));
      pie3.resize();
      let piechart = echarts.getInstanceByDom(document.getElementById('piechart'));
      piechart.resize();
      let curvechart = echarts.getInstanceByDom(document.getElementById('curvechart'));
      curvechart.resize();
      let barchart = echarts.getInstanceByDom(document.getElementById('barchart'));
      barchart.resize();
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
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
.ivu-card{
  background-color: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid rgba(225, 225, 225, 1);
  border-radius: 10px 10px 10px 10px;
  margin-bottom:5px;
}
</style>

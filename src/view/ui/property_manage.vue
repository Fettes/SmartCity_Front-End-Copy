<template>
  <div class="layout dark">
    <Content :style="{padding: '12px', minHeight: '280px'}">
      <Row class="background-row">
        <Row style="margin-left:26px;margin-top:26px;margin-right:26px;margin-bottom:14px;">
          <Tabs value="name1" class="PropertyTab" >
            <TabPane label="资产清单" name="name1">
              <Row style="font-size:14px;">
                <br>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>资产编号 </span>
                  <Input v-model="searchData.deviceNo" placeholder="请输入资产编号" style="width: auto;;margin-left:5px;" />
                </i-col>
                <i-col span="4" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>设备类型 </span>
                  <Select v-model="searchData.deviceType" placeholder="请选择设备类型" style="width: auto;margin-left:5px;">
                    <Option value="0">未知设备</Option>
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
                </i-col>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>灯杆名称 </span>
                  <Input v-model="searchData.lightPoleName" placeholder="请输入灯杆名称" style="width: auto;;margin-left:5px;" />
                </i-col>
                <i-col span="5" >
                  <span style="margin-left:20px;font-size:16px;"><Icon type="ios-clock-outline" size="20" style="color:#119ae5"/>安装时间 </span>
                  <DatePicker v-model="searchData.startTime" format="yyyy年MM月dd日" type="date" placeholder="选择起始时间" style="width: auto;margin-left:5px;"></DatePicker>
                </i-col>
                <i-col span="5" >
                  <span style="font-size:16px;">—— </span>
                  <DatePicker v-model="searchData.endTime" format="yyyy年MM月dd日" type="date" placeholder="选择结束时间" style="width: auto;margin-left:15px;"></DatePicker>
                </i-col>
              </Row>
              <br>

              <!-- 资产操作按钮 -->
              <Row>
                <span style="margin-right:17px;margin-left:19px;">
                  <Button class="manage-btn" type="primary" style="width:140px;font-size:16px;background-color:#3fa8e4;border: 1px solid #3fa8e4" @click="addProperty=true,handleReset('addForm')"><Icon type="md-add" size="20"/>添加资产</Button>
                </span>
                <span style="margin-right:17px;">
                  <Button  class="manage-btn" type="success" style="width:140px;font-size:16px;background-color:#60cb95;border: 1px solid #60cb95" @click="startDevice()"><Icon type="md-checkmark-circle" size="20" />启用设备</Button>
                  <!-- <Button  class="manage-btn" type="error" style="width:140px;font-size:16px;background-color:#da0707;" @click="deleteProperty=true"><Icon type="md-trash" size="20" />删除资产</Button> -->
                </span>
                <span style="margin-right:17px;">
                  <Button  class="manage-btn" type="error" style="width:140px;font-size:16px;background-color:#d64c4c;border: 1px solid #d64c4c" @click="stopDevice()"><Icon type="md-power" size="20" />停用设备</Button>
                </span>
                <span>
                  <Button class="manage-btn" type="warning" style="width:140px;font-size:16px;background-color:#d2a35b;border: 1px solid #d2a35b" @click="beforeEdit()"><Icon type="md-create" size="20"/>修改资产</Button>
                </span>
                <span style="margin-right:19px;float:right;">
                  <Button style="width:100px;font-size:16px;border: 0.5px solid rgba(62, 62, 62, 0.36);" @click="propertyInit()">重置</Button>
                </span>
                <span style="margin-right:5px;float:right;">
                  <Button style="width:100px;font-size:16px;background-color:#119AE5;" @click="search()" type="primary"><Icon type="md-search" size="20"/>搜索</Button>
                </span>
              </Row>
              <br>



              <Table class="propertyTable" @on-selection-change="selectionUpdate"  border ref="selection" :columns="tablecolumns" :data="tabledata" style="margin-left:19px;margin-right:19px;"></Table>
              <br>
              <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
                <Page ref="pager" id="pager" :total="totalNum" :current="pageNum" @on-change="turnPage" :page-size="tableSize"  show-total show-elevator/>
              </Row>
            </TabPane>


            <!-- 设备安装页 -->
            <TabPane label="设备安装" name="name2">
              <Row style="font-size:14px;">
                <i-col span="6">
                  <Row style="margin-left:20px;font-size:16px;">
                    <br>
                    <Tree :data="lightTree" @on-select-change="TreeClick"></Tree>
                  </Row>
                </i-col>
                <i-col span="18">
                  <Row>
                    <br>
                    <span style="margin-right:5px;">
                      <span style="margin-left:10px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>资产编号 </span>
                      <Input v-model="uninstallSearch.deviceNo" placeholder="请输入资产编号" style="width: auto;;margin-left:5px;" />
                    </span>
                    <span style="margin-right:5px;">
                      <span style="margin-left:10px;font-size:16px;"><Icon type="md-search" size="20" style="color:#119ae5"/>设备类型 </span>
                      <Select v-model="uninstallSearch.deviceType" placeholder="请选择设备类型" style="width: auto;margin-left:5px;">
                        <Option value="0">未知设备</Option>
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
                    </span>
                    <span style="margin-right:19px;float:right;">
                      <Button style="width:100px;font-size:16px;border: 0.5px solid rgba(62, 62, 62, 0.36);" @click="installInit()">重置</Button>
                    </span>
                    <span style="margin-right:5px;float:right;">
                      <Button style="width:100px;font-size:16px;background-color:#119AE5;" @click="installSearch()" type="primary"><Icon type="md-search" size="20"/>搜索</Button>
                    </span>
                  </Row>
                  <br>
                  <Table class="propertyTable" border ref="selection" :columns="col_uninstallDevice" :data="dt_uninstallDevice" style="margin-left:10px;margin-right:19px;"></Table>
                  <br>
                  <Row class="paging" type="flex" justify="end" style="margin-bottom:7px;margin-right:50px;">
                    <Page ref="pager2" id="pager2" :total="installTotalNum" :current="installPageNum" @on-change="turnInstallPage" :page-size="installTableSize" show-total show-elevator/>
                  </Row>
                </i-col>
              </Row>
            </TabPane>


            <TabPane label="维护记录" name="name3" disabled>
              <span style="color:white;font-size:20px;" >暂时不开放</span>
            </TabPane>
          </Tabs>
        </Row>
      </Row>
    </Content>



    <!-- 添加资产 -->
    <Modal v-model="addProperty" footer-hide>
      <p slot="header" style="text-align:center">
        <span>添加资产</span>
      </p>
      <div>
        <Form ref="addForm" :model="addForm" :rules="addRule" :label-width="100">
          <!-- <FormItem label="设备状态" prop="status">
            <RadioGroup v-model="addForm.status">
                <Radio label="1">运行正常</Radio>
                <Radio label="2">设备离线</Radio>
                <Radio label="0">设备断电</Radio>
            </RadioGroup>
          </FormItem> -->
          <FormItem label="资产编号" prop="deviceNo">
            <Input v-model="addForm.deviceNo" placeholder="请输入资产编号" style="width: 300px"/>
          </FormItem>
          <FormItem label="资产名称" prop="deviceName">
            <Input v-model="addForm.deviceName" placeholder="请输入资产名称" style="width: 300px"/>
          </FormItem>
          <FormItem label="资产类型" prop="deviceType">
            <Select v-model="addForm.deviceType" placeholder="请选择资产类型" style="width: 300px">
                <Option value="1">人行道灯</Option>
                <Option value="2">车行道灯</Option>
                <Option value="3">传感器</Option>
                <Option value="4">车流监控</Option>
                <Option value="5">人流监控</Option>
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
          </FormItem>
          <FormItem label="厂家" prop="manufacturer">
            <Input v-model="addForm.manufacturer" placeholder="请输入厂家" style="width: 300px"/>
          </FormItem>
          <FormItem label="联系人" prop="contact">
            <Input v-model="addForm.contact" placeholder="请输入联系人" style="width: 300px"/>
          </FormItem>
          <FormItem label="联系电话" prop="tel">
            <Input v-model="addForm.tel" placeholder="请输入联系电话" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleAddSubmit('addForm')">提交</Button>
            <Button  style="margin-left: 8px" @click="handleReset('addForm')">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>


    <!-- 修改资产 -->
    <Modal v-model="editProperty" footer-hide>
      <p slot="header" style="text-align:center">
        <span>修改资产</span>
      </p>
      <div>
        <Form ref="editForm" :model="editForm" :rules="addRule" :label-width="100">
          <FormItem label="设备状态" prop="status">
            <RadioGroup v-model="editForm.status">
                <Radio label="运行正常">运行正常</Radio>
                <Radio label="设备离线">设备离线</Radio>
                <Radio label="设备断电">设备断电</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="资产编号" prop="deviceNo">
            <Input v-model="editForm.deviceNo" placeholder="请输入资产编号" style="width: 300px"/>
          </FormItem>
          <FormItem label="资产名称" prop="deviceName">
            <Input v-model="editForm.deviceName" placeholder="请输入资产名称" style="width: 300px"/>
          </FormItem>
          <FormItem label="资产类型" prop="deviceType">
            <Select v-model="editForm.deviceType" placeholder="请选择资产类型" style="width: 300px">
                <Option value="1">人行道灯</Option>
                <Option value="2">车行道灯</Option>
                <Option value="3">环境监测</Option>
                <Option value="4">车流监控</Option>
                <Option value="5">人流监控</Option>
                <Option value="6">警用CCTV</Option>
                <Option value="7">交通CCTV</Option>
                <Option value="8">LED</Option>
                <Option value="9">广播音柱</Option>
                <Option value="10">LCD</Option>
                <Option value="11">WiFi AP</Option>
                <Option value="12">工控机</Option>
                <Option value="13">基站</Option>
                <Option value="14">对讲机</Option>
                <Option value="15">一键报警</Option>
            </Select>
          </FormItem>
          <FormItem label="厂家" prop="manufacturer">
            <Input v-model="editForm.manufacturer" placeholder="请输入厂家" style="width: 300px"/>
          </FormItem>
          <FormItem label="联系人" prop="contact">
            <Input v-model="editForm.contact" placeholder="请输入联系人" style="width: 300px"/>
          </FormItem>
          <FormItem label="联系电话" prop="tel">
            <Input v-model="editForm.tel" placeholder="请输入联系电话" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleEditSubmit('editForm')">提交</Button>
            <Button  style="margin-left: 8px" @click="handleReset('editForm')">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 删除资产 -->
    <Modal
      v-model="deleteProperty"
      title="确定要删除这个资产吗"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>这会删除的此资产的所有信息，内容将不可恢复。</p>
    </Modal>







    <!-- 安装广播设备 -->
    <Modal v-model="installBroadcast" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装广播设备</span>
      </p>
      <div>
        <Form ref="installBroadcastForm" :model="installBroadcastForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installBroadcastForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installBroadcastForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="tid" prop="tid">
            <Input v-model="installBroadcastForm.tid" placeholder="请输入tid" style="width: 300px"/>
          </FormItem>
          <FormItem label="音量" prop="volume">
            <Input v-model="installBroadcastForm.volume" placeholder="请输入音量" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="installBroadcastSubmit()">安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装工控机 -->
    <Modal v-model="installLpc" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装工控机</span>
      </p>
      <div>
        <Form ref="installLpcForm" :model="installLpcForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installLpcForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installLpcForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="IP地址" prop="ip">
            <Input v-model="installLpcForm.ip" placeholder="请输入IP地址" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="installLpcSubmit()">安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装lcd -->
    <Modal v-model="installLcd" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装LCD</span>
      </p>
      <div>
        <Form ref="installLcdForm" :model="installLcdForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installLcdForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installLcdForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="亮度" prop="brightness">
            <Input v-model="installLcdForm.brightness" placeholder="请输入亮度" style="width: 300px"/>
          </FormItem>
          <FormItem label="音量" prop="volume">
            <Input v-model="installLcdForm.volume" placeholder="请输入音量" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary"  @click="installLcdSubmit()">安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装led -->
    <Modal v-model="installLed" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装LED</span>
      </p>
      <div>
        <Form ref="installLedForm" :model="installLedForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installLedForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installLedForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="亮度" prop="brightness">
            <Input v-model="installLedForm.brightness" placeholder="请输入亮度" style="width: 300px"/>
          </FormItem>
          <FormItem label="朝向" prop="towards">
            <Input v-model="installLedForm.towards" placeholder="请输入朝向" style="width: 300px"/>
          </FormItem>
          <FormItem label="音量" prop="volume">
            <Input v-model="installLedForm.volume" placeholder="请输入音量" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="installLedSubmit()">安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装人流 -->
    <Modal v-model="installPfm" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装人流检测</span>
      </p>
      <div>
        <Form ref="installPfmForm" :model="installPfmForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installPfmForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installPfmForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="频率" prop="frequency">
            <Input v-model="installPfmForm.frequency" placeholder="请输入频率" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="installPfmSubmit()">安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装传感器 -->
    <Modal v-model="installSensor" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装传感器</span>
      </p>
      <div>
        <Form ref="installSensorForm" :model="installSensorForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installSensorForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installSensorForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="辅助电压" prop="assistVoltage">
            <Input v-model="installSensorForm.assistVoltage" placeholder="请输入辅助电压" style="width: 300px"/>
          </FormItem>
          <FormItem label="频率" prop="frequency">
            <Input v-model="installSensorForm.frequency" placeholder="请输入频率" style="width: 300px"/>
          </FormItem>
          <FormItem label="存储温度" prop="storageTemp">
            <Input v-model="installSensorForm.storageTemp" placeholder="请输入存储温度" style="width: 300px"/>
          </FormItem>
          <FormItem label="水准确度" prop="waterAccuracy">
            <Input v-model="installSensorForm.waterAccuracy" placeholder="请输入水准确度" style="width: 300px"/>
          </FormItem>
          <FormItem label="报警水深" prop="waterAlarmDepth">
            <Input v-model="installSensorForm.waterAlarmDepth" placeholder="请输入报警水深" style="width: 300px"/>
          </FormItem>
          <FormItem label="工作范围" prop="workRange">
            <Input v-model="installSensorForm.workRange" placeholder="请输入工作范围" style="width: 300px"/>
          </FormItem>
          <FormItem label="工作温度" prop="workingTemp">
            <Input v-model="installSensorForm.workingTemp" placeholder="请输入工作温度" style="width: 300px"/>
          </FormItem>
          <FormItem label="工作电压" prop="workingVoltage">
            <Input v-model="installSensorForm.workingVoltage" placeholder="请输入工作电压" style="width: 300px"/>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="installSensorForm.remark" placeholder="请输入备注" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="installSensorSubmit()" >安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装基站 -->
    <Modal v-model="installTelStation" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装基站</span>
      </p>
      <div>
        <Form ref="installTelStationForm" :model="installTelStationForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installTelStationForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installTelStationForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="天线效应" prop="antennaEffic">
            <Input v-model="installTelStationForm.antennaEffic" placeholder="请输入天线效应" style="width: 300px"/>
          </FormItem>
          <FormItem label="方向性" prop="directivity">
            <Input v-model="installTelStationForm.directivity" placeholder="请输入方向性" style="width: 300px"/>
          </FormItem>
          <FormItem label="IP地址" prop="ip">
            <Input v-model="installTelStationForm.ip" placeholder="请输入IP地址" style="width: 300px"/>
          </FormItem>
          <FormItem label="模式" prop="model">
            <Input v-model="installTelStationForm.model" placeholder="请输入模式" style="width: 300px"/>
          </FormItem>
          <FormItem label="功率" prop="power">
            <Input v-model="installTelStationForm.power" placeholder="请输入功率" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="installTelStationSubmit()">安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装UPS -->
    <Modal v-model="installUps" footer-hide >
      <p slot="header" style="text-align:center">
        <span>安装UPS</span>
      </p>
      <div>
        <Form ref="installUpsForm" :model="installUpsForm" :label-width="100">
          <FormItem label="设备ID" prop="assetId">
            <Input v-model="installUpsForm.assetId" style="width: 300px" disabled/>
          </FormItem>
          <FormItem>
            <Button type="primary" >安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!-- 安装车流 -->
    <Modal v-model="installVfm" footer-hide>
      <p slot="header" style="text-align:center">
        <span>安装车流</span>
      </p>
      <div>
        <Form ref="installVfmForm" :model="installVfmForm" :label-width="100">
          <FormItem label="设备名称" prop="name">
            <Input v-model="installVfmForm.name" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="灯杆名称" prop="lightPoleName">
            <Input v-model="installVfmForm.lightPoleName" style="width: 300px" disabled/>
          </FormItem>
          <FormItem label="频率" prop="frequency">
            <Input v-model="installVfmForm.frequency" placeholder="请输入频率" style="width: 300px"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="installVfmSubmit()">安装</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>


  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";
// import Example from '../single-page/home/example.vue'
import { on, off } from "@/libs/tools";
import { getAllDevices, deleteDevice, updateDevice, addDevice, getLightPoleTree, getUninstallDevices, installBroadcast, installIpc, installLcd, installLed, installPfm,installSensor, installTelStation, installUps, installVfm} from "@/api/property";
const axios = require("axios");

export default {
  name: "property_manage",
  components: {
    InforCard,
    CountTo,
    Tables
    // Example
  },

  data() {
    return {
      totalNum: 12, //table 数据条数
      installTotalNum:12,
      pageNum: 1,
      installPageNum:1,
      tableSize: 9,
      installTableSize: 10,
      selectedDeviceId:0,
      searchOn: false,
      installSearchOn:false,
      //操作按钮的弹窗
      addProperty: false,
      editProperty: false,
      deleteProperty: false,
      installBroadcast:false,
      installLpc:false,
      installLcd:false,
      installLed:false,
      installPfm:false,
      installSensor:false,
      installTelStation:false,
      installUps:false,
      installVfm:false,
      selectedPole:[],
      selectedProperty:[],
      searchData:{
        deviceNo:'',
        deviceType:'',
        lightPoleName:'',
        startTime:"",
        endTime:"",
      },
      uninstallSearch:{
        deviceType:'',
        deviceNo:''
      },
      addForm: {
        status: '',
        deviceNo: '',
        deviceName: '',
        deviceType: '',
        manufacturer: '',
        contact: '',
        tel: '',
      },
      editForm: {
        status: '',
        deviceNo: '',
        deviceName: '',
        deviceType: '',
        manufacturer: '',
        contact: '',
        tel: '',
      },
      installBroadcastForm:{
        volume:'',
        tid:'',
        lightPoleId:'',
        assetId:'',
        lightPoleName:'',
        name:''
      },
      installLpcForm:{
        ip:'',
        lightPoleId:'',
        assetId:'',
        lightPoleName:'',
        name:''
      },
      installLcdForm:{
        volume:'',
        brightness:'',
        lightPoleId:'',
        assetId:'',
        lightPoleName:'',
        name:''
      },
      installLedForm:{
        volume:'',
        brightness:'',
        lightPoleId:'',
        assetId:'',
        towards:'',
        lightPoleName:'',
        name:''
      },
      installPfmForm:{
        frequency:'',
        lightPoleId:'',
        assetId:'',
        lightPoleName:'',
        name:''
      },
      installSensorForm:{
        assetId: '',
        assistVoltage: '',
        frequency: "",
        lightPoleId: '',
        remark: "",
        storageTemp: '',
        waterAccuracy: '',
        waterAlarmDepth: '',
        workRange: '',
        workingTemp: '',
        workingVoltage: '',
        lightPoleName:'',
        name:''
      },
      installTelStationForm:{
        antennaEffic: '',
        assetId: '',
        directivity: '',
        ip: "",
        lightPoleId: '',
        model: "",
        power:'',
        lightPoleName:'',
        name:''
      },
      installUpsForm:{
      },
      installVfmForm:{
        volume:'',
        frequency:'',
        lightPoleId:'',
        lightPoleName:'',
        name:''
      },
      addRule: {
        status: [
          { required: true, message: '请选择设备状态', trigger: 'change' }
        ],
        deviceNo: [
          { required: true, message: '请输入设备编号', trigger: 'change' }
        ],
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'change' }
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        manufacturer: [
          { required: true, message: '请输入厂家', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ],
      },
      tablecolumns: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: 'ID',
            width: 80,
            key: 'assetId',
        },
        {
            title: '运行状态',
            width: 120,
            key: 'status',
            sortable: true
        },
        {
            title: '资产编号',
            minWidth: 150,
            key: 'deviceNo',
            sortable: true
        },
        {
            title: '资产类型',
            key: 'deviceType',
            width: 120,
            sortable: true
        },
        {
            title: '资产位置',
            key: 'location',
            sortable: true,
            minWidth:170
        },
        {
            title: '厂家',
            key: 'manufacturer',
            minWidth:120
        },
        {
            title: '联系人',
            key: 'contact',
            width: 110,
            sortable: true
        },
        {
            title: '联系电话',
            key: 'tel',
            minWidth:120
        },
        {
            title: '安装日期',
            minWidth: 170,
            key: 'installTime',
            sortable: true
        },
        {
            title: '保修期限',
            width: 110,
            key: 'guaranteeTime',
        }
      ],
      lightTree: [
                  {
                    title: 'parent 1',
                    expand: true,
                    children: [
                    {
                      title: 'parent 1-1',
                      expand: true,
                      children: [
                          {
                              title: 'leaf 1-1-1'
                          },
                          {
                              title: 'leaf 1-1-2'
                          }
                      ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1'
                            },
                            {
                                title: 'leaf 1-2-1'
                            }
                        ]
                      }
                    ]
                  }
                ],
      tabledata: [],
      col_uninstallDevice: [    
        {
            title: 'ID',
            width: 80,
            key: 'id',
        },
        {
            title: '运行状态',
            minWidth: 100,
            key: 'statusName',
            sortable: true
        },
        {
            title: '资产名称',
            minWidth: 120,
            key: 'deviceName',
        },
        {
            title: '资产编号',
            minWidth: 150,
            key: 'deviceNo',
            sortable: true
        },
        {
            title: '资产类型',
            key: 'deviceTypeTranslated',
            width: 120,
            sortable: true
        },
        {
            title: '厂家',
            minWidth:120,
            key: 'manufacturer'
        },
        {
            title: '保修期限',
            minWidth: 180,
            key: 'guaranteeTime',
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
                    type: "error",
                  },
                  style: {
                    marginRight: "5px",
                    backgroundColor: "#60cb95",
                    color: "white",
                    border: "1px solid #60cb95"
                  },
                  on: {
                    click: () => {
                      this.install(params.index);
                    }
                  }
                },
                "安装设备"
              )
            ]);
          },
          width: 120,
        }
      ],
      dt_uninstallDevice: [],
    };
  },

  methods: {
    //资产列表----------------------------------------------------------
    getPropertyList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      if (!this.searchOn){
        getAllDevices({
          token: token,
          pageNo: this.pageNum,
          pageSize: this.tableSize
        })
          .then(res => {
            console.log("=========================");
            console.log("资产列表:");
            console.log(res.data);
            //初始化
            this.totalNum=res.data.total;
            this.tabledata = res.data.result;
            this.statusFormate(this.tabledata);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }else{
        var sTime=null;
        var eTime=null;
        if (this.searchData.startTime!=""){
          sTime = (new Date(this.searchData.startTime)).Format("yyyy-MM-dd")+" 00:00:00";
        }
        if (this.searchData.endTime!=""){
          eTime = (new Date(this.searchData.endTime)).Format("yyyy-MM-dd")+" 23:59:59";
        }
        getAllDevices({
          token: token,
          pageNo: this.pageNum,
          pageSize: this.tableSize,
          beginTime: sTime,
          endTime: eTime,
          deviceNo: this.searchData.deviceNo,
          lightPoleName	: this.searchData.lightPoleName,
          deviceType: this.searchData.deviceType
        })
          .then(res => {
            console.log("=========================");
            console.log("资产列表:");
            console.log(res.data);
            //初始化
            this.totalNum=res.data.total;
            this.tabledata = res.data.result;
            this.statusFormate(this.tabledata);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }
    },
    //运行状态-文字转换
    statusFormate(data){
      for(let i in data){
        if (data[i]['status']==2){
          data[i]['status']="设备离线";
        }
        if (data[i]['status']==1){
          data[i]['status']="运行正常";
        }
        if (data[i]['status']==0){
          data[i]['status']="设备断电";
        }
        if (data[i]['status']==3){
          data[i]['status']="未安装";
        }
      }
    },
    //翻页--------------------------------------------------------------
    turnPage(pageNo){
      this.pageNum=pageNo;
      console.log(pageNo);
      this.getPropertyList();
    },
    turnInstallPage(pageNo){
      this.installPageNum=pageNo;
      console.log(pageNo);
      this.getUninstallList();
    },
    //设备选中
    selectionUpdate(selection){
      this.selectedProperty=selection;
    },
    //增----------------------------------------------------------------
    addNewProperty() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      addDevice({
        token: token,
        // status: this.addForm.status,
        deviceNo: this.addForm.deviceNo,
        deviceName: this.addForm.deviceName,
        deviceType: this.addForm.deviceType,
        manufacturer: this.addForm.manufacturer,
        contact: this.addForm.contact,
        tel: this.addForm.tel
      })
        .then(res => {
          console.log("=========================");
          console.log("添加资产:");
          console.log(this.addForm);
          this.getPropertyList();
          this.getUninstallList();
          this.$Message.success('添加成功');
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //删----------------------------------------------------------------
    delete(data){
      console.log("=========================");
      console.log("已删除:");
      console.log(data);
      for(let i in data){
        this.deleteChoosenProperty(data[i]['assetId']);
      }
      this.$Message.success('已删除');
    },
    deleteChoosenProperty(assetId) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      deleteDevice({
        token: token,
        assetId: assetId
      })
        .then(res => {
          this.getPropertyList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //改----------------------------------------------------------------
    beforeEdit(){
      if(this.selectedProperty.length==1){
        //初始化表单内容
        this.editForm.status=this.selectedProperty[0].status;
        this.editForm.deviceNo=this.selectedProperty[0].deviceNo;
        this.editForm.deviceName=this.selectedProperty[0].deviceName;
        this.editForm.deviceType=this.selectedProperty[0].deviceTypeI+"";
        this.editForm.manufacturer=this.selectedProperty[0].manufacturer;
        this.editForm.contact=this.selectedProperty[0].contact;
        this.editForm.tel=this.selectedProperty[0].tel;
        this.editProperty=true;
      } else{
        this.$Message.error('请选择单个资产进行修改!');
      }
    },
    editSeletedProperty() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      //this.FormateDeviceType(this.editForm);
      updateDevice({
        token: token,
        id: this.selectedProperty[0].assetId,
        status: this.editForm.status,
        deviceNo: this.editForm.deviceNo,
        deviceName: this.editForm.deviceName,
        deviceType: Number(this.editForm.deviceType),
        manufacturer: this.editForm.manufacturer,
        contact: this.editForm.contact,
        tel: this.editForm.tel
      })
        .then(res => {
          console.log("=========================");
          console.log("修改资产:");
          console.log(this.editForm);
          this.$Message.success('修改成功');
          this.getPropertyList();//刷新页面
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //设备类型更改转换
    FormateDeviceType(data){
      if(data.deviceType=="未知设备")
        data.deviceType = 0;
      if(data.deviceType=="人行道灯")
        data.deviceType = 1;
      if(data.deviceType=="车行道灯")
        data.deviceType = 2;
      if(data.deviceType=="环境监测")
        data.deviceType = 3;
      if(data.deviceType=="车流监控")
        data.deviceType = 4;
      if(data.deviceType=="人流监控")
        data.deviceType = 5;
      if(data.deviceType=="警用CCTV")
        data.deviceType = 6;
      if(data.deviceType=="交通CCTV")
        data.deviceType = 7;
      if(data.deviceType=="LED")
        data.deviceType = 8;
      if(data.deviceType=="广播音柱")
        data.deviceType = 9;
      if(data.deviceType=="LCD")
        data.deviceType = 10;
      if(data.deviceType=="WiFi AP")
        data.deviceType = 11;
      if(data.deviceType=="工控机")
        data.deviceType = 12;
      if(data.deviceType=="基站")
        data.deviceType = 13;
      if(data.deviceType=="对讲机")
        data.deviceType = 14;
      if(data.deviceType=="一键报警")
        data.deviceType = 15;
    },
    //搜索--------------------------------------------------------------
    search(){
      if (this.searchData.startTime>this.searchData.endTime){
        this.$Message.error('开始时间请勿晚于结束时间！');
      }
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      this.searchOn=true;
      this.getPropertyList();
    },
    //onclick-----------------------------------------------------------
    startDevice(){
      console.log("=========================");
      console.log("已启用:"+this.selectedProperty.length);
      for(let i in this.selectedProperty){
        if (this.selectedProperty[i]['status']=="设备断电"){
          this.$Message.info('设备断电');
        }else{
        this.startStopProperty(this.selectedProperty[i]['assetId'],1);
        this.$Message.success('已启用');
        }
      }
    },
    stopDevice(){
      console.log("=========================");
      console.log("已停用:"+this.selectedProperty.length);
      for(let i in this.selectedProperty){
        if (this.selectedProperty[i]['status']=="设备断电"){
          this.$Message.info('设备断电');
        }else{
          this.startStopProperty(this.selectedProperty[i]['assetId'],2);
          this.$Message.success('已停用');
        }
      }
    },
    //启用/停用
    startStopProperty(assetId,status) {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      updateDevice({
        token: token,
        id: assetId,
        status: status,
      })
        .then(res => {
          this.getPropertyList();//刷新页面
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //设备安装---------------------------------------------------------------
    //获取树状图
    getLightPoleTree() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getLightPoleTree({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("灯杆树状图:");
          console.log(res.data.result);
          this.convertDiviceListFormat(res.data.result);
          //初始化
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    convertDiviceListFormat(data) {
      for (let i in data) {
        data[i]["title"] = data[i]["name"];
        data[i]["expand"] = true;
        data[i]["children"] = data[i]["deviceLightPoleDtoList"];
        if (data[i]["children"] != null) {
          for (let y in data[i]["children"]) {
            data[i]["children"][y]["title"] = data[i]["children"][y]["name"];
            data[i]["children"][y]["expand"] = true;
          }
        }
      }
      this.lightTree = data;
    },
    TreeClick(current,current2){
      this.selectedPole=current;
    },
    //安装设备列表-----------------------------------------------------------
    getUninstallList() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      if (!this.installSearchOn){
        getUninstallDevices({
          token: token,
          pageNo: this.installPageNum,
          pageSize: this.installTableSize
        })
          .then(res => {
            console.log("=========================");
            console.log("安装设备:");
            console.log(res.data);
            //初始化
            this.installTotalNum=res.data.total;
            this.dt_uninstallDevice = res.data.result;
            this.TranslateLoop(this.dt_uninstallDevice);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }else{
        getUninstallDevices({
          token: token,
          pageNo: this.installPageNum,
          pageSize: this.installTableSize,
          deviceNo: this.uninstallSearch.deviceNo,
          deviceType: this.uninstallSearch.deviceType
        })
          .then(res => {
            console.log("=========================");
            console.log("安装设备:");
            console.log(res.data);
            //初始化
            this.installTotalNum=res.data.total;
            this.dt_uninstallDevice = res.data.result;
            this.TranslateLoop(this.dt_uninstallDevice);
          })
          .catch(err => {
            console.log("===========error==============");
            console.log(err);
          });
      }
    },
    TranslateLoop(data){
      for(let i in data){
        this.translateDeviceType(data[i]);
      }
    },
    translateDeviceType(data){
      if(data.deviceType==0)
        data.deviceTypeTranslated = "未知设备";
      if(data.deviceType==1)
        data.deviceTypeTranslated = "人行道灯";
      if(data.deviceType==2)
        data.deviceTypeTranslated = "车行道灯";
      if(data.deviceType==3)
        data.deviceTypeTranslated = "环境监控";
      if(data.deviceType==4)
        data.deviceTypeTranslated = "车流监控";
      if(data.deviceType==5)
        data.deviceTypeTranslated = "人流监控";
      if(data.deviceType==6)
        data.deviceTypeTranslated = "警用摄像机";
      if(data.deviceType==7)
        data.deviceTypeTranslated = "交通摄像机";
      if(data.deviceType==8)
        data.deviceTypeTranslated = "LED";
      if(data.deviceType==9)
        data.deviceTypeTranslated = "广播音柱";
      if(data.deviceType==10)
        data.deviceTypeTranslated = "LCD";
      if(data.deviceType==11)
        data.deviceTypeTranslated = "WiFi AP";
      if(data.deviceType==12)
        data.deviceTypeTranslated = "工控机";
      if(data.deviceType==13)
        data.deviceTypeTranslated = "基站";
      if(data.deviceType==14)
        data.deviceTypeTranslated = "对讲机";
      if(data.deviceType==15)
        data.deviceTypeTranslated = "一键报警";
    },
    //搜索
    installSearch(){
      this.installSearchOn=true;
      this.getUninstallList();
    },
    //安装设备按钮
    install(index) {
      this.selectedDeviceId=this.dt_uninstallDevice[index].userId;
      let deviceType=this.dt_uninstallDevice[index].deviceType;
      console.log(deviceType);
      if (this.selectedPole.length==0){
        this.$Message.error('请选择设备安装的灯杆');
      }else if (this.selectedPole[0].areaId==null){
        this.$Message.error('请选择灯杆勿选择区域！');
      }else {
        if (deviceType==9){
          this.handleReset('installBroadcastForm');
          this.installFormInit(this.installBroadcastForm,index);
          this.installBroadcast=true;
        }
        if (deviceType==12){
          this.handleReset('installLpcForm');
          this.installFormInit(this.installLpcForm,index);
          this.installLpc=true;
        }
        if (deviceType==10){
          this.handleReset('installLcdForm');
          this.installFormInit(this.installLcdForm,index);
          this.installLcd=true;
        }
        if (deviceType==8){
          this.handleReset('installLedForm');
          this.installFormInit(this.installLedForm,index);
          this.installLed=true;
        }
        if (deviceType==5){
          this.handleReset('installPfmForm');
          this.installFormInit(this.installPfmForm,index);
          this.installPfm=true;
        }
        if (deviceType==3){
          this.handleReset('installSensorForm');
          this.installFormInit(this.installSensorForm,index);
          this.installSensor=true;
        }
        if (deviceType==13){
          this.handleReset('installTelStationForm');
          this.installFormInit(this.installTelStationForm,index);
          this.installTelStation=true;
        }
        if (deviceType==4){
          this.handleReset('installVfmForm');
          this.installFormInit(this.installVfmForm,index);
          this.installVfm=true;
        }
        if (deviceType==0||deviceType==1||deviceType==2||deviceType==6||deviceType==7||deviceType==11||deviceType==14||deviceType==15){
          this.$Message.error('暂无接口');
        }
      }
    },

    //数据传入
    installFormInit(data,index){
      data.lightPoleId=this.selectedPole[0].id;
      data.name=this.dt_uninstallDevice[index].deviceName;
      data.lightPoleName=this.selectedPole[0].name;
      data.assetId=this.dt_uninstallDevice[index].id;
    },

    //设备安装-表单提交-------------------------------------------------------
    installBroadcastSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installBroadcast({
        token: token,
        assetId: this.installBroadcastForm.assetId,
        lightPoleId: this.installBroadcastForm.lightPoleId,
        tid: this.installBroadcastForm.tid,
        volume: this.installBroadcastForm.volume
      })
        .then(res => {
          console.log("=========================");
          console.log("安装广播:");
          console.log(this.installBroadcastForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installBroadcast=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    installLpcSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installIpc({
        token: token,
        assetId: this.installLpcForm.assetId,
        lightPoleId: this.installLpcForm.lightPoleId,
        ip: this.installLpcForm.ip
      })
        .then(res => {
          console.log("=========================");
          console.log("安装工控机:");
          console.log(this.installLpcForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installLpc=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    installLcdSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installLcd({
        token: token,
        assetId: this.installLcdForm.assetId,
        lightPoleId: this.installLcdForm.lightPoleId,
        brightness: this.installLcdForm.brightness,
        volume: this.installLcdForm.volume
      })
        .then(res => {
          console.log("=========================");
          console.log("安装LCD:");
          console.log(this.installLcdForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installLcd=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    installLedSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installLed({
        token: token,
        assetId: this.installLedForm.assetId,
        lightPoleId: this.installLedForm.lightPoleId,
        brightness: this.installLedForm.brightness,
        volume: this.installLedForm.volume,
        towards: this.installLedForm.towards
      })
        .then(res => {
          console.log("=========================");
          console.log("安装LED:");
          console.log(this.installLedForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installLed=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    installPfmSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installLed({
        token: token,
        assetId: this.installPfmForm.assetId,
        lightPoleId: this.installPfmForm.lightPoleId,
        frequency: this.installPfmForm.frequency
      })
        .then(res => {
          console.log("=========================");
          console.log("安装人流:");
          console.log(this.installPfmForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installPfm=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    installSensorSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installLed({
        token: token,
        assetId: this.installSensorForm.assetId,
        lightPoleId: this.installSensorForm.lightPoleId,
        frequency: this.installSensorForm.frequency,
        assistVoltage: this.installSensorForm.assistVoltage,
        remark: this.installSensorForm.remark,
        storageTemp: this.installSensorForm.storageTemp,
        waterAccuracy: this.installSensorForm.waterAccuracy,
        waterAlarmDepth: this.installSensorForm.waterAlarmDepth,
        workRange: this.installSensorForm.workRange,
        workingTemp: this.installSensorForm.workingTemp,
        workingVoltage: this.installSensorForm.workingVoltage
      })
        .then(res => {
          console.log("=========================");
          console.log("安装传感器:");
          console.log(this.installSensorForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installSensor=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    installTelStationSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installLed({
        token: token,
        assetId: this.installTelStationForm.assetId,
        lightPoleId: this.installTelStationForm.lightPoleId,
        antennaEffic: this.installTelStationForm.antennaEffic,
        directivity: this.installTelStationForm.directivity,
        ip: this.installTelStationForm.ip,
        model: this.installTelStationForm.model,
        power: this.installTelStationForm.power
      })
        .then(res => {
          console.log("=========================");
          console.log("安装基站:");
          console.log(this.installTelStationForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installTelStation=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    installVfmSubmit() {
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      installLed({
        token: token,
        assetId: this.installVfmForm.assetId,
        lightPoleId: this.installVfmForm.lightPoleId,
        frequency: this.installVfmForm.frequency,
      })
        .then(res => {
          console.log("=========================");
          console.log("安装人流:");
          console.log(this.installVfmForm);
          this.getUninstallList();
          this.$Message.success('安装成功');
          this.installVfm=false;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    handleAddSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addNewProperty();
          this.addProperty=false;
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    handleEditSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.editForm.status=="运行正常"){
            this.editForm.status=1;
          } else if (this.editForm.status=="设备离线"){
            this.editForm.status=2;
          } else{
            this.editForm.status=0;
          }
          this.editSeletedProperty();//发送修改资产信息put请求
          this.$Message.success('提交成功!');
          this.editProperty=false;
        } else {
          this.$Message.error('请填写完整信息!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    ok () {
      this.delete(this.selectedProperty);
      this.$Message.info('已删除资产');
    },
    cancel () {
      this.$Message.info('已取消')
    },

    //重置资产列表
    propertyInit(){
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      //清空搜素条件
      this.searchOn = false;
      this.searchData.deviceNo='';
      this.searchData.deviceType='';
      this.searchData.lightPoleName='';
      this.searchData.startTime="";
      this.searchData.endTime = "";
      //获取设备列表
      this.getPropertyList();
    },
    //重置设备安装列表
    installInit(){
      this.installPageNum=1;
      this.$refs.pager2.current = 1;
      this.installSearchOn=false;
      this.uninstallSearch.deviceNo='';
      this.uninstallSearch.deviceType='';
      this.getLightPoleTree();
      this.getUninstallList();
    },
    //初始化
    initData(){
      //回到第一页
      this.pageNum=1;
      this.$refs.pager.current = 1;
      this.installPageNum=1;
      this.$refs.pager2.current = 1;
      //清空搜素条件
      this.searchOn = false;
      this.installSearchOn=false;
      this.searchData.deviceNo='';
      this.searchData.deviceType='';
      this.searchData.lightPoleName='';
      this.searchData.startTime="";
      this.searchData.endTime = "";
      this.uninstallSearch.deviceNo='';
      this.uninstallSearch.deviceType='';
      //获取设备列表
      this.getPropertyList();
      this.getLightPoleTree();
      this.getUninstallList();
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
</style>

<template>
  <div class="device_light_manage">
    <Content style="padding:5px;">
      <Tabs value="集中器">
        <!----------------------------- 集中器界面管理 ---------------------------->
        <TabPane label="集中器管理" name="集中器">
          <Row class="background-row">
            <Row style="margin-left:16px;margin-top:6px;margin-right:16px;margin-bottom:14px;">
              <p style="height:40px;">
                <!--------------- 表格上方一排按钮 ----------------->
                <span style="float:left;">
                  <span style="margin-left:5px;">
                    <Button
                      style="width:140px;font-size:14px;"
                      type="success"
                      @click="downloadExcel()"
                    >
                      <Icon type="md-download" size="14" style="color:white"/>下载Excel模板
                    </Button>
                  </span>
                  <span style="margin-left:5px;">
                    <Button style="width:120px;font-size:14px;" type="success" @click>
                      <Icon type="ios-cloud-upload-outline" size="14" style="color:white"/>上传Excel
                    </Button>
                  </span>
                  <span style="margin-left:5px;">
                    <Button
                      id="ArchiveIssuebutton"
                      style="font-size:14px;"
                      type="warning"
                      @click="checkArchiveIssue()"
                    >
                      <span id="ArchiveIssueText">终端档案下发</span>
                    </Button>
                  </span>
                  <span style="margin-left:10px;">
                    <Button
                      id="ArchiveInitbutton"
                      style="font-size:14px;"
                      type="error"
                      @click="checkArchiveInit()"
                    >
                      <span id="ArchiveInitText">初始化终端档案</span>
                    </Button>
                  </span>
                  <!-- <span style="margin-left:5px;">
                    <Button style="width:120px;font-size:14px;" type="success" @click="archiveManageModal=true">

                      <Icon type="ios-attach" size="16" style="color:white"/>档案管理
                    </Button>
                  </span>-->
                </span>

                <span style="float:right;">
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="primary"
                      @click="addOrEditConcentrator='添加集中器'; addConcentratorModal=true; concentratorItem = {};"
                    >
                      <Icon type="md-add" size="14" style="color:white"/>添加
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="warning"
                      @click="addOrEditConcentrator='编辑集中器'; checkEditConcentrator()"
                    >
                      <Icon type="md-create" size="14" style="color:white"/>编辑
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="error"
                      @click="checkDeleteConcentrator()"
                    >
                      <Icon type="md-close" size="14" style="color:white"/>删除
                    </Button>
                  </span>
                  <Divider type="vertical"/>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:120px;font-size:14px;"
                      type="default"
                      @click="checkPublishConcentrator()"
                    >
                      <Icon type="ios-cog" size="14"/>年方案下发
                    </Button>
                  </span>
                </span>
              </p>
              <!-------------------- 表格 --------------------->
              <Row class="user-table-row">
                <Table
                  class="userTable"
                  @on-selection-change="selectContentrator"
                  border
                  ref="selection"
                  :columns="concentrateTableColumns"
                  :data="concentratorData"
                  style="margin-left:5px;margin-right:5px;"
                ></Table>
              </Row>
              <br>
              <Row
                class="paging"
                type="flex"
                justify="end"
                style="margin-bottom:7px;margin-right:50px;"
              >
                <Page
                  ref="pager"
                  id="pager"
                  :total="totalConcentrator"
                  :current="pageNum"
                  @on-change="turnConcentratorPage"
                  :page-size="tableSize"
                  show-total
                  show-elevator
                />
              </Row>
            </Row>
          </Row>

          <!-- 档案管理 -->
          <Modal v-model="archiveManageModal" title="档案管理" width="310px">
            <span style="margin-left:5px;">
              <Button style="font-size:14px;" type="success" @click="checkArchiveIssue()">终端档案下发</Button>
            </span>
            <span style="margin-left:10px;">
              <Button style="font-size:14px;" type="success" @click="checkArchiveInit()">初始化终端档案</Button>
            </span>
            <p slot="footer"></p>
          </Modal>
          <!-- 删除集中器操作 -->
          <Modal
            v-model="deleteConcentratorModal"
            title="删除选定集中器"
            ok-text="确认"
            cancel-text="取消"
            @on-ok="confirmDelConcentrator"
            @on-cancel="cancelDelConcentrator"
          >
            <p>此操作将删除所选定的集中器的所有数据，确认此操作将不可恢复。</p>
            <p>是否确认？</p>
          </Modal>
          <!-- 添加编辑集中器操作 -->
          <Modal
            class="adding_Concentrator"
            v-model="addConcentratorModal"
            :mask-closable="false"
            :title="addOrEditConcentrator"
            ok-text="确认"
            cancel-text="取消"
            width="700px;"
          >
            <Form
              :model="concentratorItem"
              :label-width="110"
              :rules="concentratorValidate"
              ref="concentratorRule"
            >
              <Row>
                <i-col span="12">
                  <FormItem label="集中器名称：" prop="cname" label-position="left">
                    <Input placeholder="请输入集中器名称" v-model="concentratorItem.cname"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="管理所ID：" label-position="left">
                    <Input disabled placeholder="1" v-model="concentratorItem.mid"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="行政区码：" prop="a1" label-position="left">
                    <Input placeholder="请输入行政区码" v-model="concentratorItem.a1"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="终端地址：" prop="a2" label-position="left">
                    <Input placeholder="请输入终端地址" v-model="concentratorItem.a2"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="经度：" prop="longitude" label-position="left">
                    <Input placeholder="请输入经度" v-model="concentratorItem.longitude"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="纬度：" prop="latitude" label-position="left">
                    <Input placeholder="请输入纬度" v-model="concentratorItem.latitude"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <FormItem label="详细地址：" prop="address" label-position="left">
                    <Input placeholder="请输入详细地址" v-model="concentratorItem.address"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="SIM卡号：" prop="simNo" label-position="left">
                    <Input placeholder="请输入SIM卡号" v-model="concentratorItem.simNo"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="节能前功耗：" prop="beforeenergysaved" label-position="left">
                    <Input placeholder="请输入节能前功耗" v-model="concentratorItem.beforeenergysaved"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="购买时间：" prop="buyDate" label-position="left">
                    <DatePicker
                      type="date"
                      placeholder="请选择购买时间"
                      v-model="concentratorItem.buyDate"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="维修日期：" prop="maintenanceDate" label-position="left">
                    <DatePicker
                      type="date"
                      placeholder="请选择维修日期"
                      v-model="concentratorItem.maintenanceDate"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="维修周期：" prop="maintenancePeriod" label-position="left">
                    <i-input placeholder="请输入维修周期" v-model="concentratorItem.maintenancePeriod">
                      <span slot="append">月</span>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="保修期限：" prop="termOfService" label-position="left">
                    <i-input placeholder="请输入保修期限" v-model="concentratorItem.termOfService ">
                      <span slot="append">月</span>
                    </i-input>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="联系人姓名：" prop="contactName" label-position="left">
                    <Input placeholder="请输入联系人姓名" v-model="concentratorItem.contactName"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="联系人邮箱：" prop="contactEmail" label-position="left">
                    <Input placeholder="请输入联系人邮箱" v-model="concentratorItem.contactEmail"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="联系电话" prop="mobilePhone" label-position="left">
                    <Input placeholder="请输入联系电话" v-model="concentratorItem.mobilePhone "/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="生产厂家：" prop="factory" label-position="left">
                    <Input placeholder="请输入生产厂家" v-model="concentratorItem.factory "/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <FormItem label="备注：" label-position="left">
                    <Input type="textarea" :rows="2" v-model="concentratorItem.remarks"/>
                  </FormItem>
                </i-col>
              </Row>
            </Form>
            <div slot="footer">
              <Button type="text" size="default" @click="canceladdConcentrator()">取消</Button>
              <Button
                type="primary"
                size="default"
                @click="handleConcentratorSubmit('concentratorRule')"
              >确认</Button>
            </div>
          </Modal>
          <!-- 年方案下发 -->
          <Modal
            class="adding_Concentrator"
            v-model="publishConcentratorModal"
            title="年方案下发"
            ok-text="确认"
            cancel-text="取消"
            width="650px"
            @on-ok="confirmPublishConcentrator"
            @on-cancel="cancelPublishConcentrator"
          >
            <Tabs>
              <TabPane label="全夜灯" icon="logo-apple">
                <Form :model="publishData1">
                  <table class="lighttable" :border="true">
                    <tr
                      style="font-size:15px; font-family: 'Helvetica Neue', 'PingFang SC', sans-serif;"
                    >
                      <th>设置序列号</th>
                      <th>启用序列号</th>
                      <th>亮度值</th>
                      <th>时间设置</th>
                    </tr>
                    <tr>
                      <td style="width:130px;font-size:14px;">时间点1</td>
                      <td style="width:130px">
                        <i-switch
                          class="smallswitch"
                          v-model="publishData1.OnOrOff1"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;width:130px">
                        <Select v-model="publishData1.brightness1">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td style="width:225px">
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData1.switchsetting1"
                            @on-change="setting('111');setting('112')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="111" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData1.beforeOrlate1"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData1.time1"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData1.type1"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="112"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              confirm
                              type="time"
                              placeholder="选择时间"
                              format="HH:mm"
                              style="width: 100%"
                              v-model="publishData1.starttime1"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <!---->
                    <tr>
                      <td style="font-size:14px;">时间点2</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData1.OnOrOff2"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData1.brightness2">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData1.switchsetting2"
                            @on-change="setting('121');setting('122')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="121" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData1.beforeOrlate2"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData1.time2"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData1.type2"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="122"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              type="time"
                              format="HH:mm"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData1.starttime2"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <!---->
                    <tr>
                      <td style="font-size:14px;">时间点3</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData1.OnOrOff3"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData1.brightness3" placement="top-start">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData1.switchsetting3"
                            @on-change="setting('131');setting('132')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="131" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData1.beforeOrlate3"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData1.time3"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData1.type3"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="132"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              type="time"
                              format="HH:mm"
                              placeholder="选择时间"
                              style="width: 100%"
                              placement="top-start"
                              v-model="publishData1.starttime3"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:14px;">时间点4</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData1.OnOrOff4"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData1.brightness4" placement="top-start">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData1.switchsetting4"
                            @on-change="setting('141');setting('142')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="141" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData1.beforeOrlate4"
                                class="lightSelection"
                                placement="top-start"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData1.time4"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData1.type4"
                                  placement="top-start"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="142"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              type="time"
                              format="HH:mm"
                              placeholder="选择时间"
                              style="width: 100%"
                              placement="top-start"
                              v-model="publishData1.starttime4"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                  </table>
                </Form>
              </TabPane>
              <TabPane label="半夜灯" icon="logo-windows">
                <Form :model="publishData2">
                  <table class="lighttable" :border="true">
                    <tr
                      style="font-size:15px; font-family: 'Helvetica Neue', 'PingFang SC', sans-serif;"
                    >
                      <th>设置序列号</th>
                      <th>启用序列号</th>
                      <th>亮度值</th>
                      <th>时间设置</th>
                    </tr>
                    <tr>
                      <td style="width:130px;font-size:14px;">时间点1</td>
                      <td style="width:130px">
                        <i-switch
                          class="smallswitch"
                          v-model="publishData2.OnOrOff1"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;width:130px">
                        <Select v-model="publishData2.brightness1">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td style="width:225px">
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData2.switchsetting1"
                            @on-change="setting('211');setting('212')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="211" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData2.beforeOrlate1"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData2.time1"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData2.type1"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="212"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              confirm
                              format="HH:mm"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData2.starttime1"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <!---->
                    <tr>
                      <td style="font-size:14px;">时间点2</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData2.OnOrOff2"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData2.brightness2">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData2.switchsetting2"
                            @on-change="setting('221');setting('222')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="221" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData2.beforeOrlate2"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData2.time2"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData2.type2"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="222"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              format="HH:mm"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData2.starttime2"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <!---->
                    <tr>
                      <td style="font-size:14px;">时间点3</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData2.OnOrOff3"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData2.brightness3" placement="top-start">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData2.switchsetting3"
                            @on-change="setting('231');setting('232')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="231" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData2.beforeOrlate3"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData2.time3"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData2.type3"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="232"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              format="HH:mm"
                              placement="top-start"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData2.starttime3"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:14px;">时间点4</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData2.OnOrOff4"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData2.brightness4" placement="top-start">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData2.switchsetting4"
                            @on-change="setting('241');setting('242')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="241" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData2.beforeOrlate4"
                                class="lightSelection"
                                placement="top-start"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData2.time4"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData2.type4"
                                  placement="top-start"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="242"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              format="HH:mm"
                              placement="top-start"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData2.starttime4"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                  </table>
                </Form>
              </TabPane>
              <TabPane label="观景灯" icon="logo-tux">
                <Form :model="publishData3">
                  <table class="lighttable" :border="true">
                    <tr
                      style="font-size:15px; font-family: 'Helvetica Neue', 'PingFang SC', sans-serif;"
                    >
                      <th>设置序列号</th>
                      <th>启用序列号</th>
                      <th>亮度值</th>
                      <th>时间设置</th>
                    </tr>
                    <tr>
                      <td style="width:130px;font-size:14px;">时间点1</td>
                      <td style="width:130px">
                        <i-switch
                          class="smallswitch"
                          v-model="publishData3.OnOrOff1"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;width:130px">
                        <Select v-model="publishData3.brightness1">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td style="width:225px">
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData3.switchsetting1"
                            @on-change="setting('311');setting('312')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="311" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData3.beforeOrlate1"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData3.time1"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData3.type1"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="312"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              format="HH:mm"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData3.starttime1"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <!---->
                    <tr>
                      <td style="font-size:14px;">时间点2</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData3.OnOrOff2"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData3.brightness2">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData3.switchsetting2"
                            @on-change="setting('321');setting('322')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="321" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData3.beforeOrlate2"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData3.time2"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData3.type2"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="322"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              format="HH:mm"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData3.starttime2"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <!---->
                    <tr>
                      <td style="font-size:14px;">时间点3</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData3.OnOrOff3"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData3.brightness3" placement="top-start">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData3.switchsetting3"
                            @on-change="setting('331');setting('332')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="331" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData3.beforeOrlate3"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData3.time3"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData3.type3"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="332"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              format="HH:mm"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData3.starttime3"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:14px;">时间点4</td>
                      <td>
                        <i-switch
                          class="smallswitch"
                          v-model="publishData3.OnOrOff4"
                          size="large"
                          style="width:75px;"
                        >
                          <span slot="open">启用</span>
                          <span slot="close">不启用</span>
                        </i-switch>
                      </td>
                      <td style="padding-left:20px;padding-right:20px;">
                        <Select v-model="publishData3.brightness4" placement="top-start">
                          <Option
                            v-for="item in brightnesses"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </td>
                      <td>
                        <Row style="padding:10px;">
                          <i-switch
                            class="largeswitch"
                            v-model="publishData3.switchsetting4"
                            @on-change="setting('341');setting('342')"
                            size="large"
                            style="width:95px;"
                          >
                            <span slot="open">相对设置</span>
                            <span slot="close">固定设置</span>
                          </i-switch>
                        </Row>
                        <Row>
                          <div id="341" style="display:none">
                            <Row>
                              <Select
                                v-model="publishData3.beforeOrlate4"
                                placement="top-start"
                                class="lightSelection"
                                style="padding-left:20px;padding-right:20px;"
                              >
                                <Option
                                  v-for="item in cityList"
                                  :value="item.value"
                                  :key="item.value"
                                >{{ item.label }}</Option>
                              </Select>
                            </Row>
                            <Row style="padding:10px;">
                              <i-col span="10">
                                <Input
                                  v-model="publishData3.time4"
                                  style="width=100%; padding-left:10px;"
                                  placeholder="输入数字"
                                />
                              </i-col>
                              <i-col span="14">
                                <Select
                                  v-model="publishData3.type4"
                                  placement="top-start"
                                  style="width:100%;padding-left:5px;padding-right:10px;"
                                >
                                  <Option
                                    v-for="item in timetype"
                                    :value="item.value"
                                    :key="item.value"
                                  >{{ item.label }}</Option>
                                </Select>
                              </i-col>
                            </Row>
                          </div>
                          <div
                            id="342"
                            style="padding-left:20px;padding-right:20px;padding-bottom:10px;display:block"
                          >
                            <TimePicker
                              format="HH:mm"
                              placement="top-start"
                              type="time"
                              placeholder="选择时间"
                              style="width: 100%"
                              v-model="publishData3.starttime4"
                            ></TimePicker>
                          </div>
                        </Row>
                      </td>
                    </tr>
                  </table>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>
        </TabPane>
        <!----------------------------- 灯杆界面管理 ------------------------------>
        <TabPane label="灯杆管理" name="灯杆">
          <Row class="background-row">
            <Row style="margin-left:16px;margin-top:6px;margin-right:16px;margin-bottom:14px;">
              <p style="height:40px;">
                <!--------------- 表格上方一排按钮 ----------------->
                <span style="float:left;">
                  <span style="margin-left:5px;">
                    <Button style="width:140px;font-size:14px;" type="success" @click>
                      <Icon type="md-download" size="14" style="color:white"/>下载Excel模板
                    </Button>
                  </span>
                  <span style="margin-left:5px;">
                    <Button style="width:120px;font-size:14px;" type="success" @click>
                      <Icon type="ios-cloud-upload-outline" size="14" style="color:white"/>上传Excel
                    </Button>
                  </span>
                </span>

                <span style="float:right;">
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="primary"
                      @click="addOrEditLightPole='添加灯杆'; addLightPoleModal=true; lightPoleItem = {};"
                    >
                      <Icon type="md-add" size="14" style="color:white"/>添加
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="warning"
                      @click="addOrEditLightPole='编辑灯杆';checkEditLightPole()"
                    >
                      <Icon type="md-create" size="14" style="color:white"/>编辑
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="error"
                      @click="checkDeleteLightPole()"
                    >
                      <Icon type="md-close" size="14" style="color:white"/>删除
                    </Button>
                  </span>
                </span>
              </p>
              <!-------------------- 表格 --------------------->
              <Row class="user-table-row">
                <Table
                  class="userTable"
                  @on-selection-change="selectLightPole"
                  border
                  ref="selection"
                  :columns="lightPoleTableColumns"
                  :data="lightPoleData"
                  style="margin-left:5px;margin-right:5px;"
                ></Table>
              </Row>
              <br>
              <Row
                class="paging"
                type="flex"
                justify="end"
                style="margin-bottom:7px;margin-right:50px;"
              >
                <Page
                  ref="pager"
                  id="pager"
                  :total="totalLightPole"
                  :current="pageNum"
                  @on-change="turnLightPolePage"
                  :page-size="tableSize"
                  show-total
                  show-elevator
                />
              </Row>
            </Row>
          </Row>
          <!-- 删除灯杆操作 -->
          <Modal
            v-model="deleteLightPoleModal"
            title="删除选定灯杆"
            ok-text="确认"
            cancel-text="取消"
            @on-ok="confirmDelLightPole"
            @on-cancel="cancelDelLightPole"
          >
            <p>此操作将删除所选定的灯杆的所有数据，确认此操作将不可恢复。</p>
            <p>是否确认？</p>
          </Modal>
          <!-- 添加编辑灯杆操作 -->
          <Modal
            class="adding_Concentrator"
            v-model="addLightPoleModal"
            :mask-closable="false"
            :title="addOrEditLightPole"
            ok-text="确认"
            cancel-text="取消"
            width="700px;"
          >
            <Form
              :model="lightPoleItem"
              :label-width="110"
              :rules="lightPoleValidate"
              ref="lightPoleRule"
            >
              <Row>
                <i-col span="12">
                  <FormItem label="灯杆名称：" prop="deviceName" label-position="left">
                    <Input placeholder="请输入集中器名称" v-model="lightPoleItem.deviceName"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="灯杆编号：" prop="devNo" label-position="left">
                    <Input placeholder="请输入灯杆编号" v-model="lightPoleItem.devNo"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <FormItem label="所属集中器：" prop="cid" label-position="left">
                    <Select
                      v-model="lightPoleItem.cid"
                      placeholder="请选择集中器"
                      :label-in-value="true"
                      clearable
                    >
                      <Option
                        v-for="item in concentratorInfoList "
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="经度：" prop="longitude" label-position="left">
                    <Input placeholder="请输入经度" v-model="lightPoleItem.longitude"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="纬度：" prop="latitude" label-position="left">
                    <Input placeholder="请输入纬度" v-model="lightPoleItem.latitude"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <FormItem label="备注：" label-position="left">
                    <Input type="textarea" :rows="2" v-model="lightPoleItem.remark"/>
                  </FormItem>
                </i-col>
              </Row>
            </Form>
            <div slot="footer">
              <Button type="text" size="default" @click="canceladdLightPole()">取消</Button>
              <Button
                type="primary"
                size="default"
                @click="handleLightPoleSubmit('lightPoleRule')"
              >确认</Button>
            </div>
          </Modal>
        </TabPane>
        <!----------------------------- 控制器界面管理 ---------------------------->
        <TabPane label="控制器管理" name="控制器">
          <Row class="background-row">
            <Row style="margin-left:16px;margin-top:6px;margin-right:16px;margin-bottom:14px;">
              <p style="height:40px;">
                <!--------------- 表格上方一排按钮 ----------------->
                <span style="float:left;">
                  <span style="margin-left:5px;">
                    <Button style="width:140px;font-size:14px;" type="success" @click>
                      <Icon type="md-download" size="14" style="color:white"/>下载Excel模板
                    </Button>
                  </span>
                  <span style="margin-left:5px;">
                    <Button style="width:120px;font-size:14px;" type="success" @click>
                      <Icon type="ios-cloud-upload-outline" size="14" style="color:white"/>上传Excel
                    </Button>
                  </span>
                </span>

                <span style="float:right;">
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="primary"
                      @click="addOrEditController='添加控制器'; addControllerModal=true; controllerItem = {};"
                    >
                      <Icon type="md-add" size="14" style="color:white"/>添加
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="warning"
                      @click="addOrEditController='编辑控制器';checkEditController()"
                    >
                      <Icon type="md-create" size="14" style="color:white"/>编辑
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="error"
                      @click="checkDeleteController()"
                    >
                      <Icon type="md-close" size="14" style="color:white"/>删除
                    </Button>
                  </span>
                </span>
              </p>
              <!-------------------- 表格 --------------------->
              <Row class="user-table-row">
                <Table
                  class="userTable"
                  @on-selection-change="selectController"
                  border
                  ref="selection"
                  :columns="controllerTableColumns"
                  :data="controllerData"
                  style="margin-left:5px;margin-right:5px;"
                ></Table>
              </Row>
              <br>
              <Row
                class="paging"
                type="flex"
                justify="end"
                style="margin-bottom:7px;margin-right:50px;"
              >
                <Page
                  ref="pager"
                  id="pager"
                  :total="totalController"
                  :current="pageNum"
                  @on-change="turnController"
                  :page-size="tableSize"
                  show-total
                  show-elevator
                />
              </Row>
            </Row>
          </Row>
          <!-- 删除控制器操作 -->
          <Modal
            v-model="deleteControllerModal"
            title="删除选定控制器"
            ok-text="确认"
            cancel-text="取消"
            @on-ok="confirmDelController"
            @on-cancel="cancelDelController"
          >
            <p>此操作将删除所选定的控制器的所有数据，确认此操作将不可恢复。</p>
            <p>是否确认？</p>
          </Modal>
          <!-- 添加编辑控制器操作 -->
          <Modal
            class="adding_Concentrator"
            v-model="addControllerModal"
            :mask-closable="false"
            :title="addOrEditController"
            ok-text="确认"
            cancel-text="取消"
            width="700px;"
          >
            <Form
              :model="controllerItem"
              :label-width="110"
              :rules="controllerValidate"
              ref="controllerRule"
            >
              <Row>
                <i-col span="12">
                  <FormItem label="所属集中器：" prop="concentratorId" label-position="left">
                    <Select
                      v-model="controllerItem.concentratorId"
                      placeholder="请选择集中器"
                      :label-in-value="true"
                      @on-change="selectConcentratorForSearch"
                      clearable
                    >
                      <Option
                        v-for="item in concentratorInfoList "
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="灯杆编号：" prop="devNo" label-position="left">
                    <Select
                      v-model="controllerItem.devNo"
                      placeholder="请选择灯杆编号"
                      :label-in-value="true"
                      clearable
                    >
                      <Option
                        v-for="item in devNoInfoList "
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="测量点：" prop="measuringPointNo" label-position="left">
                    <Input placeholder="请输入测量点" v-model="controllerItem.measuringPointNo"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="通讯地址：" prop="caddress" label-position="left">
                    <Input placeholder="请输入通讯地址" v-model="controllerItem.caddress"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="控制器型号：" prop="model" label-position="left">
                    <Input placeholder="请输入控制器型号" v-model="controllerItem.model"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="亮灯模式：" prop="powerType" label-position="left">
                    <Select
                      v-model="controllerItem.powerType"
                      placeholder="请选择亮灯模式"
                      :label-in-value="true"
                      clearable
                    >
                      <Option
                        v-for="item in powertypeChoose"
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="购买时间：" prop="buyDate" label-position="left">
                    <DatePicker
                      type="date"
                      placeholder="请选择购买时间"
                      v-model="controllerItem.buyDate"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="维修日期：" prop="maintenanceDate" label-position="left">
                    <DatePicker
                      type="date"
                      placeholder="请选择维修日期"
                      v-model="controllerItem.maintenanceDate"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="维修周期：" prop="maintenancePeriod" label-position="left">
                    <i-input placeholder="请输入维修周期" v-model="controllerItem.maintenancePeriod">
                      <span slot="append">月</span>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="保修期限：" prop="termOfService" label-position="left">
                    <i-input placeholder="请输入保修期限" v-model="controllerItem.termOfService ">
                      <span slot="append">月</span>
                    </i-input>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="联系人姓名：" prop="contactName" label-position="left">
                    <Input placeholder="请输入联系人姓名" v-model="controllerItem.contactName"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="联系人邮箱：" prop="contactEmail" label-position="left">
                    <Input placeholder="请输入联系人邮箱" v-model="controllerItem.contactEmail"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="联系电话" prop="mobilePhone" label-position="left">
                    <Input placeholder="请输入联系电话" v-model="controllerItem.mobilePhone "/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="生产厂家：" prop="factory" label-position="left">
                    <Input placeholder="请输入生产厂家" v-model="controllerItem.factory "/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <FormItem label="备注：" label-position="left">
                    <Input type="textarea" :rows="2" v-model="controllerItem.remarks"/>
                  </FormItem>
                </i-col>
              </Row>
            </Form>
            <div slot="footer">
              <Button type="text" size="default" @click="canceladdController()">取消</Button>
              <Button
                type="primary"
                size="default"
                @click="handleControllerSubmit('controllerRule')"
              >确认</Button>
            </div>
          </Modal>
        </TabPane>
        <!----------------------------- 灯具界面管理 ------------------------------>
        <TabPane label="灯具管理" name="灯具">
          <Row class="background-row">
            <Row style="margin-left:16px;margin-top:6px;margin-right:16px;margin-bottom:14px;">
              <p style="height:40px;">
                <!--------------- 表格上方一排按钮 ----------------->
                <span style="float:left;">
                  <span style="margin-left:5px;">
                    <Button style="width:140px;font-size:14px;" type="success" @click>
                      <Icon type="md-download" size="14" style="color:white"/>下载Excel模板
                    </Button>
                  </span>
                  <span style="margin-left:5px;">
                    <Button style="width:120px;font-size:14px;" type="success" @click>
                      <Icon type="ios-cloud-upload-outline" size="14" style="color:white"/>上传Excel
                    </Button>
                  </span>
                </span>

                <span style="float:right;">
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="primary"
                      @click="addOrEditLamp='添加灯具'; addLampModal=true; lampItem = {};"
                    >
                      <Icon type="md-add" size="14" style="color:white"/>添加
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="warning"
                      @click="addOrEditLamp='编辑灯具';checkEditLamp()"
                    >
                      <Icon type="md-create" size="14" style="color:white"/>编辑
                    </Button>
                  </span>
                  <span style="margin-right:5px;">
                    <Button
                      style="width:80px;font-size:14px;"
                      type="error"
                      @click="checkDeleteLamp()"
                    >
                      <Icon type="md-close" size="14" style="color:white"/>删除
                    </Button>
                  </span>
                </span>
              </p>
              <!-------------------- 表格 --------------------->
              <Row class="user-table-row">
                <Table
                  class="userTable"
                  @on-selection-change="selectLamp"
                  border
                  ref="selection"
                  :columns="lampTableColumns"
                  :data="lampData"
                  style="margin-left:5px;margin-right:5px;"
                ></Table>
              </Row>
              <br>
              <Row
                class="paging"
                type="flex"
                justify="end"
                style="margin-bottom:7px;margin-right:50px;"
              >
                <Page
                  ref="pager"
                  id="pager"
                  :total="totalLamp"
                  :current="pageNum"
                  @on-change="turnLamp"
                  :page-size="tableSize"
                  show-total
                  show-elevator
                />
              </Row>
            </Row>
          </Row>
          <!-- 删除控制器操作 -->
          <Modal
            v-model="deleteControllerModal"
            title="删除选定控制器"
            ok-text="确认"
            cancel-text="取消"
            @on-ok="confirmDelController"
            @on-cancel="cancelDelController"
          >
            <p>此操作将删除所选定的控制器的所有数据，确认此操作将不可恢复。</p>
            <p>是否确认？</p>
          </Modal>
          <!-- 添加编辑控制器操作 -->
          <Modal
            class="adding_Concentrator"
            v-model="addLampModal"
            :mask-closable="false"
            :title="addOrEditLamp"
            ok-text="确认"
            cancel-text="取消"
            width="700px;"
          >
            <Form :model="lampItem" :label-width="120" :rules="lampValidate" ref="lampRule">
              <Row>
                <i-col span="12">
                  <FormItem label="别名：" prop="alias" label-position="left">
                    <Input placeholder="请输入灯具别名" v-model="lampItem.alias"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="所属集中器：" prop="concentratorId" label-position="left">
                    <Select
                      v-model="lampItem.concentratorId"
                      placeholder="请选择集中器"
                      :label-in-value="true"
                      clearable
                    >
                      <Option
                        v-for="item in concentratorInfoList "
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="控制器类型：" prop="controllerType" label-position="left">
                    <Select
                      v-model="lampItem.controllerType"
                      placeholder="请选择控制器类型"
                      :label-in-value="true"
                      clearable
                    >
                      <Option
                        v-for="item in controllertypeChoose"
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="亮灯模式：" prop="powerType" label-position="left">
                    <Select
                      v-model="lampItem.powerType"
                      placeholder="请选择亮灯模式"
                      :label-in-value="true"
                      clearable
                    >
                      <Option
                        v-for="item in powertypeChoose"
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="灯具型号：" prop="model" label-position="left">
                    <Input placeholder="请输入灯具型号" v-model="lampItem.model"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="亮灯类型：" prop="lightType" label-position="left">
                    <Select
                      v-model="lampItem.lightType"
                      placeholder="请选择亮灯类型"
                      :label-in-value="true"
                      clearable
                    >
                      <Option
                        v-for="item in lighttypeChoose"
                        :value="item.value"
                        :key="item.label"
                      >{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="原额定功率：" prop="originalCapacity" label-position="left">
                    <i-input placeholder="请输入原额定功率" v-model="lampItem.originalCapacity">
                      <span slot="append">W</span>
                    </i-input>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="功率上限浮动：" prop="powerLimitHi" label-position="left">
                    <i-input placeholder="功率范围0到100" v-model="lampItem.powerLimitHi ">
                      <span slot="append">W</span>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="功率下限浮动：" prop="powerLimitLow" label-position="left">
                    <i-input placeholder="功率范围0到100" v-model="lampItem.powerLimitLow">
                      <span slot="append">W</span>
                    </i-input>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="购买日期：" prop="buyDate" label-position="left">
                    <DatePicker
                      type="date"
                      placeholder="请选择购买日期"
                      v-model="lampItem.buyDate"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="维修日期：" prop="maintenanceDate" label-position="left">
                    <DatePicker
                      type="date"
                      placeholder="请选择维修日期"
                      v-model="lampItem.maintenanceDate"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="安装日期：" prop="installDate" label-position="left">
                    <DatePicker
                      type="date"
                      placeholder="请选择安装日期"
                      v-model="lampItem.installDate"
                      style="width: 100%"
                    ></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="测量点：" prop="measurePoint" label-position="left">
                    <Input placeholder="请输入测量点" v-model="lampItem.measurePoint"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="维修周期：" prop="maintenancePeriod" label-position="left">
                    <i-input placeholder="请输入维修周期" v-model="lampItem.maintenancePeriod">
                      <span slot="append">月</span>
                    </i-input>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="保修期限：" prop="termOfService" label-position="left">
                    <i-input placeholder="请输入保修期限" v-model="lampItem.termOfService ">
                      <span slot="append">月</span>
                    </i-input>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="联系人姓名：" prop="contactName" label-position="left">
                    <Input placeholder="请输入联系人姓名" v-model="lampItem.contactName"/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="联系人邮箱：" prop="contactEmail" label-position="left">
                    <Input placeholder="请输入联系人邮箱" v-model="lampItem.contactEmail"/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="12">
                  <FormItem label="联系电话" prop="mobilePhone" label-position="left">
                    <Input placeholder="请输入联系电话" v-model="lampItem.mobilePhone "/>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="生产厂家：" prop="factory" label-position="left">
                    <Input placeholder="请输入生产厂家" v-model="lampItem.factory "/>
                  </FormItem>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <FormItem label="备注：" label-position="left">
                    <Input type="textarea" :rows="2" v-model="lampItem.remarks"/>
                  </FormItem>
                </i-col>
              </Row>
            </Form>
            <div slot="footer">
              <Button type="text" size="default" @click="canceladdLamp()">取消</Button>
              <Button type="primary" size="default" @click="handleLampSubmit('lampRule')">确认</Button>
            </div>
          </Modal>
        </TabPane>
      </Tabs>
    </Content>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";
import { on, off } from "@/libs/tools";
import {
  getConcentrator,
  deleteConcentrator,
  addConcentrator,
  editConcentrator,
  ArchiveInit,
  ArchiveIssue,
  getLightPole,
  deleteLightPole,
  addLightPole,
  editLightPole,
  getController,
  addController,
  editController,
  deleteController,
  getLamp,
  addLamp,
  deleteLamp,
  editLamp,
  getExcel,
  getAvalibleLightPole,
  publishPlan
} from "@/api/light";
import { getAlarmMessage, getAlarmList, getAllAlarm } from "@/api/warning";
const axios = require("axios");

export default {
  name: "device_warning",
  components: {
    InforCard,
    CountTo,
    Tables
    // Example
  },

  data() {
    return {
      //表格翻页预设数据
      pageNum: 1,
      tableSize: 11, //获取数据条数

      //--------------------------集中器管理数据-------------------------------//
      //集中器数据库数据总量
      totalConcentrator: 12,
      //选中的集中器
      selectedConcentrator: [],
      //集中器表格表头
      concentrateTableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "集中器名称",
          key: "cname",
          sortable: true
        },
        {
          title: "状态",
          key: "status",
          width: 120,
          sortable: true
        },
        {
          title: "联系电话",
          width: 200,
          key: "mobilePhone"
          //sortable: true
        },
        {
          title: "行政区域划码",
          width: 150,
          key: "a1",
          sortable: true
        },
        {
          title: "终端地址",
          width: 120,
          key: "a2",
          sortable: true
        },
        {
          title: "SIM卡号",
          key: "simNo",
          width: 150,
          sortable: true
        },
        {
          title: "安装地址",
          key: "address"
        },
        {
          title: "厂商",
          width: 170,
          key: "factory"
        },
        {
          title: "备注",
          width: 110,
          key: "remark"
        }
      ],
      //集中器数据
      concentratorData: [],
      //集中器ID列表
      concentratorInfoList: [],
      concentratorIDinString: "",
      //添加集中器数据规则
      concentratorValidate: {
        cname: [
          {
            required: true,
            message: "集中器名字不能为空",
            trigger: "blur"
          }
        ],
        a1: [
          {
            required: true,
            type: "string",
            message: "行政区码不能为空",
            trigger: "blur"
          }
        ],
        a2: [
          {
            required: true,
            type: "string",
            message: "终端地址不能为空",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            required: true,
            message: "经度不能为空",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            required: true,
            message: "纬度不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        beforeenergysaved: [
          {
            required: true,
            message: "节能前功耗不能为空",
            trigger: "blur"
          }
        ],
        // buyDate: [
        //   {
        //     required: true,
        //     type: "date",
        //     message: "购买时间不能为空",
        //     trigger: "change"
        //   }
        // ],
        // maintenanceDate: [
        //   {
        //     required: true,
        //     type: "date",
        //     message: "维修日期不能为空",
        //     trigger: "change"
        //   }
        // ],
        maintenancePeriod: [
          {
            required: true,
            message: "维修期限不能为空",
            trigger: "blur"
          }
        ],
        termOfService: [
          {
            required: true,
            message: "保修期限不能为空",
            trigger: "blur"
          }
        ],
        contactName: [
          {
            required: true,
            message: "联系人姓名不能为空",
            trigger: "blur"
          }
        ],
        contactEmail: [
          {
            required: true,
            message: "邮箱地址不能为空",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        mobilePhone: [
          {
            required: true,
            message: "联系电话不能为空",
            trigger: "blur"
          }
        ],
        factory: [
          {
            required: true,
            message: "生产厂家不能为空",
            trigger: "blur"
          }
        ]
      },
      //集中器弹窗数据格式化
      archiveManageModal: false,
      deleteConcentratorModal: false,
      addConcentratorModal: false,
      addOrEditConcentrator: "",
      publishConcentratorModal: false,
      //form 的数据格式化
      concentratorItem: {
        cname: "",
        mid: "",
        a1: "",
        a2: "",
        longitude: "",
        latitude: "",
        address: "",
        simNo: "",
        beforeenergysaved: "",
        buyDate: "",
        maintenanceDate: "",
        maintenancePeriod: "",
        termOfService: "",
        contactName: "",
        contactEmail: "",
        mobilePhone: "",
        factory: "",
        remarks: ""
      },
      publishData1: {
        OnOrOff1: false,
        brightness1: "",
        switchsetting1: false,
        beforeOrlate1: "",
        time1: "",
        type1: "",
        starttime1: "",
        OnOrOff2: false,
        brightness2: "",
        switchsetting2: false,
        beforeOrlate2: "",
        time2: "",
        type2: "",
        starttime2: "",
        OnOrOff3: false,
        brightness3: "",
        switchsetting3: false,
        beforeOrlate3: "",
        time3: "",
        type3: "",
        starttime3: "",
        OnOrOff4: false,
        brightness4: "",
        switchsetting4: false,
        beforeOrlate4: "",
        time4: "",
        type4: "",
        starttime4: ""
      },
      publishData2: {
        OnOrOff1: false,
        brightness1: "",
        switchsetting1: false,
        beforeOrlate1: "",
        time1: "",
        type1: "",
        starttime1: "",
        OnOrOff2: false,
        brightness2: "",
        switchsetting2: false,
        beforeOrlate2: "",
        time2: "",
        type2: "",
        starttime2: "",
        OnOrOff3: false,
        brightness3: "",
        switchsetting3: false,
        beforeOrlate3: "",
        time3: "",
        type3: "",
        starttime3: "",
        OnOrOff4: false,
        brightness4: "",
        switchsetting4: false,
        beforeOrlate4: "",
        time4: "",
        type4: "",
        starttime4: ""
      },
      publishData3: {
        OnOrOff1: false,
        brightness1: "",
        switchsetting1: false,
        beforeOrlate1: "",
        time1: "",
        type1: "",
        starttime1: "",
        OnOrOff2: false,
        brightness2: "",
        switchsetting2: false,
        beforeOrlate2: "",
        time2: "",
        type2: "",
        starttime2: "",
        OnOrOff3: false,
        brightness3: "",
        switchsetting3: false,
        beforeOrlate3: "",
        time3: "",
        type3: "",
        starttime3: "",
        OnOrOff4: false,
        brightness4: "",
        switchsetting4: false,
        beforeOrlate4: "",
        time4: "",
        type4: "",
        starttime4: ""
      },
      brightnesses: [
        { value: "0", label: "关灯" },
        { value: "10", label: "10%" },
        { value: "20", label: "20%" },
        { value: "30", label: "30%" },
        { value: "40", label: "40%" },
        { value: "50", label: "50%" },
        { value: "60", label: "60%" },
        { value: "70", label: "70%" },
        { value: "80", label: "80%" },
        { value: "90", label: "90%" },
        { value: "100", label: "100%" }
      ],
      timetype: [
        { value: "分钟", label: "分钟" },
        { value: "小时", label: "小时" }
      ],
      cityList: [
        { value: "0", label: "相对日出延后" },
        { value: "1", label: "相对日出提前" },
        { value: "2", label: "相对日落延后" },
        { value: "3", label: "相对日落提前" }
      ],
      //--------------------------灯杆管理数据-------------------------------//
      //选中的灯杆
      selectedLightPole: [],
      //弹窗控制器
      addOrEditLightPole: "",
      //弹窗初始化
      addLightPoleModal: false,
      deleteLightPoleModal: false,
      //添加编辑变量初始化
      lightPoleItem: {
        cid: "",
        devNo: "",
        deviceName: "",
        latitude: "",
        longitude: "",
        remark: ""
      },
      //灯杆编号List
      devNoInfoList: [],
      //灯杆表格表头
      lightPoleTableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "灯杆编号",
          key: "devNo",
          width: 250,
          sortable: true
        },
        {
          title: "灯杆名称",
          key: "deviceName",
          width: 250,
          sortable: true
        },
        {
          title: "所属集中器名称",
          key: "cname",
          width: 600,
          sortable: true
        },
        {
          title: "备注",
          key: "remark"
        }
      ],
      //灯杆数据
      lightPoleData: [],
      //灯杆总数，用于翻页
      totalLightPole: 12,
      //添加灯杆数据规则
      lightPoleValidate: {
        deviceName: [
          {
            required: true,
            message: "灯杆名字不能为空",
            trigger: "blur"
          }
        ],
        devNo: [
          {
            required: true,
            message: "灯杆编号不能为空",
            trigger: "blur"
          }
        ],
        cid: [
          {
            required: true,
            type: "number",
            message: "集中器为必选项",
            trigger: "change"
          }
        ],
        longitude: [
          {
            required: true,
            message: "经度不能为空",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            required: true,
            message: "纬度不能为空",
            trigger: "blur"
          }
        ]
      },
      //--------------------------控制器管理数据-------------------------------//
      //选中的控制器
      selectedController: [],
      //弹窗控制器
      addOrEditController: "",
      //弹窗初始化
      addControllerModal: false,
      deleteControllerModal: false,
      //添加编辑变量初始化
      controllerItem: {
        concentratorId: "",
        devNo: "",
        measuringPointNo: "",
        caddress: "",
        model: "",
        powerType: "",
        buyDate: "",
        maintenanceDate: "",
        maintenancePeriod: "",
        termOfService: "",
        contactName: "",
        contactEmail: "",
        mobilePhone: "",
        factory: "",
        remarks: ""
      },
      //控制器表格表头
      controllerTableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "灯杆编号",
          key: "devNo",
          width: 200,
          sortable: true
        },
        {
          title: "状态",
          key: "status",
          width: 200,
          sortable: true
        },
        {
          title: "控制器通讯地址",
          key: "caddress",
          width: 200,
          sortable: true
        },
        {
          title: "亮灯模式",
          key: "powerType",
          width: 150
        },
        {
          title: "所属集中器名称",
          key: "cname"
        },
        {
          title: "厂商",
          key: "factory"
        },
        {
          title: "备注",
          key: "remarks"
        }
      ],
      //表格数据
      controllerData: [],
      //控制器总数
      totalController: 12,
      //添加控制器数据规则
      controllerValidate: {
        measuringPointNo: [
          {
            required: true,
            type: "string",
            message: "测量点不能为空",
            trigger: "blur"
          }
        ],
        caddress: [
          {
            required: true,
            message: "通讯地址不能为空",
            trigger: "blur"
          }
        ],
        concentratorId: [
          {
            required: true,
            type: "number",
            message: "集中器是必选项",
            trigger: "change"
          }
        ],
        devNo: [
          {
            required: true,
            type: "string",
            message: "灯杆编号是必选项",
            trigger: "change"
          }
        ],
        // buyDate: [
        //   {
        //     required: true,
        //     type: "date",
        //     message: "购买时间不能为空",
        //     trigger: "change"
        //   }
        // ],
        // maintenanceDate: [
        //   {
        //     required: true,
        //     type: "date",
        //     message: "维修日期不能为空",
        //     trigger: "change"
        //   }
        // ],
        maintenancePeriod: [
          {
            required: true,
            message: "维修期限不能为空",
            trigger: "blur"
          }
        ],
        termOfService: [
          {
            required: true,
            message: "保修期限不能为空",
            trigger: "blur"
          }
        ],
        contactName: [
          {
            required: true,
            message: "联系人姓名不能为空",
            trigger: "blur"
          }
        ],
        contactEmail: [
          {
            required: true,
            message: "邮箱地址不能为空",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        mobilePhone: [
          {
            required: true,
            message: "联系电话不能为空",
            trigger: "blur"
          }
        ],
        factory: [
          {
            required: true,
            message: "生产厂家不能为空",
            trigger: "blur"
          }
        ]
      },
      //亮灯模式选择
      powertypeChoose: [
        { value: "全夜灯", label: "全夜灯" },
        { value: "半夜灯", label: "半夜灯" },
        { value: "观景灯", label: "观景灯" },
        { value: "泛光灯", label: "泛光灯" }
      ],
      //控制器类型选择
      controllertypeChoose: [
        { value: "串联型", label: "串联型" },
        { value: "并联型", label: "并联型" }
      ],
      lighttypeChoose: [
        { value: 0, label: "车道灯" },
        { value: 1, label: "人行道灯" }
      ],
      //--------------------------灯具管理数据-------------------------------//
      //选中的控制器
      selectedLamp: [],
      //弹窗控制器
      addOrEditLamp: "",
      //弹窗初始化
      addLampModal: false,
      deleteLampModal: false,
      //添加编辑变量初始化
      lampItem: {
        alias: "",
        buyDate: "",
        concentratorId: "",
        contactName: "",
        contactEmail: "",
        controllerType: "",
        factory: "",
        installDate: "",
        lid: "",
        lightType: "",
        maintenanceDate: "",
        maintenancePeriod: "",
        //manufacturer:"",
        measurePoint: "",
        mobilePhone: "",
        model: "",
        originalCapacity: "",
        powerLimitHi: "",
        powerLimitLow: "",
        powerType: "",
        status: "",
        remarks: "",
        termOfService: ""
      },
      //控制器表格表头
      lampTableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "灯具名称",
          key: "alias",
          width: 150
        },
        {
          title: "控制器类型",
          key: "controllerType",
          width: 150
        },
        {
          title: "功率上限",
          key: "powerLimitHi",
          width: 120,
          sortable: true
        },
        {
          title: "起始功率",
          key: "originalCapacity",
          width: 120,
          sortable: true
        },
        {
          title: "功率下限",
          key: "powerLimitLow",
          width: 120,
          sortable: true
        },
        {
          title: "安装日期",
          width: 135,
          key: "installDate",
          sortable: true
        },
        {
          title: "联系人",
          width: 120,
          key: "contactName"
        },
        {
          title: "联系电话",
          width: 120,
          key: "mobilePhone"
        },
        {
          title: "保修期限",
          width: 120,
          key: "termOfService",
          sortable: true
        },
        {
          title: "型号",
          width: 120,
          key: "model"
        },
        {
          title: "厂商",
          width: 120,
          key: "factory"
        },
        {
          title: "备注",
          key: "remarks"
        }
      ],
      //表格数据
      lampData: [],
      //灯具总数
      totalLamp: 12,
      //添加灯具数据规则
      lampValidate: {
        alias: [
          {
            required: true,
            message: "灯具别名不能为空",
            type: "string",
            trigger: "blur"
          }
        ],
        concentratorId: [
          {
            required: true,
            type: "number",
            message: "集中器是必选项",
            trigger: "change"
          }
        ],
        contactName: [
          {
            required: true,
            message: "联系人姓名不能为空",
            trigger: "blur"
          }
        ],
        contactEmail: [
          {
            required: true,
            message: "邮箱地址不能为空",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        controllerType: [
          {
            required: true,
            type: "string",
            message: "控制器类型是必选项",
            trigger: "change"
          }
        ],
        factory: [
          {
            required: true,
            message: "生产厂家不能为空",
            trigger: "blur"
          }
        ],
        powerType: [
          {
            required: true,
            type: "string",
            message: "亮灯模式是必选项",
            trigger: "change"
          }
        ],
        lightType: [
          {
            required: true,
            type: "number",
            message: "路灯类型是必选项",
            trigger: "change"
          }
        ],
        maintenancePeriod: [
          {
            required: true,
            message: "维修期限不能为空",
            trigger: "blur"
          }
        ],
        measurePoint: [
          {
            required: true,
            type: "string",
            message: "测量点不能为空",
            trigger: "blur"
          }
        ],
        model: [
          {
            required: true,
            message: "型号不能为空",
            trigger: "blur"
          }
        ],
        mobilePhone: [
          {
            required: true,
            message: "联系电话不能为空",
            trigger: "blur"
          }
        ],
        originalCapacity: [
          {
            required: true,
            type: "string",
            message: "原额定功率不能为空",
            trigger: "blur"
          }
        ],
        powerLimitHi: [
          {
            required: true,
            type: "string",
            message: "功率上限浮动不能为空",
            trigger: "blur"
          }
        ],
        powerLimitLow: [
          {
            required: true,
            type: "string",
            message: "功率下限浮动不能为空",
            trigger: "blur"
          }
        ],
        termOfService: [
          {
            required: true,
            message: "保修期限不能为空",
            trigger: "blur"
          }
        ],
        time: 20,
        time2: 20
        // maintenanceDate: [
        //   {
        //     required: true,
        //     type: "string",
        //     message: "维修日期不能为空",
        //     trigger: "change"
        //   }
        // ],
        // installDate: [
        //   {
        //     required: true,
        //     type: "string",
        //     message: "安装时间不能为空",
        //     trigger: "change"
        //   }
        // ],
        // buyDate: [
        //   {
        //     required: true,
        //     type: "string",
        //     message: "购买时间不能为空",
        //     trigger: "change"
        //   }
        // ],
      }
    };
  },

  methods: {
    //表格内双样式切换
    setting(id) {
      var traget = document.getElementById(id);
      if (traget.style.display == "none") {
        traget.style.display = "";
      } else {
        traget.style.display = "none";
      }
    },
    downloadExcel() {
      let token = this.$store.state.user.token;
      getExcel({
        token: token
      })
        .then(res => {
          console.log(res.data);
          this.$Message.info("已开始下载");
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //集中器管理相关操作------------=----------------------------------------------
    //选中集中器
    selectContentrator(selection) {
      console.log(selection);
      this.selectedConcentrator = selection;
    },
    //档案管理
    checkArchiveInit() {
      if (this.selectedConcentrator != "") {
        this.ArchiveInit();
      } else {
        this.$Message.warning("请选择要初始化的集中器");
      }
    },
    checkArchiveIssue() {
      if (this.selectedConcentrator != "") {
        this.ArchiveIssue();
      } else {
        this.$Message.warning("请选择要下发的集中器");
      }
    },
    //删除集中器确认和取消
    //检查是否选中集中器
    checkDeleteConcentrator() {
      if (this.selectedConcentrator != "") {
        this.deleteConcentratorModal = true;
      } else this.$Message.warning("请选择要删除的集中器");
    },
    confirmDelConcentrator() {
      this.deleteConcentratorOneByOne(this.selectedConcentrator);
      this.$Message.info("已删除集中器");
    },
    cancelDelConcentrator() {
      this.$Message.error("已取消");
    },
    //添加编辑集中器确认和取消
    handleConcentratorSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addConcentratorModal = false;
          this.confirmaddConcentrator();
        } else {
          this.$Message.error("请检查输入是否有误!");
        }
      });
    },
    confirmaddConcentrator() {
      if (this.addOrEditConcentrator == "添加集中器") {
        this.addConcentratorOneByOne();
      }
      if (this.addOrEditConcentrator == "编辑集中器") {
        this.editChoosenConcentrator();
      }
    },
    canceladdConcentrator() {
      this.$refs["concentratorRule"].resetFields();
      this.addConcentratorModal = false;
      this.$Message.error("已取消");
    },
    //检查编辑集中器是否选中集中器
    checkEditConcentrator() {
      if (this.selectedConcentrator != "") {
        if (this.selectedConcentrator.length > 1) {
          this.$Message.warning("请选择一个集中器进行编辑");
        } else {
          this.addConcentratorModal = true;
          this.setConcentratorEdit(this.selectedConcentrator[0]);
        }
      } else this.$Message.warning("请选择要编辑的集中器");
    },
    //检查下达年方案时是否选中
    checkPublishConcentrator() {
      if (this.selectedConcentrator != "") {
        this.publishConcentratorModal = true;
      } else if (this.selectContentrator.length > 1) {
        this.$Message.warning("请选择一个集中器下发年方案");
      } else this.$Message.warning("请选择要下发年方案的集中器");
    },
    confirmPublishConcentrator() {
      this.publishDataList();
      this.$Message.success("下方年方案成功");
    },
    cancelPublishConcentrator() {
      this.$Message.error("已取消下方年方案");
    },
    //获取集中器列表
    getConcentratorList() {
      let token = this.$store.state.user.token;
      getConcentrator({
        token: token,
        pageNum: this.pageNum,
        pageSize: this.tableSize,
        mids: 1
      })
        .then(res => {
          console.log("=========================");
          console.log("集中器列表:");
          console.log(res.data);
          //初始化
          this.totalConcentrator = Number(res.data.total);
          this.concentratorData = res.data.result;
          //将状态变为中文
          this.statusFormate(this.concentratorData);
          //获取集中器id集合
          this.getConcentratorIDList(this.concentratorData);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //运行状态-文字转换
    statusFormate(data) {
      for (let i in data) {
        if (data[i]["status"] == 0) {
          data[i]["status"] = "设备正常";
        }
        if (data[i]["status"] == 1) {
          data[i]["status"] = "连接终端";
        }
        if (data[i]["status"] == 2) {
          data[i]["status"] = "恢复连接";
        }
        if (data[i]["status"] == 4) {
          data[i]["status"] = "未登录";
        }
        if (data[i]["status"] == 8) {
          data[i]["status"] = "上电";
        }
        if (data[i]["status"] == 10) {
          data[i]["status"] = "断电";
        }
      }
    },
    //获取集中器ID列表(暂时)
    getConcentratorIDList(data) {
      //预先清空
      this.concentratorInfoList = [];
      this.concentratorIDinString = "";
      for (let i in data) {
        var temp = new Object();
        temp.value = data[i]["concentratorId"];
        temp.label = data[i]["cname"];
        this.concentratorInfoList.push(temp);
        this.concentratorIDinString =
          this.concentratorIDinString + data[i]["concentratorId"] + ",";
      }
      this.concentratorIDinString = this.concentratorIDinString.substring(
        0,
        this.concentratorIDinString.length - 1
      );
      this.getLightPoleList();
      this.getControllerList();
      this.getLampList();
    },
    //获取当前所选集中器（方便添加）
    selectConcentratorForSearch(selectedData) {
      this.getAllAvalibleLightPole(selectedData.value);
    },
    //根据集中器id 显示名字
    getConcentratorNameByID(data) {
      let concentratorList = this.concentratorInfoList;
      for (let i in data) {
        for (let y in concentratorList) {
          if (data[i].cid == concentratorList[y].value) {
            data[i]["cname"] = concentratorList[y].label;
          }
        }
      }
      return data;
    },
    //集中器翻页
    turnConcentratorPage(pageNo) {
      this.pageNum = pageNo;
      this.getConcentratorList();
    },
    //年方案下发
    publishDataList() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData1 = this.publishData1;
      var formData2 = this.publishData2;
      var formData3 = this.publishData3;
      //获取下发的mid
      var mid = "";
      for (let i in this.selectedConcentrator) {
        mid = mid + this.selectedConcentrator[i].concentratorId + "_";
      }
      var mid = mid.substring(0, mid.length - 1);
      //获取下发数据流
      /*---------------------------------------------------------*/
      //全夜灯数据
      var fullNightTotal = "";
      if (formData1.OnOrOff1 == true) {
        var fullNight1 = "";
        //亮度
        fullNight1 = formData1.brightness1 + ",";
        //固定还是相对设置
        if (formData1.switchsetting1 == true) {
          //相对设置类型
          fullNight1 = fullNight1 + formData1.beforeOrlate1 + ",";
          //相对时间
          if (formData1.type1 == "小时") {
            var temp1 = Number(formData1.time1) * 60;
            fullNight1 = fullNight1 + temp1;
          } else {
            fullNight1 = fullNight1 + formData1.time1;
          }
        } else {
          //固定设置类型为4
          fullNight1 = fullNight1 + "4" + ",";
          //固定设置时间
          fullNight1 = fullNight1 + formData1.starttime1;
        }
        fullNightTotal = fullNightTotal + fullNight1 + "-";
      }
      if (formData1.OnOrOff2 == true) {
        var fullNight2 = "";
        //亮度
        fullNight2 = formData1.brightness2 + ",";
        //固定还是相对设置
        if (formData1.switchsetting2 == true) {
          //相对设置类型
          fullNight2 = fullNight2 + formData1.beforeOrlate2 + ",";
          //相对时间
          if (formData1.type2 == "小时") {
            var temp2 = Number(formData1.time2) * 60;
            fullNight2 = fullNight2 + temp2;
          } else {
            fullNight2 = fullNight2 + formData1.time2;
          }
        } else {
          //固定设置类型为4
          fullNight2 = fullNight2 + "4" + ",";
          //固定设置时间
          fullNight2 = fullNight2 + formData1.starttime2;
        }
        fullNightTotal = fullNightTotal + fullNight2 + "-";
      }
      if (formData1.OnOrOff3 == true) {
        var fullNight3 = "";
        //亮度
        fullNight3 = formData1.brightness3 + ",";
        //固定还是相对设置
        if (formData1.switchsetting3 == true) {
          //相对设置类型
          fullNight3 = fullNight3 + formData1.beforeOrlate3 + ",";
          //相对时间
          if (formData1.type3 == "小时") {
            var temp3 = Number(formData1.time3) * 60;
            fullNight3 = fullNight3 + temp3;
          } else {
            fullNight3 = fullNight3 + formData1.time3;
          }
        } else {
          //固定设置类型为4
          fullNight3 = fullNight3 + "4" + ",";
          //固定设置时间
          fullNight3 = fullNight3 + formData1.starttime3;
        }
        fullNightTotal = fullNightTotal + fullNight3 + "-";
      }
      if (formData1.OnOrOff4 == true) {
        var fullNight4 = "";
        //亮度
        fullNight4 = formData1.brightness4 + ",";
        //固定还是相对设置
        if (formData1.switchsetting4 == true) {
          //相对设置类型
          fullNight4 = fullNight4 + formData1.beforeOrlate4 + ",";
          //相对时间
          if (formData1.type4 == "小时") {
            var temp4 = Number(formData1.time4) * 60;
            fullNight4 = fullNight4 + temp4;
          } else {
            fullNight4 = fullNight4 + formData1.time4;
          }
        } else {
          //固定设置类型为4
          fullNight4 = fullNight4 + "4" + ",";
          //固定设置时间
          fullNight4 = fullNight4 + formData1.starttime4;
        }
        fullNightTotal = fullNightTotal + fullNight4 + "-";
      }
      fullNightTotal = fullNightTotal.substring(0, fullNightTotal.length - 1);
      /*---------------------------------------------------------*/
      //半夜灯数据
      var halfNightTotal = "";
      if (formData2.OnOrOff1 == true) {
        var halfNight1 = "";
        //亮度
        halfNight1 = formData2.brightness1 + ",";
        //固定还是相对设置
        if (formData2.switchsetting1 == true) {
          //相对设置类型
          halfNight1 = halfNight1 + formData2.beforeOrlate1 + ",";
          //相对时间
          if (formData2.type1 == "小时") {
            var temp1 = Number(formData2.time1) * 60;
            halfNight1 = halfNight1 + temp1;
          } else {
            halfNight1 = halfNight1 + formData2.time1;
          }
        } else {
          //固定设置类型为4
          halfNight1 = halfNight1 + "4" + ",";
          //固定设置时间
          halfNight1 = halfNight1 + formData2.starttime1;
        }
        halfNightTotal = halfNightTotal + halfNight1 + "-";
      }
      if (formData2.OnOrOff2 == true) {
        var halfNight2 = "";
        //亮度
        halfNight2 = formData2.brightness2 + ",";
        //固定还是相对设置
        if (formData2.switchsetting2 == true) {
          //相对设置类型
          halfNight2 = halfNight2 + formData2.beforeOrlate2 + ",";
          //相对时间
          if (formData2.type2 == "小时") {
            var temp2 = Number(formData2.time2) * 60;
            halfNight2 = halfNight2 + temp2;
          } else {
            halfNight2 = halfNight2 + formData2.time2;
          }
        } else {
          //固定设置类型为4
          halfNight2 = halfNight2 + "4" + ",";
          //固定设置时间
          halfNight2 = halfNight2 + formData2.starttime2;
        }
        halfNightTotal = halfNightTotal + halfNight2 + "-";
      }
      if (formData2.OnOrOff3 == true) {
        var halfNight3 = "";
        //亮度
        halfNight3 = formData2.brightness3 + ",";
        //固定还是相对设置
        if (formData2.switchsetting3 == true) {
          //相对设置类型
          halfNight3 = halfNight3 + formData2.beforeOrlate3 + ",";
          //相对时间
          if (formData2.type3 == "小时") {
            var temp3 = Number(formData2.time3) * 60;
            halfNight3 = halfNight3 + temp3;
          } else {
            halfNight3 = halfNight3 + formData2.time3;
          }
        } else {
          //固定设置类型为4
          halfNight3 = halfNight3 + "4" + ",";
          //固定设置时间
          halfNight3 = halfNight3 + formData2.starttime3;
        }
        halfNightTotal = halfNightTotal + halfNight3 + "-";
      }
      if (formData2.OnOrOff4 == true) {
        var halfNight4 = "";
        //亮度
        halfNight4 = formData2.brightness4 + ",";
        //固定还是相对设置
        if (formData2.switchsetting4 == true) {
          //相对设置类型
          halfNight4 = halfNight4 + formData2.beforeOrlate4 + ",";
          //相对时间
          if (formData2.type4 == "小时") {
            var temp4 = Number(formData2.time4) * 60;
            halfNight4 = halfNight4 + temp4;
          } else {
            halfNight4 = halfNight4 + formData2.time4;
          }
        } else {
          //固定设置类型为4
          halfNight4 = halfNight4 + "4" + ",";
          //固定设置时间
          halfNight4 = halfNight4 + formData2.starttime4;
        }
        halfNightTotal = halfNightTotal + halfNight4 + "-";
      }
      halfNightTotal = halfNightTotal.substring(0, halfNightTotal.length - 1);
      /*---------------------------------------------------------*/
      //观景灯数据
      var viewLightTotal = "";
      if (formData3.OnOrOff1 == true) {
        var viewLight1 = "";
        //亮度
        viewLight1 = formData3.brightness1 + ",";
        //固定还是相对设置
        if (formData3.switchsetting1 == true) {
          //相对设置类型
          viewLight1 = viewLight1 + formData3.beforeOrlate1 + ",";
          //相对时间
          if (formData3.type1 == "小时") {
            var temp1 = Number(formData3.time1) * 60;
            viewLight1 = viewLight1 + temp1;
          } else {
            viewLight1 = viewLight1 + formData3.time1;
          }
        } else {
          //固定设置类型为4
          viewLight1 = viewLight1 + "4" + ",";
          //固定设置时间
          viewLight1 = viewLight1 + formData3.starttime1;
        }
        viewLightTotal = viewLightTotal + viewLight1 + "-";
      }
      if (formData3.OnOrOff2 == true) {
        var viewLight2 = "";
        //亮度
        viewLight2 = formData3.brightness2 + ",";
        //固定还是相对设置
        if (formData3.switchsetting2 == true) {
          //相对设置类型
          viewLight2 = viewLight2 + formData3.beforeOrlate2 + ",";
          //相对时间
          if (formData3.type2 == "小时") {
            var temp2 = Number(formData3.time2) * 60;
            viewLight2 = viewLight2 + temp2;
          } else {
            viewLight2 = viewLight2 + formData3.time2;
          }
        } else {
          //固定设置类型为4
          viewLight2 = viewLight2 + "4" + ",";
          //固定设置时间
          viewLight2 = viewLight2 + formData3.starttime2;
        }
        viewLightTotal = viewLightTotal + viewLight2 + "-";
      }
      if (formData3.OnOrOff3 == true) {
        var viewLight3 = "";
        //亮度
        viewLight3 = formData3.brightness3 + ",";
        //固定还是相对设置
        if (formData3.switchsetting3 == true) {
          //相对设置类型
          viewLight3 = viewLight3 + formData3.beforeOrlate3 + ",";
          //相对时间
          if (formData3.type3 == "小时") {
            var temp3 = Number(formData3.time3) * 60;
            viewLight3 = viewLight3 + temp3;
          } else {
            viewLight3 = viewLight3 + formData3.time3;
          }
        } else {
          //固定设置类型为4
          viewLight3 = viewLight3 + "4" + ",";
          //固定设置时间
          viewLight3 = viewLight3 + formData3.starttime3;
        }
        viewLightTotal = viewLightTotal + viewLight3 + "-";
      }
      if (formData3.OnOrOff4 == true) {
        var viewLight4 = "";
        //亮度
        viewLight4 = formData3.brightness4 + ",";
        //固定还是相对设置
        if (formData3.switchsetting4 == true) {
          //相对设置类型
          viewLight4 = viewLight4 + formData3.beforeOrlate4 + ",";
          //相对时间
          if (formData3.type4 == "小时") {
            var temp4 = Number(formData3.time4) * 60;
            viewLight4 = viewLight4 + temp4;
          } else {
            viewLight4 = viewLight4 + formData3.time4;
          }
        } else {
          //固定设置类型为4
          viewLight4 = viewLight4 + "4" + ",";
          //固定设置时间
          viewLight4 = viewLight4 + formData3.starttime4;
        }
        viewLightTotal = viewLightTotal + viewLight4 + "-";
      }
      viewLightTotal = viewLightTotal.substring(0, viewLightTotal.length - 1);
      console.log(
        fullNightTotal + "_" + halfNightTotal + "_" + viewLightTotal + "_"
      );
      var data =
        fullNightTotal + "_" + halfNightTotal + "_" + viewLightTotal + "_";
      publishPlan({
        token: token,
        mid: mid,
        data: data
      })
        .then(res => {
          console.log("=========================");
          console.log("下发年方案成功");
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------增加-------------------------*/
    addConcentratorOneByOne() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.concentratorItem;
      //时间格式转化
      var tempMaintenanceDate = new Date(formData.maintenanceDate).getTime();
      var tempBuyDate = new Date(formData.buyDate).getTime();
      //调用后台
      addConcentrator({
        token: token,
        a1: formData.a1,
        a2: formData.a2,
        address: formData.address,
        beforeenergysaved: formData.beforeenergysaved,
        buyDate: tempBuyDate,
        cname: formData.cname,
        contactEmail: formData.contactEmail,
        contactName: formData.contactName,
        factory: formData.factory,
        longitude: formData.longitude,
        latitude: formData.latitude,
        maintenanceDate: tempMaintenanceDate,
        maintenancePeriod: formData.maintenancePeriod,
        mid: 1, //暂时为1
        mobilePhone: formData.mobilePhone,
        remarks: formData.remarks,
        simNo: formData.simNo,
        termOfService: formData.termOfService
      })
        .then(res => {
          console.log("=========================");
          console.log("添加成功");
          this.$Message.success("添加成功");
          this.getConcentratorList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------编辑-------------------------*/
    //预显示数据
    setConcentratorEdit(editdata) {
      this.$refs["concentratorRule"].resetFields();
      this.concentratorItem.concentratorId = editdata.concentratorId;
      this.concentratorItem.a1 = editdata.a1 + "";
      this.concentratorItem.a2 = editdata.a2 + "";
      this.concentratorItem.cname = editdata.cname;
      this.concentratorItem.address = editdata.address;
      this.concentratorItem.longitude = editdata.longitude;
      this.concentratorItem.latitude = editdata.latitude;
      this.concentratorItem.maintenanceDate = editdata.maintenanceDate;
      this.concentratorItem.buyDate = editdata.buyDate;
      this.concentratorItem.beforeenergysaved = editdata.beforeenergysaved;
      this.concentratorItem.maintenancePeriod = editdata.maintenancePeriod;
      this.concentratorItem.termOfService = editdata.termOfService;
      this.concentratorItem.contactName = editdata.contactName;
      this.concentratorItem.contactEmail = editdata.contactEmail;
      this.concentratorItem.mobilePhone = editdata.mobilePhone;
      this.concentratorItem.factory = editdata.factory;
      this.concentratorItem.remarks = editdata.remarks;
    },
    editChoosenConcentrator() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.concentratorItem;
      console.log(formData);
      //时间格式转化
      let temp1 = new Date(formData.maintenanceDate);
      let tempMaintenanceDate = temp1.getTime();
      let tempBuyDate = new Date(formData.buyDate).getTime();
      editConcentrator({
        token: token,
        a1: formData.a1,
        a2: formData.a2,
        address: formData.address,
        beforeenergysaved: formData.beforeenergysaved,
        buyDate: tempBuyDate,
        cname: formData.cname,
        contactEmail: formData.contactEmail,
        contactName: formData.contactName,
        factory: formData.factory,
        longitude: formData.longitude,
        latitude: formData.latitude,
        maintenanceDate: tempMaintenanceDate,
        maintenancePeriod: formData.maintenancePeriod,
        mid: 1, //暂时为1
        mobilePhone: formData.mobilePhone,
        remarks: formData.remarks,
        simNo: formData.simNo,
        termOfService: formData.termOfService,
        concentratorId: formData.concentratorId
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑成功");
          this.$Message.success("编辑成功");
          this.getConcentratorList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------档案管理-------------------------*/
    //计时器
    timer() {
      if (this.time > 0) {
        this.time--;
        document.getElementById("ArchiveIssueText").textContent =
          "  " + this.time + "(s)  ";
        setTimeout(this.timer, 1000);
      } else if (this.time == 0) {
        document.getElementById("ArchiveIssuebutton").disabled = false;
        document.getElementById("ArchiveIssueText").textContent =
          "终端档案下发";
      }
    },
    timer2() {
      if (this.time2 > 0) {
        this.time2--;
        document.getElementById("ArchiveInitText").textContent =
          "  " + this.time2 + "(s)  ";
        setTimeout(this.timer2, 1000);
      } else if (this.time2 == 0) {
        document.getElementById("ArchiveInitbutton").disabled = false;
        document.getElementById("ArchiveInitText").textContent =
          "终端档案初始化";
      }
    },
    //终端档案下发
    ArchiveIssue() {
      document.getElementById("ArchiveIssuebutton").disabled = true;
      this.time = 20;
      setTimeout(this.timer, 1000);
      let Ids = "";
      for (let i in this.selectedConcentrator) {
        Ids += this.selectedConcentrator[i].concentratorId + ",";
      }
      Ids = Ids.substring(0, Ids.length - 1);
      let token = this.$store.state.user.token;
      ArchiveIssue({
        token: token,
        concentratorIds: Ids
      })
        .then(res => {
          console.log("=========================");
          console.log("终端档案下发:");
          console.log(res.data);
          this.$Message.success(res.data.message);
          this.archiveManageModal = false;
          this.$Message.success("终端档案下发成功");
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error("终端档案下发失败");
        });
    },
    ArchiveInit() {
      document.getElementById("ArchiveInitbutton").disabled = true;
      this.time2 = 20;
      setTimeout(this.timer2, 1000);
      let Ids = "";
      for (let i in this.selectedConcentrator) {
        Ids += this.selectedConcentrator[i].concentratorId + ",";
      }
      Ids = Ids.substring(0, Ids.length - 1);
      let token = this.$store.state.user.token;
      ArchiveInit({
        token: token,
        concentratorIds: Ids
      })
        .then(res => {
          console.log("=========================");
          console.log("终端档案初始化:");
          console.log(res.data);
          this.$Message.success(res.data.message);
          this.archiveManageModal = false;
          this.$Message.success("终端档案初始化成功");
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error("终端档案初始化失败");
        });
    },
    /*---------------------------删除-------------------------*/
    //删除选定集中器
    deleteConcentratorOneByOne(data) {
      for (let i in data) {
        this.deleteChoosenConcentrator(data[i]["concentratorId"]);
      }
    },
    //删除调用后台
    deleteChoosenConcentrator(cid) {
      let token = this.$store.state.user.token;
      deleteConcentrator({
        token: token,
        cid: cid
      })
        .then(res => {
          this.getConcentratorList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //灯杆管理相关操作---------------------------------------------------------------
    //选中灯杆
    selectLightPole(selection) {
      console.log(selection);
      this.selectedLightPole = selection;
    },
    //删除灯杆确认和取消
    //检查是否选中灯杆
    checkDeleteLightPole() {
      if (this.selectedLightPole != "") {
        this.deleteLightPoleModal = true;
      } else this.$Message.warning("请选择要删除的灯杆");
    },
    confirmDelLightPole() {
      this.deleteLightPoleOneByOne(this.selectedLightPole);
      this.$Message.info("已删除灯杆");
    },
    cancelDelLightPole() {
      this.$Message.error("已取消");
    },
    //添加编辑灯杆确认和取消
    handleLightPoleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addLightPoleModal = false;
          this.confirmLightPole();
        } else {
          this.$Message.error("请检查输入是否有误!");
        }
      });
    },
    confirmLightPole() {
      if (this.addOrEditLightPole == "添加灯杆") {
        this.addLightPoleOneByOne();
      }
      if (this.addOrEditLightPole == "编辑灯杆") {
        this.editChoosenLightPole();
      }
    },
    canceladdLightPole() {
      this.$refs["lightPoleRule"].resetFields();
      this.addLightPoleModal = false;
      this.$Message.error("已取消");
    },
    //检查编辑灯杆是否选中的灯杆
    checkEditLightPole() {
      if (this.selectedLightPole != "") {
        if (this.selectedLightPole.length > 1) {
          this.$Message.warning("请选择一个灯杆进行编辑");
        } else {
          this.addLightPoleModal = true;
          this.setLightPoleEdit(this.selectedLightPole[0]);
        }
      } else this.$Message.warning("请选择要编辑的灯杆");
    },
    //获取灯杆列表
    getLightPoleList() {
      let token = this.$store.state.user.token;
      getLightPole({
        token: token,
        pageNum: this.pageNum,
        pageSize: this.tableSize,
        concentratorIds: this.concentratorIDinString
      })
        .then(res => {
          console.log("=========================");
          console.log("灯杆列表:");
          console.log(res.data);
          //初始化
          this.totalLightPole = Number(res.data.total);
          this.lightPoleData = this.getConcentratorNameByID(res.data.result);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //灯杆翻页
    turnLightPolePage(pageNo) {
      this.pageNum = pageNo;
      this.getLightPoleList();
    },
    //获取集中器下所有灯杆（添加用）
    getAllAvalibleLightPole(cid) {
      let token = this.$store.state.user.token;
      getAvalibleLightPole({
        token: token,
        concentratorIds: cid
      })
        .then(res => {
          console.log("=========================");
          console.log("灯杆编号列表:");
          console.log(res.data.result);
          //获取灯杆编号列表
          this.getDevNoList(res.data.result);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //转换得到列表获取灯杆编号列表
    getDevNoList(listData) {
      var menu = [];
      for (let i in listData) {
        var temp = new Object();
        temp.value = listData[i]["devNo"];
        temp.label = listData[i]["deviceName"];
        menu.push(temp);
      }
      this.devNoInfoList = menu;
    },
    /*---------------------------增加-------------------------*/
    addLightPoleOneByOne() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.lightPoleItem;
      //获取concentratorID
      // var pos = formData.cid.indexOf(':');
      // var temcid = formData.cid.substring(pos+1,formData.cid.length);
      //调用后台
      addLightPole({
        token: token,
        cid: formData.cid, //暂定
        deviceName: formData.deviceName,
        devNo: formData.devNo,
        longitude: formData.longitude,
        latitude: formData.latitude,
        remark: formData.remark
      })
        .then(res => {
          console.log("=========================");
          console.log("添加灯杆成功");
          this.$Message.success("添加灯杆成功");
          this.getLightPoleList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------编辑-------------------------*/
    //预显示数据
    setLightPoleEdit(editdata) {
      this.$refs["lightPoleRule"].resetFields();
      this.lightPoleItem.deviceLightPoleId = editdata.deviceLightPoleId;
      this.lightPoleItem.cid = editdata.cid;
      this.lightPoleItem.devNo = editdata.devNo;
      this.lightPoleItem.deviceName = editdata.deviceName;
      this.lightPoleItem.remark = editdata.remark;
      this.lightPoleItem.longitude = editdata.longitude;
      this.lightPoleItem.latitude = editdata.latitude;
    },
    editChoosenLightPole() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.lightPoleItem;

      editLightPole({
        token: token,
        cid: formData.cid, //暂定
        deviceName: formData.deviceName,
        devNo: formData.devNo,
        longitude: formData.longitude,
        latitude: formData.latitude,
        remark: formData.remark,
        deviceLightPoleId: formData.deviceLightPoleId
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑灯杆成功");
          this.$Message.success("编辑灯杆成功");
          this.getLightPoleList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------删除-------------------------*/
    //删除选定灯杆
    deleteLightPoleOneByOne(data) {
      for (let i in data) {
        this.deleteChoosenLightPole(data[i]["deviceLightPoleId"]);
      }
    },
    //删除调用后台
    deleteChoosenLightPole(lpid) {
      let token = this.$store.state.user.token;
      deleteLightPole({
        token: token,
        lpid: lpid
      })
        .then(res => {
          this.getLightPoleList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },

    //控制器管理相关操作---------------------------------------------------------------
    //选中控制器
    selectController(selection) {
      console.log(selection);
      this.selectedController = selection;
    },
    //删除控制器确认和取消
    //检查是否选中控制器
    checkDeleteController() {
      if (this.selectedController != "") {
        this.deleteControllerModal = true;
      } else this.$Message.warning("请选择要删除的控制器");
    },
    confirmDelController() {
      this.deleteControllerOneByOne(this.selectedController);
      this.$Message.info("已删除控制器");
    },
    cancelDelController() {
      this.$Message.error("已取消");
    },
    //添加编辑控制器确认和取消
    handleControllerSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addControllerModal = false;
          this.confirmController();
        } else {
          this.$Message.error("请检查输入是否有误!");
        }
      });
    },
    confirmController() {
      if (this.addOrEditController == "添加控制器") {
        this.addControllerOneByOne();
      }
      if (this.addOrEditController == "编辑控制器") {
        this.editChoosenController();
      }
    },
    canceladdController() {
      this.$refs["controllerRule"].resetFields();
      this.addControllerModal = false;
      this.$Message.error("已取消");
    },
    //检查编辑控制器是否选中的控制器
    checkEditController() {
      if (this.selectedController != "") {
        if (this.selectedController.length > 1) {
          this.$Message.warning("请选择一个控制器进行编辑");
        } else {
          this.addControllerModal = true;
          this.setControllerEdit(this.selectedController[0]);
        }
      } else this.$Message.warning("请选择要编辑的控制器");
    },
    //获取控制器列表
    getControllerList() {
      let token = this.$store.state.user.token;
      getController({
        token: token,
        pageNum: this.pageNum,
        pageSize: this.tableSize,
        concentratorIds: this.concentratorIDinString
      })
        .then(res => {
          console.log("=========================");
          console.log("控制器列表:");
          console.log(res.data.result);
          //初始化
          this.totalController = Number(res.data.total);
          this.controllerData = this.FormateControllerData(res.data.result);
          this.controllerData = this.getConcentratorNameByIDController(
            this.controllerData
          );
          //数据格式转化
          this.statusFormateController(this.controllerData);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //格式化数据
    FormateControllerData(conData) {
      var menu = [];
      for (let i in conData) {
        conData[i].controller["devNo"] = conData[i].devNo;
        menu.push(conData[i].controller);
      }
      return menu;
    },
    //获取当前集中器下所有灯杆
    getAvailableLightPoleID() {},
    //根据集中器id 显示名字
    getConcentratorNameByIDController(data) {
      let concentratorList = this.concentratorInfoList;
      for (let i in data) {
        for (let y in concentratorList) {
          if (data[i].concentratorId == concentratorList[y].value) {
            data[i]["cname"] = concentratorList[y].label;
          }
        }
      }
      return data;
    },
    //状态转为文字
    statusFormateController(data) {
      for (let i in data) {
        if (data[i]["status"] == 0) {
          data[i]["status"] = "在线";
        }
        if (data[i]["status"] == 1) {
          data[i]["status"] = "不在线";
        }
        if (data[i]["status"] == 2) {
          data[i]["status"] = "未配置到终端";
        }
        if (data[i]["status"] == 8) {
          data[i]["status"] = "控制器故障";
        }
        if (data[i]["status"] == 16) {
          data[i]["status"] = "集中器不在线";
        }
        if (data[i]["status"] == 32) {
          data[i]["status"] = "控制器失控";
        }
      }
    },
    //控制器翻页
    turnController(pageNo) {
      this.pageNum = pageNo;
      this.getControllerList();
    },
    /*---------------------------增加-------------------------*/
    addControllerOneByOne() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.controllerItem;
      //时间格式转化
      var tempMaintenanceDate = new Date(formData.maintenanceDate).getTime();
      var tempBuyDate = new Date(formData.buyDate).getTime();
      //调用后台
      addController({
        token: token,
        concentratorId: formData.concentratorId,
        pid: 1, //test
        caddress: formData.caddress,
        measuringPointNo: formData.measuringPointNo,
        buyDate: tempBuyDate,
        model: formData.model,
        contactEmail: formData.contactEmail,
        contactName: formData.contactName,
        factory: formData.factory,
        powerType: formData.powerType,
        maintenanceDate: tempMaintenanceDate,
        maintenancePeriod: formData.maintenancePeriod,
        mobilePhone: formData.mobilePhone,
        remarks: formData.remarks,
        termOfService: formData.termOfService
      })
        .then(res => {
          console.log("=========================");
          console.log("添加成功");
          this.$Message.success("添加成功");
          this.getControllerList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------编辑-------------------------*/
    //预显示数据
    setControllerEdit(editdata) {
      this.$refs["controllerRule"].resetFields();
      this.controllerItem.cid = editdata.cid;
      this.controllerItem.concentratorId = editdata.concentratorId;
      this.getAllAvalibleLightPole(editdata.concentratorId);
      this.controllerItem.devNo = editdata.devNo;
      this.controllerItem.pid = editdata.pid;
      this.controllerItem.caddress = editdata.caddress;
      this.controllerItem.measuringPointNo = editdata.measuringPointNo + "";
      this.controllerItem.buyDate = new Date(editdata.buyDate).Format(
        "yyyy-MM-dd"
      );
      this.controllerItem.model = editdata.model;
      this.controllerItem.maintenanceDate = new Date(
        editdata.maintenanceDate
      ).Format("yyyy-MM-dd");
      this.controllerItem.powerType = editdata.powerType;
      this.controllerItem.maintenancePeriod = editdata.maintenancePeriod;
      this.controllerItem.termOfService = editdata.termOfService;
      this.controllerItem.contactName = editdata.contactName;
      this.controllerItem.contactEmail = editdata.contactEmail;
      this.controllerItem.mobilePhone = editdata.mobilePhone;
      this.controllerItem.factory = editdata.factory;
      this.controllerItem.remarks = editdata.remarks;
    },
    editChoosenController() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.concentratorItem;
      //时间格式转化
      var tempMaintenanceDate = new Date(formData.maintenanceDate).getTime();
      var tempBuyDate = new Date(formData.buyDate).getTime();
      editController({
        token: token,
        cid: formData.cid,
        concentratorId: formData.concentratorId,
        caddress: formData.caddress,
        pid: formData.pid,
        buyDate: tempBuyDate,
        measuringPointNo: formData.measuringPointNo + "",
        contactEmail: formData.contactEmail,
        contactName: formData.contactName,
        factory: formData.factory,
        maintenanceDate: tempMaintenanceDate,
        maintenancePeriod: formData.maintenancePeriod,
        model: formData.model,
        mobilePhone: formData.mobilePhone,
        remarks: formData.remarks,
        powerType: formData.powerType,
        termOfService: formData.termOfService
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑成功");
          this.$Message.success("编辑成功");
          this.getControllerList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------删除-------------------------*/
    //删除选定灯杆
    deleteControllerOneByOne(data) {
      for (let i in data) {
        this.deleteChoosenController(data[i]["cid"]);
      }
    },
    //删除调用后台
    deleteChoosenController(cid) {
      console.log(cid);
      let token = this.$store.state.user.token;
      deleteController({
        token: token,
        cid: cid
      })
        .then(res => {
          console.log("删除成功");
          this.getControllerList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //灯具管理相关操作---------------------------------------------------------------
    //选中灯具
    selectLamp(selection) {
      console.log(selection);
      this.selectedLamp = selection;
    },
    //添加编辑控制器确认和取消
    handleLampSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addLampModal = false;
          this.confirmLamp();
        } else {
          this.$Message.error("请检查输入是否有误!");
        }
      });
    },
    confirmLamp() {
      if (this.addOrEditLamp == "添加灯具") {
        this.addLampOneByOne();
      }
      if (this.addOrEditLamp == "编辑灯具") {
        this.editChoosenLamp();
      }
    },
    canceladdLamp() {
      this.$refs["lampRule"].resetFields();
      this.addLampModal = false;
      this.$Message.error("已取消");
    },
    //检查编辑控制器是否选中的控制器
    checkEditLamp() {
      if (this.selectedLamp != "") {
        if (this.selectedLamp.length > 1) {
          this.$Message.warning("请选择一个灯具进行编辑");
        } else {
          this.addLampModal = true;
          this.setLampEdit(this.selectedLamp[0]);
        }
      } else this.$Message.warning("请选择要编辑的灯杆");
    },
    //获取灯具列表
    getLampList() {
      let token = this.$store.state.user.token;
      getLamp({
        token: token,
        pageNum: this.pageNum,
        pageSize: this.tableSize,
        concentratorIds: this.concentratorIDinString
      })
        .then(res => {
          console.log("=========================");
          console.log("灯具列表:");
          console.log(res.data.result);
          //初始化
          this.totalLamp = Number(res.data.total);
          //this.lampData = res.data.result;
          //数据格式转化
          this.lampData = this.statusFormateLamp(res.data.result);
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //状态转为文字
    statusFormateLamp(data) {
      for (let i in data) {
        if (data[i]["status"] >= 0 && data[i]["status"] <= 100) {
          data[i]["status"] = "在线亮度：" + data[i]["status"] + "%";
        }
        if (data[i]["status"] >= 101 && data[i]["status"] <= 201) {
          data[i]["status"] = "在线亮度：" + data[i]["status"] - 101 + "%";
        }
        if (data[i]["status"] >= 202) {
          if (data[i]["status"] - 202 == 2) {
            data[i]["status"] = "未配置到终端";
          }
          if (data[i]["status"] - 202 == 4) {
            data[i]["status"] = "灯具异常";
          }
          if (data[i]["status"] - 202 == 8) {
            data[i]["status"] = "控制器故障";
          }
          if (data[i]["status"] - 202 == 16) {
            data[i]["status"] = "集中器不在线";
          }
          if (data[i]["status"] - 202 == 32) {
            data[i]["status"] = "控制器失控";
          }
          if (data[i]["status"] - 202 >= 33 && data[i]["status"] - 202 <= 133) {
            data[i]["status"] = "不在线：" + data[i]["status"] - 202 - 33 + "%";
          }
        }
        data[i]["buyDate"] = new Date(data[i]["buyDate"]).Format(
          "yyyy-MM-dd HH:mm:ss"
        );
        data[i]["installDate"] = new Date(data[i]["buyDate"]).Format(
          "yyyy-MM-dd HH:mm:ss"
        );
        data[i]["maintenanceDate"] = new Date(data[i]["buyDate"]).Format(
          "yyyy-MM-dd HH:mm:ss"
        );
      }
      return data;
    },
    //灯具翻页
    turnLamp(pageNo) {
      this.pageNum = pageNo;
      this.getLampList();
    },
    /*---------------------------增加-------------------------*/
    addLampOneByOne() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.lampItem;
      //时间格式转化
      var tempMaintenanceDate = new Date(formData.maintenanceDate).getTime();
      var tempBuyDate = new Date(formData.buyDate).getTime();
      var tempInstallDate = new Date(formData.installDate).getTime();
      //调用后台
      addLamp({
        token: token,
        alias: formData.alias,
        buyDate: tempBuyDate,
        concentratorId: formData.concentratorId,
        contactEmail: formData.contactEmail,
        contactName: formData.contactName,
        controllerType: formData.controllerType,
        factory: formData.factory,
        powerType: formData.powerType,
        installDate: tempInstallDate,
        lightType: formData.lightType,
        maintenanceDate: tempMaintenanceDate,
        maintenancePeriod: formData.maintenancePeriod,
        measurePoint: formData.measurePoint,
        model: formData.model,
        mobilePhone: formData.mobilePhone,
        originalCapacity: formData.originalCapacity,
        powerLimitHi: formData.powerLimitHi,
        powerLimitLow: formData.powerLimitLow,
        remarks: formData.remarks,
        termOfService: formData.termOfService
      })
        .then(res => {
          console.log("=========================");
          console.log("添加灯具成功");
          this.$Message.success("添加灯具成功");
          this.getLampList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------编辑-------------------------*/
    //预显示数据
    setLampEdit(editdata) {
      this.$refs["lampRule"].resetFields();
      this.lampItem.alias = editdata.alias;
      this.lampItem.controllerType = editdata.controllerType;
      this.lampItem.concentratorId = editdata.concentratorId;
      this.lampItem.installDate = editdata.installDate;
      this.lampItem.lightType = editdata.lightType;
      this.lampItem.measurePoint = editdata.measurePoint;
      this.lampItem.buyDate = new Date(editdata.buyDate).Format("yyyy-MM-dd");
      this.lampItem.model = editdata.model;
      this.lampItem.maintenanceDate = new Date(editdata.maintenanceDate).Format(
        "yyyy-MM-dd"
      );
      this.lampItem.powerType = editdata.powerType;
      this.lampItem.maintenancePeriod = editdata.maintenancePeriod;
      this.lampItem.termOfService = editdata.termOfService;
      this.lampItem.originalCapacity = editdata.originalCapacity;
      this.lampItem.powerLimitHi = editdata.powerLimitHi;
      this.lampItem.powerLimitLow = editdata.powerLimitLow;
      this.lampItem.contactName = editdata.contactName;
      this.lampItem.contactEmail = editdata.contactEmail;
      this.lampItem.mobilePhone = editdata.mobilePhone;
      this.lampItem.factory = editdata.factory;
      this.lampItem.remarks = editdata.remarks;
      this.lampItem.lid = editdata.lid;
    },
    editChoosenLamp() {
      let token = this.$store.state.user.token;
      //获取表格数据
      var formData = this.lampItem;

      //时间格式转化
      var tempMaintenanceDate = new Date(formData.maintenanceDate).getTime();
      var tempBuyDate = new Date(formData.buyDate).getTime();
      var tempInstallDate = new Date(formData.installDate).getTime();
      editController({
        token: token,
        alias: formData.alias,
        buyDate: tempBuyDate,
        concentratorId: formData.concentratorId,
        contactEmail: formData.contactEmail,
        contactName: formData.contactName,
        controllerType: formData.controllerType,
        factory: formData.factory,
        powerType: formData.powerType,
        installDate: tempInstallDate,
        lightType: formData.lightType,
        maintenanceDate: tempMaintenanceDate,
        maintenancePeriod: formData.maintenancePeriod,
        measurePoint: formData.measurePoint + "",
        model: formData.model,
        mobilePhone: formData.mobilePhone,
        originalCapacity: formData.originalCapacity + "",
        powerLimitHi: formData.powerLimitHi + "",
        powerLimitLow: formData.powerLimitLow + "",
        remarks: formData.remarks,
        termOfService: formData.termOfService,
        lid: formData.lid,
        status: 0
      })
        .then(res => {
          console.log("=========================");
          console.log("编辑成功");
          this.$Message.success("编辑成功");
          this.getLampList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /*---------------------------删除-------------------------*/
    //删除选定灯具
    deleteLampOneByOne(data) {
      for (let i in data) {
        this.deleteChoosenLamp(data[i]["cid"]);
      }
    },
    //删除调用后台
    deleteChoosenLamp(cid) {
      console.log(cid);
      let token = this.$store.state.user.token;
      deleteLamp({
        token: token,
        lid: lid
      })
        .then(res => {
          console.log("删除成功");
          this.getLampList();
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    //初始化
    initData() {
      //获取设备列表
      this.getConcentratorList();
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
.background-row {
  background-color: rgba(255, 255, 255, 0.8);
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
.ivu-layout-content {
  background-color: transparent !important;
}
</style>

<template>
  <div class="device_parameter_options">
    <Content style="padding:5px;">
      <Row class="background-row">
        <Row style="margin-left:16px;margin-top:6px;margin-right:16px;margin-bottom:14px;">
          <p style="height:40px;margin-top:5px;">
            <!--------------- 表格上方一排按钮 ----------------->
            <span style="float:right;">
              <span style="margin-right:5px;">
                <Button
                  style="width:120px;font-size:14px;"
                  type="primary"
                  @click="addOrEditConcentrator='添加集中器'; addConcentratorModal=true; concentratorItem = {};"
                >
                  <Icon type="md-add" size="14" style="color:white"/>重置时间表
                </Button>
              </span>
              <span style="margin-right:5px;">
                <Button
                  style="width:80px;font-size:14px;"
                  type="warning"
                  @click="addOrEditConcentrator='编辑集中器'; checkEditItem()"
                >
                  <Icon type="md-create" size="14" style="color:white"/>编辑
                </Button>
              </span>
              <span style="margin-right:5px;">
                <Button
                  style="width:120px;font-size:14px;"
                  type="error"
                  @click="deleteItemModal=true"
                >
                  <Icon type="md-close" size="14" style="color:white"/>删除时间表
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
          <hr>
          <!-------------------- 表格 --------------------->
          <Row class="user-table-row">
            <Table
              class="userTable"
              @on-selection-change="selectItem"
              border
              ref="selection"
              :columns="parameterTableColumns"
              :data="parameterData"
              style="margin-left:5px;margin-right:5px;margin-top:5px;"
            ></Table>
          </Row>
        </Row>
      </Row>

      <!-- 删除集中器操作 -->
      <Modal
        class="adding_Concentrator"
        v-model="deleteItemModal"
        title="删除时间表"
        ok-text="确认"
        cancel-text="取消"
        width="700px;"
      >
        <Form :model="timetableItem" :label-width="110" ref="concentratorRule">
          <Row>
            <i-col span="12">
              <FormItem label="管理所名称：" label-position="left">
                <Input placeholder="请输入集中器名称" v-model="timetableItem.mname"/>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="管理所ID：" label-position="left">
                <Input disabled v-model="timetableItem.mid"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <FormItem label="年份：" label-position="left">
                <Select
                  v-model="timetableItem.year"
                  placeholder="请选择年份"
                  :label-in-value="true"
                  clearable
                >
                  <Option
                    v-for="item in yearList "
                    :value="item.value"
                    :key="item.label"
                  >{{item.label}}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="text" size="default" @click="canceldeleteTimetable()">取消</Button>
          <Button type="primary" size="default" @click="confirmdeleteTimetable()">确认</Button>
        </div>
      </Modal>
    </Content>
  </div>
</template>
<script>
import echarts from "echarts";
import { parameterList } from "@/api/light_parameter";
export default {
  name: "device_parameter_options",
  components: {
    echarts
  },
  data() {
    return {
      //弹窗初始化
      deleteItemModal: false,
      timetableItem: {
        mid: "",
        year: "",
        mname: ""
      },
    yearList: [
        { value: "2019", label: "2019年" },
        { value: "2018", label: "2018年" },
        { value: "2017", label: "2017年" },
        { value: "2016", label: "2016年" },
        { value: "2015", label: "2015年" },
        { value: "2014", label: "2014年" },
        { value: "2013", label: "2013年" },
        { value: "2012", label: "2012年" },
        { value: "2011", label: "2011年" },
        { value: "2010", label: "2010年" },
        { value: "2009", label: "2009年" },
        { value: "2008", label: "2008年" },
        { value: "2007", label: "2007年" },
        { value: "2006", label: "2006年" },
        { value: "2005", label: "2005年" },
        { value: "2004", label: "2004年" },
        { value: "2003", label: "2003年" },
        { value: "2002", label: "2002年" },
        { value: "2001", label: "2001年" },
        { value: "2000", label: "2000年" },
        { value: "1999", label: "1999年" },
        { value: "1998", label: "1998年" },
        { value: "1997", label: "1997年" },
        { value: "1996", label: "1996年" },
        { value: "1995", label: "1995年" },
        { value: "1994", label: "1994年" },
        { value: "1993", label: "1993年" },
        { value: "1992", label: "1992年" },
        { value: "1991", label: "1991年" },
        { value: "1990", label: "1990年" },

      ],
      //选中的数据
      selectedItem: [],
      //表格表头
      parameterTableColumns: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "管理所名称",
          key: "mname"
        },
        {
          title: "年",
          width: 65,
          key: "year"
        },
        {
          title: "日",
          key: "day",
          width: 75,
          sortable: true
        },
        {
          title: "一月",
          width: 90,
          key: "january",
          sortable: true
        },
        {
          title: "二月",
          width: 90,
          key: "february",
          sortable: true
        },
        {
          title: "三月",
          width: 90,
          key: "march",
          sortable: true
        },
        {
          title: "四月",
          width: 90,
          key: "april",
          sortable: true
        },
        {
          title: "五月",
          width: 90,
          key: "may",
          sortable: true
        },
        {
          title: "六月",
          width: 90,
          key: "june",
          sortable: true
        },
        {
          title: "七月",
          width: 90,
          key: "july",
          sortable: true
        },
        {
          title: "八月",
          width: 90,
          key: "august",
          sortable: true
        },
        {
          title: "九月",
          width: 90,
          key: "september",
          sortable: true
        },
        {
          title: "十月",
          width: 90,
          key: "october",
          sortable: true
        },
        {
          title: "十一月",
          width: 110,
          key: "november",
          sortable: true
        },
        {
          title: "十二月",
          width: 110,
          key: "december",
          sortable: true
        },
        {
          title: "日出/日落",
          key: "sunriseSunset",
          width: 110
        }
      ],
      parameterData: []
    };
  },
  methods: {
    //选中数据
    selectItem(selection) {
      console.log(selection);
      this.selectedItem = selection;
    },
    //删除时间表确认和取消
    confirmdeleteTimetable() {
      this.deleteTimetable();
      this.$Message.info("已删除时间表");
    },
    canceldeleteTimetable() {
      this.$Message.error("已取消");
    },
    //检查编辑数据是否选中或选中多个
    checkEditItem() {
      if (this.selectedItem != "") {
        if (this.selectedItem.length > 1) {
          this.$Message.warning("请选择一条进行编辑");
        } else {
          //this.addConcentratorModal = true;
          //this.setConcentratorEdit(this.selectedItem[0]);
        }
      } else this.$Message.warning("请选择要编辑的数据");
    },
    /* ----------------------------------------------*/
    //获取表格数据
    getYearDataList() {
      let token = this.$store.state.user.token;
      parameterList({
        token: token,
        mid: 1,
        year: 2019
      })
        .then(res => {
          const data = res.data.result;
          this.parameterData = data;
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
        });
    },
    /* ----------------------------------------------*/

    initData() {
      this.getYearDataList();
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
</style>

<template>
  <div>
    <Row :gutter="20" style="margin-top: 5px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Row :gutter="20" style="margin-top: 5px;">
          <div style="height:100%;width:100%;text-align:left;">
            <div ref="basicMapbox" style="height:700px;width:100%;"></div>
            <!-- <pre id="info"></pre>-->
          </div>
        </Row>
      </i-col>

      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Collapse v-model="value2" accordion>
          <Panel name="1">
            实时数据
            <div slot="content">
              <Row :gutter="20" style="margin-top: 5px;">
                <i-col :md="24" :lg="24" style="margin-bottom: 5px;">
                  <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
                    <Select v-model="searchKey" class="search-col" style="width:30%">
                      <Option
                        v-for="item in searchchoose"
                        v-if="item.key !== 'handle'"
                        :value="item.key"
                        :key="`search-col-${item.key}`"
                      >{{ item.title }}</Option>
                    </Select>
                    <Input
                      id="searchinput1"
                      clearable
                      placeholder="输入关键字搜索"
                      class="search-input"
                      v-model="searchValue"
                      style="width:50%"
                    />
                    <Input
                      id="searchinput2"
                      clearable
                      placeholder="输入关键字搜索"
                      class="search-input"
                      v-model="searchValue"
                      style="width:50%;display:none"
                    />
                    <Button class="search-btn" type="primary" style="width:15%">
                      <Icon type="search"/>&nbsp;&nbsp;搜索
                    </Button>
                  </div>
                </i-col>
              </Row>

              <Row :gutter="20" style="margin-top: 5px;" editable searchable search-place="top">
                <div style="height:100%;width:100%;text-align:left;">
                  <i-col
                    :xs="24"
                    :md="12"
                    :lg="12"
                    v-for="(infor, i) in inforCardData"
                    :key="`infor-${i}`"
                    style="height: 100px;padding-bottom: 5px; "
                  >
                    <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="32">
                      <count-to :end="infor.count" count-class="count-style"/>
                      <p>{{ infor.title }}</p>
                    </infor-card>
                  </i-col>
                </div>
              </Row>

              <Row :gutter="20" style="margin-top: 5px;">
                <div style="height:100%;width:100%;text-align:left;">
                  <i-col :md="24" :lg="24" style="margin-bottom: 5px;">
                    <Card shadow>
                      <chart-pie style="height: 280px;" :value="pieData" text="车流量统计示图"></chart-pie>
                    </Card>
                  </i-col>
                </div>
              </Row>
            </div>
          </Panel>
          <Panel name="2">
            数据查找
            <div slot="content">
              <Row :gutter="20" style="margin-top: 5px;">
                <i-col :md="24" :lg="24" style="margin-bottom: 5px;">
                  <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
                    <Select v-model="searchKey" class="search-col" style="width:30%">
                      <Option
                        v-for="item in searchchoose"
                        v-if="item.key !== 'handle'"
                        :value="item.key"
                        :key="`search-col-${item.key}`"
                      >{{ item.title }}</Option>
                    </Select>
                    <Input
                      id="searchinput1"
                      clearable
                      placeholder="输入关键字搜索"
                      class="search-input"
                      v-model="searchValue"
                      style="width:50%"
                    />
                    <Input
                      id="searchinput2"
                      clearable
                      placeholder="输入关键字搜索"
                      class="search-input"
                      v-model="searchValue"
                      style="width:50%;display:none"
                    />
                    <Button class="search-btn" type="primary" style="width:15%">
                      <Icon type="search"/>&nbsp;&nbsp;搜索
                    </Button>
                  </div>
                </i-col>
              </Row>

              <Row :gutter="20" style="margin-top: 5px;" editable searchable search-place="top">
                <div style="height:100%;width:100%;text-align:left;">
                  <i-col
                    :xs="24"
                    :md="12"
                    :lg="12"
                    v-for="(infor, i) in inforCardData"
                    :key="`infor-${i}`"
                    style="height: 100px;padding-bottom: 5px; "
                  >
                    <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="32">
                      <count-to :end="infor.count" count-class="count-style"/>
                      <p>{{ infor.title }}</p>
                    </infor-card>
                  </i-col>
                </div>
              </Row>

              <Row :gutter="20" style="margin-top: 5px;">
                <div style="height:100%;width:100%;text-align:left;">
                  <i-col :md="24" :lg="24" style="margin-bottom: 5px;">
                    <Card shadow>
                      <chart-pie style="height: 280px;" :value="pieData" text="车流量统计示图"></chart-pie>
                    </Card>
                  </i-col>
                </div>
              </Row>
            </div>
          </Panel>
        </Collapse>

        <!-- <Row :gutter="20" style="margin-top: 5px;">
          <div style="height:100%;width:100%;text-align:left;">
            <i-col :md="24" :lg="24" style="margin-bottom: 5px;">
              <tables ref="tables" v-model="tableData1" :columns="columns1"/>
            </i-col>
          </div>
        </Row>

        <Row :gutter="20" style="margin-top: 5px;">
          <i-col :md="24" :lg="24" style="margin-bottom: 5px;">
            <tables ref="tables" v-model="tableData2" :columns="columns2" style="width:100%"/>
          </i-col>
        </Row>-->
      </i-col>
    </Row>
    <!-- <pre id='coordinates' class='coordinates'></pre> -->
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import Tables from "_c/tables";

import { ChartPie, ChartBar } from "_c/charts";

export default {
  name: "demo_map",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    Tables
  },
  props: {
    searchable: {
      type: Boolean,
      default: true
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: "top"
    }
  },
  data() {
    return {
      searchchoose: [
        { title: "区域名称", key: "area" },
        { title: "时间", key: "time" }
      ],
      columns1: [
        { title: "设备编号", key: "deviceNO" }, // sortable: true
        { title: "IP地址", key: "IPAddress" }, // editable: true
        { title: "安装地址", key: "Address" },
        { title: "检测方向", key: "Direction" },
        { title: "安装高度", key: "Height" },
        { title: "固件版本号", key: "Version" }
      ],
      tableData1: [
        {
          deviceNO: "1",
          IPAddress: "120.33.21.223",
          Address: "新葡京",
          Direction: "东南",
          Height: "10m",
          Version: "1.0"
        }
        // {'deviceNO':'','IPAddress':'1','Address':'1','Direction':'1','Height':'1','Version':'1'},
      ],
      columns2: [
        { title: "运行状态", key: "runningStatu" }, // sortable: true
        { title: "故障", key: "fault" }
      ],
      tableData2: [
        { runningStatu: "正常", fault: "无" }
        // {'deviceNO':'','IPAddress':'1','Address':'1','Direction':'1','Height':'1','Version':'1'},
      ],
      inforCardData: [
        {
          title: "车辆流量",
          icon: "md-person-add",
          count: 803,
          color: "#2d8cf0"
        },
        { title: "平均速度", icon: "md-locate", count: 232, color: "#19be6b" }
        // { title: '', icon: 'md-help-circle', count: 142, color: '#ff9900' }
        // { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        // { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        // { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: "大型车流量" },
        { value: 310, name: "中型车流量" },
        { value: 234, name: "中型车流量" },
        { value: 135, name: "机动车流量" },
        { value: 1548, name: "行人流量" }
      ],
      // tableData: [],
      searchValue: "",
      searchKey: "",

      // Collapse 折叠面板
      value2: "1"
    };
  },
  watch: {
    columns(searchchoose) {
      this.handleColumns(searchchooses);
      this.setDefaultSearchKey();
    },
    value(val) {
      this.handleTableData();
      if (this.searchable) this.handleSearch();
    }
  },
  mounted() {
    this.init();
    // this.handleColumns(this.searchchoose);
    // this.setDefaultSearchKey();
    // this.handleTableData();
  },
  methods: {
    // 初始化
    init() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiMjAxMGppbmciLCJhIjoiY2pyN3hwcWhiMDBrMjQzcGc1NndsaW1tbCJ9.BQoRib1rflv656nIy_5IEQ";
      // var coordinates = document.getElementById("coordinates");
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        // style: "mapbox://styles/mapbox/dark-v9",
        // style: "mapbox://styles/mapbox/dark-v9",
        style: "mapbox://styles/mapbox/navigation-preview-night-v2",
        // style: "mapbox://styles/mapbox/light-v9",
        center: [113.51552328392535, 22.352760037751793], // 设置地图中心
        zoom: 16 // 设置地图比例
      });

      // 使用定位模块
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserLocation: true,
          zoom: 14
        })
      );

      // 建立一个标记点
      var marker = new mapboxgl.Marker({
        draggable: true
      });
      function onDragEnd() {
        var lngLat = marker.getLngLat();
        coordinates.style.display = "block";
        coordinates.innerHTML =
          "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
      }
      marker.on("dragend", onDragEnd);

      // 点击获取经纬度模块&点击标记点
      map.on("click", function(e) {
        document.getElementById("info").innerHTML =
          JSON.stringify(e.point) + "<br />" + JSON.stringify(e.lngLat);
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
      });
      // map.addControl(
      //   new mapboxgl.MapboxGeocoder({
      //     accessToken: mapboxgl.accessToken
      //   })
      // );
    },

    suportEdit(item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            input: val => {
              this.edittingText = val;
            },
            "on-start-edit": params => {
              this.edittingCellId = `editting-${params.index}-${
                params.column.key
              }`;
              this.$emit("on-start-edit", params);
            },
            "on-cancel-edit": params => {
              this.edittingCellId = "";
              this.$emit("on-cancel-edit", params);
            },
            "on-save-edit": params => {
              this.value[params.row.initRowIndex][
                params.column.key
              ] = this.edittingText;
              this.$emit("input", this.value);
              this.$emit(
                "on-save-edit",
                Object.assign(params, { value: this.edittingText })
              );
              this.edittingCellId = "";
            }
          }
        });
      };
      return item;
    },
    surportHandle(item) {
      let options = item.options || [];
      let insideBtns = [];
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item]);
      });
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns;
      item.render = (h, params) => {
        params.tableData = this.value;
        return h("div", btns.map(item => item(h, params, this)));
      };
      return item;
    },
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item;
        if (res.editable) res = this.suportEdit(res, index);
        if (res.key === "handle") res = this.surportHandle(res);
        return res;
      });
    },
    setDefaultSearchKey() {
      this.searchKey =
        this.columns[0].key !== "handle"
          ? this.columns[0].key
          : this.columns.length > 1
          ? this.columns[1].key
          : "";
    },
    handleClear(e) {
      if (e.target.value === "") this.insideTableData = this.value;
    },
    handleSearch() {
      this.insideTableData = this.value.filter(
        item => item[this.searchKey].indexOf(this.searchValue) > -1
      );
    },
    handleTableData() {
      this.insideTableData = this.value.map((item, index) => {
        let res = item;
        res.initRowIndex = index;
        return res;
      });
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params);
    },
    clearCurrentRow() {
      this.$refs.talbesMain.clearCurrentRow();
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("on-current-change", currentRow, oldCurrentRow);
    },
    onSelect(selection, row) {
      this.$emit("on-select", selection, row);
    },
    onSelectCancel(selection, row) {
      this.$emit("on-select-cancel", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    onFilterChange(row) {
      this.$emit("on-filter-change", row);
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status);
    }
  },
  computed: {}
};
</script>
<style scope>
/* @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css"); */
/* @import url("http://39.108.249.215:8688/styles/tjf6crw9i/style.json"); */

.coordinates {
  /* background: rgba(0, 0, 0, 0.5); */
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
</style>

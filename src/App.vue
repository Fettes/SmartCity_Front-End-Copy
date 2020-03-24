<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      notificationSystem: {
        options: {
          show: {
            theme: "dark",
            icon: "icon-person",
            position: "topCenter",
            progressBarColor: "rgb(0, 255, 184)",
            buttons: [
              [
                "<button>Ok</button>",
                function(instance, toast) {
                  alert("Hello world!");
                },
                true
              ],
              [
                "<button>Close</button>",
                function(instance, toast) {
                  instance.hide(
                    {
                      transitionOut: "fadeOutUp",
                      onClosing: function(instance, toast, closedBy) {
                        console.info("closedBy: " + closedBy);
                      }
                    },
                    toast,
                    "buttonName"
                  );
                }
              ]
            ],
            onOpening: function(instance, toast) {
              console.info("callback abriu!");
            },
            onClosing: function(instance, toast, closedBy) {
              console.info("closedBy: " + closedBy);
            }
          },
          ballon: {
            balloon: true,
            position: "bottomCenter"
          },
          info: {
            position: "bottomLeft"
          },
          success: {
            position: "bottomRight"
          },
          warning: {
            position: "topLeft"
          },
          error: {
            position: "topRight"
          },
          question: {
            timeout: 20000,
            close: false,
            overlay: true,
            toastOnce: true,
            id: "question",
            zindex: 999,
            position: "center",
            buttons: [
              [
                "<button><b>YES</b></button>",
                function(instance, toast) {
                  instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                },
                true
              ],
              [
                "<button>NO</button>",
                function(instance, toast) {
                  instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                }
              ]
            ],
            onClosing: function(instance, toast, closedBy) {
              console.info("Closing | closedBy: " + closedBy);
            },
            onClosed: function(instance, toast, closedBy) {
              console.info("Closed | closedBy: " + closedBy);
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
//地图修正
//引入mapbox css
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
// @import url("http://39.108.249.215:8688/styles/tjf6crw9i/style.json");

//去水印
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-bottom-left {
  display: none;
}
.mapboxgl-popup-content {
  word-wrap:break-word;
  width: 200px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.markerCon {
  background-image: url('../src/assets/images/device/concentrator.png');
  background-size: cover;
  width: 40px;
  height: 40px;
  border-radius: 0%;
  cursor: pointer;
}
.markerLight {
  background-image: url('../src/assets/images/device/light.png');
  background-size: cover;
  width: 30px;
  height: 30px;
  border-radius: 0%;
  cursor: pointer;
}
/* --------------------------------- */
//全局背景大小
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-layout {
  background: transparent !important;
}

//左侧导航栏透明度设置
.ivu-layout-sider::before {
  opacity: 0.5;
  position: absolute;
  z-index: -1;
}
//左侧导航栏背景设置
.ivu-layout-sider {
  // background-image: url(../src/assets/images/main-background-left.png) !important;
  // background-size: 100% 93% !important;
  background-color: #3e3e3e !important;
}
//导航栏展开颜色，边框
.ivu-menu {
  // background-color: rgb(25, 75, 108) !important;
  // border-color: #39e9e9;
  // border-width: 1px;
  // border-style: solid;
  border-left: none;
  border-right: none;
  font-size: 11pt !important;
  color: #fff !important;
}
//导航栏展开颜色修正
.ivu-menu-dark {
  //background-color: rgba(21, 37, 62, 0.56) !important;
  background-color: #3e3e3e !important;
  border: none;
}
.ivu-menu-light {
  //background-color: rgba(21, 37, 62, 0.56) !important;
  background-color: #3e3e3e !important;
  border: none;
}
//导航栏字体
.ivu-menu-item {
  font-size: 11pt !important;
  color: #fff;
}
//导航栏默认背景颜色
.ivu-layout.ivu-layout-has-sider {
  background-color: #0f1a2e;
  //background-color: #3e3e3e;
}
//选中item颜色变换
.ivu-menu-item-selected {
  background-color: #111010 !important;
}
//中部背景设置
.content-wrapper {
  //background-color: #0f1a2e;
  background-color: rgba(245, 247, 249, 1);
  //background-image: url(../src/assets/images/main-background-right.png) !important;
  background-repeat: no-repeat;
  background-size: 100% 100% !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
// //上传框底色变色
// .ivu-upload-drag {
//   background-color: rgba(19, 69, 106, 1) !important;
//   p {
//     color: white !important;
//   }
// }
//Card默认背景取消
.ivu-card {
  background: none !important;
}
//全局card阴影加重
.ivu-card:hover {
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.4) !important;
  -webkit-box-shadow: 0 6px 9px rgba(0, 0, 0, 0.4) !important;
}

// .ivu-picker-confirm-time {
//   color: white !important;
// }

.mission-modal{
  .ivu-modal-body{
    background-color: rgba(245, 247, 249, 1);
    border-radius: 10px 10px 10px 10px;
  }
}
/* --------------------------------- */
//全局抽屉样式
// .ivu-drawer-header {
//   background-image: url("../src/assets/images/background/Drawer_Header.png");
//   background-color: #002546;
//   background-size: 100% 100%;
//   border-bottom: none;
//   height: 60px;

//   .ivu-drawer-header-inner {
//     margin-top: 5px;
//     font-weight: normal;
//     font-size: 20px !important;
//     color: white;
//   }
// }
// .ivu-drawer-body {
//   background-image: url("../src/assets/images/background/Drawer_Body.png");
//   background-color: #002546;
//   background-repeat: no-repeat;
//   background-size: 100% 100%;
//   border-top: none;
//   padding: 0px;
// }
// .ivu-drawer-wrap {
//   .ivu-picker-panel-body {
//     background-color: #13456a;
//   }
//   .ivu-time-picker-cells-list ul li {
//     color: white;
//   }
//   .ivu-input {
//     background-color: #13456a;
//     border: 1px solid #13456a;
//     color: white;
//   }
//   // //日期，时间选择器标题白色
//   // .ivu-date-picker-header {
//   //   color: white;
//   // }
//   // .ivu-time-picker-header {
//   //   color: white;
//   // }
//   // .ivu-date-picker-cells span {
//   //   color: #919191;
//   // }
// }
//上传列表颜色样式
.ivu-upload-list-file {
  color: #fff !important;
  padding: 2px;
  background-color: #274886;
  .ivu-icon-ios-document-outline {
    color: #fff;
  }
}
.ivu-table .highlight-cell {
  background-color: red !important;
  color: #fff;
}
/* --------------------------------- */
//全局弹窗样式

/* --------------------------------- */
//全局表格样式设置
.ivu-card-body {
  padding: 0px;
  margin: 0pt;
  p,
  li {
    color: black;
  }
  .ivu-table-wrapper {
    border: none;
  }
  //表格高度，padding距离
  .device_table {
    padding: 1px;
    height: 608px;
  }
  //广播页table
  .mission_table {
    padding: 1px;
    .ivu-table {
      color: white;
      th {
        text-align: center;
        font-size: 14px;
        height: 40px;
      }
      td {
        text-align: center;
        height: 37px;
      }
    }
  }
  //广播页时间刻度table
  .percentage_table {
    width: 100%;
    padding: 1px;
    //表格边框
    .ivu-table .cell-highlight {
      background-color: #2db7f5 !important;
      color: #fff;
    }
    .ivu-table-cell {
      padding-left: 0px !important;
    }
    .ivu-table {
      td {
        text-align: center;
        height: 20px;
        color: black;
        background-color: transparent !important;
      }
    }
    .ivu-table-body {
      border: 1px solid black;
    }
  }
  //全局表格背景，头部背景
  .ivu-table {
    background-color: transparent;
    th {
      background-color: transparent;
      font-size: 18px;
      color: #0f8ad0;
      height: 52px;
      border: none;
    }
    td {
      background-color: transparent;
      color: black;
    }
  }
  //暂无数据时底部横线
  .ivu-table th,
  .ivu-table td {
    border-bottom: 0px;
  }
  //表格边框设置
  .ivu-table-body {
    td {
      border: 0;
    }
  }
  //表格cell padding取消
  .ivu-table-cell {
    padding-right: 0px;
    padding-left: 5px;
  }
  //表格边框
  .ivu-table-wrapper {
    border: none;
  }
  .ivu-table:before {
    width: 0px;
  }
  .ivu-table:after {
    height: 0px;
  }
  // //时间选择器颜色
  // .ivu-picker-panel-body {
  //   background-color: #13456a;
  // }
  // .ivu-time-picker-cells-list ul li {
  //   color: white;
  // }
  // .ivu-input {
  //   background-color: #13456a;
  //   border: 1px solid #13456a;
  //   color: white;
  // }
  // //日期，时间选择器标题白色
  // .ivu-date-picker-header {
  //   color: white;
  // }
  // .ivu-time-picker-header {
  //   color: white;
  // }
  // .ivu-date-picker-cells span {
  //   color: #919191;
  // }
}
//偶数行样式
.ivu-table-stripe-even td {
  background-color: #b4daef !important;
}
//奇数行样式
.ivu-table-stripe-odd td {
  background-color: transparent !important;
}
//高亮行样式
.ivu-table-row-highlight td,
.ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td,
.ivu-table-stripe
  .ivu-table-fixed-body
  tr.ivu-table-row-highlight:nth-child(2n)
  td,
tr.ivu-table-row-highlight.ivu-table-row-hover td {
  background-color: #1f85de !important;
}

// tr.ivu-table-row-highlight td{
//   color:white !important;
// };

.theimage {
  padding: 0px !important;
}
/* ----------------------------------------- */
//Tree样式
.treeCard {
  position: fixed !important;
  width: 17%;
  z-index: 1;
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
    p {
      height: 40px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    height: 757px;
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
  .ivu-tree ul li {
    margin: 0 0;
    padding-top: 8px;
    padding-left: 2px;
  }
  .ivu-tree {
    margin-left: 15px;
  }
}
/* ----------------------------------------- */
//左边Card头部，内容样式 //左侧Card 4月1号更新版
.paddingCardLeftUpdate {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
    p {
      height: 52px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    height: 757px;
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}
/* ----------------------------------------- */
//中间Card头部，内容样式 //中间Card 4月1号更新版
.paddingCardMiddleUpdate {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
    p {
      height: 52px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}
/* -------------------------------------- */
//右上Card头部，内容样式 //右上Card 4月1号更新版
.paddingCardRightTopUpdate {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
    p {
      height: 45px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}
/* -------------------------------------- */
//右中下Card头部，内容样式 //右中下Card 4月1号更新版
.paddingCardRightMiddleUpdate {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
    p {
      height: 52px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}
/* --------------------------------- */
//右左部Card头部，内容样式 //右左部Card 4月1号更新版
.paddingCardRightLeftUpdate {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
    p {
      height: 45px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
    overflow-y: scroll;
  }
  .ivu-card-body::-webkit-scrollbar {
    width: 6px; /*滚动条宽度*/
    height: 5px; /*滚动条高度*/
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .ivu-card-body::-webkit-scrollbar-track {
    border-radius: 2.5px; /*滚动条的背景区域的圆角*/
    //background-color: #e6e6e6;/*滚动条的背景颜色*/
  }
  .ivu-card-body::-webkit-scrollbar-thumb {
    border-radius: 2.5px !important; /*滚动条的圆角*/
    background-color: #57c2ff !important; /*滚动条的背景颜色*/
  }
}
/* -------------------------------------- */
//底部Card头部，内容样式 //底部Card 4月1号更新版
.paddingCardBottomUpdate {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 10px;
    p {
      height: 52px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}
/* -------------------------------------- */
//左侧树样式
.leftList {
  .ivu-tree {
    height: 608px;
  }
  .ivu-tree ul li {
    margin: 0 0;
    font-size: 10pt;
    line-height: 30px;
    color: black;
  }
  .ivu-tree-title {
    //color: #fff;
    color: black;
    height: 27px;
  }
  .ivu-tree-title:hover {
    color: #df901a !important;
  }
  .ivu-tree-title-selected {
    color: black !important;
    height: 27px;
  }
  .ivu-tree-title-selected:hover {
    color: #df901a !important;
  }

  .ivu-card-head {
    // background-image: url("../src/assets/images/background/List_Header.png");
    // background-size: 100% 100%;
    // -moz-background-size: 100% 100%;
    // border-bottom: none;
    // 4/1
    border: 1px solid black;
    border-radius: 10px 10px 0 0;
    p {
      margin-top: 6px;
      height: 52px;
      //color: white;
      font-size: 20px;
      font-weight: normal;
      margin-left: 10px;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 60px;
  }
  .ivu-card-body {
    // background-image: url("../src/assets/images/background/List_Body.png");
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    padding: 0px;
    overflow-y: scroll;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid black;
    border-top: none;
  }
}
/* ======================= */
//4月1号后更新版 左侧样式
.leftListUpdate {
  .ivu-tree {
    height: 608px;
  }
  .ivu-tree ul li {
    margin: 0 0;
    font-size: 10pt;
    line-height: 30px;
    color: black;
  }
  .ivu-tree-title {
    color: black;
    height: 27px;
  }
  .ivu-tree-title:hover {
    color: #df901a !important;
  }
  .ivu-tree-title-selected {
    color: black !important;
    height: 27px;
  }
  .ivu-tree-title-selected:hover {
    color: #df901a !important;
  }
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid black;
    border-radius: 10px 10px 0 0;
    p {
      margin-top: 6px;
      height: 52px;
      font-size: 20px;
      font-weight: normal;
      margin-left: 10px;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 60px;
  }
  .ivu-card-body {
    padding: 0px;
    overflow-y: scroll;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid black;
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
  .ivu-card-body::-webkit-scrollbar {
    width: 6px; /*滚动条宽度*/
    height: 5px; /*滚动条高度*/
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .ivu-card-body::-webkit-scrollbar-track {
    border-radius: 2.5px; /*滚动条的背景区域的圆角*/
    //background-color: #e6e6e6;/*滚动条的背景颜色*/
  }
  .ivu-card-body::-webkit-scrollbar-thumb {
    border-radius: 2.5px !important; /*滚动条的圆角*/
    background-color: #57c2ff !important; /*滚动条的背景颜色*/
  }
}

/* --------------------------------- */
//资产管理界面样式
.ivu-card-body .right-area .content-outer .count-style1 {
  color: #119ae5;
}
.ivu-card-body .right-area .content-outer .count-style2 {
  color: #15a55d;
}
.ivu-card-body .right-area .content-outer .count-style3 {
  color: #df901a;
}
.PropertyTab {
  .ivu-tabs-bar {
    color: black;
    border-bottom: none !important;
  }
  .ivu-tabs-tab {
    font-size: 16px;
  }
  .ivu-tabs-ink-bar {
    background-color: transparent !important;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    margin-left: 22px;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: white !important;
    background-color: #119ae5;
    margin-top: 15px;
  }

  .ivu-tabs-tabpane {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 10px 10px;
  }

  //border: 1px solid #119ae5;
  //时间选择器颜色
  .ivu-time-picker-cells-cell:hover {
    background-color: rgba(17, 153, 229, 1) !important;
  }
  .ivu-picker-confirm-time {
    color: white !important;
  }
  .ivu-time-picker-cells-cell-selected,
  .ivu-time-picker-cells-cell-selected:hover {
    background-color: rgba(17, 153, 229, 1) !important;
  }
  .ivu-table-wrapper {
    border-color: rgba(62, 62, 62, 0.36);
  }

  .ivu-table:before {
    border: 0.5px solid rgba(62, 62, 62, 0.36);
  }
  .ivu-table:after {
    border: 0.5px solid rgba(62, 62, 62, 0.36);
  }
  .ivu-icon-md-arrow-dropup {
    color: white !important;
  }
  .ivu-icon-md-arrow-dropdown {
    color: white !important;
  }
}
.ivu-icon-md-menu:before {
  color: #3e3e3e;
}
.propertyTable {
  //悬浮高亮
  tr.ivu-table-row-hover td {
    background-color: rgba(178, 219, 240, 1) !important;
  }
  .ivu-table {
    .ivu-table-wrapper {
      border-color: #119ae5 !important;
    }
    background-color: transparent !important;
    color: white;
    th {
      background-color: #119ae5 !important;
      border-bottom-color: rgba(62, 62, 62, 0.36) !important;
      border-color: white;
      font-size: 15px;
      font-weight: normal;
      text-align: center;
      height: 53px;
      color: white;
    }
    td {
      background-color: transparent !important;
      border-color: rgba(62, 62, 62, 0.36);
      font-size: 12px;
      text-align: center;
      height: 52px;
      color: black;
    }
  }
}
/* --------------------------------- */
//用户管理界面样式
.user-table-row {
  .ivu-table-wrapper {
    border-color: rgba(62, 62, 62, 0.36);
  }
  .ivu-table:before {
    border: 0.5px solid rgba(62, 62, 62, 0.36);
  }
  .ivu-table:after {
    border: 0.5px solid rgba(62, 62, 62, 0.36);
  }
}
.userTable {
  //悬浮高亮
  tr.ivu-table-row-hover td {
    background-color: rgba(178, 219, 240, 1) !important;
  }
  tr.ivu-table-row-highlight td {
    background-color: rgba(178, 219, 240, 1) !important;
  }
  .ivu-table {
    .ivu-table-wrapper {
      border-color: #119ae5 !important;
    }
    background-color: transparent !important;
    th {
      background-color: #119ae5 !important;
      border-bottom-color: rgba(62, 62, 62, 0.36) !important;
      border-color: white;
      font-size: 15px;
      font-weight: normal;
      text-align: center;
      height: 53px;
      color: white;
    }
    td {
      background-color: white;
      border-color: rgba(62, 62, 62, 0.36);
      font-size: 12px;
      text-align: center;
      height: 52px;
      color: black;
    }
  }
}
//用户管理 搜索选择框
.userSelection {
  .ivu-select-item:hover {
    background-color: #119ae5;
  }
  .ivu-select-selection {
    border: 1px solid transparent;
    text-align: center;
  }
  .ivu-select-selected-value {
    font-size: 16px !important;
  }
}
/* --------------------------------------------------- */
//广播页面内部card样式修正
.device_broadcast {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
//广播页抽屉padding
.drawerBroadcast {
  .ivu-drawer-content{
    // border-radius: 10px 0px 0px 10px;
  }
  .drag-drawer-wrapper .drag-drawer-body-wrapper {
    padding: 0px !important;
  }
  .device_table {
    padding: 0px;
  }
  .device_table td{
    background-color: #b4daef !important;
    border:0.5px solid #e8eaec;
  }
  .device_table th{
    background-color: #b4daef;
    border:0.5px solid #e8eaec;
  }
  .mission_table {
    padding: 0px;
  }
  .mission_table th {
    color: white;
    background-color: rgba(17, 153, 229, 1);
    height: 35px;
    border: 0px;
    text-align: center;
  }
  .mission_table .ivu-table {
    td {
      background-color: transparent;
      border-bottom: transparent;
    }
    //padding:5px;
    background-color: transparent;
  }
  .mission_table .ivu-table-body {
    td {
      border: 0;
      color: black;
      text-align: center;
      height: 35px;
    }
  }
  .ivu-form-item {
    margin-bottom:0px;
  }
  .ivu-form .ivu-form-item-label {
    font-size:15px;
    padding: 10px 0px 10px 0px;
  }
  //checkbox 去底色
  // .ivu-checkbox-inner {
  //   background-color: transparent;
  // }
  //表格边框
  .ivu-table-wrapper {
    border: none;
  }
  .ivu-table:before {
    width: 0px;
  }
  .ivu-table:after {
    height: 0px;
  }
}
/* --------------------------------------------------- */
//微基站页面内部card样式修正
.device_microbase {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
/* --------------------------------------------------- */
//监控页面内部card样式修正
.camera {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
/* --------------------------------------------------- */
//人流车流页面内部card样式修正
.pfm {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
.vfm {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
/* --------------------------------------------------- */
//无线页面内部card样式修正
.wifi_ap {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
/* -------------------------------------- */
//LED, LCD 抽屉样式
//抽屉 title 格式
.subpageDrawer .ivu-drawer-header {
  background: #09101d;
  height: 60px;
  background-image: url("../src/assets/images/background/Subpage_Drawer_Header.png");
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  border-bottom: none;
}
//drawer title 头部内容格式
.subpageDrawer .ivu-drawer-header-inner {
  color: #fff;
  text-align: left;
  margin-top: 5px;
  font-size: 20px;
  font-weight: normal;
}
//抽屉body样式
.subpageDrawer .ivu-drawer-body {
  background-image: url("../src/assets/images/background/Subpage_Drawer_Body.png");
  background-color: #002546;
  background-repeat: no-repeat;
  background-size: 100% 98%;
  border-top: none;
  padding-top: 5px;
}
//drawer 内部标题样式
.subpageDrawer .ivu-form .ivu-form-item-label {
  font-size: 12pt;
  color: #fff;
}
//内容距离修正
.subpageDrawer .ivu-form-item {
  margin-bottom: 8px;
  margin-top: 0px;
}
//日期选择器位置修正
.subpageDrawer .datepicker .ivu-date-picker .ivu-select-dropdown {
  transform-origin: center bottom;
  top: -262px;
  left: 0px !important;
}
.subpageDrawer .listcard {
  .ivu-card-body {
    margin-top: 2px;
    padding: 0;
    padding-left: 5px;
    height: 90px;
  }
  li {
    color: #119ae5 !important;
  }
}
//drawer footer格式
.subpageDrawer .ivu-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 16px;
  background-repeat: no-repeat;
  background-size: 100% 80%;
  text-align: right;
  background-image: url("../src/assets/images/background/Subpage_Drawer_Footer.png");
}
//led modal 样式
.ledmodal .ivu-modal-content {
  background-color: transparent !important;
  .ivu-modal-header {
    background-image: url("../src/assets/images/background/Subpage_Drawer_Header.png");
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    border-bottom: none;
  }
  .ivu-modal-body {
    background-image: url("../src/assets/images/background/Subpage_Drawer_Body.png");
    background-size: 100% 110%;
    -moz-background-size: 100% 100%;
    border-bottom: none;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    p {
      color: white;
    }
  }
  .ivu-modal-footer {
    background-image: url("../src/assets/images/background/Subpage_Drawer_Footer.png");
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    border-top: none;
    span {
      color: #fff;
    }
  }
}
.ledmodal .ivu-table-wrapper {
  border: none !important;
}
.ledmodal .history_table {
  .ivu-table {
    color: white;
    background-color: transparent;
    th {
      color: #119ae5;
      background-color: transparent;
      text-align: center;
      font-size: 15px;
      height: 30px;
      border: none;
    }
    td {
      background-color: transparent;
      text-align: center;
      height: 37px;
      border-color: rgba(17, 153, 229, 1);
    }
  }
  .ivu-table:before {
    width: 0px;
  }
  .ivu-table:after {
    height: 0px;
  }
}
.subpageEditDrawer .ivu-drawer-header {
  background: #09101d;
  height: 60px;
  background-image: url("../src/assets/images/background/Subpage_Drawer_Header.png");
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  border-bottom: none;
}
//drawer title 头部内容格式
.subpageEditDrawer .ivu-drawer-header-inner {
  color: #fff;
  text-align: left;
  margin-top: 5px;
  font-size: 20px;
  font-weight: normal;
}
//抽屉body样式
.subpageEditDrawer .ivu-drawer-body {
  background-image: url("../src/assets/images/background/Subpage_Drawer_Body.png");
  background-color: #002546;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-top: none;
  //padding: 0px;
}
.subpageEditDrawer .ivu-drawer-content {
  height: 90%;
}
//drawer footer格式
.subpageEditDrawer .ivu-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 16px;
  text-align: right;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../src/assets/images/background/Subpage_Drawer_Footer.png");
}
//drawer 内部标题样式
.subpageEditDrawer .ivu-form .ivu-form-item-label {
  font-size: 12pt;
  color: #fff;
}
//内容距离修正
.subpageEditDrawer .ivu-form-item {
  margin-bottom: 8px;
  margin-top: 0px;
}
.ivu-table-expanded-cell {
  padding-top: 5px !important;
  padding-left: 15px !important;
}
//日期选择器位置修正
.subpageEditDrawer .datepicker .ivu-date-picker .ivu-select-dropdown {
  left: 0px !important;
}

/* -------------------------------------- */
//路灯界面表格样式
.lightDrawer .drag-drawer-wrapper .drag-drawer-body-wrapper {
  padding-top: 8px !important;
}
//表格边框显示
.lighttable {
  margin-left: 16px;
  border-collapse: collapse !important;
  .smallswitch.ivu-switch-checked:after {
    left: 55px !important;
  }
  .smallswitch .ivu-switch-inner {
    left: 23px;
  }
  .largeswitch.ivu-switch-checked:after {
    left: 75px !important;
  }
  .largeswitch .ivu-switch-inner {
    left: 23px;
  }
  .lightSelection .ivu-select-dropdown {
    min-width: 160px !important;
  }
}
.lighttable th {
  padding: 12px;
}
.lighttable td {
  text-align: center;
  vertical-align: middle;
}

//状态1时字体颜色
.lightDrawer .ivu-switch .ivu-switch-inner span {
  color: black;
}
//状态2时字体颜色
.lightDrawer .ivu-switch-checked .ivu-switch-inner span {
  color: #fff;
}

//drawer footer格式
.lightDrawer .ivu-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 16px;
  text-align: right;
  background-image: url("../src/assets/images/background/Subpage_Drawer_Footer.png");
}
//报警样式修正
.light_alert {
  height: 322px;
  padding-top: 15px;
  padding-left: 10px;
  overflow-y: auto;
  color: #fff;
}
.light_alert::-webkit-scrollbar {
  width: 6px; /*滚动条宽度*/
  height: 5px; /*滚动条高度*/
}
/*定义滚动条轨道 内阴影+圆角*/
.light_alert::-webkit-scrollbar-track {
  border-radius: 2.5px; /*滚动条的背景区域的圆角*/
  //background-color: #e6e6e6;/*滚动条的背景颜色*/
}
.light_alert::-webkit-scrollbar-thumb {
  border-radius: 2.5px !important; /*滚动条的圆角*/
  background-color: #57c2ff !important; /*滚动条的背景颜色*/
}
.smallTitle1 {
  width: 30px;
  height: 130px;
  color: #119ae5 !important;
  font-size: 16px;
  font-weight: bold;
  font-family: "Helvetica Neue", "PingFang SC", sans-serif;
  border-right: 1px solid;
  border-image: -webkit-linear-gradient(white, #119ae5, white) 1 30 1;
  border-image: -moz-linear-gradient(white, #119ae5, white) 1 30 1;
  border-image: linear-gradient(white, #119ae5, white) 1 60 1;
  margin-left: 20px;
  margin-top: 10px;
  padding-right: 5px;
  padding-top: 20px;
}
.smallTitle2 {
  width: 30px;
  height: 80px;
  color: #119ae5 !important;
  font-size: 16px;
  font-weight: bold;
  font-family: "Helvetica Neue", "PingFang SC", sans-serif;
  border-right: 1px solid;
  border-image: -webkit-linear-gradient(white, #119ae5, white) 1 30 1;
  border-image: -moz-linear-gradient(white, #119ae5, white) 1 30 1;
  border-image: linear-gradient(white, #119ae5, white) 1 60 1;
  margin-left: 20px;
  margin-top: 10px;
  padding-right: 5px;
  padding-top: 10px;
}
/* ------------------------------------------------------------ */
//路灯设备管理样式
//tab样式修订
.device_light_manage {
  .ivu-tabs-bar {
    margin-bottom: 6px;
  }
  .ivu-tabs-tab {
    font-size: 16px;
  }
  .ivu-table-cell {
    padding-left: 9px;
    padding-right: 9px;
    word-break: normal;
  }
}
.adding_Concentrator {
  .ivu-modal {
    top: 70px;
  }
  .ivu-modal-body {
    padding-left: 0px;
  }
  .ivu-modal-header-inner {
    font-size: 18px;
    text-align: center;
  }
  .ivu-form .ivu-form-item-label {
    padding: 10px 0 0 16px;
    font-size: 14px;
    text-align: left;
  }
}
.chart_modal{
  .ivu-modal {
    top: 70px;
  }
  .ivu-modal-body {
    padding-left: 0px;
  }
  .ivu-modal-header-inner {
    font-size: 18px;
    text-align: center;
  }
  .ivu-form .ivu-form-item-label {
    padding: 10px 0 0 16px;
    font-size: 14px;
    text-align: left;
  }
  .ivu-modal-footer{
    display:none;
  }
}

/* -------------------------------------- */
//环境界面部分样式
//小card样式
.device_envir {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
.normalCard {
  height: 60px;
  width: 95px;
  .ivu-card-head {
    border-radius: 5px 5px 0 0;
    background-color: #15a55d;
    border: 1px solid #15a55d;
    background-image: none;
    height: 25px;
    font-size: 13pt;
    color: #fff;
    padding: 5px !important;
    text-align: center;
  }
  .ivu-card-body {
    border: 1px solid #15a55d;
    width: 95px;
    height: 35px;
    font-size: 13pt;
    display: table-cell;
    color: black;
    text-align: center;
    vertical-align: middle;
  }
}
iframe {
  border: 0px;
}
//黄色card样式
.warnCard {
  height: 60px;
  width: 95px;
  .ivu-card-head {
    border-radius: 5px 5px 0 0;
    background-color: #e08f1c;
    border: 1px solid #e08f1c;
    height: 25px;
    font-size: 13pt;
    color: #fff;
    padding: 5px !important;
    text-align: center;
  }
  .ivu-card-body {
    border: 1px solid #e08f1c;
    width: 95px;
    height: 35px;
    font-size: 13pt;
    display: table-cell;
    color: black;
    text-align: center;
    vertical-align: middle;
  }
}
//红色card样式
.errorCard {
  height: 60px;
  width: 95px;
  .ivu-card-head {
    border-radius: 5px 5px 0 0;
    border: 1px solid #dc4115;
    background-color: #dc4115;
    background-image: none;
    height: 25px;
    font-size: 13pt;
    color: #fff;
    padding: 5px !important;
    text-align: center;
  }
  .ivu-card-body {
    border: 1px solid #dc4115;
    width: 95px;
    height: 35px;
    font-size: 13pt;
    display: table-cell;
    color: black;
    text-align: center;
    vertical-align: middle;
    background-image: none;
  }
}
//drawer hearder样式
.EnvirDrawer .ivu-drawer-header {
  background: #09101d;
  height: 60px;
  background-image: url("../src/assets/images/background/Subpage_Drawer_Header.png");
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  border-bottom: none;
}
//drawer 内部标题样式
.EnvirDrawer .ivu-form .ivu-form-item-label {
  font-size: 12pt;
  color: #fff;
}
//drawer高度样式
.EnvirDrawer .ivu-drawer-content {
  height: 80%;
}
//抽屉body样式
.EnvirDrawer .ivu-drawer-body {
  background-image: url("../src/assets/images/background/Subpage_Drawer_Body.png");
  background-color: #002546;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-top: none;
  padding: 0px;
}
//drawer footer格式
.EnvirDrawer .ivu-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  text-align: right;
  background-image: url("../src/assets/images/background/Subpage_Drawer_Footer.png");
}
/* ------------------------------------------ */
//统计数据分析样式
//大图表
.envir_dataAnalysis {
  .ivu-card-bordered {
    border: none !important;
  }
  .ivu-card {
    border-radius: 10px 10px 5px 5px;
  }
}
.analysis_big_chart {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 0px;
    p {
      height: 40px;
      font-size: 18px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    height: 420px;
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}
.analysis_big_chart_with_picker {
  .ivu-card-head {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 10px 10px 0 0;
    padding-top: 0px;
    p {
      height: 40px;
      font-weight: normal;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
    }
    height: 40px;
  }
  .ivu-card-body {
    height: 362px;
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(225, 225, 225, 1);
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}
</style>

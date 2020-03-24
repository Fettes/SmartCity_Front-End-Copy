<template>
  <div class="header-bar">
    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
<style scope>
.ivu-icon-md-menu{
  font-size:25px !important;
 
}
.sider-trigger-a{
  color:white;
}
.header-con,
 .tag-nav-wrapper {
   background: white !important;
   border:none;
  /* border-bottom: 2px solid rgb(173, 168, 168); */
 }
 .custom-bread-crumb .ivu-breadcrumb-item-link,
 .header-bar {
   color: black !important;

 }
 .ivu-breadcrumb{
   font-size:15px !important;
 }
 .ivu-breadcrumb > span:last-child{
   font-weight:normal !important;
 }
</style>
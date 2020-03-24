<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
   <div class="login-con">
      <!-- <img src="../../assets/images/logo.png" class="imgs" style="text-align:center"> -->
      <Card icon="log-in" title="智慧街灯综合管理系统" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import menuTree from "@/router/routers";
import { mapActions } from "vuex";
import {
  getMenuAndElements
  } from "@/api/menuPermission";
export default {
  components: {
    LoginForm
  },
  methods: {
    // ...mapActions(["handleUserLogin", "getUserInfo"]),
    ...mapActions(["handleUserLogin"]),
    handleSubmit({ userName, password }) {
      this.handleUserLogin({ userName, password }).then(res => {
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   });
        // });
        if (this.$store.state.user.userId != null) {
          // this.mqtt_client.connect_mqtt();
          this.$Message.success('登陆成功!');
          //this.setMenu();
          this.$router.push({
            name: this.$config.homeName
          });
        } else {
          this.$toast.error("用户名或者密码不正确!", "", {
            timeout: 1000,
            close: false,
            overlay: true,
            toastOnce: true,
            id: "question",
            zindex: 999,
            position: "center",
            maxWidth: 500
          });
        }
        // console.log(this.$config.homeName);

        // this.$router.push({
        //   name: this.$config.homeName
        // });
      }).catch(err => {
        console.log("===========登陆失败==============");
        console.log(err.response.data.message);
          this.$toast.error(err.response.data.message, "", {
            timeout: 1000,
            close: false,
            overlay: true,
            toastOnce: true,
            id: "question",
            zindex: 999,
            position: "center",
            maxWidth: 500
          });
      })
    },
    setMenu(){
      let uid = this.$store.state.user.userId;
      let token = this.$store.state.user.token;
      getMenuAndElements({
        token: token,
      })
        .then(res => {
          console.log("=========================");
          console.log("权限树:");
          console.log(res.data);
          this.cleanMenuAuth(menuTree);
          this.checkMenuAuth(res.data.result.children, menuTree);
          //跳转至首页   
          console.log(menuTree);
          this.$forceUpdate();
          this.$router.push({
            name: this.$config.homeName
          });
        })
        .catch(err => {
          console.log("===========error==============");
          console.log(err);
          this.$Message.error('获取用户权限失败!');
        });
    },
    // //清空菜单所有访问权限（清除之前登陆的权限
    // cleanMenuAuth(local){
    //   local.forEach((menu)=>{
    //     menu.meta.hideInMenu=true;
    //     if (menu.children != undefined)
    //       this.cleanMenuAuth(menu.children);
    //   })
    // },
    // //设置当前用户权限
    // checkMenuAuth(server, local){
    //   server.forEach((tree)=>{
    //     local.forEach((menu)=>{
    //       if(menu.name==tree.code){
    //         menu.meta.hideInMenu=false;
    //         if (tree.children != undefined && menu.children != undefined)
    //           this.checkMenuAuth(tree.children,menu.children);
    //       }
    //     })
    //   })
    // }
  }
};
</script>

<style>
</style>

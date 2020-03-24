<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>

    <FormItem prop="vcode">
      <drag-verify
        ref="Verify"
        v-model="form.vcode"
        :width="width"
        :height="height"
        :text="text"
        :success-text="successText"
        :background="background"
        :progress-bar-bg="progressBarBg"
        :completed-bg="completedBg"
        :handler-bg="handlerBg"
        :handler-icon="handlerIcon"
        :text-size="textSize"
        :success-icon="successIcon"
        :circle="getShape"
      ></drag-verify>
    </FormItem>

    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import dragVerify from 'vue-drag-verify'

export default {
  name: 'LoginForm',
  components: {
    dragVerify
  },
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
    // ,
    // vcodeRules: {
    //   type: Array,
    //   default: () => {
    //     return [{ required: true, message: "请先滑动验证", trigger: "blur" }];
    //   }
    // }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      // Verify
      handlerIcon: 'fa fa-angle-double-right',
      successIcon: 'fa fa-check',
      background: '#cccccc',
      progressBarBg: '#4b0',
      completedBg: '#66cc66',
      handlerBg: '#fff',
      text: '请滑动滑块至右端',
      successText: 'success',
      width: 270,
      height: 35,
      textSize: '16px',
      isCircle: 'true',
      // VueIziToast
      notificationSystem: this.$notificationSystem.data
      // notificationSystem: {
      //   options: {
      //     show: {
      //       theme: "dark",
      //       icon: "icon-person",
      //       position: "topCenter",
      //       progressBarColor: "rgb(0, 255, 184)",
      //       buttons: [
      //         [
      //           "<button>Ok</button>",
      //           function(instance, toast) {
      //             alert("Hello world!");
      //           },
      //           true
      //         ],
      //         [
      //           "<button>Close</button>",
      //           function(instance, toast) {
      //             instance.hide(
      //               {
      //                 transitionOut: "fadeOutUp",
      //                 onClosing: function(instance, toast, closedBy) {
      //                   console.info("closedBy: " + closedBy);
      //                 }
      //               },
      //               toast,
      //               "buttonName"
      //             );
      //           }
      //         ]
      //       ],
      //       onOpening: function(instance, toast) {
      //         console.info("callback abriu!");
      //       },
      //       onClosing: function(instance, toast, closedBy) {
      //         console.info("closedBy: " + closedBy);
      //       }
      //     },
      //     ballon: {
      //       balloon: true,
      //       position: "bottomCenter"
      //     },
      //     info: {
      //       position: "bottomLeft"
      //     },
      //     success: {
      //       position: "bottomRight"
      //     },
      //     warning: {
      //       position: "topLeft"
      //     },
      //     error: {
      //       position: "topRight"
      //     },
      //     question: {
      //       timeout: 20000,
      //       close: false,
      //       overlay: true,
      //       toastOnce: true,
      //       id: "question",
      //       zindex: 999,
      //       position: "center",
      //       buttons: [
      //         [
      //           "<button><b>YES</b></button>",
      //           function(instance, toast) {
      //             instance.hide({ transitionOut: "fadeOut" }, toast, "button");
      //           },
      //           true
      //         ],
      //         [
      //           "<button>NO</button>",
      //           function(instance, toast) {
      //             instance.hide({ transitionOut: "fadeOut" }, toast, "button");
      //           }
      //         ]
      //       ],
      //       onClosing: function(instance, toast, closedBy) {
      //         console.info("Closing | closedBy: " + closedBy);
      //       },
      //       onClosed: function(instance, toast, closedBy) {
      //         console.info("Closed | closedBy: " + closedBy);
      //       }
      //     }
      //   }
      // }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    },
    getShape () {
      return this.isCircle === 'true'
    }
  },
  methods: {
    handleSubmit () {
      if (this.$refs.Verify.isPassing) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$emit('on-success-valid', {
              userName: this.form.userName,
              password: this.form.password
            })
          }
        })
      } else {
        // this.$toast.question(
        //   "Are you sure about that?",
        //   "Hey",
        //   this.notificationSystem.options.question
        // );

        this.$toast.warning('请滑动滑块至右端', '您好', {
          timeout: 1000,
          close: false,
          overlay: true,
          toastOnce: true,
          id: 'question',
          zindex: 999,
          position: 'center',
          maxWidth: 500
        })
      }
    }
  }
}
</script>

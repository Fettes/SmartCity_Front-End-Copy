<template>
  <!-- <Tree :data="data5" :render="renderContent"></Tree> -->
  <!-- <span @click="testClick">click me</span> -->
  <div class="container">
    <div class="player">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
      ></video-player>
    </div>
    <!-- <iframe src="https://surmon-china.github.io/vue-video-player/"></iframe> -->
    <!-- <iframe src="http://39.108.249.215/video/index.html"></iframe> -->
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";

const mqtt = require("mqtt");
// const MqttClient = mqtt.connect("ws://39.108.249.215:8083/mqtt");

// MqttClient.on("connect", function() {
//   MqttClient.subscribe("presence");
//   MqttClient.publish("presence", "Hello mqtt");
// });

// console.log(MqttClient);

// MqttClient.on("message", function(topic, message) {
//   // message is Buffer
//   console.log(message.toString());
//   // showInfo();
//   // MqttClient.end();
// });

export default {
  data() {
    return {
      MqttClient: null,
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            // type: "application/octet-stream",
            // type: "video/webm",
            // type: "rtmp/x-mpegURL",
            // type: "video/mp4",
            // type: "rtmp/mp4",
            // type: "rtmp/flv",
            // src: "rtmp://47.106.204.15/live/cclive" //你的视频地址（必填）
            src: "rtmp://39.108.249.215:1935/vod/test.flv" //你的视频地址（必填）
            // src: "rtmp://live.hkstv.hk.lxdns.com/live/hks" //你的视频地址（必填）
            // src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
          }
        ],
        controls: true,
        poster: "poster.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        height: "300",
        width: "400",
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      }
    };
  },
  components: {
    videoPlayer
  },
  methods: {
    // initMqtt() {
    //   let that = this;
    //   that.MqttClient = mqtt.connect("ws://39.108.249.215:8083/mqtt");
    //   // console.log(that.MqttClient);
    //   that.MqttClient.on("connect", function() {
    //     that.MqttClient.subscribe("presence");
    //     // that.MqttClient.publish("presence", "Hello mqtt");
    //   });

    //   that.MqttClient.on("message", function(topic, message) {
    //     // message is Buffer
    //     // console.log(message.toString());
    //     let x = message.toString();
    //     let y = JSON.parse(x);
    //     console.log(typeof y);
    //     console.log(y.msg);
    //     that.$Message.success(y.msg);
    //     // MqttClient.end();
    //   });
    // },
    onPlayerPlay(player) {
      console.log("play");
    },
    onPlayerPause(player) {
      console.log("pause");
    },

    testClick() {
      this.MqttClient.publish("presence", "Hello mqtt");
    }
  },
  created() {
    // this.initMqtt();
  },
  computed: {
    // player() {
    //   return this.$refs.videoPlayer.player;
    // }
  }
};
</script>

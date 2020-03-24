//MQTT
import mqtt from 'mqtt'

export default {
  options : {
    connectTimeout: 40000,
    clientId: "web"+new Date().getTime(),
    username: "admin",
    password: "Pass_emqtt",
    clean: true
  },
  client: [],
  connect_mqtt(){
    this.client = mqtt.connect("ws://39.108.249.215:8083/mqtt", this.options)
    console.log("发起连接")
    this.client.on('connect', (e) => {
      console.log('连接成功:')
    })
    // 断开发起重连
    this.client.on('reconnect', (error) => {
      console.log('正在重连:', error)
    })
    // 链接异常处理
    this.client.on('error', (error) => {
      console.log('连接失败:', error)
    })
  },
  getMqttClient(){
    return this.client;
  }
}

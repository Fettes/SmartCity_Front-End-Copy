# How to write API 

举例: 用户登录

1. 在 api\user.js 编写 调用 login api
```
export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}
```

2. 在需要调用的页面 比如 login.vue 页面

```
methods: {
    // 将 `this.handleLogin()` 映射为 `this.$store.dispatch('handleLogin')`
    ...mapActions(["handleLogin", "getUserInfo"]), 
    
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    }
  }

```
用户点击按钮触发 handleSubmit() , 从而调用 mapActions 内的 handleLogin() (在store\module\user.js), 从而存储在vuex - store module 管理状态, 最后实际调用 login() (在 api\user.js)

说明： 如果需要存储在 vuex - store module 管理状态

则需要利用 mapActions, 在store module 存储状态

```
actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
}
```

3. 最后实际调用是 第一步 编写的 login api





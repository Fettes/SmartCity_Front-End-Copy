export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'iView-admin',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    // pro: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    // dev: 'http://120.79.254.19:4000/',
    // pro: 'http://120.79.254.19:4000/',
    // dev: 'http://47.106.204.130:5000/',
    // pro: 'http://47.106.204.130:5000/',

    dev: 'http://qsiotsys.com/api/smart-city/',
    pro: 'http://qsiotsys.com/api/smart-city/'

    // dev: 'http://39.108.249.215/api/smart-city/',
    // pro: 'http://39.108.249.215/api/smart-city/',
    // pro: 'https://produce.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  deviceHome: 'device_home',
  userHome: 'user_manage',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}

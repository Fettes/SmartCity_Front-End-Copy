import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/login/login.vue')
},
  // home part
{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    // hideInMenu: true,
    notCache: true,
    title: '首页',
    // notCache: true,
    icon: 'ios-home'
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      // hideInMenu: true,
      title: '系统首页',
      notCache: true,
      icon: 'ios-apps'
    },
    component: () => import('@/view/ui/Home.vue')
  },
  {
    path: '/gismap',
    name: 'gismap',
    meta: {
      // hideInMenu: true,
      title: 'GIS地图',
      notCache: true,
      icon: 'ios-map',
      href: 'http://101.132.110.48'
    }
  },
  {
    path: '/data_visual',
    name: 'data_visual',
    meta: {
      // hideInMenu: true,
      title: '数据可视化',
      notCache: true,
      icon: 'ios-eye'
    }
  }

    ]
  },
    // 智慧照明
    {
      path: '/smart_lighting', // UI directory
      name: 'smart_lighting',
      component: Main,
      meta: {
        // hideInMenu: true,
        icon: 'ios-sunny', // update icon
        title: '智慧照明'
      },
      children: [{
          path: '/light_control',
          name: 'light_control',
          meta: {
            // hideInMenu: true,
            icon: 'md-bulb', // update icon
            title: '路灯控制'
          },
          component: () => import('@/view/ui/device_light.vue')
        },
        {
          path: '/on_off_lightcontrol',
          name: 'on_off_lightcontrol',
          meta: {
            // hideInMenu: true,
            icon: 'ios-switch', // update icon
            title: '开关灯控制'
          },
          component: () => import('@/view/ui/device_light_control.vue')
        },
        {
          path: '/device_light_management',
          name: 'device_light_management',
          meta: {
            // hideInMenu: true,
            icon: 'md-options', // update icon
            title: '路灯设备管理'
          },
          component: () => import('@/view/ui/device_light_manage.vue')
        },
        {
          path: '/device_parameter_options',
          name: 'device_parameter_options',
          meta: {
            // hideInMenu: true,
            icon: 'md-options', // update icon
            title: '路灯参数设置'
          },
          component: () => import('@/view/ui/device_parameter_options.vue')
        },
        {
          path: '/light_data_collection',
          name: 'light_data_collection',
          meta: {
            // hideInMenu: true,
            icon: 'ios-analytics', // update icon
            title: '实时数据采集'
          },

        },
        {
          path: '/light_data_analysis',
          name: 'light_data_analysis',
          meta: {
            // hideInMenu: true,
            icon: 'md-analytics', // update icon
            title: '统计数据分析'
          },
          component: () => import('@/view/ui/device_light_data_analysis.vue')
        },

      ]
    },
  // 信息发布
{
  path: '/infor_publish', // UI directory
  name: 'infor_publish',
  component: Main,
  meta: {
    // hideInMenu: true,
    icon: 'logo-twitch', // update icon
    title: '信息发布'
  },
  children: [{
    path: 'led',
    name: 'led',
    meta: {
      // hideInMenu: true,
      icon: 'md-laptop', // update icon
      title: 'LED显示屏'
    },
    component: () => import('@/view/ui/device_led.vue')
  },
  {
    path: 'lcd',
    name: 'lcd',
    meta: {
      // hideInMenu: true,
      icon: 'md-albums', // update icon
      title: 'LCD交互屏'
    },
    component: () => import('@/view/ui/device_lcd.vue')
  },
  {
    path: 'broadcast',
    name: 'broadcast',
    meta: {
      // hideInMenu: true,
      icon: 'md-megaphone', // update icon
      title: 'Broadcast'
    },
    component: () => import('@/view/ui/device_broadcast.vue')
  },
  {
    path: 'edit_content',
    name: 'edit_content',
    meta: {
      // hideInMenu: true,
      icon: 'ios-clipboard', // update icon
      title: '内容编辑'
    },
    component: () => import('@/view/ui/file_manage.vue')
  },
  {
    path: 'task_manage',
    name: 'task_manage',
    meta: {
      // hideInMenu: true,
      icon: 'ios-checkmark-circle', // update icon
      title: '任务管理'
    },
    component: () => import('@/view/ui/mission_manage.vue')
  }

  ]
},
  // 路况监控
{
  path: '/road_monitor', // UI directory
  name: 'road_monitor',
  component: Main,
  meta: {
    // hideInMenu: true,
    icon: 'ios-car', // update icon
    title: '路况监控'
  },
  children: [{
    path: 'camera_monitor',
    name: 'camera_monitor',
    meta: {
      // hideInMenu: true,
      icon: 'ios-videocam', // update icon
      title: '警用监控'
    },
    component: () => import('@/view/ui/device_camera.vue')
  },
  {
    path: 'traffic_monitor',
    name: 'traffic_monitor',
    meta: {
      // hideInMenu: true,
      icon: 'md-walk', // update icon
      title: '交通监控'
    },
    component: () => import('@/view/ui/device_camera_transport.vue')
  },

  {
    path: 'vfm',
    name: 'vfm',
    meta: {
      // hideInMenu: true,
      icon: 'md-car', // update icon
      title: '车辆雷达'
    },
    component: () => import('@/view/ui/device_vfm.vue')
  },
  {
    path: 'pfm',
    name: 'pfm',
    meta: {
      // hideInMenu: true,
      icon: 'ios-people', // update icon
      title: '人流监测'
    },
    component: () => import('@/view/ui/device_pfm.vue')
  }
  ]
},
  // 公共网络
{
  path: '/publicnetwork', // UI directory
  name: 'publicnetwork',
  component: Main,
  meta: {
    // hideInMenu: true,
    icon: 'ios-planet', // update icon
    title: '公共网络'
  },
  children: [{
    path: 'microbasestation',
    name: 'microbasestation',
    meta: {
      // hideInMenu: true,
      icon: 'md-easel', // update icon
      title: '微基站'
    },
    component: () => import('@/view/ui/device_microbasestation.vue')
  },
  {
    path: 'ap',
    name: 'ap',
    meta: {
      // hideInMenu: true,
      icon: 'ios-wifi', // update icon
      title: 'AP'
    },
    component: () => import('@/view/ui/device_ap.vue')
  }
  ]
},
  // 环境监测
{
  path: '/environ_management', // UI directory
  name: 'environ_management',
  component: Main,
  meta: {
    // hideInMenu: true,
    icon: 'ios-leaf', // update icon
    title: '环境管理'
  },
  children: [{
    path: 'environ_monitor',
    name: 'environ_monitor',
    meta: {
      // hideInMenu: true,
      icon: 'md-leaf', // update icon
      title: '环境监测'
    },
    component: () => import('@/view/ui/device_envir.vue')
  },

  // {
  //   path: '/environ_data_collection',
  //   name: 'environ_data_collection',
  //   meta: {
  //     icon: 'ios-analytics', // update icon
  //     title: '实时数据采集'
  //   },

  // },
  {
    path: '/environ_data_analysis',
    name: 'environ_data_analysis',
    meta: {
      // hideInMenu: true,
      icon: 'md-analytics', // update icon
      title: '统计数据分析'
    },
    component: () => import('@/view/ui/device_envir_data_analysis.vue')
  }
  ]
},
  // 告警管理
{
  path: '/_alarm_management', // UI directory
  name: '_alarm_management',
  component: Main,
  meta: {
    // hideInMenu: true,
    icon: 'md-alert', // update icon
    title: '告警管理'
  },
  children: [{
    path: 'alarm_management',
    name: 'alarm_management',
    meta: {
      // hideInMenu: true,
      icon: 'md-options', // update icon
      title: '告警管理'
    },
    component: () => import('@/view/ui/warning_manage.vue')
  },

  {
    path: 'alarm_process',
    name: 'alarm_process',
    meta: {
      // hideInMenu: true,
      icon: 'md-construct', // update icon
      title: '告警统计'
    },
    component: () => import('@/view/ui/device_warning_analysis.vue')
  },
  {
    path: 'device_linkage',
    name: 'device_linkage',
    meta: {
      // hideInMenu: true,
      icon: 'md-git-network', // update icon
      title: '设备联动'
    }

  }
  ]
},
  // 系统管理
{
  path: '/system_manage', // UI directory
  name: 'system_manage',
  component: Main,
  meta: {
    // hideInMenu: true,
    icon: 'md-cog', // update icon
    title: '设备管理'
  },
  children: [{
    path: 'user_manage',
    name: 'user_manage',
    meta: {
      // hideInMenu: true,
      icon: 'ios-contacts',
      title: '用户管理'
    },
    component: () => import('@/view/user/user_manage.vue')
  },
  {
    path: 'device_home',
    name: 'device_home',
    meta: {
      // hideInMenu: true,
      icon: 'ios-archive', // update icon
      title: '资产管理',
    },
    component: () => import('@/view/ui/property_manage.vue')
  },
  {
    path: 'authority_manage',
    name: 'authority_manage',
    meta: {
      // hideInMenu: true,
      icon: 'ios-create', // update icon
      title: '权限管理'
    },
    component: () => import('@/view/ui/role_manage.vue')
  },
  {
    path: 'district_manage',
    name: 'district_manage',
    meta: {
      // hideInMenu: true,
      icon: 'md-cube', // update icon
      title: '区域管理'
    },
    component: () => import('@/view/ui/area_manage.vue')
  },
  {
    path: 'log_manage',
    name: 'log_manage',
    meta: {
      // hideInMenu: true,
      icon: 'ios-calendar', // update icon
      title: '操作日志'
    },
    component: () => import('@/view/logger/operation_log.vue')

  }

  ]
},

{
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/500.vue')
},
{
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/404.vue')
},
{
  path: '/test',
  name: 'test',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/ui/test_ui.vue')
},
{
  path: '/map',
  name: 'map',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/ui/demo_map.vue')
},
{
  path: '/live',
  name: 'live',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/ui/live.vue')
}

]

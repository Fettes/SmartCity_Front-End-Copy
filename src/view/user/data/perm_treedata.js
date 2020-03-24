export default {
  data: [{
      title: "设备管理",
      expand: true,
      name: "设备管理",
      menuInfoId: 1,
      enName: "Device Management",
      menuUrl: "devices",
      menuLevel: 1,
      parentMenu: 0,
      children: [{
        title: "车流管理",
        expand: true,
        name: "车流管理",
        menuInfoId: 2,
        enName: "Car Monitor",
        menuUrl: "carMonitor",
        menuLevel: 2,
        parentMenu: 1,
        menuListInfoResList: null,
        children: []
      }, {
        title: "人流管理",
        expand: true,
        name: "人流管理",
        menuInfoId: 3,
        enName: "Person Monitor",
        menuUrl: "personMonitor",
        menuLevel: 2,
        parentMenu: 1,
        menuListInfoResList: null,
        children: []
      }, {
        title: "灯具管理",
        expand: true,
        name: "灯具管理",
        menuInfoId: 4,
        enName: "Lamps",
        menuUrl: "lamps",
        menuLevel: 2,
        parentMenu: 1,
        menuListInfoResList: null,
        children: []
      }, {
        title: "灯杆管理",
        expand: true,
        name: "灯杆管理",
        menuInfoId: 5,
        enName: "Lamp Pole",
        menuUrl: "lampPole",
        menuLevel: 2,
        parentMenu: 1,
        menuListInfoResList: null,
        children: []
      }]
    },
    {
      title: "参数配置",
      expand: true,
      name: "参数配置",
      menuInfoId: 6,
      enName: "Parameter Config",
      menuUrl: "paramConfig",
      menuLevel: 1,
      parentMenu: 0,
      children: [{
        title: "用户配置",
        expand: true,
        name: "用户配置",
        menuInfoId: 7,
        enName: "User Config",
        menuUrl: "userConfig",
        menuLevel: 2,
        parentMenu: 6,
        menuListInfoResList: null,
        children: []
      }, ]
    }


  ]

}

data2: [{
  title: "parent 1",
  expand: true,
  children: [{
      title: "parent 1-1",
      expand: true,
      children: [{
          title: "leaf 1-1-1"
        },
        {
          title: "leaf 1-1-2"
        }
      ]
    },
    {
      title: "parent 1-2",
      expand: true,
      children: [{
          title: "leaf 1-2-1"
        },
        {
          title: "leaf 1-2-1"
        }
      ]
    }
  ]
}]

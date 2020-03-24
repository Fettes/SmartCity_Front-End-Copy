import axios from '@/libs/api.request'

export const getAllDevices = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/light/getAllDevices',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
export const getAssetDevices = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'asset/area/getAllArea',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
export const getassets = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/light/assetInfo',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'
  })
}
export const getAlarmMessage = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/light/light/errorInfo',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'
  })
}
//刷新路由
export const routerRead = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/remoteControl/routerStatusRead',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
export const electronicRead = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/remoteControl/currentElectricDataCollecting',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
export const getDataTime = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/light/light/timeByWeek',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'
  })
}
//集中器亮度调节
export const changeConcentratorDegree = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/light/remoteControl/concentratorAdjustLight',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'

  })
}
//单一灯具亮度
export const changeLampDegree = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/light/remoteControl/controllerAdjustLightByLampInfo',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'

  })
}
//根据lampID 获取集中器信息
export const getConcentroterInfo = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/light/map/concentratorInfoByLampId',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'

  })
}
//根据lampID 获取灯具信息
export const getLampInfo = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/light/map/controllerInfoByLampId',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'

  })
}
//当前电流电压收集
export const dataCollecting = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/light/map/currentElectricDataCollecting',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'get'
  })
}
//获取集中器列表
export const getConcentrator = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/concentrator/all',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//添加集中器
export const addConcentrator = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/concentrator/create',
      data: data,
      method: 'post',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//删除集中器
export const deleteConcentrator = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/concentrator/delete',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'delete'
  })
}
//编辑集中器
export const editConcentrator = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/concentrator/modify',
      data: data,
      method: 'put',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//初始化终端档案
export const ArchiveInit = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/remoteControl/controllerArchiveInit',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//下发终端档案
export const ArchiveIssue = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/remoteControl/controllerArchiveIssue',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取灯杆列表
export const getLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/lightPole/all',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取可用灯杆列表
export const getAvalibleLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/lightPole/selectAllByConcentratorIds',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//添加灯杆
export const addLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/lightPole/create',
      data: data,
      method: 'post',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//删除灯杆
export const deleteLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/lightPole/delete',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'delete'
  })
}
//编辑灯杆
export const editLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/lightPole/modify',
      data: data,
      method: 'put',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//获取控制器列表
export const getController = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/controller/all',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//添加控制器
export const addController = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/controller/create',
      data: data,
      method: 'post',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//删除控制器
export const deleteController = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/controller/delete',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'delete'
  })
}
//编辑控制器
export const editController = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/controller/modify',
      data: data,
      method: 'put',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//获取灯具列表
export const getLamp = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/lamp/all',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//添加控制器
export const addLamp = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/lamp/create',
      data: data,
      method: 'post',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//删除控制器
export const deleteLamp = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/lamp/delete',
      params: data,
      headers: {
          'Authorization': token,
      },
      method: 'delete'
  })
}
//编辑控制器
export const editLamp = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: 'light/lamp/modify',
      data: data,
      method: 'put',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
      },
  })
}
//获取excel模板
export const getExcel = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/excel/exportPoleControllerLamp',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//年方案下发
export const publishPlan = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/annualPlan/issueTimetable',
    params: data,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    method: 'post'
  })
}
//获取控制器历史数据（9.1）
export const electronicHistoryRead = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/controllerCurve/getControllerCurveByControllerId',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}

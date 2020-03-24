import axios from '@/libs/api.request'

//获取所有设备列表
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
export const getAllLcdDevices = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'info-publish/lcd/getLCDDevices',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}
export const getAllTask = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'info-publish/lcd/getDeviceTasks',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}
export const deleteshow = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'info-publish/task/del',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'delete'
    })
}
export const getassets = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'asset/device/getOneDevice',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}
export const submitTask = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'info-publish/task/add',
        data: data,
        method: 'post',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    })
}
export const putTask = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'info-publish/task/edit',
        data: data,
        method: 'put',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    })
}
export const getHistory = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'info-publish/program/getPrograms',
        params: data,
        method: 'get',
        headers: {
            'Authorization': token,
        },
    })
}
export const getTaskProgramList = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'info-publish/led/getDeviceTaskAdditionalInfo',
        params: data,
        method: 'get',
        headers: {
            'Authorization': token,
        },
    })
}


//运行状态
export const getOperationState = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/lcd/getLcdStatus',
    params: data,
    method: 'get',
    headers: {
      'Authorization': token,
    },
  })
}

//开关
export const deviceOperate = (data) => {
    let token = data.token
    delete data.token
  
    return axios.request({
      url: '/switches/switches/deviceOperate',
      params: data,
      method: 'post',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
  }
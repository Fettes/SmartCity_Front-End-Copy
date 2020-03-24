import axios from '@/libs/api.request'

export const getAllBroadcastDevices = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/area/getAllArea',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const getDeviceInfo = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/getOneDevice',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const getAllTasks = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'info-publish/broadcast/getAllTasks',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const getTasksById = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'info-publish/broadcast/getTaskById',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const getProgramList = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'info-publish/broadcast/getPrograms',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const addNewTask = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'info-publish/broadcast/addBroadcastTask',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

export const deleteTask = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'info-publish/broadcast/deleteTask',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}

export const updateBroadcastTask = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'info-publish/broadcast/updateBroadcastTask',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

export const getPrograms = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/broadcast/getPrograms',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const delProgram = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/broadcast/delProgram',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}
export const getDevicesList = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/broadcast/getAllBroadcastDevices',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
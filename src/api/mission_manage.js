import axios from '@/libs/api.request'

export const getTasks = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/getTasksDetailInfo',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const deleteTask = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/delTask',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}
export const editTask = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/edit',
    data: data,
    params:[],
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}

export const startTask = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/startTask',
    params: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

export const stopTask = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/stopTask',
    params: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
//新建弹窗
export const getDevices = (data) => {
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
export const getPrograms = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/program/getAllPrograms',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getTextList = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/programText/getAllProgramsText',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const addMission = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/add',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const getTaskById = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/getTaskById',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const updateProgram = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/updateProgram',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const updateDevice = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/task/updateDevice',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
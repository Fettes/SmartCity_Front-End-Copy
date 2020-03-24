import axios from '@/libs/api.request'

export const getAreaList = (data) => {
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
export const editArea = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/area/editArea',
    data: data,
    params:[],
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}
export const addArea = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/area/addArea',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const deleteArea = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/area/delArea',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}
export const addLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/addLightPole',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const updateLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/updateLightPole',
    data: data,
    params:[],
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}
export const deleteLightPole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/deleteLightPole',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}
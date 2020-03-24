import axios from '@/libs/api.request'

export const getAllCamera = (data) => {
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
    url: 'asset/device/getOneDevice',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const getCamera = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/scada/camera/getDeviceInfo',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
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
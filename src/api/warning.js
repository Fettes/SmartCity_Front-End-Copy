import axios from '@/libs/api.request'

export const getAlarmMessage = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/getAlarms',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getAlarmList = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/getAlarmsList',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getAllAlarm = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/getAllAlarms',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getAlarmAnalysisDevice = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/getAlarmAnalysisDevice',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getAlarmAnalysisDate = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/getAlarmAnalysisDate',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getAlarmAnalysis = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/getAlarmAnalysis',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const deal = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/dispose',
    params: data,
    data:[],
    method: 'put',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
import axios from '@/libs/api.request'

export const getLogger = (data) => {
  let token = data.token
  delete data.token
  return axios.request({
    url: '/log/queryLogSystem',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const alarmLogger = (data) => {
  let token = data.token
  delete data.token
  return axios.request({
    url: '/log/queryLogAlarm',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const businessLogger = (data) => {
  let token = data.token
  delete data.token
  return axios.request({
    url: '/log/queryLogBusiness',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}



import axios from '@/libs/api.request'

export const getAllStationDevices = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/asset/area/getAllArea',
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
        url: '/alarm/alarms/getAlarms',
        params: data,
        headers: {
            'Authorization': token,
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
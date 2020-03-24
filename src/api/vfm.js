import axios from '@/libs/api.request'

export const getAllvfmDevices = (data) => {
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

export const getDeviceInfo = (data) => {
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

export const getRealTimeData = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/scada/vfm/realtimeDataBylpno',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}

export const getDataAnalysisById = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/scada/vfm/dataAnalysisEach',
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
        url: '/alarm/alarms/getAlarmsList',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
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
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
        url: '/asset/device/getOneDevice',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}

export const getRealTimeDataById = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/scada/pfm/realtimeDataBydeviceId',
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
        url: '/scada/pfm/analysisBydeviceId',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}

export const getWeekAnalysis = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/scada/pfm/analysisWeekDataByAssetId',
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
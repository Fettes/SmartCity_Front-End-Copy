import axios from '@/libs/api.request'

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
export const getAnalysisSensorHome = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
      url: '/sensor/sensor/getAnalysisSensorHome',
      params: data,

      headers: {
          'Authorization': token,
      },
      method: 'get'
  })
}
export const getAllDevicesStatus = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/message/gis_m/getAllDevicesStatus',
        params: data,

        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}

export const getAllAlarmAnalysisTotal = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/alarm/alarms/getAllAlarmAnalysisTotal',
    params: data,

    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}

import axios from '@/libs/api.request'
//获取日出日落时间表
export const parameterList = (data) => {
    let token = data.token
    delete data.token
  
    return axios.request({
      url: 'light/SunriseAndSunset/listview',
      params: data,
      headers: {
        'Authorization': token,
      },
      method: 'get'
    })
  }
//获取可使用集中器列表
export const concentratorList = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/concentrator/getWorkableConcentratorList',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取分析图表的控制器表格
export const controllerListAnalysis = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/routeStatus/RouteStautsControllersListView',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取集中器状态（8.1）
export const concentratorStatus = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/concentratorStatus/getConcentratorStatusByConcentratorIds',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取控制器状态（7.2）
export const controllerHistoryStatus = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/routeStatus/getRouteStatusByMeasurePonit',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取年亮灯率
export const lineRateDataYear = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/lineRate/getLightRateListViewYear',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取月亮灯率
export const lineRateDataMonth = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/lineRate/getLightRateListViewMonth',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取年线损率
export const lineFaultDataYear = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/lineFault/getLineFaultListByConcentratorIdsAndYear',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
//获取月线损率
export const lineFaultDataMonth = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: 'light/lineFault/getLineFaultListByConcentratorIdsAndMonth',
    params: data,
    headers: {
      'Authorization': token,
    },
    method: 'get'
  })
}
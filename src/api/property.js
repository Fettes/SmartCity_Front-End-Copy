import axios from '@/libs/api.request'

export const getAllDevices = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/getDevices',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getUninstallDevices = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/getUninstallDevices',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getLightPoleTree = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/lightPole/getAreaAndLightPole',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const deleteDevice = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/deleteDevice',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}

export const addDevice = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/addDevice',
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
    url: '/asset/device/updateDevice',
    data: data,
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}

export const installBroadcast = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installBroadcast',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

export const installIpc = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installIpc',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const installLcd = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installLcd',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const installLed = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installLed',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const installPfm = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installPfm',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const installSensor = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installSensor',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const installTelStation = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installTelStation',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const installUps = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installUps',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const installVfm = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/asset/device/installVfm',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

import axios from '@/libs/api.request'

export const getAllEnvirSensor = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'sensor/sensor/getSensorList',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}
export const getEnvirSensorData = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'sensor/sensor/getSensorStatus',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}
export const getassets = (data) => {
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
//获取所有设备列表
export const getAssetDevices = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'asset/area/getAllArea',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}
//获取时间范围内传感器数据
export const getDataByDays = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'sensor/sensor/groupByDayData',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}
//获取平均数据
export const getAverageData = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: 'sensor/sensor/getDayData',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}


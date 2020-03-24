import axios from '@/libs/api.request'

export const getAllUser = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/uac/user/queryUser',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'get'
    })
}

export const deleteUser = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/uac/user/deleteUser',
        params: data,
        headers: {
            'Authorization': token,
        },
        method: 'delete'
    })
}

export const addUser = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/uac/user',
        data: data,
        method: 'post',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    })
}

export const updateUser = (data) => {
    let token = data.token
    delete data.token

    return axios.request({
        url: '/uac/user',
        data: data,
        headers: {
            'Authorization': token,
        },
        method: 'put'
    })
}

export const getRoles = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/getRoles',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

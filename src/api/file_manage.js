import axios from '@/libs/api.request'

export const getPrograms = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/program/getPrograms',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const getTextList = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/programText/getProgramsText',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}

export const deleteFile = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/program/del',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}

export const deleteText = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/programText/delProgramText',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}

export const uploadText = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/programText/uploadTextContent',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}

export const updateText = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/programText/updateTextContent',
    data: data,
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}


export const editFile = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/info-publish/program/edit',
    data: data,
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}
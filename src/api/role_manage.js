import axios from '@/libs/api.request'

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
export const getRoleMenus = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/getMenus',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const updateRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/updateRole',
    data: data,
    params:[],
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}
export const createRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/createRole',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const deleteRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/deleteRole',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}
export const getUserByRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/getUserByRole',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getMenus = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/menu/getMenus',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const delUserRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/delUserRole',
    data: data.data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}
export const getUserExcludeRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/getUserExcludeRole',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const addUserRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/addUserRole',
    data: data.data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const updateMenu = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/menu/updateMenu',
    data: data,
    params:[],
    headers: {
      'Authorization': token
    },
    method: 'put'
  })
}
export const deleteMenu = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/menu/deleteMenu',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}
export const createMenu = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/menu/createMenu',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const addRoleMenu = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/addMenu',
    data: data,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
}
export const deleteRoleMenu = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/deleteMenu',
    data: data,
    headers: {
      'Authorization': token
    },
    method: 'delete'
  })
}

//菜单角色管理
export const getMenuRole = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/menu/getRoles',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
export const getExcludeRoles = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/menu/getExcludeRoles',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
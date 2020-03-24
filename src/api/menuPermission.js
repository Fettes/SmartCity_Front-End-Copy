import axios from '@/libs/api.request'

export const getMenuAndElements = (data) => {
  let token = data.token
  delete data.token

  return axios.request({
    url: '/uac/role/getMenuAndElements',
    params: data,
    headers: {
      'Authorization': token
    },
    method: 'get'
  })
}
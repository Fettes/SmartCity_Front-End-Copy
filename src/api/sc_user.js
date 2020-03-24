import axios from '@/libs/api.request'

// old version
export const user_login = ({
  userName,
  password
}) => {
  const data = {
    'username': userName,
    'password': password,
    'Content-Type': 'application/x-www-form-urlencoded',

  }
  return axios.request({
    url: 'auth/form',
    params: data,
    headers: {
      'Authorization': 'Basic Y29jbG91ZHMtY2xpZW50OmNvY2xvdWRzLXNlY3JldA==',
    },
    method: 'post'
  })
}

export const getUserData = (data) => {
  return axios.request({
    url: 'get_user_info',
    params: data,
    method: 'get'
  })
}

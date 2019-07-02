 import axios from "axios";

export const mlogin = params  => {
  const data = {
    username: params.userName,
    password: params.password
  }
  return axios.request({
    url: '/login',
    data,
    method: 'post',
  })
}
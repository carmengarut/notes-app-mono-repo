import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}
export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

export const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

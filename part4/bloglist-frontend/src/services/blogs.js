import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  token = `bearer ${newToken}`}

const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  try{
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch(err) {
    return null
  }
}

export default { getAll, setToken, create}
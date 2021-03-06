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

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blog.id}`
  try{
    await axios.delete(url, config)
    return true
  } catch(err) {
    return null
  }
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${newObject.id}`
  try {
    const response = await axios.put(url, newObject, config)
    return response.data
  } catch (err) {
    console.log('ERROR:', err.response.data)
    if (err.response.status === 401 && err.response.data.error.includes('Token expired')) {
      return false
    }
    return null
  }
}

export default { getAll, setToken, create, update, removeBlog }
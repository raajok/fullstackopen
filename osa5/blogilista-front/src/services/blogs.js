import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const newBlog = { ...blog, likes: (blog.likes + 1), user: blog.user.id }

  const response = await axios.put(baseUrl.concat(`/${blog.id}`), newBlog, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  axios.delete(baseUrl.concat(`/${id}`), config)
}


export default { getAll, setToken, create, like, remove }
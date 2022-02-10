import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import { useHistory } from 'react-router-dom'

export const RefreshToken = async () => {
  const router = useRouter()

  try {
    const response = await axios.get('http://localhost:5000/token')
    setToken(response.data.accessToken)
    const decoded = jwt_decode(response.data.accessToken)
    setName(decoded.name)
    setExpire(decoded.exp)
  } catch (error) {
    if (error.response) {
      router.push('/login')
    }
  }
}

const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date()
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token')
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      setName(decoded.name)
      setExpire(decoded.exp)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const GetUsers = async () => {
  const response = await axiosJWT.get('http://localhost:5000/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  setUsers(response.data)
}

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default function AuthCheck() {
  const [display, setDisplay] = useState(false)
  const [name, setName] = useState('')
  // const [users, setUsers] = useState([])
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState('')
  const router = useRouter()

  useEffect(() => {
    RefreshToken()
    // GetUsers()
  }, [])

  const RefreshToken = async () => {
    try {
      const response = await axios.get('http://192.168.4.29:5000/token')
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      setName(decoded.name)
      setExpire(decoded.exp)
      setDisplay(true)
    } catch (error) {
      console.log(error.response.status)
      if (error.response) {
        router.push('/login')
      }
    }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async config => {
      const currentDate = new Date()
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://192.168.4.29:5000/token')
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
        setToken(response.data.accessToken)
        const decoded = jwt_decode(response.data.accessToken)
        setName(decoded.name)
        setExpire(decoded.exp)
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  return display
  // const GetUsers = async () => {
  //   const response = await axiosJWT.get('http://192.168.4.29:5000/users', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   setUsers(response.data)
  // }
}

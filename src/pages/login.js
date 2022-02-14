import React from 'react'
import Button from '../layout/button'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Url from '../config/Url'
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const Auth = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${Url}/login`, {
        email: email,
        password: password,
      })
      router.push('/')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='bg-base-200 w-1/3 rounded-md p-5 shadow-lg'>
        <h1 className='text-primary text-lg font-bold'>INVENTARIS IT</h1>
        <h1 className='text-primary text-lg font-bold'>{msg}</h1>
        <hr className='border-base-100 my-5' />
        <form onSubmit={Auth} className='box'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <label htmlFor='' className='text-primary flex-1'>
                Email
              </label>
              <input type='text' className='input input-primary w-3/4' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex items-center justify-between'>
              <label htmlFor='' className='text-primary flex-1'>
                Password
              </label>
              <input type='text' className='input input-primary w-3/4' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button
            className={'mt-5 w-full'}
            onClick={() => {
              console.log('Hello')
            }}>
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  )
}

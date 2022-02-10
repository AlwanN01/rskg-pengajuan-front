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
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-1/3 p-5 shadow-lg bg-base-200 rounded-md'>
        <h1 className='text-primary text-lg font-bold'>INVENTARIS IT</h1>
        <h1 className='text-primary text-lg font-bold'>{msg}</h1>
        <hr className='border-base-100 my-5' />
        <form onSubmit={Auth} className='box'>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <label htmlFor='' className='flex-1 text-primary'>
                Email
              </label>
              <input type='text' className='w-3/4 input input-primary' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor='' className='flex-1 text-primary'>
                Password
              </label>
              <input type='text' className='w-3/4 input input-primary' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button
            className={'w-full mt-5'}
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
export async function getServerSideProps(context) {
  const response = await axios.get('http://192.168.55.190:5000/products')
  return {
    props: {
      data: response.data.products,
    }, // will be passed to the page component as props
  }
}

import React from 'react'
import { useRouter } from 'next/router'
import useToggle from '@/app/useToggle'
import AuthCheck from '../../auth'
import { useState } from 'react'
import { mutate } from 'swr'
import Url from '@/config/Url'
export default function NavMaster({ children }) {
  const log = AuthCheck()
  const [visible, toggle, setToggleStatus] = useToggle()
  const [active, setActive] = useState()
  const router = useRouter()
  const { master } = router.query
  const path = ['cpu', 'cpu_user', 'pegawai']
  const onClick = (data, index) => {
    router.push(`/master/${data}`)
    setActive(index)
  }
  return (
    <div className='master'>
      <div className='navbar bg-neutral rounded-box mb-2 shadow-lg'>
        <div className='mx-2 flex-none px-2'>
          <span
            className='cursor-pointer text-lg font-bold'
            onClick={() => router.push(`/`)}
            onMouseEnter={() =>
              mutate(
                'http://192.168.55.190:5000/products',
                fetch('http://192.168.55.190:5000/products').then((res) => res.json())
              )
            }>
            HOME
          </span>
        </div>
        <div className='mx-2 flex-1 px-2'>
          <div className='flex items-stretch'>
            {path.map((data, index) => (
              <a
                key={index}
                className={`${master == data && 'text-sky-400'} btn btn-ghost btn-sm rounded-btn`}
                onClick={() => onClick(data, index)}
                onMouseEnter={() =>
                  mutate(
                    `${Url}/${data}`,
                    fetch(`${Url}/${data}`).then((res) => res.json())
                  )
                }>
                {data.replace(/_/g, ' ').toUpperCase()}
              </a>
            ))}

            <button className={`btn btn-ghost btn-sm ${!visible && 'text-sky-400'}`} onClick={toggle}>
              toggle
            </button>
          </div>
        </div>
        <div className='flex-none'>
          <button className='btn btn-square btn-ghost'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block h-6 w-6 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'></path>
            </svg>
          </button>
        </div>
        <div className='flex-none'>
          <button className='btn btn-square btn-ghost'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block h-6 w-6 stroke-current'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

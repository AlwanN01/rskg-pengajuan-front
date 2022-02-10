import React from 'react'
import { useRouter } from 'next/router'
import useToggle from '@/app/useToggle'
export default function NavMaster({ children }) {
  const [visible, toggle, setToggleStatus] = useToggle()
  const router = useRouter()
  const menu = [
    {
      path: 'cpu',
      name: 'cpu',
    },
    {
      path: 'mobo',
      name: 'mobo',
    },
  ]
  return (
    <div className='master'>
      <div className='navbar bg-neutral rounded-box mb-2 shadow-lg'>
        <div className='mx-2 flex-none px-2'>
          <span className='text-lg font-bold' onClick={() => router.push(`/`)}>
            HOME
          </span>
        </div>
        <div className='mx-2 flex-1 px-2'>
          <div className='hidden items-stretch lg:flex'>
            {menu.map((data, index) => (
              <a key={index} className='btn btn-ghost btn-sm rounded-btn' onClick={() => router.push(`/master/${data.path}`)}>
                {data.name}
              </a>
            ))}
            <a className='btn btn-ghost btn-sm rounded-btn' onClick={() => router.push(`/master/tess`)}>
              tes
            </a>
            <a className='btn btn-ghost btn-sm rounded-btn' onClick={() => router.push(`/master/tess2`)}>
              tes2
            </a>
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

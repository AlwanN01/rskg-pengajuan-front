import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
export default function CpuAdd() {
  const router = useRouter()
  const [Data, setData] = useState({})

  const saveData = (e) => {
    e.preventDefault()
    axios.post('http://192.168.55.190:5000/cpu', {
      cpu_id: Data.cpu_id,
      hardware_category_id: Data.hardware_category_id,
      type: 'non organik',
    })
    router.push('/master/cpu')
  }

  return (
    <div className='mx-auto w-full p-8 md:w-1/2'>
      <Link href={'/master/cpu'}>
        <a className='btn btn-sm btn-secondary'>Kembali</a>
      </Link>
      <form onSubmit={saveData}>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>cpu_id</span>
          </label>
          <input
            type='text'
            placeholder='Title'
            className='input input-primary input-bordered'
            value={Data.cpu_id}
            onChange={(e) => {
              setData({ ...Data, cpu_id: e.target.value })
            }}
          />
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>hardware_category_id</span>
          </label>
          <input
            type='text'
            placeholder='hardware_category_id'
            className='input input-primary input-bordered'
            value={Data.hardware_category_id}
            onChange={(e) => {
              setData({ ...Data, hardware_category_id: e.target.value })
            }}
          />
        </div>
        <button type='submit' className='btn btn-primary mt-4'>
          Save
        </button>
      </form>
    </div>
  )
}

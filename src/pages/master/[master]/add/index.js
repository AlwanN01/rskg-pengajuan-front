import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import fetcher from '@/app/fetcher'
import useSWR from 'swr'
import Url from 'src/config/Url'
import axios from 'axios'

export default function Index() {
  const router = useRouter()
  const { master } = router.query
  const { data: dataFetch, error, mutate } = useSWR(`${Url}/${master}`, fetcher)

  const [data, setData] = useState()

  const dataKey = dataFetch && Object?.keys(dataFetch?.[master][0])
  const exclude = new Set(['id', 'createdAt', 'updatedAt']) //exclude data yang dioutput
  for (let i = 0; i < dataKey?.length; i++) {
    if (exclude.has(dataKey[i])) {
      dataKey.splice(i, 1)
      i--
    }
  }
  console.log(dataKey)
  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    axios.post(`${Url}/${master}`, data).then(mutate())
    router.push(`/master/${master}`)
  }
  if (!dataFetch) return null

  return (
    <div className='mx-auto w-full p-8 md:w-1/2'>
      <a className='btn btn-sm btn-secondary' onClick={() => router.push(`/master/${master}`)}>
        Kembali
      </a>
      <form onSubmit={onSubmit}>
        {dataKey.map((key, index) => (
          <div key={index} className='form-control'>
            <label className='label'>
              <span className='label-text'>{key.replace(/_/g, ' ')}</span>
            </label>
            <input
              type='text'
              placeholder={key.replace(/_/g, ' ')}
              name={key}
              className='input input-primary input-bordered'
              value={data?.[key] || ''}
              onChange={(e) => {
                onChange(e)
              }}
            />
          </div>
        ))}

        <button type='submit' className='btn btn-primary mt-4'>
          Save
        </button>
      </form>
    </div>
  )
}

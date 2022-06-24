import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import fetcher from '@/app/fetcher'
import useSWR from 'swr'

export default function EditProduct({ productId }) {
  const { data, error, mutate: refresh } = useSWR('products', fetcher)

  const id = 1
  const router = useRouter()
  const [product, setProduct] = useState({
    title: '',
    price: ''
  })

  const saveProduct = e => {
    router.push('/')

    e.preventDefault()
    axios.post('http://192.168.4.29:5000/products', {
      title: product.title,
      price: product.price
    })
  }
  useEffect(() => {
    getProductById()
  }, [])
  const getProductById = async () => {
    const response = await axios.get(`http://192.168.4.29:5000/products/${id}`)
    setProduct({
      title: response.data.title,
      price: response.data.price
    })
  }

  return (
    <div className='mx-auto w-full p-8 md:w-1/2'>
      <p>{productId}</p>
      <Link href={'/'}>
        <a className='btn btn-sm btn-secondary'>Kessmbali</a>
      </Link>
      <form onSubmit={saveProduct}>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Title</span>
          </label>
          <input
            type='text'
            placeholder='Title'
            className='input input-primary input-bordered'
            value={data.product.title}
            onChange={e => {
              setProduct({ ...product, title: e.target.value })
            }}
          />
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Price</span>
          </label>
          <input
            type='text'
            placeholder='Price'
            className='input input-primary input-bordered'
            value={data.product.price}
            onChange={e => {
              setProduct({ ...product, price: e.target.value })
            }}
          />
        </div>
        <button className='btn btn-primary mt-4'>Update</button>
      </form>
    </div>
  )
}

import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import EditProduct from '../../components/product/EditProduct'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '@/app/fetcher'

export default function ProductEdit() {
  const router = useRouter()
  const { productId } = router.query
  const { data, error, mutate: refresh } = useSWR(`http://192.168.55.190:5000/products/${productId}`, fetcher)

  const [product, setProduct] = useState(data)

  const saveProduct = (e) => {
    e.preventDefault()
    axios.patch(`http://192.168.55.190:5000/products/${productId}`, {
      title: product.title,
      price: product.price,
    })
    router.push('/')
  }
  useEffect(() => {
    if (!productId) {
      return
    }
    const getProductById = async () => {
      const response = await axios.get(`http://192.168.55.190:5000/products/${productId}`)
      setProduct({
        title: response.data.title ? response.data.title : '',
        price: response.data.price ? response.data.price : '',
      })
    }
    getProductById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])
  if (!data) return ''
  return (
    <div className='mx-auto w-full p-8 md:w-1/2'>
      <Link href={'/'}>
        <a className='btn btn-sm btn-secondary'>Kembali</a>
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
            value={product?.title}
            onChange={(e) => {
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
            value={product?.price}
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value })
            }}
          />
        </div>
        <button className='btn btn-primary mt-4'>Update</button>
      </form>
    </div>
  )
}

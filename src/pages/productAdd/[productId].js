import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import EditProduct from '../../components/product/EditProduct'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ProductEdit() {
  const router = useRouter()
  console.log(router.query)
  const { productId } = router.query
  const [product, setProduct] = useState({
    title: '',
    price: '',
  })

  const saveProduct = async (e) => {
    e.preventDefault()
    await axios.patch(`http://192.168.55.190:5000/products/${productId}`, {
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

  return (
    <div className='p-8 w-full md:w-1/2 mx-auto'>
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
            value={product.title}
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
            value={product.price}
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value })
            }}
          />
        </div>
        <button className='mt-4 btn btn-primary'>Update</button>
      </form>
    </div>
  )
}

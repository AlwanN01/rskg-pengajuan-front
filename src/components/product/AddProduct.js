import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
export default function AddProduct() {
  const router = useRouter()
  const [product, setProduct] = useState({
    title: '',
    price: '',
  })

  const saveProduct = async (e) => {
    e.preventDefault()
    await axios.post('http://192.168.55.190:5000/products', {
      title: product.title,
      price: product.price,
      type: 'non organik',
    })
    router.push('/')
  }

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
        <button className='mt-4 btn btn-primary'>Save</button>
      </form>
    </div>
  )
}

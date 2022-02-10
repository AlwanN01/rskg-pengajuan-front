import axios, { Axios } from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { memo } from 'react'
import { useRouter } from 'next/router'

function ProductList({ data }) {
  const history = useRouter()

  const [products, setProducts] = useState(data.products)
  const [message, setMessage] = useState('product...')
  useEffect(() => {
    getProducts()
  }, [])
  const getProducts = async () => {
    const response = await axios.get('http://192.168.55.190:5000/products')
    setProducts(response.data.products)
    setMessage(response.data.message)
  }
  const deleteProduct = async (id) => {
    await axios.delete(`http://192.168.55.190:5000/products/${id}`)
    getProducts()
  }
  const Logout = async () => {
    try {
      await axios.delete('http://192.168.55.190:5000/logout')
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='mx-auto w-full p-2 lg:w-1/2'>
      <button onClick={Logout} className='btn btn-success'>
        Log Out
      </button>
      <Link href={'/productAdd'}>
        <a className='btn btn-primary my-4'> Add Product </a>
      </Link>
      <p>{message}</p>

      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <td>No</td>
              <th>Title</th>
              <th>Price</th>
              <th>Actionn</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className='hover border-0'>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <Link href={`/productAdd/${product.id}`}>
                    <a className='btn btn-sm btn-success w-16'>Edit</a>
                  </Link>
                  <button
                    className='btn btn-sm btn-error w-16'
                    onClick={() => {
                      deleteProduct(product.id)
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ProductList

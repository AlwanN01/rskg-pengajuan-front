/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '@/app/fetcher'
import { useTable } from 'react-table'
import Table from '../table'
function ProductList() {
  const { data: dataFetch, error, mutate } = useSWR('http://192.168.4.29:5000/products', fetcher)
  const history = useRouter()
  // useEffect(() => {
  //   mutate()
  // }, [mutate])
  const deleteProduct = async id => {
    await axios.delete(`http://192.168.4.29:5000/products/${id}`)
    // refresh()
    mutate()
  }
  const Logout = async () => {
    try {
      await axios.delete('http://192.168.4.29:5000/logout')
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const data = React.useMemo(() => dataFetch?.products, [dataFetch])
  let dataCol = dataFetch && Object?.keys(dataFetch?.products[0])
  const exclude = new Set(['id', 'createdAt', 'updatedAt']) //exclude data yang dioutput
  for (let i = 0; i < dataCol?.length; i++) {
    if (exclude.has(dataCol[i])) {
      dataCol.splice(i, 1)
      i--
    }
  }
  dataCol = dataCol?.map(data => {
    return { className: 'w-max break-words py-2 px-4', maxWidth: 150, minWidth: 100, Header: data.replace(/_/g, ' ').toUpperCase(), accessor: data }
  })
  const actionCol = {
    Header: 'Action',
    accessor: 'id',
    Cell: ({ cell }) => (
      <>
        <Link href={`/productAdd/${cell.row.values.id}`}>
          <a className='btn btn-sm btn-success w-16'>edit</a>
        </Link>
        <button
          className='btn btn-sm btn-error w-16'
          onClick={() => {
            deleteProduct(cell.row.values.id)
          }}>
          Delete
        </button>
      </>
    ),
    classNameHead: 'bg-base-200 sticky left-8 break-words p-2',
    className: 'bg-base-100 group-hover:bg-gray-700 sticky left-8 break-words p-2',
    maxWidth: 200,
    minWidth: 100
  }
  const number = {
    Header: 'NO',
    filterable: false,
    Cell: ({ row }) => <>{row.index}</>,
    classNameHead: 'bg-base-200 sticky left-0 break-words p-2',
    className: 'bg-base-100 group-hover:bg-gray-700 sticky left-0 break-words p-2',
    maxWidth: 200,
    minWidth: 0
  }
  dataCol?.unshift(actionCol)
  dataCol?.unshift(number)
  const columns = React.useMemo(() => dataCol, [dataCol])

  if (!dataFetch) return null

  //membuat array th untuk table dari datafetch object key

  const thead = Object.keys(dataFetch?.products[0])
  const tSet = new Set(['id', 'createdAt', 'updatedAt']) //exclude data yang dioutput
  for (let i = 0; i < thead.length; i++) {
    if (tSet.has(thead[i])) {
      thead.splice(i, 1)
      i--
    }
  }

  return (
    <div className='container mx-auto w-full p-2'>
      <p>tes</p>
      <button onClick={Logout} className='btn btn-success text-black dark:text-white'>
        Log Out
      </button>
      <Link href={'/productAdd'}>
        <a className='btn btn-primary my-4'> Add Product </a>
      </Link>
      <p>{dataFetch?.message}...</p>
      <div className='overflow-x-auto'>
        <Table columns={columns} data={data} />
      </div>
      {/* <div className='overflow-x-auto'>
        <table className='w-auto table-fixed'>
          <thead className='bg-base-200'>
            <tr>
              <th className='bg-base-200 sticky left-0 p-2'>Action</th>
              <td className='bg-base-200 sticky left-20 p-2'>No</td>
              {thead.map((head, index) => (
                <th key={index} className='p-2'>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataFetch?.products.map(
              (product, index) =>
                !product.id == 0 && (
                  <tr key={index} className='hover:bg-base-200 group'>
                    <td className='bg-base-100 group-hover:bg-base-200 sticky left-0 break-words p-2 '>
                      <Link href={`/productAdd/${product.id}`}>
                        <a className='btn btn-sm btn-success w-16'>edit</a>
                      </Link>
                      <button
                        className='btn btn-sm btn-error w-16'
                        onClick={() => {
                          deleteProduct(product.id)
                        }}>
                        Delete
                      </button>
                    </td>
                    <td className='bg-base-100 group-hover:bg-base-200 sticky left-20 break-words p-2'>{index}</td>
                    {Object.keys(product).map(
                      (key, index) =>
                        !tSet.has(key) && (
                          <td key={index} className='break-words py-2 px-4'>
                            {product[key]}
                          </td>
                        )
                    )}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div> */}
    </div>
  )
}
export default ProductList

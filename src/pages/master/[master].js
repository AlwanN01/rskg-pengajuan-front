import React from 'react'
import NavMaster from 'src/layout/navbar/NavMaster'

import axios from 'axios'
import Link from 'next/link'
import { memo, useMemo } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '@/app/fetcher'
import Url from 'src/config/Url'
import { useTable } from 'react-table'
export default function Index() {
  const router = useRouter()
  const { master } = router.query
  const { data: dataFetch, error, mutate } = useSWR(`${Url}/${master}`, fetcher)
  // useEffect(() => {
  //   mutate()
  // }, [mutate])

  console.log(dataFetch)
  const deleteProduct = async (id) => {
    await axios.delete(`${Url}/${master}/${id}`)
    // refresh()
    mutate()
  }

  if (!dataFetch) return null

  //membuat array th untuk table dari datafetch object key

  const thead = Object.keys(dataFetch?.[master][0])
  const tSet = new Set(['id', 'createdAt', 'updatedAt']) //exclude data yang dioutput
  for (let i = 0; i < thead.length; i++) {
    if (tSet.has(thead[i])) {
      thead.splice(i, 1)
      i--
    }
  }

  return (
    <div className='container mx-auto w-full p-2'>
      <Link href={'/productAdd'}>
        <a className='btn btn-primary my-4'> Add Data </a>
      </Link>
      <p>{dataFetch?.message}...</p>
      <div className='overflow-x-auto'>
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
            {dataFetch?.[master].map(
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
      </div>
    </div>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <>
      <NavMaster>{page}</NavMaster>
    </>
  )
}

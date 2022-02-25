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
import Table from '@/components/table'
export default function Index() {
  const router = useRouter()
  console.log(router.query)
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
  const data = React.useMemo(() => dataFetch?.[master], [dataFetch, master])
  let dataCol = dataFetch && Object?.keys(dataFetch?.[master][0])
  const exclude = new Set(['id', 'createdAt', 'updatedAt']) //exclude data yang dioutput
  for (let i = 0; i < dataCol?.length; i++) {
    if (exclude.has(dataCol[i])) {
      dataCol.splice(i, 1)
      i--
    }
  }
  dataCol = dataCol?.map((data) => {
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
    minWidth: 100,
  }
  const number = {
    Header: 'NO',
    filterable: false,
    Cell: ({ row }) => <>{row.index}</>,
    classNameHead: 'bg-base-200 sticky left-0 break-words p-2',
    className: 'bg-base-100 group-hover:bg-gray-700 sticky left-0 break-words p-2',
    maxWidth: 200,
    minWidth: 0,
  }
  dataCol?.unshift(actionCol)
  dataCol?.unshift(number)
  const columns = React.useMemo(() => dataCol, [dataCol])

  if (!dataFetch) return null

  return (
    <div className='container mx-auto w-full p-2'>
      <Link href={`${master}/add`}>
        <a className='btn btn-primary my-4'> Add Data </a>
      </Link>
      <p>{dataFetch?.message}...</p>
      <div className='overflow-x-auto'>
        <Table columns={columns} data={data} />
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

/* eslint-disable react/jsx-key */
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import fetcher from '@/app/fetcher'
import { useTable } from 'react-table'
import React from 'react'
export default function Tes({ fallbackData }) {
  const { data: dataFetch, error, mutate } = useSWR('http://192.168.55.190:5000/products', fetcher, { fallbackData })
  const history = useRouter()

  const data = React.useMemo(() => dataFetch?.products, [dataFetch])
  console.log(data)
  const dataCol = dataFetch && Object?.keys(dataFetch?.products[0])
  const exclude = new Set(['id', 'createdAt', 'updatedAt']) //exclude data yang dioutput
  for (let i = 0; i < dataCol.length; i++) {
    if (exclude.has(dataCol[i])) {
      dataCol.splice(i, 1)
      i--
    }
  }
  const cols = dataCol.map((data) => {
    return { Header: data.replace(/_/g, ' ').toUpperCase(), accessor: data }
  })

  console.log(cols)
  const columns = React.useMemo(
    () => cols,

    [cols]
  )

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',

                  background: 'aliceblue',

                  color: 'black',

                  fontWeight: 'bold',
                }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',

                      border: 'solid 1px gray',

                      background: 'papayawhip',
                    }}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export async function getServerSideProps() {
  const response = await axios.get('http://192.168.55.190:5000/products')
  return {
    props: {
      fallbackData: response.data,
    }, // will be passed to the page component as props
  }
}

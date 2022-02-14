/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import { useTable } from 'react-table'

export default function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          // loop over the rows
          rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  // loop over the rows cells
                  row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))
                }
              </tr>
            )
          })
        }
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

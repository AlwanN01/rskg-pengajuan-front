/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import { useTable, usePagination } from 'react-table'

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState: { pageSize: 6 } }, usePagination)

  return (
    <>
      <div className='sticky left-0'>
        <button className='btn btn-sm btn-active disabled:btn-disabled' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className='btn btn-sm btn-active disabled:btn-disabled' onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className='btn btn-sm btn-active disabled:btn-disabled' onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className='btn btn-sm btn-active disabled:btn-disabled' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            className='input input-sm input-bordered'
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          className='select select-sm select-bordered'
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}>
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize + 1}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table className='w-max table-fixed overflow-hidden rounded-tl-lg rounded-tr-lg' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className='bg-base-200 break-words p-2'
                  {...column.getHeaderProps({
                    className: column.classNameHead,
                    style: { minWidth: column?.minWidth, maxWidth: column?.maxWidth },
                  })}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            // loop over the rows
            page.map((row, index) => {
              prepareRow(row)
              if (!row.original.id == 0)
                return (
                  <tr className='group hover:bg-sky-400 hover:dark:bg-gray-700' {...row.getRowProps()}>
                    {/* <td className='sticky left-0 break-words p-2'>{index}</td> */}
                    {
                      // loop over the rows cells
                      row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps({
                            className: cell.column.className,
                            style: {
                              minWidth: cell.column.minWidth,
                              maxWidth: cell.column.maxWidth,
                            },
                          })}>
                          {cell.render('Cell')}
                        </td>
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
    </>
  )
}

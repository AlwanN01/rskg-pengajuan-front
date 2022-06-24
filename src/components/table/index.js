/* eslint-disable react/jsx-key */
import React, { useState, useMemo } from 'react'
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import GlobalFilter from './GlobalFilter'

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
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter
  } = useTable(
    { columns: useMemo(() => columns, [columns]), data: useMemo(() => data, [data]), initialState: { pageSize: 6 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <>
      <div className='sticky left-0 select-none'>
        <GlobalFilter filter={globalFilter} SetFilter={setGlobalFilter} />
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
            onChange={e => {
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
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}>
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize + 1}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table className='w-max table-fixed overflow-hidden rounded-tl-lg rounded-tr-lg' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className='bg-base-200 relative select-none break-words p-2'
                  {...column.getHeaderProps(column.getSortByToggleProps(), {
                    className: column.classNameHead,
                    style: { minWidth: column?.minWidth, maxWidth: column?.maxWidth }
                  })}>
                  {column.render('Header')}
                  <span
                    className={`absolute ${
                      column.isSorted ? (column.isSortedDesc ? ' left-0 bottom-0 w-full border' : ' left-0 top-0 w-full border') : ''
                    } border-green-300`}></span>
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
                  <tr className='group hover:bg-gray-700' {...row.getRowProps()}>
                    {/* <td className='sticky left-0 break-words p-2'>{index}</td> */}
                    {
                      // loop over the rows cells
                      row.cells.map(cell => (
                        <td
                          {...cell.getCellProps({
                            className: cell.column.className,
                            style: {
                              minWidth: cell.column.minWidth,
                              maxWidth: cell.column.maxWidth
                            }
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

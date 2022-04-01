import React from 'react'

export default function GlobalFilter({ filter, SetFilter }) {
  return (
    <div>
      <span>Search: </span>
      <input
        value={filter || ''}
        className='input input-bordered input-sm my-2 bg-gray-600'
        onChange={(e) => {
          SetFilter(e.target.value)
        }}
      />
    </div>
  )
}

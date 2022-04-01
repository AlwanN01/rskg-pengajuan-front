import React from 'react'

//component floating label input with tailwind css
export default function Input({ label, ...props }) {
  return (
    <div className='relative'>
      <input
        className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
        {...props}
      />
      <label className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3' htmlFor={props.id}>
        <span className='text-gray-700'>{label}</span>
      </label>
    </div>
  )
}

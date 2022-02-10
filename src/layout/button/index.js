import React from 'react'

export default function Button({ children, className, ...restProps }) {
  return (
    <button {...restProps} className={`${className} text-white bg-primary hover:bg-primary-focus px-4 py-2 text-sm transition rounded-lg`}>
      {children}
    </button>
  )
}

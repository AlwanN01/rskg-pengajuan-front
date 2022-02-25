import React from 'react'
import { useState, useEffect, useRef, createRef, useCallback } from 'react'
import $ from 'jQuery'
import useTitle from 'src/utils/useTitle'
export default function Tes() {
  const [count, setCount] = useState(0)
  const [{ one, two }, setObj] = useState({ one: 1, two: 2 })
  useEffect(() => {
    document.title = `You clicked ${count} times`
    $('p').on('click', function () {
      $(this).toggleClass('bg-sky-400')
    })
    return () => {
      document.title = 'Local Host'
    }
  }, [count])
  const [document_title, setDoucmentTitle] = useTitle('Home page')
  const ref = useRef()
  const checkboxref = createRef()

  const handleOnClick = useCallback(
    (e) => {
      console.log(e)
      const node = checkboxref.current
      if (node) {
        node.focus()
        node.select()
      }
    },
    [checkboxref]
  )
  console.log(two)
  return (
    <div>
      <input type='checkbox' id='check' className='peer hidden' />
      <div className='relative h-[50vh] w-[50vh] bg-gray-200 transition-all peer-checked:w-[20vh] peer-checked:bg-blue-500'>
        <label htmlFor='check' className='btn btn-ghost absolute right-0 text-black'>
          {' '}
          toggle{' '}
        </label>
        <p className='text-black'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, aliquam.</p>
      </div>

      {/* <input type='checkbox' ref={checkboxref} />
      <p className='tes bro'>If you click on me, I will disappear.</p>
      <p>Click me away!</p>
      <p>Click me too!</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <br />
      <button onClick={() => setDoucmentTitle('About page')}>Change document title</button>
      <br />
      <button onClick={handleOnClick}>cek ref</button> */}
    </div>
  )
}

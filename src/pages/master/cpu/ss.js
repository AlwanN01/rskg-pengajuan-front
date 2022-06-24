import axios, { Axios } from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NavMaster from 'src/layout/navbar/NavMaster'
export default function Index({ data }) {
  const [dataList, setDataList] = useState(data)
  const [message, setMessage] = useState('')
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get('http://192.168.4.29:5000/cpu')
    setDataList(response.data.cpus)
    setMessage(response.data.message)
  }
  const deleteData = async id => {
    await axios.delete(`http://192.168.4.29:5000/cpu/${id}`)
    getData()
  }
  return (
    <div className='mx-auto w-full p-2 lg:w-1/2'>
      <Link href={'/master/cpu/add'}>
        <a className='btn btn-primary my-4'>Tambah Data </a>
      </Link>

      <div className='overflow-x-auto'>
        <table className='table w-full table-fixed'>
          <thead>
            <tr>
              <td>No</td>
              <th>cpu_id</th>
              <th>hardware_category_id</th>
              <th>Actionn</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr key={index} className='hover border-0'>
                <td>{index + 1}</td>
                <td className='whitespace-pre-line'>{data.cpu_id}</td>
                <td>{data.hardware_category_id}</td>
                <td>
                  <Link href={`/productAdd/${data.id}`}>
                    <a className='btn btn-sm btn-success w-16'>Edit</a>
                  </Link>
                  <button
                    className='btn btn-sm btn-error w-16'
                    onClick={() => {
                      deleteData(data.id)
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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

export async function getServerSideProps() {
  const response = await axios.get('http://192.168.4.29:5000/cpu')
  return {
    props: {
      data: response.data.cpus
    } // will be passed to the page component as props
  }
}

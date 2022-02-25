import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import fetcher from '@/app/fetcher'
import useSWR from 'swr'
import Url from 'src/config/Url'
import axios from 'axios'
import Select from 'react-select'
import Image from 'next/image'
export default function Index() {
  const router = useRouter()
  const { master } = router.query
  const { data: dataFetch, error, mutate } = useSWR(`${Url}/pegawai`, fetcher)
  const { data: dataWilayah } = useSWR(`${Url}/wilayah`, fetcher)
  const [data, setData] = useState()

  const [datakotaByID, setDatakotaByID] = useState()
  const [dataKecByID, setDataKecByID] = useState()
  const [dataKelByID, setDataKelByID] = useState()
  const [valueSelectKota, setValueSelectKota] = useState()
  const [valueSelectKec, setValueSelectKec] = useState()
  const [valueSelectKel, setValueSelectKel] = useState()

  const [image, setImage] = useState('https://fakeimg.pl/350x200/')
  const [saveImage, setSaveImage] = useState(null)

  const dataKey = dataFetch && Object?.keys(dataFetch?.pegawai[0])
  const exclude = new Set(['id', 'createdAt', 'updatedAt']) //exclude data yang dioutput
  for (let i = 0; i < dataKey?.length; i++) {
    if (exclude.has(dataKey[i])) {
      dataKey.splice(i, 1)
      i--
    }
  }

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }
  const onChangeWilayah = async (e, input) => {
    const { name } = input
    setData({
      ...data,
      [name]: e.value,
    })

    const response = await axios.get(`${Url}/kota/${e.id}`)
    response = response?.data?.kota
    response = response?.map((data) => {
      return { value: data.nama, label: data.nama, id: data.kode }
    })
    setDatakotaByID(response)
    setValueSelectKota(null)
    setValueSelectKec(null)
    setValueSelectKel(null)
    setDataKecByID([])
    setDataKelByID([])
  }
  const onChangeKota = async (e, input) => {
    const { name } = input
    setData({
      ...data,
      [name]: e.value,
    })
    const response = await axios.get(`${Url}/kec/${e.id}`)
    response = response?.data?.kota
    response = response?.map((data) => {
      return { value: data.nama, label: data.nama, id: data.kode }
    })
    setValueSelectKota(e)
    setDataKecByID(response)
    setValueSelectKec(null)
    setValueSelectKel(null)
    setDataKelByID([])
  }
  const onChangeKec = async (e, input) => {
    const { name } = input
    setData({
      ...data,
      [name]: e.value,
    })
    const response = await axios.get(`${Url}/kel/${e.id}`)
    response = response?.data?.kota
    response = response?.map((data) => {
      return { value: data.nama, label: data.nama, id: data.kode }
    })
    setValueSelectKec(e)
    setDataKelByID(response)
    setValueSelectKel(null)
  }
  const onChangeKel = async (e, input) => {
    const { name } = input
    setData({
      ...data,
      [name]: e.value,
    })
    setValueSelectKel(e)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    axios.post(`${Url}/pegawai`, data).then(mutate())
    router.push(`/master/pegawai`)
  }

  const onUpload = (e) => {
    let uploaded = e.target.files[0]
    setImage(URL.createObjectURL(uploaded))
  }
  // console.log(data)
  if (!dataFetch) return null
  const options = dataWilayah?.wilayah
  options = options?.map((data) => {
    return { value: data.nama, label: data.nama, id: data.kode }
  })

  // const optionsKota = datakotaByID?.kota
  // optionsKota = optionsKota?.map((data) => {
  //   return { value: data.nama, label: data.nama, id: data.kode }
  // })
  return (
    <div className='mx-auto w-full p-8 md:w-1/2'>
      <a className='btn btn-sm btn-secondary' onClick={() => router.push(`/master/pegawai`)}>
        Kembali
      </a>
      <div className='mt-5'></div>
      <div className='flex h-52 items-center justify-center'>
        <div className='mx-auto mt-5'>
          <Image src={image} className='' alt='' width={350} height={200} />
        </div>
        <input
          type='file'
          name='image'
          id='formFile'
          accept='image/*'
          className='file:bg-secondary hover:file:bg-secondary-focus file:text-base-content block text-sm text-slate-500
      file:mr-4 file:rounded-full
      file:border-0 file:py-2
      file:px-4 file:text-sm
      file:font-semibold'
          onChange={onUpload}
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Wilayah Provinsi</span>
        </label>
        <Select
          className='my-react-select-container'
          classNamePrefix='my-react-select'
          name='wilayah'
          onChange={(e, input) => onChangeWilayah(e, input)}
          options={options}
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Kota / Kabupaten</span>
        </label>
        <Select
          value={valueSelectKota}
          className='my-react-select-container'
          classNamePrefix='my-react-select'
          name='kab_kota'
          onChange={(e, input) => onChangeKota(e, input)}
          options={datakotaByID}
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Kecamatan </span>
        </label>
        <Select
          value={valueSelectKec}
          className='my-react-select-container'
          classNamePrefix='my-react-select'
          name='kecamatan'
          onChange={(e, input) => onChangeKec(e, input)}
          options={dataKecByID}
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Kelurahan </span>
        </label>
        <Select
          value={valueSelectKel}
          className='my-react-select-container'
          classNamePrefix='my-react-select'
          name='kelurahan'
          onChange={(e, input) => onChangeKel(e, input)}
          options={dataKelByID}
        />
      </div>

      <form onSubmit={onSubmit}>
        {dataKey.map((key, index) => (
          <div key={index} className='form-control'>
            <label className='label'>
              <span className='label-text'>{key.replace(/_/g, ' ')}</span>
            </label>
            <input
              type='text'
              placeholder={key.replace(/_/g, ' ')}
              name={key}
              className='input input-primary input-bordered'
              value={data?.[key] || ''}
              onChange={(e) => {
                onChange(e)
              }}
            />
          </div>
        ))}

        <button type='submit' className='btn btn-primary mt-4'>
          Save
        </button>
      </form>
    </div>
  )
}

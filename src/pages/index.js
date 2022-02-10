/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'

import ProductList from '../components/product/ProductList'
import AuthCheck from '../auth'
import Navbar from 'src/layout/navbar'
export default function Home({ data }) {
  AuthCheck()
  return (
    <>
      <Navbar />
      <ProductList data={data} />
    </>
  )
}
export async function getServerSideProps(context) {
  const response = await axios.get('http://192.168.55.190:5000/products')
  return {
    props: {
      data: response.data,
    }, // will be passed to the page component as props
  }
}

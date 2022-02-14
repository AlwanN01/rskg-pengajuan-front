/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import AuthCheck from 'src/auth'
import ProductList from '../components/product/ProductList'
import Navbar from 'src/layout/navbar'
import { SWRConfig } from 'swr'
export default function Home() {
  // AuthCheck()
  return (
    <>
      <Navbar />
      {/* <SWRConfig value={{ fallback }}> */}
      <ProductList />
      {/* </SWRConfig> */}
    </>
  )
}
// export async function getServerSideProps() {
//   const response = await axios.get('http://192.168.55.190:5000/products')
//   return {
//     props: {
//       fallback: { 'http://192.168.55.190:5000/products': response.data },
//     }, // will be passed to the page component as props
//   }
// }

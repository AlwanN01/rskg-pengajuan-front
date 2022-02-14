import AuthCheck from '../auth'
import Navbar from 'src/layout/navbar'
export default function Cpu() {
  return (
    <>
      <Navbar />
    </>
  )
}

export async function getServerSideProps(context) {
  const response = await axios.get('http://192.168.55.190:5000/cpu')
  return {
    props: {
      data: response.data,
    }, // will be passed to the page component as props
  }
}

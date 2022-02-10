import AuthCheck from '../auth'
import Navbar from 'src/layout/navbar'
export default function Home() {
  AuthCheck()
  return (
    <>
      <Navbar />
    </>
  )
}

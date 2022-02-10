import '../styles/globals.css'
import axios from 'axios'
axios.defaults.withCredentials = true

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

export default MyApp

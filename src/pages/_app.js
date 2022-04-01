import '../styles/globals.css'
import axios from 'axios'
import { ThemeProvider } from 'next-themes'
axios.defaults.withCredentials = true

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <ThemeProvider defaultTheme='system' attribute='data-theme'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

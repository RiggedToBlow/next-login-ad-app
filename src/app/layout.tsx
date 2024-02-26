// app/layout.tsx
import Navbar from '../components/navbar'
import { Providers } from './providers'

export default  async function RootLayout({
  children,
  
}: {
  children: React.ReactNode,
  
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Navbar/>
          {children}
          </Providers>
      </body>
    </html>
  )
}
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import Authprovider from './component/Authprovider'
import { Toaster } from './component/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
    <Authprovider>
      {/* <Header /> */}
      {/* <main className="max-w-7xl mx-auto p-4"> */}

      {children}
     
      {/* </main> */}
      <Toaster/>
      </Authprovider>
      
      </body>
    </html>
  )
}

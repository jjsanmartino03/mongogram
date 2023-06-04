import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Providers from 'utils/context'
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mongogram',
  description: 'Generated by create next app',
  icons: 'favicon.ico'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  getServerSession()

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers session={null}>{children}</Providers>
      </body>
    </html>
  )
}

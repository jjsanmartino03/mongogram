import './globals.css'
import { Ubuntu } from 'next/font/google'
import { Metadata } from 'next'
import Providers from '../context'
import { getServerSession } from 'next-auth'
import Navbar from '@common/navbar'
import { authConfig } from './api/auth/[...nextauth]/route'

const ubuntu = Ubuntu({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Mongogram',
  description: 'Generated by create next app',
  icons: 'icon.png'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig)

  return (
    <html lang='en'>
      <body className={ubuntu.className}>
        <main className='flex justify-center w-screen min-h-screen flex-col text-black'>
          <Providers session={session}>
            <Navbar />
            <div className={'flex flex-col flex-1 px-3 items-center justify-center'}>{children}</div>
          </Providers>
        </main>
      </body>
    </html>
  )
}

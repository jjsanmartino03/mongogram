'use client'
import Button from '@components/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Navbar from '@components/navbar'

export default function Home() {
  const session = useSession()

  return (
    <div className={'flex flex-col flex-1 px-3 items-center justify-center'}>
      <div
        className={
          'flex flex-col p-5 gap-3 bg-white lg:w-5/12 md:w-2/4 h-72 rounded-lg items-center justify-between shadow-lg'
        }
      >
        <div className={'flex gap-3'}>
          <Image src={'/icon.png'} width={40} height={20} alt={'Ícono de la app'} />
          <h1 className={'text-4xl font-bold'}>Mongogram</h1>
        </div>
        <div>
          Mongogram es una aplicación hecha con fines educativos, y funciona como una mini red social básica. Se pueden
          crear posts y ver los posts de los demás usuarios. Para acceder deberás vincular tu cuenta de Google. 👇
        </div>
        <Button
          variant={'link'}
          onClick={() =>
            signIn('google', {
              callbackUrl: 'http://localhost:3000/feed'
            })
          }
        >
          Ingresar con Google
        </Button>
        {session.data && (
          <>
            <img className={'rounded-full'} src={session?.data?.user?.image || ''} />
            <div>{session?.data?.user?.name}</div>
            <Button theme={'danger'} onClick={() => signOut()}>
              Salir
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

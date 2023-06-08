'use client'
import Button from '@common/button'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { pages } from '@utils/pages'

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
        {session.status === 'authenticated' ? (
          <Button theme={'primary'} variant={'link'} href={pages.feed}>
            Ir a mi feed
          </Button>
        ) : (
          <Button
            variant={'outline'}
            onClick={() =>
              signIn('google', {
                callbackUrl: pages.feed
              })
            }
            className={'flex gap-2 items-center'}
          >
            <Image src={'google.svg'} alt={'Google logo'} width={30} height={30} />
            Ingresar con Google
          </Button>
        )}
      </div>
    </div>
  )
}

'use client'
import { Fragment, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FaBars, FaDoorOpen, FaSignOutAlt } from 'react-icons/fa'
import Button from '@components/button'
import { pages } from '@utils/pages'
import CustomLink from '@components/link'
import Image from 'next/image'

export default function Navbar() {
  const session = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(isMenuOpen => !isMenuOpen)

  const links =
    session.status === 'authenticated'
      ? [
          <CustomLink key={0} href={pages.feed}>
            Feed
          </CustomLink>,
          <CustomLink key={1} href={'/posts'}>
            Usuarios
          </CustomLink>,

          <Button
            key={2}
            className={'flex gap-1 px-0.5 py-0 items-center'}
            variant={'link'}
            theme={'danger'}
            onClick={signOut}
          >
            <FaSignOutAlt /> Salir
          </Button>,
          <div className={'flex items-center gap-1'} key={2}>
            <img
              width={35}
              className={'rounded-full'}
              height={35}
              src={session.data?.user?.image ?? ''}
              alt={'Foto de perfil del usuario'}
            />{' '}
            {session.data?.user?.name}
          </div>
        ]
      : [
          <CustomLink href={pages.home} key={0}>
            Home
          </CustomLink>,
          <Button
            className={'px-0'}
            variant={'link'}
            key={1}
            onClick={() =>
              signIn('google', {
                callbackUrl: 'http://localhost:3000/feed'
              })
            }
          >
            Iniciar Sesión
          </Button>
        ]

  return (
    <nav className={'w-screen flex flex-col justify-center lg:items-center bg-white shadow px-3'}>
      <div className={'w-full lg:w-[1024px]'}>
        <div className={'flex items-center justify-between py-2'}>
          <CustomLink href={'/'} className={'flex items-center gap-2'}>
            <img src={'/icon.png'} width={35} height={17} alt={'Ícono de la app'} />
            <h1 className={'text-xl font-semibold'}>Mongogram</h1>
          </CustomLink>
          <div className={'md:flex items-center hidden gap-3'}>
            {links.map((link, index) => (
              <Fragment key={index}>{link}</Fragment>
            ))}
          </div>
          <Button onClick={toggleMenu} variant={'outline'} theme={'secondary'} className={'md:hidden'}>
            <FaBars />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className={'border-t-2 md:hidden py-2 gap-2 flex flex-col'}>
          {links.map((link, index) => (
            <div className={'border-s-2 px-0.5'} key={index}>
              {link}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}

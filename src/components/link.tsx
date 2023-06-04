import Link from 'next/link'
import clsx from 'clsx'

type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}
export default function CustomLink({ href, children, className }: LinkProps) {
  return (
    <Link className={clsx('hover:underline', className)} href={href}>
      {children}
    </Link>
  )
}

import { ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: ReactNode
  variant?: 'outline' | 'solid' | 'link'
  theme?: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
  className?: string
}
export default function Button({ children, className, ...props }: ButtonProps) {
  const { variant = 'solid', theme = 'primary', onClick } = props

  const classes = clsx(
    'font-bold py-2 px-4 rounded',
    {
      'bg-blue-500 hover:bg-blue-700 text-white': variant === 'solid' && theme === 'primary',
      'bg-gray-500 hover:bg-gray-700 text-white': variant === 'solid' && theme === 'secondary',
      'bg-red-500 hover:bg-red-700 text-white': variant === 'solid' && theme === 'danger',
      'bg-transparent border-2': variant === 'outline',
      'text-red-500 border-red-500 hover:bg-red-100': variant === 'outline' && theme === 'danger',
      'text-black border-black-500 hover:bg-gray-100': variant === 'outline' && theme === 'secondary',
      'text-blue-500 border-blue-500 hover:bg-blue-100': variant === 'outline' && theme === 'primary',
      'bg-transparent hover:underline': variant === 'link',
      'text-red-500': variant === 'link' && theme === 'danger',
      'text-black': variant === 'link' && theme === 'secondary',
      'text-blue-500': variant === 'link' && theme === 'primary'
    },
    className
  )

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

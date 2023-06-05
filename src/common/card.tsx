import clsx from 'clsx'

export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx('bg-white w-full rounded-xl shadow-xl py-2 px-2 lg:py-3 lg:px-5', className)}>{children}</div>
  )
}

import clsx from 'clsx'

export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('bg-white w-full rounded-xl shadow-xl py-3 px-5', className)}>{children}</div>
}

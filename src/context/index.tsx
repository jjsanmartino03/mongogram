'use client'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export default function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}

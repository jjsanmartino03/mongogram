import { getServerSession } from 'next-auth'
import { authConfig } from '../app/api/auth/[...nextauth]/route'

export const getCustomSession = () => {
  return getServerSession<
    typeof authConfig,
    {
      user: {
        id: string
        name: string
        email: string
        image: string
      }
    }
  >(authConfig)
}

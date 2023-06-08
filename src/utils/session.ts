import { getServerSession } from 'next-auth'
import { authConfig } from '@utils/config'

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

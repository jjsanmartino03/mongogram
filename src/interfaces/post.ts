import { ObjectId } from 'mongodb'
import { User } from '@interfaces/user'

export interface Post {
  content: string
  createdAt: string
  updatedAt: string
  userId: any
  _id?: string
}

export interface PostWithUser extends Post {
  user: User
}

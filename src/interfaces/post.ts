import { ObjectId } from 'mongodb'
import { User } from '@interfaces/user'

export interface Post {
  content: string
  createdAt: string
  updatedAt: string
  userId: any
  likes?: string[]
}

export interface PostWithStringId extends Post {
  _id: string
}

export interface PostWithUser extends PostWithStringId {
  user: User
}

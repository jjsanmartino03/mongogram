import { ObjectId } from 'mongodb'
import { User } from '@interfaces/user'

export interface Comment<IdType = ObjectId, WithUser = true> {
  _id: string
  content: string
  createdAt: string
  updatedAt: string
  userId: any
  user?: User
}
export interface Post {
  content: string
  createdAt: string
  updatedAt: string
  userId: any
  likes?: string[]
  comments?: Comment[]
}

export interface PostWithStringId extends Post {
  _id: string
}

export interface PostWithUser extends PostWithStringId {
  user: User
}

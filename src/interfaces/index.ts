export type withId<T> = T & { _id: string }
export type PaginatedData<T> = {
  items: T[]
  page: number
}
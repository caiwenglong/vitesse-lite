export interface LifeMottoItem {
  id: string
  creator: string
  creator_avatar: string
  motto_text: string
  like: number
  dislike: number
  createAt: Date
}

export interface ApiResponse<T> {
  status: number
  data: Array<T>
}

import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface NewsState {
  news?: News[]
  newsToAdd: NewsToAdd
  isUpdate: boolean
  isUpdateId?: string
  singleNews?: SingleNews
  addNewsStatus: LoadingStatus
  updateNewsStatus: LoadingStatus
  deleteNewsStatus: LoadingStatus
  addNewsImageStatus: LoadingStatus
  fetchNewsStatus: LoadingStatus
  fetchSingleNewsStatus: LoadingStatus
}

export interface NewsToAdd {
  title?: string
  intro?: string
  newsBody?: string
  image?: string
  time?: number
}

export interface News {
  id: string
  newsDetails?: NewsDetails
}

export interface NewsDetails {
  title: string
  intro: string
  newsBody: string
  image: string
  imageUrl?: string
  time?: string
}

export interface SingleNews {
  newsDetails?: NewsDetails
}
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface NewsState {
  news?: News[]
  newsToAdd: NewsToAdd
  singleNews?: SingleNews
  addNewsStatus: LoadingStatus
  addNewsImageStatus: LoadingStatus
  fetchNewsStatus: LoadingStatus
  fetchSingleNewsStatus: LoadingStatus
}

export interface NewsToAdd {
  title?: string
  intro?: string
  newsBody?: string
  image?: string
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
}

export interface SingleNews {
  newsDetails?: NewsDetails
}
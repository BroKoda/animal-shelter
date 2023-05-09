import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface NewsState {
  news?: News[]
  newNews: NewsToAdd
  addNewsStatus: LoadingStatus
  fetchNewsStatus: LoadingStatus
}

export interface NewsToAdd {
  title?: string
  intro?: string
  newsBody?: string
}

export interface News {
  id: string
  newsDetails?: NewsDetails
}

export interface NewsDetails {
  title: string
  intro: string
  newsBody: string
}
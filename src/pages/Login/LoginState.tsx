import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface LoginState {
  userToLogin: LoginDetails
  loggedInUser?: any
  error?: string
  status: LoadingStatus
}

export interface LoginDetails {
  email?: string
  password?: string
}
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface LoginState {
  userToLogin: LoginDetails
  user?: User
  error?: string
  userStatus: LoadingStatus
  signOutUserStatus: LoadingStatus
  status: LoadingStatus
}

export interface LoginDetails {
  email?: string
  password?: string
}

export interface User {
  email: string | null
  firstName: string
  lastName: string
}
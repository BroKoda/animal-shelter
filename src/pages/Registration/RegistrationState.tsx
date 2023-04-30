import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface RegistrationState {
  userToCreate: UserToCreate
  status: LoadingStatus
}

export interface User {
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface UserToCreate {
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  password?: string
}
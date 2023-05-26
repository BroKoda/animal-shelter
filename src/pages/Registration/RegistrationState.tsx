import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface RegistrationState {
  userToCreate: UserToCreate
  status: LoadingStatus
}

export interface UserToCreate {
  firstName?: string
  lastName?: string
  role?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
}
import { User } from '../Login/LoginState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface DashboardState {
  users?: Users[],
  status: LoadingStatus
}

export interface Users {
  id: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: string
}
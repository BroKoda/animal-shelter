import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface ContactState {
  emailToSend: Email
  sendStatus: LoadingStatus
}

export interface Email {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  message?: string
}

import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface ResidentsState {
  residentToAdd: Animal
  residentDetails?: ResidentDetails
  residents?: Resident[]
  addNewResidentStatus: LoadingStatus
  fetchResidentsStatus: LoadingStatus
  fetchResidentDetailsStatus: LoadingStatus
}

export interface Resident {
  id: string
  animal?: Animal
}

export interface Animal {
  id?: string
  name?: string
  color?: string
  size?: string
  birthDate?: string
  arrivalDate?: string
  description?: string
}

export interface ResidentDetails {
  animal?: Animal
}
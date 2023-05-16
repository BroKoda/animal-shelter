import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface ResidentsState {
  residentToAdd: Animal
  residentDetails?: ResidentDetails
  residents?: Resident[]
  fetchResidentsStatus: LoadingStatus
  addNewResidentStatus: LoadingStatus
  addNewResidentImageStatus: LoadingStatus
  fetchResidentImageStatus: LoadingStatus
  fetchResidentDetailsStatus: LoadingStatus
}

export interface Resident {
  id: string
  animal?: Animal
}

export interface Animal {
  id?: string
  name?: string
  type?: string
  color?: string
  size?: string
  birthDate?: string
  arrivalDate?: string
  description?: string
  image?: string
  imageUrl?: string
}

export interface ResidentDetails {
  animal?: Animal
}
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface AddNewAnimalState {
  animalToAdd: Animal
  status: LoadingStatus
}

export interface Animal {
  name?: string
  color?: string
  size?: string
  birthDate?: string
  arrivalDate?: string
  description?: string
}
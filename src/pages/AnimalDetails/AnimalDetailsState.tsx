import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { Animal } from '../AddNewAnimal/AddNewAnimalState'

export interface AnimalDetailsState {
  animalDetails?: AnimalDetails
  status: LoadingStatus
}

export interface AnimalDetails {
  animal?: Animal
}
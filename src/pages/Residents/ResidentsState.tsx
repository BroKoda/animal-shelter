import { Animal } from '../AddNewAnimal/AddNewAnimalState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

export interface ResidentsState {
  residents?: Resident[]
  status: LoadingStatus
}

export interface Resident {
  id: string
  animal?: Animal
}
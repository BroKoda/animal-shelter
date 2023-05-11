import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { News } from '../News/NewsState'
import { Resident } from '../Residents/ResidentsState'

export interface HomeState {
  news?: News[]
  residents?: Resident[]
  fetchNewsStatus: LoadingStatus
  fetchResidentsStatus: LoadingStatus
}
import { RegistrationState } from './RegistrationState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: RegistrationState = {
  userToCreate: {},
  status: LoadingStatus.initial
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistration: () => initialState,
    setFirstName: (state: RegistrationState, action: PayloadAction<string>) => {
      state.userToCreate.firstName = action.payload
    }
  },
  extraReducers: {}
})

export const { setFirstName, resetRegistration } = registrationSlice.actions
export const selectRegistration = (state: RootState) => state.registration
export default registrationSlice.reducer
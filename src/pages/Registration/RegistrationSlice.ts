import { RegistrationState, UserToCreate } from './RegistrationState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const initialState: RegistrationState = {
  userToCreate: {},
  status: LoadingStatus.initial
}

export const registerUser = createAsyncThunk('registerUser', async ({ email, password }: UserToCreate) => {
  if (email != null && password != null) {
    const response = await createUserWithEmailAndPassword(getAuth(), email, password)
    return response
  }
})

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistration: () => initialState,
    setEmail: (state: RegistrationState, action: PayloadAction<string>) => {
      state.userToCreate.email = action.payload
    },
    setPassword: (state: RegistrationState, action: PayloadAction<string>) => {
      state.userToCreate.password = action.payload
    },
    setConfirmPassword: (state: RegistrationState, action: PayloadAction<string>) => {
      state.userToCreate.confirmPassword = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = LoadingStatus.loading
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = LoadingStatus.complete
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = LoadingStatus.error
      })
  }
})

export const { resetRegistration, setEmail, setPassword, setConfirmPassword } = registrationSlice.actions
export const selectRegistration = (state: RootState) => state.registration
export default registrationSlice.reducer
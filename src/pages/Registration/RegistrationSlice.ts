import { RegistrationState, UserToCreate } from './RegistrationState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'

const initialState: RegistrationState = {
  userToCreate: {},
  status: LoadingStatus.initial
}

export const registerUser = createAsyncThunk('registerUser', async (userToCreate: UserToCreate) => {
  const { firstName, lastName, email, password } = userToCreate
  try {
    if (email != null && password != null) {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, 'users'), { firstName, lastName, email, role: 'visitor' })
      return user
    }
  } catch (e) {
    return console.log(e)
  }
})

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistration: () => initialState,
    setFirstName: (state: RegistrationState, action: PayloadAction<string>) => {
      state.userToCreate.firstName = action.payload
    },
    setLastName: (state: RegistrationState, action: PayloadAction<string>) => {
      state.userToCreate.lastName = action.payload
    },
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

export const {
  resetRegistration,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword
} = registrationSlice.actions
export const selectRegistration = (state: RootState) => state.registration
export default registrationSlice.reducer
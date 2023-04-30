import { LoginDetails, LoginState } from './LoginState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const initialState: LoginState = {
  userToLogin: {},
  status: LoadingStatus.initial
}

export const logInUser = createAsyncThunk('logInUser', async ({email, password}: LoginDetails) => {
  if (email != null && password != null) {
    const response = await signInWithEmailAndPassword(getAuth(), email, password)
    return response
  }
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLogin: () => initialState,
    setLoginEmail: (state: LoginState, action: PayloadAction<string>) => {
      state.userToLogin.email = action.payload
    },
    setLoginPassword: (state: LoginState, action: PayloadAction<string>) => {
      state.userToLogin.password = action.payload
    }
  },
  extraReducers: builder =>  {
    builder
      .addCase(logInUser.pending, (state) => {
        state.status = LoadingStatus.loading
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = LoadingStatus.complete
        state.loggedInUser = action.payload
      })
      .addCase(logInUser.rejected, (state) => {
        state.status = LoadingStatus.error
        state.error = 'Nem megfelelő email cím vagy jelszó'
      })
  }
})

export const { resetLogin, setLoginEmail, setLoginPassword } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login
export default loginSlice.reducer

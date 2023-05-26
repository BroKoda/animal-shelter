import { LoginDetails, LoginState, User } from './LoginState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const initialState: LoginState = {
  userToLogin: {},
  status: LoadingStatus.initial,
  userStatus: LoadingStatus.initial,
  signOutUserStatus: LoadingStatus.initial
}

export const logInUser = createAsyncThunk('logInUser', async ({email, password}: LoginDetails) => {
  if (email != null && password != null) {
    await signInWithEmailAndPassword(getAuth(), email, password)
    return true
  }
})

export const getUserDetails = createAsyncThunk('getUserDetails', async (email: string | null) => {
  if (email != null) {
    const userData = await getDocs(query(collection(db, 'users'), where('email', '==', email)))
    return userData.docs[0].data() as User
  }
})

export const signOutUser = createAsyncThunk('signOutUser', async () => {
  const auth = getAuth()
  await signOut(auth)
  return true
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
    },
  },
  extraReducers: builder =>  {
    builder
      .addCase(logInUser.pending, (state) => {
        state.status = LoadingStatus.loading
      })
      .addCase(logInUser.fulfilled, (state) => {
        state.status = LoadingStatus.complete
      })
      .addCase(logInUser.rejected, (state) => {
        state.status = LoadingStatus.error
        state.error = 'Nem megfelelő email cím vagy jelszó!'
      })
      .addCase(getUserDetails.pending, (state) => {
        state.userStatus = LoadingStatus.loading
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userStatus = LoadingStatus.complete
        state.user = action.payload
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.userStatus = LoadingStatus.error
      })
      .addCase(signOutUser.pending, (state) => {
        state.signOutUserStatus = LoadingStatus.loading
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.signOutUserStatus = LoadingStatus.complete
      })
      .addCase(signOutUser.rejected, (state) => {
        state.signOutUserStatus = LoadingStatus.error
      })
  }
})

export const { resetLogin, setLoginEmail, setLoginPassword } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login
export default loginSlice.reducer

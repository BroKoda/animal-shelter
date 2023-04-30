import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import loginReducer from '../pages/Login/LoginSlice'
import registrationReducer from '../pages/Registration/RegistrationSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

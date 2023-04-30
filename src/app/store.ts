import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import registrationReducer from '../pages/Registration/RegistrationSlice'

export const store = configureStore({
  reducer: {
    registration: registrationReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

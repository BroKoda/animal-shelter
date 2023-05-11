import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import homeReducer from '../pages/Home/HomeSlice'
import loginReducer from '../pages/Login/LoginSlice'
import registrationReducer from '../pages/Registration/RegistrationSlice'
import residentsReducer from '../pages/Residents/ResidentsSlice'
import newsReducer from '../pages/News/NewsSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    news: newsReducer,
    login: loginReducer,
    residents: residentsReducer,
    registration: registrationReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import homeReducer from '../pages/Home/HomeSlice'
import loginReducer from '../pages/Login/LoginSlice'
import registrationReducer from '../pages/Registration/RegistrationSlice'
import residentsReducer from '../pages/Residents/ResidentsSlice'
import newsReducer from '../pages/News/NewsSlice'
import contactReducer from '../pages/Contact/ContactSlice'
import dashboardReducer from '../pages/Dashboard/DashboardSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    news: newsReducer,
    login: loginReducer,
    contact: contactReducer,
    dashboard: dashboardReducer,
    residents: residentsReducer,
    registration: registrationReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import loginReducer from '../pages/Login/LoginSlice'
import registrationReducer from '../pages/Registration/RegistrationSlice'
import addNewAnimalReducer from '../pages/AddNewAnimal/AddNewAnimalSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
    newAnimal: addNewAnimalReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

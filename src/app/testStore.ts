import homeReducer from '../pages/Home/HomeSlice'
import loginReducer from '../pages/Login/LoginSlice'
import registrationReducer from '../pages/Registration/RegistrationSlice'
import residentsReducer from '../pages/Residents/ResidentsSlice'
import newsReducer from '../pages/News/NewsSlice'
import contactReducer from '../pages/Contact/ContactSlice'
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'

const testRootReducer = combineReducers({
  home: homeReducer,
  news: newsReducer,
  login: loginReducer,
  contact: contactReducer,
  residents: residentsReducer,
  registration: registrationReducer
})

export function setupStore(preloadedState?: PreloadedState<TestRootReducer>): any {
  return configureStore({
    reducer: testRootReducer,
    preloadedState
  })
}

export type TestAppStore = ReturnType<typeof setupStore>
export type TestRootReducer = ReturnType<typeof testRootReducer>
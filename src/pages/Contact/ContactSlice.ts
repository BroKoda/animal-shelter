import { ContactState } from './ContactState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: ContactState = {
  emailToSend: {},
  sendStatus: LoadingStatus.initial
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact: () => initialState,
    setFirstName: (state: ContactState, action: PayloadAction<string>) => {
      state.emailToSend.firstName = action.payload
    },
    setLastName: (state: ContactState, action: PayloadAction<string>) => {
      state.emailToSend.lastName = action.payload
    },
    setEmail: (state: ContactState, action: PayloadAction<string>) => {
      state.emailToSend.email = action.payload
    },
    setPhone: (state: ContactState, action: PayloadAction<string>) => {
      state.emailToSend.phone = action.payload
    },
    setMessage: (state: ContactState, action: PayloadAction<string>) => {
      state.emailToSend.message = action.payload
    },
  }
})

export const { resetContact, setFirstName, setLastName, setEmail, setPhone, setMessage } = contactSlice.actions
export const selectContact = (state: RootState) => state.contact
export default contactSlice.reducer
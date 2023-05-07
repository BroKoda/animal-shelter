import { Resident, ResidentsState } from './ResidentsState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const initialState: ResidentsState = {
  residents: [],
  status: LoadingStatus.initial
}

export const fetchResidents = createAsyncThunk('fetchResidents', async () => {
  try {
    const data = await getDocs(collection(db, 'animals'))
    const list: Resident[] = []
    data.forEach((doc) => {
      list.push({id: doc.id, ...doc.data()})
    })
    return list
  } catch (e) {
    console.log(e)
    return undefined
  }
})

const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchResidents.pending, (state) => {
        state.status = LoadingStatus.loading
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.status = LoadingStatus.complete
        state.residents = action.payload
      })
      .addCase(fetchResidents.rejected, (state) => {
        state.status = LoadingStatus.error
      })
  }
})

export const selectResidents = (state: RootState) => state.residents
export default residentsSlice.reducer
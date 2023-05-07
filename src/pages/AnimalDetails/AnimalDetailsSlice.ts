import { AnimalDetailsState } from './AnimalDetailsState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const initialState: AnimalDetailsState = {
  status: LoadingStatus.initial
}

export const fetchAnimalDetails = createAsyncThunk('fetchAnimalDetails', async (id: string) => {
  try {
    const data = await getDoc(doc(db, 'animals', id))
    return data.data()
  } catch (e) {
    console.log(e)
    return undefined
  }
})

const animalDetailsSlice = createSlice({
  name: 'animal-page',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAnimalDetails.pending, (state) => {
        state.status = LoadingStatus.loading
      })
      .addCase(fetchAnimalDetails.fulfilled, (state, action) => {
        state.status = LoadingStatus.complete
        state.animalDetails = action.payload
      })
      .addCase(fetchAnimalDetails.rejected, (state) => {
        state.status = LoadingStatus.error
      })
  }
})

export const selectAnimalPage = (state: RootState) => state.animalDetails
export default animalDetailsSlice.reducer
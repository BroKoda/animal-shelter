import { HomeState } from './HomeState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import { Resident } from '../Residents/ResidentsState'
import { News } from '../News/NewsState'

const initialState: HomeState = {
  news: [],
  residents: [],
  fetchNewsStatus: LoadingStatus.initial,
  fetchResidentsStatus: LoadingStatus.initial
}

export const fetchHomeResidents = createAsyncThunk('fetchHomeResidents', async () => {
  try {
    const data = await getDocs(query(collection(db, 'animals'), limit(3)))
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

export const fetchHomeNews = createAsyncThunk('fetchHomeNews', async () => {
  try {
    const data = await getDocs(query(collection(db, 'news'), limit(3)))
    const list: News[] = []
    data.forEach((doc) => {
      list.push({id: doc.id, ...doc.data()})
    })
    return list
  } catch (e) {
    console.log(e)
    return undefined
  }
})

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHomeResidents.pending, (state) => {
        state.fetchResidentsStatus = LoadingStatus.loading
      })
      .addCase(fetchHomeResidents.fulfilled, (state, action) => {
        state.fetchResidentsStatus = LoadingStatus.complete
        state.residents = action.payload
      })
      .addCase(fetchHomeResidents.rejected, (state) => {
        state.fetchResidentsStatus = LoadingStatus.error
      })
      .addCase(fetchHomeNews.pending, (state) => {
        state.fetchNewsStatus = LoadingStatus.loading
      })
      .addCase(fetchHomeNews.fulfilled, (state, action) => {
        state.fetchNewsStatus = LoadingStatus.complete
        state.news = action.payload
      })
      .addCase(fetchHomeNews.rejected, (state) => {
        state.fetchNewsStatus = LoadingStatus.error
      })
  }
})

export const selectHome = (state: RootState) => state.home
export default homeSlice.reducer
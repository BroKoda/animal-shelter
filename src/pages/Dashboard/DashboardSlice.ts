import { DashboardState, Users } from './DashboardState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const initialState: DashboardState = {
  users: [],
  status: LoadingStatus.initial
}

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const data = await getDocs(collection(db, 'users'))
    const list: Users[] = []
    data.forEach((doc) => {
      list.push({id: doc.id, ...doc.data()})
    })
    return list
  } catch (e) {
    console.log(e)
    return undefined
  }
})

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LoadingStatus.loading
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = LoadingStatus.complete
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = LoadingStatus.error
      })
  }
})

export const selectDashboard = (state: RootState) => state.dashboard
export default dashboardSlice.reducer
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { News, NewsState, NewsToAdd } from './NewsState'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const initialState: NewsState = {
  news: [],
  newNews: {},
  addNewsStatus: LoadingStatus.initial,
  fetchNewsStatus: LoadingStatus.initial
}

export const addNews = createAsyncThunk('addNews', async (newsDetails: NewsToAdd) => {
  if (newsDetails != null) {
    try {
      await addDoc(collection(db, 'news'), { newsDetails })
      console.log('Successfully added!')
    } catch (e) {
      console.log(e)
    }
  }
})

export const fetchNews = createAsyncThunk('fetchNews', async () => {
  try {
    const data = await getDocs(collection(db, 'news'))
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

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setTitle: (state: NewsState, action: PayloadAction<string>) => {
      state.newNews.title = action.payload
    },
    setIntro: (state: NewsState, action: PayloadAction<string>) => {
      state.newNews.intro = action.payload
    },
    setNewsBody: (state: NewsState, action: PayloadAction<string>) => {
      state.newNews.newsBody = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.fetchNewsStatus = LoadingStatus.loading
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.fetchNewsStatus = LoadingStatus.complete
        state.news = action.payload
      })
      .addCase(fetchNews.rejected, (state) => {
        state.fetchNewsStatus = LoadingStatus.error
      })
      .addCase(addNews.pending, (state) => {
        state.addNewsStatus = LoadingStatus.loading
      })
      .addCase(addNews.fulfilled, (state) => {
        state.addNewsStatus = LoadingStatus.complete
      })
      .addCase(addNews.rejected, (state) => {
        state.addNewsStatus = LoadingStatus.error
      })
  }
})

export const { setTitle, setIntro, setNewsBody } = newsSlice.actions
export const selectNews = (state: RootState) => state.news
export default newsSlice.reducer
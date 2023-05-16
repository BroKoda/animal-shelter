import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { News, NewsState, NewsToAdd } from './NewsState'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface ImageToUpload {
  image: File,
  name: string
}

const initialState: NewsState = {
  news: [],
  newsToAdd: {},
  addNewsStatus: LoadingStatus.initial,
  addNewsImageStatus: LoadingStatus.initial,
  fetchNewsStatus: LoadingStatus.initial,
  fetchSingleNewsStatus: LoadingStatus.initial
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

export const addNewsImage = createAsyncThunk('addNewsImage', async ({image, name}: ImageToUpload) => {
  if (image != null) {
    try {
      const imageRef = ref(storage, `news-images/${name}`)
      uploadBytes(imageRef, image).then(() => {
        console.log('Image uploaded')
      })
      return name
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

export const fetchSingleNews = createAsyncThunk('fetchSingleNews', async (id: string) => {
  try {
    const data = await getDoc(doc(db, 'news', id))
    return data.data()
  } catch (e) {
    console.log(e)
    return undefined
  }
})

export const fetchNewsImage = createAsyncThunk('fetchNewsImage', async (image: string) => {
  try {
    const pathRef = ref(storage, `news-images/${image}`)
    return await getDownloadURL(pathRef)
  }
  catch (e) {
    console.log(e)
    return undefined
  }
})

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    resetNews: () => initialState,
    setTitle: (state: NewsState, action: PayloadAction<string>) => {
      state.newsToAdd.title = action.payload
    },
    setIntro: (state: NewsState, action: PayloadAction<string>) => {
      state.newsToAdd.intro = action.payload
    },
    setNewsBody: (state: NewsState, action: PayloadAction<string>) => {
      state.newsToAdd.newsBody = action.payload
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
      .addCase(addNewsImage.pending, (state) => {
        state.addNewsImageStatus = LoadingStatus.loading
      })
      .addCase(addNewsImage.fulfilled, (state, action) => {
        state.addNewsImageStatus = LoadingStatus.complete
        state.newsToAdd.image = action.payload
      })
      .addCase(addNewsImage.rejected, (state) => {
        state.addNewsImageStatus = LoadingStatus.error
      })
      .addCase(fetchSingleNews.pending, (state) => {
        state.fetchSingleNewsStatus = LoadingStatus.loading
      })
      .addCase(fetchSingleNews.fulfilled, (state, action) => {
        state.fetchSingleNewsStatus = LoadingStatus.complete
        state.singleNews = action.payload
      })
      .addCase(fetchSingleNews.rejected, (state) => {
        state.fetchSingleNewsStatus = LoadingStatus.error
      })
      .addCase(fetchNewsImage.pending, (state) => {
        state.fetchSingleNewsStatus = LoadingStatus.loading
      })
      .addCase(fetchNewsImage.fulfilled, (state, action) => {
        state.fetchSingleNewsStatus = LoadingStatus.complete
        state.singleNews?.newsDetails != null && (state.singleNews.newsDetails.imageUrl = action.payload)
      })
      .addCase(fetchNewsImage.rejected, (state) => {
        state.fetchSingleNewsStatus = LoadingStatus.error
      })
  }
})

export const { resetNews, setTitle, setIntro, setNewsBody } = newsSlice.actions
export const selectNews = (state: RootState) => state.news
export default newsSlice.reducer
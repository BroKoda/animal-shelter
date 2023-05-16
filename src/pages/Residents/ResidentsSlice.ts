import { Animal, Resident, ResidentsState } from './ResidentsState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../firebase'

interface ImageToUpload {
  image: File,
  name: string
}

const initialState: ResidentsState = {
  residents: [],
  residentToAdd: {},
  residentDetails: {},
  fetchResidentsStatus: LoadingStatus.initial,
  addNewResidentStatus: LoadingStatus.initial,
  addNewResidentImageStatus: LoadingStatus.initial,
  fetchResidentImageStatus: LoadingStatus.initial,
  fetchResidentDetailsStatus: LoadingStatus.initial
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

export const addNewResident = createAsyncThunk('addNewResident', async (animal: Animal) => {
  if (animal != null) {
    try {
      await addDoc(collection(db, 'animals'), {
        animal: animal
      })
    } catch (e) {
      console.log(e)
    }
  }
})

export const addNewResidentImage = createAsyncThunk('addNewResidentIamage', async ({image, name}: ImageToUpload) => {
  if (image != null) {
    try {
      const imageRef = ref(storage, `resident-images/${name}`)
      uploadBytes(imageRef, image).then(() => {
        console.log('Image uploaded')
      })
      return name
    } catch (e) {
      console.log(e)
    }
  }
})

export const fetchResidentDetails = createAsyncThunk('fetchResidentDetails', async (id: string) => {
  try {
    const data = await getDoc(doc(db, 'animals', id))
    return data.data()
  } catch (e) {
    console.log(e)
    return undefined
  }
})

export const fetchResidentImage = createAsyncThunk('fetchResidentImage', async (image: string) => {
  try {
    const pathRef = ref(storage, `resident-images/${image}`)
    return await getDownloadURL(pathRef)
  }
  catch (e) {
    console.log(e)
    return undefined
  }
})

const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {
    resetResidents: () => initialState,
    setName: (state: ResidentsState, action: PayloadAction<string>) => {
      state.residentToAdd.name = action.payload
    },
    setType: (state: ResidentsState, action: PayloadAction<string>) => {
      state.residentToAdd.type = action.payload
    },
    setColor: (state: ResidentsState, action: PayloadAction<string>) => {
      state.residentToAdd.color = action.payload
    },
    setSize: (state: ResidentsState, action: PayloadAction<string>) => {
      state.residentToAdd.size = action.payload
    },
    setBirtDate: (state: ResidentsState, action: PayloadAction<string>) => {
      state.residentToAdd.birthDate = action.payload
    },
    setArrivalDate: (state: ResidentsState, action: PayloadAction<string>) => {
      state.residentToAdd.arrivalDate = action.payload
    },
    setDescription: (state: ResidentsState, action: PayloadAction<string>) => {
      state.residentToAdd.description = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchResidents.pending, (state) => {
        state.fetchResidentsStatus = LoadingStatus.loading
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.fetchResidentsStatus = LoadingStatus.complete
        state.residents = action.payload
      })
      .addCase(fetchResidents.rejected, (state) => {
        state.fetchResidentsStatus = LoadingStatus.error
      })
      .addCase(addNewResident.pending, (state) => {
        state.addNewResidentStatus = LoadingStatus.loading
      })
      .addCase(addNewResident.fulfilled, (state) => {
        state.addNewResidentStatus = LoadingStatus.complete
      })
      .addCase(addNewResident.rejected, (state) => {
        state.addNewResidentStatus = LoadingStatus.error
      })
      .addCase(fetchResidentDetails.pending, (state) => {
        state.fetchResidentDetailsStatus = LoadingStatus.loading
      })
      .addCase(fetchResidentDetails.fulfilled, (state, action) => {
        state.fetchResidentDetailsStatus = LoadingStatus.complete
        state.residentDetails = action.payload
      })
      .addCase(fetchResidentDetails.rejected, (state) => {
        state.fetchResidentDetailsStatus = LoadingStatus.error
      })
      .addCase(addNewResidentImage.pending, (state) => {
        state.addNewResidentImageStatus = LoadingStatus.loading
      })
      .addCase(addNewResidentImage.fulfilled, (state, action) => {
        state.addNewResidentImageStatus = LoadingStatus.complete
        state.residentToAdd.image = action.payload
      })
      .addCase(addNewResidentImage.rejected, (state) => {
        state.addNewResidentImageStatus = LoadingStatus.error
      })
      .addCase(fetchResidentImage.pending, (state) => {
        state.fetchResidentImageStatus = LoadingStatus.loading
      })
      .addCase(fetchResidentImage.fulfilled, (state, action) => {
        state.fetchResidentImageStatus = LoadingStatus.complete
        state.residentDetails?.animal != null && (state.residentDetails.animal.imageUrl = action.payload)
      })
      .addCase(fetchResidentImage.rejected, (state) => {
        state.fetchResidentImageStatus = LoadingStatus.error
      })
  }
})

export const {
  resetResidents,
  setName,
  setType,
  setColor,
  setSize,
  setBirtDate,
  setArrivalDate,
  setDescription
} = residentsSlice.actions
export const selectResidents = (state: RootState) => state.residents
export default residentsSlice.reducer
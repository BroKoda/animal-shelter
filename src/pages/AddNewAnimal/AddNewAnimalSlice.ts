import { AddNewAnimalState, Animal } from './AddNewAnimalState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'

const initialState: AddNewAnimalState = {
  animalToAdd: {},
  status: LoadingStatus.initial
}

export const addNewAnimal = createAsyncThunk('addNewAnimal', async (animal: Animal) => {
  if (animal != null) {
    try {
      await addDoc(collection(db, 'animals'), {
        animal: animal,
        timestamp: serverTimestamp()
      })
      console.log('Successfully added!')
    } catch (e) {
      console.log(e)
    }
  }
})

const addNewAnimalSlice = createSlice({
  name: 'addNewAnimal',
  initialState,
  reducers: {
    resetAnimalToAdd: () => initialState,
    setName: (state: AddNewAnimalState, action: PayloadAction<string>) => {
      state.animalToAdd.name = action.payload
    },
    setColor: (state: AddNewAnimalState, action: PayloadAction<string>) => {
      state.animalToAdd.color = action.payload
    },
    setSize: (state: AddNewAnimalState, action: PayloadAction<string>) => {
      state.animalToAdd.size = action.payload
    },
    setBirtDate: (state: AddNewAnimalState, action: PayloadAction<string>) => {
      state.animalToAdd.birthDate = action.payload
    },
    setArrivalDate: (state: AddNewAnimalState, action: PayloadAction<string>) => {
      state.animalToAdd.arrivalDate = action.payload
    },
    setDescription: (state: AddNewAnimalState, action: PayloadAction<string>) => {
      state.animalToAdd.description = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addNewAnimal.pending, (state) => {
        state.status = LoadingStatus.loading
      })
      .addCase(addNewAnimal.fulfilled, (state) => {
        state.status = LoadingStatus.complete
      })
      .addCase(addNewAnimal.rejected, (state) => {
        state.status = LoadingStatus.error
      })
  }
})

export const {
  resetAnimalToAdd,
  setName,
  setColor,
  setSize,
  setBirtDate,
  setArrivalDate,
  setDescription
} = addNewAnimalSlice.actions
export const selectAddNewAnimal = (state: RootState) => state.newAnimal
export default addNewAnimalSlice.reducer
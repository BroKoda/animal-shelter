import React, { ChangeEvent, MouseEvent, useCallback } from 'react'
import BaseLayout from '../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addNewAnimal,
  setArrivalDate,
  setBirtDate,
  setColor,
  setDescription,
  setName,
  setSize
} from './AddNewAnimalSlice'
import { Animal } from './AddNewAnimalState'

const AddNewAnimal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const {
    name,
    color,
    size,
    birthDate,
    arrivalDate,
    description
  } = useAppSelector((state) => state.newAnimal.animalToAdd)

  const handleAddNewAnimal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const animal: Animal = { name, color, size, birthDate, arrivalDate, description }
    dispatch(addNewAnimal(animal))
  }, [dispatch, name, color, size, birthDate, arrivalDate, description])

  const handleSetName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value))
  }, [dispatch, name])

  const handleSetSize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSize(event.target.value))
  }, [dispatch, size])

  const handleSetColor = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(event.target.value))
  }, [dispatch, color])

  const handleSetBirthDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBirtDate(event.target.value))
  }, [dispatch, birthDate])

  const handleSetArrivalDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setArrivalDate(event.target.value))
  }, [dispatch, arrivalDate])

  const handleSetDescription = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDescription(event.target.value))
  }, [dispatch, description])

  return (
    <BaseLayout>
      <div className="container add-new-animal-container">
        <div className="row">
          <div className="col-6">
            <h1>Új lakó hozzáadása:</h1>
            <form className="mt-4 mb-5">
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-paw"></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Név"
                  id="name"
                  value={name ?? ''}
                  onChange={handleSetName}
                />
              </div>
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-palette"></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Szín"
                  id="color"
                  value={color ?? ''}
                  onChange={handleSetColor}
                />
              </div>
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-weight-hanging"></i>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Méret"
                  id="size"
                  value={size ?? ''}
                  onChange={handleSetSize}
                />
              </div>
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Születési idő"
                  id="birth-date"
                  value={birthDate ?? ''}
                  onChange={handleSetBirthDate}
                />
              </div>
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Bekerülési idő"
                  id="arrival-date"
                  value={arrivalDate ?? ''}
                  onChange={handleSetArrivalDate}
                />
              </div>
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-message"></i>
                </div>
                <textarea
                  className="form-control"
                  placeholder="Leírás"
                  id="description"
                  rows={4}
                  value={description ?? ''}
                  onChange={handleSetDescription}
                />
              </div>
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-image"></i>
                </div>
                <input
                  type='file'
                  className="form-control file-input"
                  placeholder="Kép kiválasztása"
                  id="image"
                  data-button-text='Fájl kiválasztása'
                  // value={description ?? ''}
                  // onChange={handleSetDescription}
                />
              </div>
              <div className="row justify-content-end">
                <div className="col-6">
                  <button className="button call-to-action-button w-100" onClick={handleAddNewAnimal}>
                    Lakó hozzáadása
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default AddNewAnimal
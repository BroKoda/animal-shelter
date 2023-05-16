import React, { ChangeEvent, MouseEvent, useCallback, useEffect } from 'react'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  addNewResident,
  addNewResidentImage, resetResidents,
  setArrivalDate,
  setBirtDate,
  setColor,
  setDescription,
  setName,
  setSize, setType
} from '../ResidentsSlice'
import { Animal } from '../ResidentsState'
import { v4 } from 'uuid'
import { LoadingStatus } from '../../../components/LoadingStatus/LoadingStatus'
import { useNavigate } from 'react-router-dom'

const AddResident = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    name,
    type,
    color,
    size,
    birthDate,
    arrivalDate,
    description,
    image
  } = useAppSelector((state) => state.residents.residentToAdd)
  const addNewResidentStatus = useAppSelector((state) => state.residents.addNewResidentStatus)

  useEffect(() => {
    if (addNewResidentStatus === LoadingStatus.complete) {
      dispatch(resetResidents())
      navigate('/lakok')
    }
  }, [dispatch, addNewResidentStatus])

  const handleAddNewAnimal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const animal: Animal = { name, type, color, size, birthDate, arrivalDate, description, image }
    dispatch(addNewResident(animal))
  }, [dispatch, name, type, color, size, birthDate, arrivalDate, description, image])

  const handleSetName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value))
  }, [dispatch, name])

  const handleSetType = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setType((event.target.value)))
  }, [dispatch, type])

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

  const handleSetFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const image = event.target.files[0]
      const name = `${v4()}`
      dispatch(addNewResidentImage({ image, name }))
    }
  }, [dispatch, image])

  return (
    <BaseLayout>
      <div className="container add-new-animal-container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-8 col-xl-7">
            <h1 className="mb-3">Új lakó hozzáadása:</h1>
            <form className="mt-4 mb-5">
              <div className="form-control-container">
                <div className="form-icon-container">
                  <i className="fa-solid fa-signature"></i>
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
                  <i className="fa-solid fa-paw"></i>
                </div>
                <div className="resident-type-select-container d-flex flex-row align-items-center">
                  <div className='d-inline-flex me-4'>
                    <label className="radio-container">Kutya
                      <input type="radio" value={'kutya'} checked={'kutya' === type} onChange={handleSetType} />
                      <span className="radio-mark"></span>
                    </label>
                  </div>
                  <div className='d-inline-flex me-4'>
                    <label className="radio-container">Macska
                      <input type="radio" value={'macska'} checked={'macska' === type} onChange={handleSetType} />
                      <span className="radio-mark"></span>
                    </label>
                  </div>
                  <div className='d-inline-flex me-4'>
                    <label className="radio-container">Egyéb
                      <input type="radio" value={'egyéb'} checked={'egyéb' === type} onChange={handleSetType} />
                      <span className="radio-mark"></span>
                    </label>
                  </div>
                </div>
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
                  type="file"
                  className="form-control file-input"
                  placeholder="Kép kiválasztása"
                  id="resident-image"
                  name="resident-image"
                  data-button-text="Fájl kiválasztása"
                  onChange={handleSetFile}
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

export default AddResident
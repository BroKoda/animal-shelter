import React, { ChangeEvent, MouseEvent, useCallback, useEffect } from 'react'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  addNewResident,
  addNewResidentImage,
  fetchResidentDetails,
  resetResidents,
  setArrivalDate,
  setBirtDate,
  setColor,
  setDescription,
  setName,
  setSize,
  setType,
  updateResident
} from '../ResidentsSlice'
import { Animal } from '../ResidentsState'
import { v4 } from 'uuid'
import { LoadingStatus } from '../../../components/LoadingStatus/LoadingStatus'
import { useNavigate } from 'react-router-dom'
import Tooltip from '../../../components/Tooltip/Tooltip'
import Error from '../../../components/Error/Error'
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator'

const AddResident = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.login.user)
  const {
    residentToAdd,
    addNewResidentStatus,
    isUpdate,
    isUpdateId,
    updateResidentStatus
  } = useAppSelector((state) => state.residents)

  useEffect(() => {
    if (user == null || (user.role !== 'admin')) {
      navigate('/')
    }
  })

  useEffect(() => {
    if (addNewResidentStatus === LoadingStatus.complete || updateResidentStatus === LoadingStatus.complete) {
      dispatch(resetResidents())
      navigate('/lakok')
    }
  }, [dispatch, addNewResidentStatus, updateResidentStatus])

  useEffect(() => {
    if (isUpdate && isUpdateId != null) {
      dispatch(fetchResidentDetails(isUpdateId))
    }
  }, [dispatch, isUpdate])

  const handleAddNewAnimal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const animal: Animal = residentToAdd
    if (isUpdate && isUpdateId != null) {
      const update = {
        animal: animal,
        id: isUpdateId
      }
      dispatch(updateResident(update))
    } else {
      dispatch(addNewResident(animal))
    }
  }, [dispatch, residentToAdd])

  const handleSetName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value))
  }, [dispatch, residentToAdd.name])

  const handleSetType = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setType((event.target.value)))
  }, [dispatch, residentToAdd.type])

  const handleSetSize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSize(event.target.value))
  }, [dispatch, residentToAdd.size])

  const handleSetColor = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(event.target.value))
  }, [dispatch, residentToAdd.color])

  const handleSetBirthDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBirtDate(event.target.value))
  }, [dispatch, residentToAdd.birthDate])

  const handleSetArrivalDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setArrivalDate(event.target.value))
  }, [dispatch, residentToAdd.arrivalDate])

  const handleSetDescription = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setDescription(event.target.value))
  }, [dispatch, residentToAdd.description])

  const handleSetFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const image = event.target.files[0]
      const name = `${v4()}`
      dispatch(addNewResidentImage({ image, name }))
    }
  }, [dispatch, residentToAdd.image])

  return (
    <BaseLayout>
      <>
        {(addNewResidentStatus === LoadingStatus.error || updateResidentStatus === LoadingStatus.error) &&
          <Error/>
        }

        {(addNewResidentStatus === LoadingStatus.loading || updateResidentStatus === LoadingStatus.loading) &&
          <ProgressIndicator/>
        }

        {(addNewResidentStatus === LoadingStatus.initial || updateResidentStatus === LoadingStatus.initial ||
            addNewResidentStatus === LoadingStatus.complete || updateResidentStatus === LoadingStatus.complete) &&
          <div className="container add-new-animal-container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-8 col-xl-7">
                <h1 className="mb-3">Új lakó hozzáadása:</h1>
                <form className="mt-4 mb-5">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-signature"></i>
                      <Tooltip text={<p>A lakó neve<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Név"
                      id="name"
                      value={residentToAdd.name ?? ''}
                      onChange={handleSetName}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-paw"></i>
                      <Tooltip text={<p>A lakó fajtája<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <div className="resident-type-select-container d-flex flex-row align-items-center">
                      <div className="d-inline-flex me-4">
                        <label className="radio-container">Kutya
                          <input type="radio" value={'kutya'} checked={'kutya' === residentToAdd.type}
                                 onChange={handleSetType}/>
                          <span className="radio-mark"></span>
                        </label>
                      </div>
                      <div className="d-inline-flex me-4">
                        <label className="radio-container">Macska
                          <input type="radio" value={'macska'} checked={'macska' === residentToAdd.type}
                                 onChange={handleSetType}/>
                          <span className="radio-mark"></span>
                        </label>
                      </div>
                      <div className="d-inline-flex me-4">
                        <label className="radio-container">Egyéb
                          <input type="radio" value={'egyéb'} checked={'egyéb' === residentToAdd.type}
                                 onChange={handleSetType}/>
                          <span className="radio-mark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-palette"></i>
                      <Tooltip text={<p>A lakó bundájának színe<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Szín"
                      id="color"
                      value={residentToAdd.color ?? ''}
                      onChange={handleSetColor}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-weight-hanging"></i>
                      <Tooltip text={<p>A lakó mérete<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Méret"
                      id="size"
                      value={residentToAdd.size ?? ''}
                      onChange={handleSetSize}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-calendar-days"></i>
                      <Tooltip text={<p>A lakó születésének dátuma<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Születési idő"
                      id="birth-date"
                      value={residentToAdd.birthDate ?? ''}
                      onChange={handleSetBirthDate}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-calendar-days"></i>
                      <Tooltip text={<p>A lakó bekerülésének dátuma<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Bekerülési idő"
                      id="arrival-date"
                      value={residentToAdd.arrivalDate ?? ''}
                      onChange={handleSetArrivalDate}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-message"></i>
                      <Tooltip text={<p>A lakó jellemének rövid leírása<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Leírás"
                      id="description"
                      rows={4}
                      value={residentToAdd.description ?? ''}
                      onChange={handleSetDescription}
                      required={true}
                    />
                  </div>
                  <div className={`form-control-container ${isUpdate ? 'd-none' : ''}`}>
                    <div className="form-icon-container">
                      <i className="fa-solid fa-image"></i>
                      <Tooltip text={<p>A lakó képe<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="file"
                      className="form-control file-input"
                      placeholder="Kép kiválasztása"
                      id="resident-image"
                      name="resident-image"
                      data-button-text="Fájl kiválasztása"
                      onChange={handleSetFile}
                      required={true}
                    />
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-6">
                      <button className="button call-to-action-button w-100" onClick={handleAddNewAnimal}>
                        {isUpdate ? 'Lakó módosítása' : 'Lakó hozzáadása'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </>
    </BaseLayout>
  )
}

export default AddResident
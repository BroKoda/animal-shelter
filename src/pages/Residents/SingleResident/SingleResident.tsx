import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../../assets/pages/AnimalPage.scss'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator'
import { LoadingStatus } from '../../../components/LoadingStatus/LoadingStatus'
import Error from '../../../components/Error/Error'
import { fetchResidentDetails } from '../ResidentsSlice'

const SingleResident = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { animalId } = useParams()
  const { residentDetails, fetchResidentDetailsStatus } = useAppSelector((state) => state.residents)

  useEffect(() => {
    if (animalId != null) {
      void dispatch(fetchResidentDetails(animalId))
    }
  }, [dispatch, animalId])

  return (
    <BaseLayout>
      <>
        {fetchResidentDetailsStatus === LoadingStatus.error &&
          <Error/>
        }

        {fetchResidentDetailsStatus === LoadingStatus.loading &&
          <ProgressIndicator/>
        }

        {fetchResidentDetailsStatus === LoadingStatus.complete &&
          <div className="container animal-page-container">
            <div className="row">
              <div className="col-12 mb-4">
                <h1>Anton adatlapja</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <img className="animal-image" src="/public/dog_placeholder.jpeg" alt="Anton képe"/>
              </div>
              <div className="col-6 align-self-center">
                <p className="animal-name mt-2">
                  <strong>Név: </strong>
                  {residentDetails?.animal?.name}
                </p>
                <p className="animal-color mt-1">
                  <strong>Szín: </strong>
                  {residentDetails?.animal?.color}
                </p>
                <p className="animal-size mt-1">
                  <strong>Méret: </strong>
                  {residentDetails?.animal?.size}
                </p>
                <p className="animal-birth mt-1">
                  <strong>Születési idő: </strong>
                  {residentDetails?.animal?.birthDate}
                </p>
                <p className="animal-arrival mt-1">
                  <strong>Bekerülési idő: </strong>
                  {residentDetails?.animal?.arrivalDate}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-4">
                <p className="animal-description-title mb-1">
                  <strong>Anton jellemzői:</strong>
                </p>
                <p>{residentDetails?.animal?.description}</p>
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-3 mt-4">
                <Link to={'/lakok'}>
                  <button className="button secondary-button">
                    Vissza
                  </button>
                </Link>
              </div>
              <div className="col-3 mt-4">
                <Link to={'/kapcsolat'}>
                  <button className="button call-to-action-button">
                    Örökbefogadom!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        }
      </>
    </BaseLayout>
  )
}

export default SingleResident

import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../../assets/pages/SingleResident.scss'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator'
import { LoadingStatus } from '../../../components/LoadingStatus/LoadingStatus'
import Error from '../../../components/Error/Error'
import { fetchResidentDetails, fetchResidentImage, resetResidents } from '../ResidentsSlice'

const SingleResident = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { animalId } = useParams()
  const {
    residentDetails,
    fetchResidentDetailsStatus,
    fetchResidentImageStatus
  } = useAppSelector((state) => state.residents)

  useEffect(() => {
    resetResidents()
    if (animalId != null) {
      void dispatch(fetchResidentDetails(animalId))
    }
  }, [dispatch, animalId])

  useEffect(() => {
    if (residentDetails?.animal?.image != null) {
      void dispatch(fetchResidentImage(residentDetails.animal.image))
    }
  }, [dispatch, residentDetails])

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
              <div className="col-12 col-md-6 order-2 order-md-1">
                {fetchResidentImageStatus === LoadingStatus.loading &&
                  <ProgressIndicator/>
                }
                {fetchResidentDetailsStatus === LoadingStatus.complete &&
                  <img className="animal-image" src={residentDetails?.animal?.imageUrl} alt="Anton képe"/>
                }
              </div>
              <div className="col-12 col-md-6 order-1 align-self-center mb-4 mb-md-0">
                <p className="animal-name mt-md-2">
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
              <div className="col-6 col-md-5 col-lg-4 col-xl-3 mt-4">
                <Link to={'/lakok'}>
                  <button className="button secondary-button">
                    Vissza
                  </button>
                </Link>
              </div>
              <div className="col-6 col-md-5 col-lg-4 col-xl-3 mt-4">
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

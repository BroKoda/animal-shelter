import React, { useEffect } from 'react'
import '../../../assets/pages/Residents.scss'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchResidents } from '../ResidentsSlice'
import AnimalCard from '../../../components/AnimalCard/AnimalCard'
import { Resident } from '../ResidentsState'

const ResidentsList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const residents = useAppSelector((state) => state.residents.residents)

  useEffect(() => {
    void dispatch(fetchResidents())
  }, [dispatch])

  return (
    <BaseLayout>
      <div className='container residents-container'>
        <div className='row'>
          <div className='col-12 mb-3'>
            <h1>Lakóink</h1>
          </div>
        </div>
        <div className='row justify-content-center'>
          {residents != null && residents.map((resident: Resident, index: number) => {
            if (resident.animal != null) {
              return (
                <div key={index} className='col-12 col-md-6 col-lg-4 mb-3'>
                  <AnimalCard key={index} resident={resident.animal} id={resident.id} />
                </div>
              )
            } else {
              return "Jelenleg nincs lakó a menhelyen!"
            }
          })}
        </div>
      </div>
    </BaseLayout>
  )
}

export default ResidentsList
import React, { useCallback, useEffect } from 'react'
import '../../../assets/pages/Residents.scss'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteResident, fetchResidents } from '../ResidentsSlice'
import ResidentCard from '../../../components/ResidentCard/ResidentCard'
import { Resident } from '../ResidentsState'

const ResidentsList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const residents = useAppSelector((state) => state.residents.residents)
  const user = useAppSelector((state) => state.login.user)

  useEffect(() => {
    void dispatch(fetchResidents())
  }, [dispatch])

  const showDeleteDialogAction = useCallback((id: string) => {
    const text = 'Biztosan törölni szeretné a lakót?' +
      '\nEz a folyamat nem visszafordítható, az állat adatai teljesen elvesznek törlés után'
    if (confirm(text)) {
      dispatch(deleteResident(id))
      window.location.reload()
    }
  }, [dispatch])

  return (
    <BaseLayout>
      <div className="container residents-container">
        <div className="row">
          <div className="col-12 mb-3">
            <h1>Lakóink</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          {residents != null && residents.map((resident: Resident, index: number) => {
            if (resident.animal != null) {
              return (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                  <ResidentCard
                    key={index}
                    resident={resident.animal}
                    id={resident.id} user={user}
                    showDeleteDialog={showDeleteDialogAction}/>
                </div>
              )
            } else {
              return 'Jelenleg nincs lakó a menhelyen!'
            }
          })}
        </div>
      </div>
    </BaseLayout>
  )
}

export default ResidentsList
import React, { useCallback, useEffect } from 'react'
import BaseLayout from '../../layout/BaseLayout'
import { Resident } from '../Residents/ResidentsState'
import ResidentCard from '../../components/ResidentCard/ResidentCard'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchHomeNews, fetchHomeResidents } from './HomeSlice'
import { News } from '../News/NewsState'
import NewsCard from '../../components/NewsCard/NewsCard'
import { deleteResident } from '../Residents/ResidentsSlice'
import { deleteNews } from '../News/NewsSlice'

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { residents, news } = useAppSelector((state) => state.home)

  useEffect(() => {
    dispatch(fetchHomeResidents())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchHomeNews())
  }, [dispatch])

  const showDeleteActionForResidents = useCallback((id: string) => {
    const text = 'Biztosan törölni szeretné a lakót?' +
      '\nEz a folyamat nem visszafordítható, az állat adatai teljesen elvesznek törlés után'
    if (confirm(text)) {
      dispatch(deleteResident(id))
      window.location.reload()
    }
  }, [dispatch])

  const showDeleteAlertForNews = useCallback((id: string) => {
    const text = 'Biztosan törölni szeretné ezt a hírt?' +
      '\nEz a folyamat nem visszafordítható, hír és hozzá tartozó adatok teljesen elvesznek törlés után!'
    if (confirm(text)) {
      dispatch(deleteNews(id))
      window.location.reload()
    }
  }, [dispatch])

  return (
    <BaseLayout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 mb-4'>
            <h1>Mancs állatvédő egyesület</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <p>Már mintegy 20 éve ad testi-lelki ápolást, otthont a rászoruló állatoknak, illetve segít nekik
              gazdához és boldog élethez jutni. Motivációnk a feltétlen, önzetlen állatszeretet. Célunk, hogy az
              emberekhez és állatokhoz egyaránt méltó, tiszta, modern, hatékony ellátást és környezetet tudjunk
              biztosítani a gondozottjaink és a hozzánk ellátogató családok részére.</p>
            <p className='mt-3'>Működésünk a Magyarkanizsai Önkormányzat, a felajánlott személyi jövedelemadó 1%-ok és
              magánszemélyek adományai segítségével, illetve a menhely védjegyévé vált önkéntes csapat által
              biztosított.</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mt-5'>
            <h3>Aktuális híreink</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mb-3 mt-2'>
            <p>Itt találod a legfrissebb híreinket. Kattints
              ide
              az összes hír megtekintéséhez!</p>
          </div>
        </div>
        <div className='row justify-content-center'>
          {news != null && news.map((singleNews: News, index: number) => {
            if (singleNews.newsDetails != null) {
              return (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                  <NewsCard
                    key={index}
                    news={singleNews.newsDetails}
                    id={singleNews.id}
                    showDeleteDialog={showDeleteAlertForNews}
                  />
                </div>
              )
            } else {
              return 'Jelenleg nincs elérhető hír!'
            }
          })}
        </div>
        <div className='row'>
          <div className='col-12 mt-5'>
            <h3>Fogadj örökbe!</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mb-3 mt-2'>
            <p>Itt találod a legújabb lakóinkat. Kattints
              ide
              az összes lakónk megtekintéséhez!</p>
          </div>
        </div>
        <div className='row justify-content-center'>
          {residents != null && residents.map((resident: Resident, index: number) => {
            if (resident.animal != null) {
              return (
                <div key={index} className='col-12 col-md-6 col-lg-4 mb-3'>
                  <ResidentCard
                    key={index}
                    resident={resident.animal}
                    id={resident.id}
                    showDeleteDialog={showDeleteActionForResidents}
                  />
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

export default Home
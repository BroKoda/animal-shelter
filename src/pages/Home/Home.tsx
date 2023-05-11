import React, { useEffect } from 'react'
import BaseLayout from '../../layout/BaseLayout'
import { Resident } from '../Residents/ResidentsState'
import AnimalCard from '../../components/AnimalCard/AnimalCard'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchHomeNews, fetchHomeResidents } from './HomeSlice'
import { News } from '../News/NewsState'
import NewsCard from '../../components/NewsCard/NewsCard'

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { residents, news } = useAppSelector((state) => state.home)

  useEffect(() => {
    dispatch(fetchHomeResidents())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchHomeNews())
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
        <div className='row'>
          {news != null && news.map((singleNews: News, index: number) => {
            if (singleNews.newsDetails != null) {
              return (
                <div key={index} className="col-4">
                  <NewsCard key={index} news={singleNews.newsDetails} id={singleNews.id}/>
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
        <div className='row'>
          {residents != null && residents.map((resident: Resident, index: number) => {
            if (resident.animal != null) {
              return (
                <div key={index} className='col-4'>
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

export default Home
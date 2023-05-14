import React, { useEffect } from 'react'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchNews } from '../NewsSlice'
import NewsCard from '../../../components/NewsCard/NewsCard'
import { News } from '../NewsState'

const NewsList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { news } = useAppSelector((state) => state.news)

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])

  return (
    <BaseLayout>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-3">
            <h1>Hírek</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          {news != null && news.map((singleNews: News, index: number) => {
            if (singleNews.newsDetails != null) {
              return (
                <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                  <NewsCard key={index} news={singleNews.newsDetails} id={singleNews.id}/>
                </div>
              )
            } else {
              return 'Jelenleg nincs elérhető hír!'
            }
          })}
        </div>
      </div>
    </BaseLayout>
  )
}

export default NewsList

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
          <div className="col-12">
            <h1>News</h1>
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
        </div>
      </div>
    </BaseLayout>
  )
}

export default NewsList

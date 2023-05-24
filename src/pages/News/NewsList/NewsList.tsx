import React, { useCallback, useEffect } from 'react'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteNews, fetchNews } from '../NewsSlice'
import NewsCard from '../../../components/NewsCard/NewsCard'
import { News } from '../NewsState'

const NewsList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { news } = useAppSelector((state) => state.news)
  const user = useAppSelector((state) => state.login.user)
  const now = new Date().valueOf()

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch])

  const showDeleteDialogAction = useCallback((id: string) => {
    const text = 'Biztosan törölni szeretné ezt a hírt?' +
      '\nEz a folyamat nem visszafordítható, hír és hozzá tartozó adatok teljesen elvesznek törlés után!'
    if (confirm(text)) {
      dispatch(deleteNews(id))
      window.location.reload()
    }
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
                  <NewsCard
                    key={index}
                    news={singleNews.newsDetails}
                    id={singleNews.id}
                    user={user}
                    showDeleteDialog={showDeleteDialogAction}
                  />
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

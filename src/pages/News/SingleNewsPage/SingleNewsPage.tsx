import React, { useEffect } from 'react'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useParams } from 'react-router-dom'
import { fetchSingleNews } from '../NewsSlice'
import parse from 'html-react-parser'

const SingleNewsPage = (): JSX.Element => {
  const { newsId } = useParams()
  const dispatch = useAppDispatch()
  const news = useAppSelector((state) => state.news.singleNews?.newsDetails)

  useEffect(() => {
    if (newsId != null) {
      dispatch(fetchSingleNews(newsId))
    }
  }, [dispatch])

  return (
    <BaseLayout>
      <div className='container single-news-container'>
        <div className='row'>
          <div className='col-12'>
            <h1>{news?.title}</h1>
            <p className='my-4'><strong>{news?.intro}</strong></p>
            {news?.newsBody != null && parse(news.newsBody)}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default SingleNewsPage

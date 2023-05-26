import React, { useEffect } from 'react'
import '../../../assets/pages/SingleNews.scss'
import BaseLayout from '../../../layout/BaseLayout'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useParams } from 'react-router-dom'
import { fetchNewsImage, fetchSingleNews } from '../NewsSlice'
import parse from 'html-react-parser'
import { LoadingStatus } from '../../../components/LoadingStatus/LoadingStatus'
import Error from '../../../components/Error/Error'
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator'

const SingleNewsPage = (): JSX.Element => {
  const { newsId } = useParams()
  const dispatch = useAppDispatch()
  const news = useAppSelector((state) => state.news.singleNews?.newsDetails)
  const newsStatus = useAppSelector((state) => state.news.fetchSingleNewsStatus)

  useEffect(() => {
    if (newsId != null) {
      dispatch(fetchSingleNews(newsId))
    }
  }, [dispatch])

  useEffect(() => {
    if (news?.image != null) {
      void dispatch(fetchNewsImage(news.image))
    }
  }, [dispatch, news])

  return (
    <BaseLayout>
      <>
        {newsStatus === LoadingStatus.error &&
          <Error/>
        }

        {newsStatus === LoadingStatus.loading &&
          <ProgressIndicator/>
        }

        {newsStatus === LoadingStatus.complete &&
          <div className='container single-news-container'>
            <div className='row'>
              <div className='col-12'>
                <h1>{news?.title}</h1>
                <img className='news-image mt-4' src={news?.imageUrl} alt='Hír kép'/>
                <p className='news-intro mt-4 mb-3'><strong>{news?.intro}</strong></p>
                {news?.newsBody != null && parse(news.newsBody)}
              </div>
            </div>
          </div>
        }
      </>
    </BaseLayout>
  )
}

export default SingleNewsPage

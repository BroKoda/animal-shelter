import React, { useEffect, useState } from 'react'
import '../../assets/components/NewsCard.scss'
import { Link } from 'react-router-dom'
import { NewsDetails } from '../../pages/News/NewsState'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase'

interface NewsCardProps {
  news: NewsDetails
  id: string
}

const NewsCard = ({ news, id }: NewsCardProps): JSX.Element => {
  const [image, setImage] = useState('')

  useEffect(() => {
    const pathRef = ref(storage, `news-images/${news.image}`)
    const fetchImage = async () => await getDownloadURL(pathRef)
    fetchImage().then(response => setImage(response))
  }, [news.image])

  return (
    <div className='container listing-card news-card'>
      <div className='row'>
        <div className='col-12'>
          <div className='card-header'>
            <div className='card-header-logo'>
              <i className="fa-solid fa-newspaper"></i>
            </div>
            <div className='card-header-text'>
              <p>Hír</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-2'>
          <img className='news-image' src={image} alt='News image'/>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <p className='news-title mt-2'>{news.title}</p>
          <p className='news-intro mt-1'>{news.intro}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Link to={`/hirek/${id}`}>
            <button className='button call-to-action-button mt-2 w-100'>
              Tovább olvasok!
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsCard

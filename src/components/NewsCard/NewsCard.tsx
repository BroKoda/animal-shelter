import React from 'react'
import '../../assets/components/AnimalCard.scss'
import { Link } from 'react-router-dom'
import { NewsDetails } from '../../pages/News/NewsState'

interface AnimalCardProps {
  news: NewsDetails
  id: string
}

const NewsCard = ({ news, id }: AnimalCardProps): JSX.Element => {
  return (
    <div className='container animal-card'>
      <div className='row'>
        <div className='col-12'>
          <div className='card-header'>
            <div className='card-header-logo'>
              <img src='/mancs_logo_white.png' alt='Mancs logo' />
            </div>
            <div className='card-header-text'>
              <p>Hír</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-2'>
          <img className='animal-image' src='/dog_placeholder.jpeg' alt='Animal image'/>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <p className='animal-name mt-2'>{news.title}</p>
          <p className='animal-description mt-1'>{news.intro}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Link to={`/hirek/${id}`}>
            <button className='button call-to-action-button mt-2'>
              Tovább olvasok!
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsCard

import React from 'react'
import '../../assets/components/AnimalCard.scss'
import { Link } from 'react-router-dom'

const AnimalCard = (): JSX.Element => {
  return (
    <div className='container animal-card'>
      <div className='row'>
        <div className='col-12'>
          <div className='card-header'>
            <div className='card-header-logo'>
              <img src='/mancs_logo_white.png' alt='Mancs logo' />
            </div>
            <div className='card-header-text'>
              <p>Doggo</p>
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
          <p className='animal-name mt-2'>Animal name</p>
          <p className='animal-description mt-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className='animal-date mt-1'>2023.04.23.</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Link to={'/'}>
            <button className='button call-to-action-button mt-2'>
              Megnézem!
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AnimalCard

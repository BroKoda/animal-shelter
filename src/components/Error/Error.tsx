import React from 'react'
import '../../assets/components/Error.scss'
import { Link } from 'react-router-dom'

const Error = (): JSX.Element => {
  return (
    <div className='error-container text-center'>
      <div className='error-header'>
        <span className='error-number'>500</span>
        <span className='error-title'>Hiba!</span>
      </div>
      <div className='error-text'>
        <p>Jaj ne! Hiba merült fel a szerverrel való kommunikáció során. Kérlek próbáld újra a folyamatot később!</p>
        <Link to={'/'}>
          <button className='button call-to-action-button mt-4'>
            Vissza a főoldalra
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Error

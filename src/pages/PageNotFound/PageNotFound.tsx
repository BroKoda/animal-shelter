import React from 'react'
import '../../assets/pages/PageNotFound.scss'
import BaseLayout from '../../layout/BaseLayout'
import { Link } from 'react-router-dom'

const PageNotFound = (): JSX.Element => {
  return (
    <BaseLayout>
      <div className="not-found-container text-center">
        <div className="not-found-header">
          <span className="not-found-number">404</span>
          <span className="not-found-title">Az oldal nem létezik!</span>
        </div>
        <div className="not-found-text">
          <p>Jaj ne! Ez az oldal sajnos nem letezik. Kérlek ellenőrizd az oldal elérési címét! Amennyiben úgy érzed,
            hogy az oldalnak létezni kell, vedd fel velünk a kapcsolatot!</p>
          <Link to={'/'}>
            <button className="button call-to-action-button mt-4">
              Vissza a főoldalra
            </button>
          </Link>
        </div>
      </div>
    </BaseLayout>
  )
}

export default PageNotFound
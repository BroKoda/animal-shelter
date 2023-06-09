import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ():JSX.Element => {
  return (
    <div className='container-fluid footer-container'>
      <div className='row'>
        <div className='col-12'>
          <div className='container py-5'>
            <div className='row'>
              <div className='col-12 col-md-5 col-lg-4 mb-4 mb-md-0'>
                <h5>Mancs állatvédő egyesület</h5>
                <p className='footer-description'>Tevékenységeink és céljaink magába foglalják az egyhagyott, kidobott,
                  megtalált kölyök és felnőtt állatok mentését, gondozását, nevelését és legfőképp gazdához jutását.
                  Hisszuk, hogy minden állatnak van megfelelő gazdája, mi segítünk megtalálni!</p>
              </div>
              <div className='col-6 col-md-4 offset-lg-1 useful-links'>
                <h5>Hasznos linkek</h5>
                <Link to={'/'}>
                  Főoldal
                </Link>
                <Link to={'/lakok'}>
                  Lakóink
                </Link>
                <Link to={'/hirek'}>
                  Hírek
                </Link>
                <Link to={'/csatlakozz'}>
                  Csatlakozz!
                </Link>
                <Link to={'/kapcsolat'}>
                  Kapcsolat
                </Link>
              </div>
              <div className='col-6 col-md-3 social-links-container'>
                <h5>Kapcsolat</h5>
                <p>Beogradska 3-5<br />
                  24420 Magyarkanizsa<br />
                  Szerbia</p>
                <h5 className='mt-4'>Kövess minket</h5>
                <Link to={'/facebook'} style={{ textDecoration: 'none' }}>
                  <i className='fa-brands fa-facebook'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
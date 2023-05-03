import React from 'react'
import '../assets/BaseLayout.scss'
import '../assets/components/Footer.scss'
import '../assets/components/CopyrightStrip.scss'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import CopyrightStrip from '../components/CopyrightStrip/CopyrightStrip'

interface BaseLayoutProps {
  children: JSX.Element
}

const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => {
  return (
    <>
      <div className="container-fluid header-container">
        <div className="row h-100">
          <div className="col-12 align-self-center">
            <div className="container">
              <div className="row">
                <div className="col-6 align-self-center">
                  <Link to={'/'}>
                    <img src={'./mancs.png'} alt={'Mancs logo'}/>
                  </Link>
                </div>
                <div className="col-6 align-self-center text-end">
                  <Link to={'/regisztracio'}>
                    <button className="button secondary-button me-2">
                      Regisztráció
                    </button>
                  </Link>
                  <Link to={'/bejelentkezes'}>
                    <button className="button call-to-action-button">
                      Bejelentkezés
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container body-container mt-3 mb-5">
        <div className="row">
          <div className="col-3">
            <div className="container menu-container px-0">
              <div className="row">
                <div className="col-12">
                  <Link to={'/'}>
                    <div className="menu-item">
                      <div className="menu-item-icon-container">
                        <i className="fa-solid fa-house"></i>
                      </div>
                      <span>Home page</span>
                    </div>
                  </Link>
                  <Link to={'/lakoink'}>
                    <div className="menu-item">
                      <div className="menu-item-icon-container">
                        <i className="fa-solid fa-paw"></i>
                      </div>
                      <span>Lakóink</span>
                    </div>
                  </Link>
                  <Link to={'/'}>
                    <div className="menu-item">
                      <div className="menu-item-icon-container">
                        <i className="fa-solid fa-newspaper"></i>
                      </div>
                      <span>Hírek</span>
                    </div>
                  </Link>
                  <Link to={'/'}>
                    <div className="menu-item">
                      <div className="menu-item-icon-container">
                        <i className="fa-solid fa-handshake-angle"></i>
                      </div>
                      <span>Önkénteskedés</span>
                    </div>
                  </Link>
                  <Link to={'/'}>
                    <div className="menu-item">
                      <div className="menu-item-icon-container">
                        <i className="fa-solid fa-hand-holding-heart"></i>
                      </div>
                      <span>Támogass minket!</span>
                    </div>
                  </Link>
                  <Link to={'/kapcsolat'}>
                    <div className="menu-item">
                      <div className="menu-item-icon-container">
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <span>Kapcsolat</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="container body-container px-0">
              <div className="row">
                <div className="col-12">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
      <CopyrightStrip/>
    </>
  )
}

export default BaseLayout
import React, { MouseEvent, useCallback, useState } from 'react'
import '../assets/BaseLayout.scss'
import '../assets/components/Footer.scss'
import '../assets/components/CopyrightStrip.scss'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import CopyrightStrip from '../components/CopyrightStrip/CopyrightStrip'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { signOutUser } from '../pages/Login/LoginSlice'
import Navigation from './Navigation'

interface BaseLayoutProps {
  children: JSX.Element
}

const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [navigationVisible, setNavigationVisible] = useState(false)
  const user = useAppSelector((state) => state.login.user)

  const handleLogOut = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(signOutUser())
  }, [dispatch])

  return (
    <>
      <div className="container-fluid header-container">
        <div className="row h-100">
          <div className="col-12 align-self-center">
            <div className="container">
              <div className="row">
                <div className='col-4 d-md-none align-self-center'>
                  <i className="fa-solid fa-bars js-navigation-toggle"
                     onClick={() => {
                       setNavigationVisible(!navigationVisible)
                     }}>
                  </i>
                </div>
                <div className="col-4 col-md-6 align-self-center text-center text-md-start">
                  <Link to={'/'}>
                    <img className='d-none d-md-block' src={'/mancs.png'} alt={'Mancs logo'}/>
                    <img className='d-block d-md-none mx-auto' src={'/mancs_logo_only.png'} alt={'Mancs logo'}/>
                  </Link>
                </div>
                {user == null &&
                  <div className="col-4 col-md-6 align-self-center text-end">
                    <Link to={'/regisztracio'} className='d-none d-md-inline-block'>
                      <button className="button secondary-button me-2">
                        Regisztráció
                      </button>
                    </Link>
                    <Link to={'/bejelentkezes'}>
                      <button className="button call-to-action-button login-button">
                        <span className='d-none d-md-inline'>Bejelentkezés</span>
                        <span className='d-inline d-md-none'><i className="fa-solid fa-user"></i></span>
                      </button>
                    </Link>
                  </div>
                }
                {user != null &&
                  <div className='col-4 col-md-6 align-self-center text-end'>
                    <div className='d-flex flex-row logout-container justify-content-end'>
                      <div className='d-inline-flex align-self-center'>
                        <span className='greetings'>Helló <strong><br className='d-block d-md-none'/>{user.firstName}!</strong></span>
                      </div>
                      <div className='d-inline-flex align-self-center'>
                        <button className="button call-to-action-button ms-2 login-button" onClick={handleLogOut}>
                          <span className='d-none d-md-inline'>Kilépés</span>
                          <span className='d-inline d-md-none'><i className="fa-solid fa-right-from-bracket"></i></span>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container body-container mt-3 mb-5">
        <div className="row">
          <div className={`col-12 col-md-4 col-lg-3 navigation-container ${navigationVisible ? 'd-block' : 'd-none'} d-md-block pe-md-0 pe-xl-2`}>
            <Navigation user={user}/>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <div className="container body-container px-0">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-12">
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
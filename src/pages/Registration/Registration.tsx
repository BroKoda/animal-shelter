import React, { ChangeEvent, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/pages/Login.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setFirstName } from './RegistrationSlice'

const Registration = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { firstName } = useAppSelector((state) => state.registration.userToCreate)

  const setFirstNameAction = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(event.target?.value))
  }, [dispatch, firstName])

  return (
    <div className="container login-container">
      <div className="row justify-content-center h-100">
        <div className="col-12 col-md-8 align-self-center">
          <div className="container login-box py-4 px-4">
            <div className="row">
              <div className="col-12">
                <h2>Regisztráció</h2>
                <form className='mt-4 mb-5'>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder='Vezetéknév'
                      id="lastName"
                      value={''}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder='Keresztnév'
                      id="firstName"
                      value={firstName ?? ''}
                      onChange={setFirstNameAction}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-at"></i>
                    </div>
                    <input type="email" className="form-control" placeholder='Email' id="registrationEmail"/>
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input type="password" className="form-control" placeholder='Jelszó' id="registrationPassword"/>
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input type="password" className="form-control" placeholder='Jelszó mégegyszer' id="registrationPasswordRe"/>
                  </div>
                </form>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <Link to={'/'}>
                  <button className='button secondary-button'>
                    Vissza
                  </button>
                </Link>
              </div>
              <div className='col-6'>
                <button className='button call-to-action-button'>
                  Belépés
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration

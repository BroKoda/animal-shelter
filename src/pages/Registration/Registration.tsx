import React, { ChangeEvent, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../assets/pages/Registration.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  registerUser,
  resetRegistration,
  setConfirmPassword,
  setEmail,
  setFirstName, setLastName,
  setPassword
} from './RegistrationSlice'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

const Registration = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.registration.status)
  const { firstName, lastName, email, password, confirmPassword } = useAppSelector((state) => state.registration.userToCreate)

  useEffect(() => {
    if (status === LoadingStatus.complete) {
      dispatch(resetRegistration())
      navigate('/bejelentkezes')
    }
  }, [dispatch, status])

  const handleRegistration = useCallback(() => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    void dispatch(registerUser(user))
  }, [dispatch, firstName, lastName, email, password])

  const handleSetFirstName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(event.target?.value))
  }, [dispatch, firstName])

  const handleSetLastName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(event.target?.value))
  }, [dispatch, lastName])

  const handleSetEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target?.value))
  }, [dispatch, email])

  const handleSetPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target?.value))
  }, [dispatch, password])

  const handleSetConfirmPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setConfirmPassword(event.target?.value))
  }, [dispatch, confirmPassword])

  return (
    <div className="container registration-container">
      <div className="row justify-content-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 align-self-center">
          <div className="container registration-box py-4 px-4">
            <div className="row">
              <div className="col-12">
                <h2>Regisztráció</h2>
                <form className='my-4'>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder='Vezetéknév'
                      id="lastName"
                      value={lastName ?? ''}
                      onChange={handleSetLastName}
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
                      onChange={handleSetFirstName}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-at"></i>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder='Email'
                      id="email"
                      value={email ?? ''}
                      onChange={handleSetEmail}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder='Jelszó'
                      id="password"
                      value={password ?? ''}
                      onChange={handleSetPassword}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder='Jelszó mégegyszer'
                      id="confirm-password"
                      value={confirmPassword ?? ''}
                      onChange={handleSetConfirmPassword}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 mb-3 text-end redirect-to-login'>
                <Link to={'/bejelentkezes'}>
                  <span>Van már felhasználód? Lépj be!</span>
                </Link>
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
                <button className='button call-to-action-button' onClick={handleRegistration}>
                  Regisztráció
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

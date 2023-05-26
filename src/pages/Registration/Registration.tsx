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
  setPassword, setPhone
} from './RegistrationSlice'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import Tooltip from '../../components/Tooltip/Tooltip'

const Registration = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.registration.status)
  const { firstName, lastName, email, phone, password, confirmPassword } = useAppSelector((state) => state.registration.userToCreate)

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
      phone: phone,
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

  const handleSetPhone = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhone(event.target?.value))
  }, [dispatch, phone])

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
                      <Tooltip text={<p>Vezetéknév<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder='Vezetéknév'
                      id="lastName"
                      value={lastName ?? ''}
                      onChange={handleSetLastName}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-user"></i>
                      <Tooltip text={<p>Keresztnév<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder='Keresztnév'
                      id="firstName"
                      value={firstName ?? ''}
                      onChange={handleSetFirstName}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-at"></i>
                      <Tooltip text={<p>Email<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder='Email'
                      id="email"
                      value={email ?? ''}
                      onChange={handleSetEmail}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-phone"></i>
                      <Tooltip text={<p>Telefon<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder='Telefonszám'
                      id="email"
                      value={phone ?? ''}
                      onChange={handleSetPhone}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-lock"></i>
                      <Tooltip text={<p>Jelszó<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder='Jelszó'
                      id="password"
                      value={password ?? ''}
                      onChange={handleSetPassword}
                      required={true}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-lock"></i>
                      <Tooltip text={<p>Jelszó ismét<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder='Jelszó mégegyszer'
                      id="confirm-password"
                      value={confirmPassword ?? ''}
                      onChange={handleSetConfirmPassword}
                      required={true}
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

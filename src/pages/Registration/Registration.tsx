import React, { ChangeEvent, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../assets/pages/Login.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { registerUser, resetRegistration, setConfirmPassword, setEmail, setPassword } from './RegistrationSlice'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

const Registration = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.registration.status)
  const { email, password, confirmPassword } = useAppSelector((state) => state.registration.userToCreate)

  useEffect(() => {
    if (status === LoadingStatus.complete) {
      dispatch(resetRegistration())
      navigate('/login')
    }
  }, [dispatch, status])

  const handleRegistration = useCallback(() => {
    void dispatch(registerUser({email, password}))
  }, [dispatch, email, password])

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
    <div className="container login-container">
      <div className="row justify-content-center h-100">
        <div className="col-12 col-md-8 align-self-center">
          <div className="container login-box py-4 px-4">
            <div className="row">
              <div className="col-12">
                <h2>Regisztráció</h2>
                <form className='mt-4 mb-5'>
                  {/*<div className="form-control-container">*/}
                  {/*  <div className="form-icon-container">*/}
                  {/*    <i className="fa-solid fa-user"></i>*/}
                  {/*  </div>*/}
                  {/*  <input*/}
                  {/*    type="text"*/}
                  {/*    className="form-control"*/}
                  {/*    placeholder='Vezetéknév'*/}
                  {/*    id="lastName"*/}
                  {/*    value={''}*/}
                  {/*  />*/}
                  {/*</div>*/}
                  {/*<div className="form-control-container">*/}
                  {/*  <div className="form-icon-container">*/}
                  {/*    <i className="fa-solid fa-user"></i>*/}
                  {/*  </div>*/}
                  {/*  <input*/}
                  {/*    type="text"*/}
                  {/*    className="form-control"*/}
                  {/*    placeholder='Keresztnév'*/}
                  {/*    id="firstName"*/}
                  {/*    value={firstName ?? ''}*/}
                  {/*    onChange={setFirstNameAction}*/}
                  {/*  />*/}
                  {/*</div>*/}
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

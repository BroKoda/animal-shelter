import React, { ChangeEvent, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../assets/pages/Login.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logInUser, resetLogin, setLoginEmail, setLoginPassword } from './LoginSlice'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'

const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((state) => state.login)
  const { email, password } = useAppSelector((state) => state.login.userToLogin)

  useEffect(() => {
    if (status === LoadingStatus.complete) {
      dispatch(resetLogin())
      navigate('/')
    }
  }, [dispatch, status])

  const handleLogin = useCallback(() => {
    void dispatch(logInUser({email, password}))
  }, [dispatch, email, password])

  const handleSetLoginEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginEmail(event.target.value))
  }, [dispatch, email])

  const handleSetLoginPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginPassword(event.target.value))
  }, [dispatch, password])

  return (
    <div className="container login-container">
      <div className="row justify-content-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 align-self-center">
          <div className="container login-box py-4 px-4">
            <div className="row">
              <div className="col-12">
                <h2>Belépés</h2>
                <p className='login-error'>{error}</p>
                <form className='my-4'>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-at"></i>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder='Email'
                      id="loginEmail"
                      value={email ?? ''}
                      onChange={handleSetLoginEmail}
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
                      id="loginPassword"
                      value={password ?? ''}
                      onChange={handleSetLoginPassword}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 mb-3 text-end redirect-to-registration'>
                <Link to={'/regisztracio'}>
                  <span>Nincs még felhasználód? Regisztrálj!</span>
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
                <button className='button call-to-action-button' onClick={handleLogin}>
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

export default Login

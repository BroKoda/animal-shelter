import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/pages/Login.scss'

const Login = (): JSX.Element => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center h-100">
        <div className="col-4 align-self-center">
          <div className="container login-box py-4 px-4">
            <div className="row">
              <div className="col-12">
                <h2>Regisztráció</h2>
                <form className='mt-4 mb-5'>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Vezetéknév' id="registrationLastName"/>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Keresztnév' id="registrationFirstName"/>
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder='Email' id="registrationEmail"/>
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder='Jelszó' id="registrationPassword"/>
                  </div>
                  <div className="mb-3">
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

export default Login

import React from 'react'
import '../assets/components/Navigation.scss'
import { Link } from 'react-router-dom'
import { User } from '../pages/Login/LoginState'

interface NavigationProps {
  user?: User
}

const Navigation = ({ user }: NavigationProps): JSX.Element => {
  return (
    <div className="container menu-container px-0">
      <div className="row">
        <div className="col-12">
          {user?.role === 'admin' &&
            <Link to={'/iranyitopult'}>
              <div className="menu-item">
                <div className="menu-item-icon-container">
                  <i className="fa-solid fa-house"></i>
                </div>
                <span>Irányítópult</span>
              </div>
            </Link>
          }
          {user?.role !== 'admin' &&
            <Link to={'/'}>
              <div className="menu-item">
                <div className="menu-item-icon-container">
                  <i className="fa-solid fa-house"></i>
                </div>
                <span>Főoldal</span>
              </div>
            </Link>
          }
          <Link to={'/lakok'}>
            <div className="menu-item">
              <div className="menu-item-icon-container">
                <i className="fa-solid fa-paw"></i>
              </div>
              <span>Lakóink</span>
            </div>
          </Link>
          {user?.role === 'admin' &&
            <Link to={'/lakok/hozzaadas'}>
              <div className="menu-item">
                <div className="menu-item-icon-container">
                  <i className="fa-solid fa-paw"></i>
                </div>
                <span>Új Lakó hozzáadása</span>
              </div>
            </Link>
          }
          <Link to={'/hirek'}>
            <div className="menu-item">
              <div className="menu-item-icon-container">
                <i className="fa-solid fa-newspaper"></i>
              </div>
              <span>Hírek</span>
            </div>
          </Link>
          {(user?.role === 'admin' || user?.role === 'publicist') &&
            <Link to={'/hirek/hozzaadas'}>
              <div className="menu-item">
                <div className="menu-item-icon-container">
                  <i className="fa-solid fa-newspaper"></i>
                </div>
                <span>Új hír hozzáadása</span>
              </div>
            </Link>
          }
          <Link to={'/csatlakozz'}>
            <div className="menu-item">
              <div className="menu-item-icon-container">
                <i className="fa-solid fa-hand-holding-heart"></i>
              </div>
              <span>Csatlakozz!</span>
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
  )
}

export default Navigation
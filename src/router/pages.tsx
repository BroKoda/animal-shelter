import React from 'react'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Login from '../pages/Login/Login'
import Registration from '../pages/Registration/Registration'
import AnimalPage from '../pages/AnimalPage/AnimalPage'
import Contact from '../pages/Contact/Contact'

export interface Page {
  title: string
  path: string
  element: JSX.Element
}

export const pages: Page[] = [
  {
    title: 'Page not found',
    path: '*',
    element: <PageNotFound/>
  },
  {
    title: 'Főoldal',
    path: '/',
    element: <Home/>
  },
  {
    title: 'Bejelentkezés',
    path: '/bejelentkezes',
    element: <Login/>
  },
  {
    title: 'Regisztráció',
    path: '/regisztracio',
    element: <Registration/>
  },
  {
    title: 'Adatlap',
    path: '/adatlap',
    element: <AnimalPage/>
  },
  {
    title: 'Kapcsolat',
    path: '/kapcsolat',
    element: <Contact/>
  }
]
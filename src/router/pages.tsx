import React from 'react'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Login from '../pages/Login/Login'
import Registration from '../pages/Registration/Registration'
import SingleResident from '../pages/Residents/SingleResident/SingleResident'
import Contact from '../pages/Contact/Contact'
import AddResident from '../pages/Residents/AddResident/AddResident'
import ResidentsList from '../pages/Residents/ResidentsList/ResidentsList'
import NewsList from '../pages/News/NewsList/NewsList'
import AddNews from '../pages/News/AddNews/AddNews'
import SingleNewsPage from '../pages/News/SingleNewsPage/SingleNewsPage'
import JoinUs from '../pages/JoinUs/JoinUs'

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
    path: 'lakok/adatlap/:animalId',
    element: <SingleResident/>
  },
  {
    title: 'Új lakó hozzáadása',
    path: '/lakok/hozzaadas',
    element: <AddResident/>
  },
  {
    title: 'Lakóoing',
    path: '/lakok',
    element: <ResidentsList/>
  },
  {
    title: 'Hírek',
    path: '/hirek',
    element: <NewsList/>
  },
  {
    title: 'Hírek',
    path: '/hirek/:newsId',
    element: <SingleNewsPage/>
  },
  {
    title: 'Hír hozzáadása',
    path: 'hirek/hir-hozzaadasa',
    element: <AddNews/>
  },
  {
    title: 'Csatlakozz',
    path: 'csatlakozz',
    element: <JoinUs/>
  },
  {
    title: 'Kapcsolat',
    path: '/kapcsolat',
    element: <Contact/>
  }
]
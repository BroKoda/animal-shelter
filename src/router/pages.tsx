import React from 'react'
import Home from '../pages/Home/Home'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Login from '../pages/Login/Login'
import Registration from '../pages/Registration/Registration'
import AnimalDetails from '../pages/AnimalDetails/AnimalDetails'
import Contact from '../pages/Contact/Contact'
import AddNewAnimal from '../pages/AddNewAnimal/AddNewAnimal'
import Residents from '../pages/Residents/Residents'
import NewsList from '../pages/News/NewsList/NewsList'
import AddNews from '../pages/News/AddNews/AddNews'
import SingleNewsPage from '../pages/News/SingleNewsPage/SingleNewsPage'

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
    path: 'lakoink/adatlap/:animalId',
    element: <AnimalDetails/>
  },
  {
    title: 'Új lakó hozzáadása',
    path: '/lako-hozzaadas',
    element: <AddNewAnimal/>
  },
  {
    title: 'Lakóoing',
    path: '/lakoink',
    element: <Residents/>
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
    title: 'Kapcsolat',
    path: '/kapcsolat',
    element: <Contact/>
  }
]
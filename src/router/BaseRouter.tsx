import React, { useEffect } from 'react'
import { Page, pages } from './pages'
import { Route, Routes } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useAppDispatch } from '../app/hooks'
import { getUserDetails, resetLogin } from '../pages/Login/LoginSlice'

const BaseRouter = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getAuth().onAuthStateChanged((authUser) => {
      if (authUser != null) {
        dispatch(getUserDetails(authUser.email))
      } else {
        dispatch(resetLogin())
      }
    })
  }, [dispatch])

  const routes = pages.map(({ title, path, element }: Page) => {
    return (
      <Route key={title} path={`/${path}`} element={element} />
    )
  })

  return (
    <Routes>
      {routes}
    </Routes>
  )
}

export default BaseRouter
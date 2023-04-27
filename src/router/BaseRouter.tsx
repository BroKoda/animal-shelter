import React from 'react'
import { Page, pages } from './pages'
import { Route, Routes } from 'react-router-dom'

const BaseRouter = (): JSX.Element => {
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
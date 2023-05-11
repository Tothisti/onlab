import React from 'react'
import Home from '../pages/Menu'
import Login from '../pages/Login'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import HomeLayout from '../components/general/HomeLayout'
import KittingDashboard from '../pages/KittingDashboard'
import KittingMaintance from '../pages/KitcartMaintance'
import Page from '../components/general/Page'

const CreateProtectedRoute = (child: JSX.Element): JSX.Element => {
  return (
    <ProtectedRoute>
      {child}
    </ProtectedRoute>
  )
}

const CreatePageWithTitle = (title: string, child: JSX.Element): JSX.Element => {
  return (
    <Page title={title}>
      {child}
    </Page>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<HomeLayout />}
    >
      <Route
        path='/'
        element={(
          CreateProtectedRoute(
            CreatePageWithTitle(
              'Home',
              <Home />
            )
          )
        )}
      />
      <Route
        path='/login'
        element={
          CreatePageWithTitle(
            'Login',
            <Login />
          )
        }
      />
      <Route
        path='/kitting-dashboard'
        element={(
          CreateProtectedRoute(
            CreatePageWithTitle(
              'Dashboard',
              <KittingDashboard />
            )
          )
        )}
      />
      <Route
        path='/kitting-maintance'
        element={(
          CreateProtectedRoute(
            CreatePageWithTitle(
              'Maintance',
              <KittingMaintance />
            )
          )
        )}
      />
    </Route>
  )
)

export default router

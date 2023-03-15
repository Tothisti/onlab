import React from 'react'
import Home from '../pages/Menu'
import Login from '../pages/Login'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import HomeLayout from '../components/HomeLayout'
import KittingDashboard from '../pages/KittingDashboard'
import KittingMaintance from '../pages/KitcartMaintance'
import Page from '../components/Page'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<HomeLayout />}
    >
      <Route
        path='/'
        element={(
          <ProtectedRoute>
            <Page title='Home'>
              <Home />
            </Page>
          </ProtectedRoute>
        )}
      />
      <Route
        path='/login'
        element={
          <Page title='Login'>
            <Login />
          </Page>
        }
      />
      <Route
        path='/kitting-dashboard'
        element={(
          <ProtectedRoute>
            <Page title='Dashboard'>
              <KittingDashboard />
            </Page>
          </ProtectedRoute>
        )}
      />
      <Route
        path='/kitting-maintance'
        element={(
          <ProtectedRoute>
            <Page title='Maintance'>
              <KittingMaintance />
            </Page>
          </ProtectedRoute>
        )}
      />
    </Route>
  )
)

export default router

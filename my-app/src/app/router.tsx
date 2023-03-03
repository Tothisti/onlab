import React from 'react'
import Home from '../pages/Menu'
import Login from '../pages/Login'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import HomeLayout from '../components/HomeLayout'
import KittingDashboard from '../pages/KittingDashboard'
import KittingMaintance from '../pages/KitcartMaintance'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<HomeLayout />}
    >
      <Route
        path='/'
        element={(
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/kitting-dashboard'
        element={(
          <ProtectedRoute>
            <KittingDashboard />
          </ProtectedRoute>
        )}
      />
       <Route
        path='/kitting-maintance'
        element={(
          <ProtectedRoute>
            <KittingMaintance />
          </ProtectedRoute>
        )}
      />
    </Route>
  )
)

export default router

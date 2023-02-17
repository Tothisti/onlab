import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import HomeLayout from '../components/HomeLayout'
import Grid from '../pages/Grid'

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
        path='/grid'
        element={(
          <ProtectedRoute>
            <Grid />
          </ProtectedRoute>
        )}
      />
    </Route>
  )
)

export default router

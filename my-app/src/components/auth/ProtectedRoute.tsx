import React from 'react'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'

interface Props {
  children: JSX.Element
}
export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = useSelector(selectUser)
  if (user === null) {
    // user is not authenticated
    return <Navigate to="/login" />
  }
  return children
}

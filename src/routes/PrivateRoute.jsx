import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/user/login" />
}

export default PrivateRoute

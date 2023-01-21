import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const Protected = ({ isAuthenticate, children }) => {
    if (!isAuthenticate) {
        return <Navigate to={'/'} />
    }
    return children ? children : <Outlet />
}

export default Protected
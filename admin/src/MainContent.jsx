import React from 'react'
import AuthProvider from './AuthProvider'
import RouteConfig from './route/RouteConfig'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

const MainContent = () => {
    return (
        <AuthProvider>
            <div>
                <Navbar />
                <hr />
                <div className="app-content">
                    <Sidebar />
                    <RouteConfig />
                </div>
            </div>
        </AuthProvider >
    )
}

export default MainContent

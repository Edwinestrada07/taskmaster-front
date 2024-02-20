import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/mainLayout'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/home',
                Component: Home
            }
        ]
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/signup',
        Component: Signup   
    }
])

export default router
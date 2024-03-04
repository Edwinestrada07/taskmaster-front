import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/mainLayout'

import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import TaskListPage from './pages/task'
import Profile from './pages/profile'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/',
                Component: Home 
            },
            {
                path: '/home',
                Component: Home
            },
            {
                path: '/task',
                Component: TaskListPage
            },
            {
                path: '/profile',
                Component: Profile
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

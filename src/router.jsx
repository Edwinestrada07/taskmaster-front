import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/mainLayout'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import Task from './pages/task'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/home',
                Component: Home
            },
            {
                path: '/task',
                Component: Task
            },
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
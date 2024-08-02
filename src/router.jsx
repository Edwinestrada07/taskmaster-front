import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/mainLayout'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import TaskListPage from './pages/task'
import Profile from './pages/profile'

// Define la función loader para las rutas protegidas
const loaderProtected = async () => {
    // Verifica si el usuario está autenticado
    if (!localStorage.getItem('token')) {
        throw new Response('', { status: 401 })
    }
    return null; // Asegúrate de devolver null o un valor adecuado
}

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/home',
                Component: Home,
            },
            {
                path: '/task',
                Component: TaskListPage,
                loader: loaderProtected, // Ruta protegida por autenticación
            },
            {
                path: '/profile',
                Component: Profile,
                loader: loaderProtected, // Ruta protegida por autenticación
            }
        ]
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/signup',
        Component: Signup,
    }
])

export default router





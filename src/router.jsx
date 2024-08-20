import { createBrowserRouter, redirect } from 'react-router-dom';
import Layout from './layouts/mainLayout';
import Start from './pages/start';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import TaskListPage from './pages/task';
import Profile from './pages/profile';
import ErrorPage from './pages/errorPage';
import FavoriteTasksPage from './pages/favoriteTasksPage';

// Define la función loader para las rutas protegidas
const loaderProtected = async () => {
    if (!localStorage.getItem('token')) {
        return redirect('/login');
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'start',
                element: <Start />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'task',
                element: <TaskListPage />,
                loader: loaderProtected,
            },
            {
                path: 'profile',
                element: <Profile />,
                loader: loaderProtected,
            },
            {
                path: 'favorites',
                element: <FavoriteTasksPage />,
                loader: loaderProtected,
            }
        ],
        errorElement: <ErrorPage /> // Manejo de errores
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'signup',
        element: <Signup />,
    }
]);

export default router;

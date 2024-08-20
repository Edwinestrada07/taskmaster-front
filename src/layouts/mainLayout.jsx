import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
            if (token) {
                navigate('/home'); // Redirige a /home si ya está autenticado
            } else {
                navigate('/start'); // Redirige a /start si no está autenticado
            }
        }
    }, [navigate, location.pathname]);

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;

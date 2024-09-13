import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Si estás usando react-router

const useAuth = () => {
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();

    // Función para verificar si el token ha expirado
    const isTokenExpired = () => {
        const token = localStorage.getItem('token');
        if (!token) return true;

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Tiempo actual en segundos
            return decodedToken.exp < currentTime; // Retorna true si el token ha expirado
        } catch (error) {
            console.error('Error decodificando el token:', error);
            return true;
        }
    };

    useEffect(() => {
        // Si el token ha expirado, muestra el mensaje de error
        if (isTokenExpired()) {
            setAuthError('Tu sesión ha caducado. Por favor, vuelve a iniciar sesión.');
            localStorage.removeItem('token'); // Opcional: eliminar el token caducado del almacenamiento local

            // Redirigir a la página de inicio de sesión después de 3 segundos
            setTimeout(() => {
                navigate('/login');
            }, 3000); // 3 segundos de retardo antes de la redirección
        }
    }, []);

    return { authError };
};

export default useAuth;

import React, { useState, useEffect } from 'react';
import UpdateProfile from '../components/updateProfile';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => { 
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No se encontró token de autorización.");
                return;
            }

            const response = await fetch('http://localhost:5000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo obtener la información del usuario.');
            }

            const userData = await response.json();
            setUser(userData);

        } catch (error) {
            console.error("Error al obtener información del usuario:", error);
        }
    };

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Información del Usuario</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Otros campos de información del usuario */}
            <UpdateProfile user={user} setUser={setUser} />
        </div>
    );
}

export default UserProfile;

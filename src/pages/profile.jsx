import React, { useState, useEffect } from 'react';

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
                    authorization: localStorage.getItem('token')
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
            <UpdateForm user={user} setUser={setUser} />
        </div>
    );
}

function UpdateForm({ user, setUser }) {
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        email: user.email
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {   
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No se encontró token de autorización.");
                return;
            }
    
            const response = await fetch(`http://localhost:5000/user/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('No se pudo actualizar la información del usuario.');
            }
    
            const responseData = await response.json();
            console.log('Perfil actualizado:', responseData);
            setUser(responseData);
        } catch (error) {
            console.error('Error al actualizar Perfil', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h3>Actualizar Información</h3>
            <label>
                Nombre:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            {/* Otros campos del formulario */}
            <button type="submit">Actualizar</button>
        </form>
    );
}

export default UserProfile;

import React, { useState, useEffect } from 'react';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [setImage] = useState(null);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user`, {
                    method: 'GET',
                    headers: {
                        authorization: localStorage.getItem('token')
                    },
                });
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            if (!user) return; // Verificar que user no sea null
            const response = await fetch(`http://localhost:5000/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(user),
            });
            const updatedUserData = await response.json();
            setUser(updatedUserData);
            alert('Perfil actualizado exitosamente.');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            const response = await fetch('http://localhost:5000/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ password, newPassword }),
            });
            await response.json();
            alert('Contraseña cambiada exitosamente.');
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
        }
    };

    const handleImageChange = (e) => {
        // Lógica para manejar el cambio de imagen de perfil
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    return (
        <div>
            {user && (
                <div>
                    <h1>Perfil de Usuario</h1>

                    <div>
                        <img src={user.profileImageUrl} alt="Perfil" />
                        <input type="file" onChange={handleImageChange} />
                    </div>

                    <div>
                        <label>Nombre de Usuario:</label>
                        <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>

                    <div>
                        <label>Correo Electrónico:</label>
                        <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>

                    <div>
                        <label>Contraseña Actual:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <label>Nueva Contraseña:</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    
                    <button onClick={handleUpdateProfile}>Actualizar Perfil</button>
                    <button onClick={handleChangePassword}>Cambiar Contraseña</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;

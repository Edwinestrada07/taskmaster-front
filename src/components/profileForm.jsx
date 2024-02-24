/*import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [user, setUser] = useState({ name: '', email: '', profileImageUrl: '' });
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                }
            });
    
            const userData = await response.json();
            setUser(userData);
    
        } catch (error) {
            console.error("error", error);
        }
    };

    const updateUser = async () => {
        try {
            const updatedUser = { id: user.id, name: user.name, email: user.email }; // Solo enviar los campos que han cambiado
            const response = await fetch(`http://localhost:5000/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(updatedUser)
            });
            const responseData = await response.json();
            console.log('Perfil actualizado:', responseData);
            getUsers();
        } catch (error) {
            console.error('Error al actualizar Perfil', error);
            // Aquí podrías mostrar un mensaje de error al usuario
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

            if (response.ok) {
                alert('Contraseña cambiada exitosamente.');
            } else {
                const errorData = await response.json();
                console.error('Error al cambiar la contraseña:', errorData.message);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const handleImageChange = async (e) => {
        try {
            const selectedImage = e.target.files[0];
            const formData = new FormData();
            formData.append('image', selectedImage);
            
            const response = await fetch(`http://localhost:5000/user/${user.id}/avatar`, {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('token')
                },
                body: formData
            });
            
            if (response.ok) {
                alert('Imagen de perfil actualizada correctamente.');
                getUsers();
            } else {
                const errorData = await response.json();
                console.error('Error al actualizar la imagen de perfil:', errorData.message);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
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
                    
                    <button onClick={updateUser}>Actualizar Perfil</button>
                    <button onClick={handleChangePassword}>Cambiar Contraseña</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;*/



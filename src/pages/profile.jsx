import React, { useState } from 'react';
import ProfileForm from '../components/profileForm';
import ChangePasswordForm from '../components/changePasswordForm';

const ProfilePage = ({ user }) => {
    const [error, setError] = useState(null);

    const handleProfileUpdate = async (userData) => {
        try {
            // Lógica para enviar los datos actualizados del usuario al servidor
            const response = await fetch(`http://localhost:5000/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(userData)
            });
                
            const responseData = await response.json();
            console.log('Perfil actualizado:', responseData);
            // Actualizar el estado del usuario si es necesario

        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            setError('Error al actualizar el perfil');
        }
    };

    const handleChangePassword = async (passwordData) => {
        try {
            // Lógica para enviar la nueva contraseña al servidor
            console.log('Nueva contraseña:', passwordData);
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setError('Error al cambiar la contraseña');
        }
    };

    const handleUploadAvatar = async (avatarFile) => {
        try {
            // Lógica para enviar la foto de perfil al servidor
            console.log('Nueva foto de perfil:', avatarFile);
        } catch (error) {
            console.error('Error al subir la foto de perfil:', error);
            setError('Error al subir la foto de perfil');
        }
    };

    return (
        <div>
            <h2>Perfil de Usuario</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h3>Información del Usuario</h3>
            <p>Nombre de usuario: {user.name}</p>
            <p>Correo electrónico: {user.email}</p>
            
            <ProfileForm user={user} onSubmit={handleProfileUpdate} onUploadAvatar={handleUploadAvatar} />
            <ChangePasswordForm onChangePassword={handleChangePassword} />
        </div>
    );
};

export default ProfilePage;


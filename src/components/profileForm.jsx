import React, { useState } from 'react';

const ProfileForm = ({ user, onSubmit, onUploadAvatar }) => {
    
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email };
            await onSubmit(userData);
            setSuccessMessage('¡Perfil actualizado correctamente!');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            setError('Error al actualizar el perfil');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleUploadClick = async () => {
        try {
            await onUploadAvatar(avatar);
            setSuccessMessage('¡Foto de perfil subida correctamente!');
        } catch (error) {
            console.error('Error al subir la foto de perfil:', error);
            setError('Error al subir la foto de perfil');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <button type="submit">Guardar cambios</button>
            <button onClick={handleUploadClick}>Subir foto de perfil</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
    );
};

export default ProfileForm;


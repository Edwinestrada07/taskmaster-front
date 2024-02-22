import React, { useState } from 'react';

const ChangePasswordForm = ({ onChangePassword }) => {
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
        }
        try {
            const passwordData = { currentPassword, newPassword };
            await onChangePassword(passwordData);
            setSuccessMessage('¡Contraseña cambiada correctamente!');
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setError('Error al cambiar la contraseña');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <button type="submit">Cambiar contraseña</button>
        </form>
    );
};

export default ChangePasswordForm;


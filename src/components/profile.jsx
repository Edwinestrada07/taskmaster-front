import React, { useState, useEffect } from 'react';

function Profile() {
    const [user, setUser] = useState({});
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No se ha encontrado un token de autenticación');
            return;
        }

        fetch('http://localhost:5000/user/profile', {
            headers: {
                authorization: localStorage.getItem('token')
            },
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un error al obtener la información del usuario');
            }
            return response.json();
        })

        .then(data => setUser(data))
        .catch(error => setError(error.message));

    }, []);

    //**// */
    const handlePasswordChange = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No se ha encontrado un token de autenticación');
          return;
        }
        if (newPassword !== confirmNewPassword) {
          setError('Las contraseñas nuevas no coinciden');
          return;
        }
        fetch('http://localhost:5000/user/change-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({ password, newPassword }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un error al cambiar la contraseña');
            }
            return response.json();
          })
          .then(data => {
            console.log('Contraseña cambiada:', data);
            setPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setError(null);
          })
          .catch(error => setError(error.message));
    };

    const handleImageUpload = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No se ha encontrado un token de autenticación');
          return;
        }
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        fetch('http://localhost:5000/user/profile-image', {
          method: 'PUT',
          headers: {
            authorization: localStorage.getItem('token')
          },
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Hubo un error al cambiar la foto de perfil');
            }
            return response.json();
          })
          .then(data => {
            console.log('Foto de perfil cambiada:', data);
            setProfileImage(null);
            setError(null);
          })
          .catch(error => setError(error.message));
    };

    //**// */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No se ha encontrado un token de autenticación');
            return;
        }
        fetch('http://localhost:5000/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(user),
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un error al actualizar la información del usuario');
            }
            return response.json();
        })

        .then(data => console.log('Usuario actualizado:', data))
        .catch(error => setError(error.message));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        
        <div>
            <h2>Información del Usuario</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Otros campos de información del usuario */}
            

            <h2>Perfil de Usuario</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleFormSubmit}>
                <label>
                    Nombre de usuario:
                    <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} />
                </label>
                <label>
                    Correo electrónico:
                    <input type="email" name="email" value={user.email || ''} onChange={handleInputChange} />
                </label>
                {/* Agrega más campos según tus necesidades */}
                <div>
                    <h3>Cambiar Contraseña</h3>
                    <input type="password" placeholder="Contraseña actual" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="password" placeholder="Nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    <input type="password" placeholder="Confirmar nueva contraseña" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                    <button onClick={handlePasswordChange}>Cambiar Contraseña</button>
                </div>
                <div>
                    <h3>Cambiar Foto de Perfil</h3>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <button onClick={handleImageUpload}>Subir Foto de Perfil</button>
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default Profile;

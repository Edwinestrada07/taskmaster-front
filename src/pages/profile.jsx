import React, { useState, useEffect } from 'react';


function Profile() {
    const [user, setUser] = useState({});
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
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
        <div className="container">
            <h2 className="text">Información del Usuario</h2>

            <div className="row">
                <div className="col-md-6">

                    <h3 className="text m-3">Perfil de Usuario</h3>
                    <p className="form-styling-inf"><strong>Nombre: </strong> {user.name}</p>
                    <p className="form-styling-inf"><strong>Email: </strong> {user.email}</p>
                    
                    <p className="text-ul"><strong>Puedes modificar la información del usuario aquí ↓</strong></p>
                    
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleFormSubmit}>
                        <label className="text-a">
                            Nombre de usuario:
                            <input
                                className="form-styling-inf m-1"
                                type="text" 
                                name="name" 
                                value={user.name || ''}
                                onChange={handleInputChange} 
                            />
                        </label>
                        <label className="text-a">
                            Correo electrónico:
                            <input
                                className="form-styling-inf m-1"
                                type="email" 
                                name="email" 
                                value={user.email || ''} 
                                onChange={handleInputChange} 
                            />
                        </label>
                        <button className="btn-animate" type="submit">Actualizar Información</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <div className="m-5">
                        <h3 className="text">Cambiar Contraseña</h3>
                        <label className="text-a">
                            Contraseña actual
                            <input
                                className="form-styling-inf"
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </label>
                        
                        <label className="text-a">
                            Nueva contraseña
                            <input
                                className="form-styling-inf"
                                type="password"  
                                value={newPassword} 
                                onChange={e => setNewPassword(e.target.value)} 
                            />

                        </label>

                        <label className="text-a">
                            Confirmar nueva contraseña
                            <input
                                className="form-styling-inf"
                                type="password"  
                                value={confirmNewPassword} 
                                onChange={e => setConfirmNewPassword(e.target.value)} 
                            />
                        </label>
                        <button className="btn-animate" onClick={handlePasswordChange}>Cambiar Contraseña</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

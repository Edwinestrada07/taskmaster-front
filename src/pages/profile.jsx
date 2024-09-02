import React, { useState, useEffect } from 'react';

function Profile() {
    // Estados para manejar la información del usuario, cambios de contraseña, errores, y mensajes de éxito
    const [user, setUser] = useState({});
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(null); // Controla el modal activo: 'info' para actualizar perfil, 'password' para cambiar contraseña

    // Fetch del perfil del usuario al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No se ha encontrado un token de autenticación');
            return;
        }

        fetch('https://taskmaster-back.onrender.com/user/profile', {
            headers: {
                authorization: token,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hubo un error al obtener la información del usuario');
                }
                return response.json();
            })
            .then((data) => setUser(data))
            .catch((error) => setError(error.message));
    }, []);

    // Temporizador para ocultar mensajes de error y éxito después de 3 segundos
    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timer); // Limpieza del temporizador
        }
    }, [error, successMessage]);

    // Manejo de cambio de contraseña
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

        fetch('https://taskmaster-back.onrender.com/user/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            body: JSON.stringify({ password, newPassword }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hubo un error al cambiar la contraseña');
                }
                return response.json();
            })
            .then(() => {
                setSuccessMessage('Contraseña cambiada con éxito');
                // Reseteo de campos y cierre del modal
                setPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setShowModal(null);
            })
            .catch((error) => setError(error.message));
    };

    // Manejo de actualización de información del perfil
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No se ha encontrado un token de autenticación');
            return;
        }

        fetch('https://taskmaster-back.onrender.com/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Hubo un error al actualizar la información del usuario');
                }
                return response.json();
            })
            .then(() => {
                setSuccessMessage('Información actualizada con éxito');
                setShowModal(null); // Cerrar el modal después de la actualización
            })
            .catch((error) => setError(error.message));
    };

    // Manejo de cambios en los campos del perfil de usuario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="flex items-center bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e]">
            <div className="container">
                <div className="relative overflow-hidden bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#1f2a44] dark:via-[#1f2a44] dark:to-[#1f2a44] rounded-3xl p-3 shadow-lg md:w-2/3 lg:w-1/2 mx-auto">
                    <h1 className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-12 h-12 mr-3 rounded-full" src="./assets/logo.jpg" alt="logo" />
                        Información del Usuario
                    </h1>

                    <div className="absolute inset-0 pointer-events-none">
                        {/* Efecto visual de destellos en el fondo */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute top-3/4 left-3/4 w-40 h-40 bg-purple-300 opacity-30 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-300 opacity-20 rounded-full filter blur-xl animate-pulse"></div>
                        <div className="absolute bottom-3/4 right-3/4 w-40 h-40 bg-blue-300 opacity-25 rounded-full filter blur-xl animate-pulse"></div>
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                        <strong>Nombre:</strong> {user.name}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        <strong>Email:</strong> {user.email}
                    </p>

                    <div className="flex flex-col items-center m-3">
                        {successMessage && (
                            <div className="alert alert-success text-green-600 text-lg font-medium leading-tight mb-4">
                                {successMessage}
                            </div>
                        )}

                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 mt-6 text-center">
                            <strong>Puedes modificar la información del usuario aquí ↓</strong>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-2/3">
                            {/* Botón para abrir el modal de cambiar información */}
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Cambiar Información</h3>
                                <button
                                    className="py-2.5 px-8 text-gray-700 font-semibold bg-white rounded-md duration-150 hover:bg-gray-500 dark:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                                    onClick={() => setShowModal('info')}
                                >
                                    Cambiar Información
                                </button>
                            </div>

                            {/* Botón para abrir el modal de cambiar contraseña */}
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Cambiar Contraseña</h3>
                                <button
                                    className="py-2.5 px-8 text-gray-700 font-semibold bg-white rounded-md duration-150 hover:bg-gray-100 dark:text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                                    onClick={() => setShowModal('password')}
                                >
                                    Cambiar Contraseña
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Modal para cambiar información de usuario */}
                    {showModal === 'info' && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50">
                            <div className="bg-gray-800 text-white p-10 rounded-3xl w-full max-w-md relative">
                                <h3 className="text-2xl font-bold mb-4 dark:text-[#e2e8f0]">Cambiar Información</h3>

                                {/* Mostrar mensaje de error o éxito */}
                                {error && (
                                    <div className="alert alert-danger text-red-600 text-lg font-medium leading-tight mb-4">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleFormSubmit}>
                                    <label className="block text-lg font-medium text-gray-300 dark:text-gray-300 mb-2">
                                        Nombre de usuario:
                                        <input
                                            className="form-styling-inf"
                                            type="text"
                                            name="name"
                                            value={user.name || ''}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label className="block text-lg font-medium text-gray-300 dark:text-gray-300 mb-2">
                                        Correo electrónico:
                                        <input
                                            className="form-styling-inf"
                                            type="email"
                                            name="email"
                                            value={user.email || ''}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <div className="flex justify-end mt-4">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2">
                                            Guardar
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                                            onClick={() => setShowModal(null)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Modal para cambiar contraseña */}
                    {showModal === 'password' && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50">
                            <div className="bg-gray-800 text-white p-10 rounded-3xl w-full max-w-md relative">
                                <h3 className="text-2xl font-bold mb-4 dark:text-[#e2e8f0]">Cambiar Contraseña</h3>

                                {/* Mostrar mensaje de error */}
                                {error && (
                                    <div className="alert alert-danger text-red-600 text-lg font-medium leading-tight mb-4">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }}>
                                    <label className="block text-lg font-medium text-gray-300 dark:text-gray-300 mb-2">
                                        Contraseña actual:
                                        <input
                                            className="form-styling-inf"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </label>
                                    <label className="block text-lg font-medium text-gray-300 dark:text-gray-300 mb-2">
                                        Nueva contraseña:
                                        <input
                                            className="form-styling-inf"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </label>
                                    <label className="block text-lg font-medium text-gray-300 dark:text-gray-300 mb-2">
                                        Confirmar nueva contraseña:
                                        <input
                                            className="form-styling-inf"
                                            type="password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        />
                                    </label>
                                    <div className="flex justify-end mt-4">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2">
                                            Cambiar Contraseña
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                                            onClick={() => setShowModal(null)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;

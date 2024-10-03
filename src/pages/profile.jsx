import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function Profile() {
    const [user, setUser] = useState({});
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(null);

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
            if (!response.ok) throw new Error('Error al obtener la información del usuario');
            return response.json();
        })
        .then((data) => setUser(data))
        .catch((error) => setError(error.message));
    }, []);

    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, successMessage]);

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
            if (!response.ok) throw new Error('Error al cambiar la contraseña');
            return response.json();
        })
        .then(() => {
            setSuccessMessage('Contraseña cambiada con éxito');
            setPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setShowModal(null);
        })
        .catch((error) => setError(error.message));
    };

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
            if (!response.ok) throw new Error('Error al actualizar la información');
            return response.json();
        })
        .then(() => {
            setSuccessMessage('Información actualizada con éxito');
            setShowModal(null);
        })
        .catch((error) => setError(error.message));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
        }));
    };

    const closeModal = () => setShowModal(null);

    return (
        <div className="min-h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="container my-24">
                <div className="relative dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-lg mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Perfil de Usuario
                    </h1>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                        <strong>Nombre:</strong> {user.name}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        <strong>Email:</strong> {user.email}
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={() => setShowModal('info')}
                            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-all"
                        >
                            Actualizar Información
                        </button>
                        <button
                            onClick={() => setShowModal('password')}
                            className="w-full py-2 px-4 bg-green-500 hover:bg-green-700 text-white rounded-lg transition-all"
                        >
                            Cambiar Contraseña
                        </button>
                    </div>

                    {successMessage && (
                        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-md transition-opacity">
                            {successMessage}
                            <button
                                onClick={() => setSuccessMessage('')}
                                className="ml-4 text-lg text-white"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-md transition-opacity">
                            {error}
                            <button onClick={() => setError(null)} className="ml-4 text-lg text-white">
                                <FaTimes />
                            </button>
                        </div>
                    )}

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                            <div className="bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md relative">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600"
                                    >
                                    <FaTimes size={20} />
                                </button>

                                {showModal === 'info' && (
                                    <form onSubmit={handleFormSubmit} className="space-y-4">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Actualizar Información
                                        </h2>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nombre"
                                            value={user.name || ''}
                                            onChange={handleInputChange}
                                            className="border-1 mb-2 block h-12 w-full rounded-md border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={user.email || ''}
                                            onChange={handleInputChange}
                                            className="border-1 mb-2 block h-12 w-full rounded-md border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                                        >
                                            Guardar
                                        </button>
                                    </form>
                                )}

                                {showModal === 'password' && (
                                    <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }} className="space-y-4">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Cambiar Contraseña
                                        </h2>
                                        <input
                                            type="password"
                                            placeholder="Contraseña actual"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="border-1 mb-2 block h-12 w-full rounded-md border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Nueva contraseña"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="border-1 mb-2 block h-12 w-full rounded-md border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirmar nueva contraseña"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            className="border-1 mb-2 block h-12 w-full rounded-md border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 bg-green-500 hover:bg-green-700 text-white rounded-lg"
                                        >
                                            Cambiar Contraseña
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

function Signup() {
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onChangeData = (event) => {
        setSignup({
            ...signup,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            setLoading(true);
            if (!signup.name || !signup.email || !signup.password) {
                setError('Por favor, complete todos los campos.');
                setLoading(false);
                return;
            }
    
            const response = await fetch('https://taskmaster-back.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signup),
            });
    
            if (!response.ok) {
                throw new Error('Respuesta no válida del servidor');
            }
    
            const dataResponse = await response.json();
    
            if (dataResponse.error) {
                setError(dataResponse.error);
                setLoading(false);
                return;
            }
    
            localStorage.setItem('user', JSON.stringify(dataResponse.user));
            localStorage.setItem('token', dataResponse.token);
    
            setSuccessMessage('Registro exitoso...');
            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            setError('Hubo un problema al registrarse, verifica la información');
        } finally {
            setLoading(false);
        }
    };
    

    const handleGoogleSignUp = async () => {
        try {
            setLoading(true)
            const { user, session, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })

            if (error) {
                setError('Error al iniciar sesión con Google')
                setLoading(false)
                return
            }

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('session', JSON.stringify(session))
            navigate('/start')
        } catch (error) {
            setError('Error al iniciar sesión con Google')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/start')
        }
    }, [navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e]">
            <div className="container mx-auto px-4 py-2">
                <div className="flex flex-col items-center">

                    <h1 className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-12 h-12 mr-3 rounded-full" src="./assets/logo.jpg" alt="logo" />
                        TaskMaster
                    </h1>

                    <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white dark:text-white mb-4">
                                Registrarse
                            </h2>

                            {error && (
                                <div className="alert alert-danger text-red-600 text-lg font-medium leading-tight mb-4">
                                    {error}
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success text-green-600 text-lg font-medium leading-tight mb-4">
                                    {successMessage}
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-lg font-medium text-white dark:text-white">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={signup.name}
                                        onChange={onChangeData}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nombre completo"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-lg font-medium text-white dark:text-white">Correo</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={signup.email}
                                        onChange={onChangeData}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-lg font-medium text-white dark:text-white">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={signup.password}
                                        onChange={onChangeData}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/8000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            Cargando...
                                        </div>
                                    ) : 'Registrarse'}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleGoogleSignUp}
                                    className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-4"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/8000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            Cargando...
                                        </div>
                                    ) : 'Registrarse con Google'}
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                                    ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-blue-500 hover:underline dark:text-blue-500">Iniciar Sesión</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

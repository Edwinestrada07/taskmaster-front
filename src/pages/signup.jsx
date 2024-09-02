import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function Signup() {
    // Estado para gestionar los datos del formulario, errores, mensajes de éxito y estado de carga
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    // Maneja los cambios en los campos del formulario
    const onChangeData = (event) => {
        const { id, value } = event.target;
        setSignup(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Validación del formulario
        if (!signup.name || !signup.email || !signup.password) {
            setError('Por favor, complete todos los campos.');
            setLoading(false);
            return;
        }

        try {
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
                return;
            }

            localStorage.setItem('user', JSON.stringify(dataResponse.user));
            localStorage.setItem('token', dataResponse.token);

            setSuccessMessage('Registro exitoso...');
            setTimeout(() => navigate('/login'), 1000); // Redirige al login después del registro
        } catch (error) {
            setError('Hubo un problema al registrarse, verifica la información');
        } finally {
            setLoading(false);
        }
    };

    // Maneja el registro con Google
    const handleGoogleSignUp = async () => {
        setLoading(true);

        try {
            const { user, session, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });

            if (error) {
                setError('Error al iniciar sesión con Google');
                return;
            }

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('session', JSON.stringify(session));
            navigate('/home');
        } catch (error) {
            setError('Error al iniciar sesión con Google');
        } finally {
            setLoading(false);
        }
    };

    // Redirige si ya hay un token en localStorage
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/start');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e]">
            <div className="container mx-auto px-4 py-2">
                <div className="flex flex-col items-center">
                    <h1 className="flex items-center mb-2 text-4xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-12 h-12 mr-3 rounded-full" src="./assets/logo.jpg" alt="logo" />
                        TaskMaster
                    </h1>

                    <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
                        <div className="p-4 sm:p-8">
                            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white dark:text-white mb-4">
                                Registrarse
                            </h2>

                            {/* Mensajes de error y éxito */}
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

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-lg font-medium text-white dark:text-white">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={signup.name}
                                        onChange={onChangeData}
                                        className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)] bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        placeholder="Nombre completo"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium text-white dark:text-white">Correo</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={signup.email}
                                        onChange={onChangeData}
                                        className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)] bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-lg font-medium text-white dark:text-white">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={signup.password}
                                        onChange={onChangeData}
                                        placeholder="••••••••"
                                        className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)] bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="w-5 h-5 mr-2 text-gray animate-spin" xmlns="http://www.w3.org/8000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-85" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            Cargando...
                                        </div>
                                    ) : 'Registrarse'}
                                </button>

                                <button
                                    onClick={handleGoogleSignUp}
                                    className="w-full mt-4 transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    <img
                                        src="../assets/icons8-logo-de-google.svg"
                                        alt="Google icon"
                                        className="w-6 h-6 mr-2"
                                    />   
                                    Registrarse con Google
                                </button>
                            </form>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta? <Link to="/login" className="font-medium text-[#8678f9] hover:underline dark:text-[#8678f9]">Inicia sesión</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

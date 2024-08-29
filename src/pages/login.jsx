import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function Login() {
    const [login, setLogin] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/start');
        }
    }, [navigate]);

    const onChangeData = (event) => {
        setLogin({ ...login, [event.target.id]: event.target.value });
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError('');
            setSuccessMessage('');

            if (!login.email || !login.password) {
                setError('Por favor, complete todos los campos.');
                setLoading(false);
                return;
            }

            const response = await fetch('https://taskmaster-back.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setSuccessMessage('Inicio de sesión exitoso...');
                setTimeout(() => navigate('/start'), 1000);
            } else {
                setError(`Error de autenticación: ${data}`);
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            setError('Error al iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await supabase.auth.signInWithOAuth({ provider: 'google' });
        } catch (error) {
            setError('Error al iniciar sesión con Google.');
            console.error('Error al iniciar sesión con Google:', error);
        }
    }

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
                                Iniciar Sesión
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

                            <form className="space-y-4" onSubmit={submit} id='form-login'>
                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium text-white dark:text-white">Correo</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={login.email}
                                        onChange={onChangeData}
                                        className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
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
                                        value={login.password}
                                        onChange={onChangeData}
                                        placeholder="••••••••"
                                        className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
                                        required
                                    />
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <Link to="/forgot-password" className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-500">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="w-5 h-5 mr-2 text-gray animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-85" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            Cargando...
                                        </div>
                                    ) : 'Iniciar Sesión'}
                                </button>

                                <button
                                    onClick={signInWithGoogle}
                                    className="w-full mt-4 transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    <img
                                        src="../assets/icons8-logo-de-google.svg"
                                        alt="Google icon"
                                        className="w-6 h-6 mr-2"
                                    />
                                    Iniciar Sesión con Google
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                                    ¿No tienes una cuenta? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Regístrate</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

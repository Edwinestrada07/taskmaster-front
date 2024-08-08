import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
            <img src="./assets/error-404.png" alt="Error 404" className="w-50 h-200 mb-8" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Página no encontrada o acceso no autorizado
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Lo sentimos, no pudimos encontrar la página que estabas buscando.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
                Volver al Inicio
            </button>
        </div>
    );
}

export default ErrorPage;

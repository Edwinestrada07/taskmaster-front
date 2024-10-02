import React, { useState } from 'react';

const TaskFilter = ({ setTaskStatus }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="p-2">
            {/* Botón hamburguesa visible en móviles */}
            <div className="sm:hidden flex justify-end mb-2">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-800 bg-gray-100 p-2 rounded-md shadow-md transition-transform hover:scale-105"
                >
                    <i className="fas fa-bars text-xl"></i>
                </button>
            </div>

            {/* Menú de filtros, colapsable en móviles */}
            <nav
                className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 justify-center items-center ${
                    isMenuOpen ? 'block' : 'hidden'
                } sm:flex sm:flex-row sm:space-x-2`}
            >
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
                    onClick={() => setTaskStatus("PENDING")}
                >
                    <span className="hidden sm:inline">Pendiente</span>
                    <i className="fas fa-check-circle sm:hidden"></i>
                </button>

                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
                    onClick={() => setTaskStatus("IN_PROGRESS")}
                >
                    <span className="hidden sm:inline">En progreso</span>
                    <i className="fas fa-spinner sm:hidden"></i>
                </button>

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
                    onClick={() => setTaskStatus("COMPLETED")}
                >
                    <span className="hidden sm:inline">Completada</span>
                    <i className="fas fa-check sm:hidden"></i>
                </button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
                    onClick={() => setTaskStatus(null)}
                >
                    <span className="hidden sm:inline">Borrar Filtros</span>
                    <i className="fas fa-times sm:hidden"></i>
                </button>
            </nav>
        </div>
    );
};

export default TaskFilter;

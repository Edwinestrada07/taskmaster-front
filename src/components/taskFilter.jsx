import React from 'react';

const TaskFilter = ({ setTaskStatus }) => {
    return (
        <nav className="bg-gray-800 dark:bg-gray-700 p-3 rounded-lg shadow-md flex flex-wrap justify-center items-center space-x-3 ml-2 mb-3">
            <button
                className="bg-red-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                onClick={() => setTaskStatus("PENDING")}
            >
                <span className="hidden sm:inline">Pendiente</span>
                <i className="fas fa-check-circle sm:hidden"></i>
            </button>
            <button
                className="bg-yellow-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                onClick={() => setTaskStatus("IN_PROGRESS")}
            >
                <span className="hidden sm:inline">En progreso</span>
                <i className="fas fa-spinner sm:hidden"></i>
            </button>
            <button
                className="bg-green-500 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                onClick={() => setTaskStatus("COMPLETED")}
            >
                <span className="hidden sm:inline">Completada</span>
                <i className="fas fa-check sm:hidden"></i>
            </button>
            <button
                className="bg-blue-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                onClick={() => setTaskStatus(null)}
            >
                <span className="hidden sm:inline">Borrar Filtros</span>
                <i className="fas fa-times sm:hidden"></i>
            </button>
        </nav>
    );
};

export default TaskFilter;

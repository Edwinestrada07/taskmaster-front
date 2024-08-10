import React, { useState } from 'react';

const translations = {
    "LOW": "Baja",
    "MEDIUM": "Media",
    "HIGH": "Alta",
    "PENDING": "Pendiente",
    "IN_PROGRESS": "En progreso",
    "COMPLETED": "Completada"
};

const translate = (text) => {
    return translations[text] || text;
};

const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!task) return null;

    const { id, description, dueDate, priority, status } = task;

    const getStatusClass = () => {
        switch (status) {
            case 'PENDING':
                return 'bg-red-200';
            case 'IN_PROGRESS':
                return 'bg-yellow-200';
            case 'COMPLETED':
                return 'bg-green-200';
            default:
                return '';
        }
    };

    return (
        <div className={`col-lg-12 mb-2 ${getStatusClass()} p-2 rounded-lg`}>
            <div className="card bg-gray-900 rounded-xl shadow-md">
                <div className="card-header flex justify-between items-center py-2">
                    <h3 className="card-title font-semibold text-lg">{description}</h3>
                    <button
                        className="text-blue-700 hover:text-blue-800"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>

                {isOpen && (
                    <div className="card-body">
                        <p className="text-sm text-gray-600 mb-1">Fecha: {formatDate(dueDate)}</p>
                        <p className="text-sm text-gray-600 mb-1">Prioridad: {translate(priority)}</p>
                        <p className="text-sm text-gray-600 mb-1">Estado: {translate(status)}</p>

                        <div className="flex justify-between px-6">
                            <button
                                className="px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                                onClick={() => onUpdateTask(id, task)}
                            >
                                Actualizar
                            </button>
                            <button
                                className="px-3 py-1.5 text-sm text-danger duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                                onClick={() => onDeleteTask(id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItem;

import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';

// Diccionario de traducciones para estados y prioridades de las tareas
const translations = {
    "LOW": "Baja",
    "MEDIUM": "Media",
    "HIGH": "Alta",
    "PENDING": "Pendiente",
    "IN_PROGRESS": "En progreso",
    "COMPLETED": "Completada"
};

// Función para traducir texto basado en el diccionario anterior
const translate = (text) => {
    return translations[text] || text;
};

// Función para formatear fechas a un formato más legible
const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Componente que representa un elemento de tarea individual
const TaskItem = ({ task, index, onUpdateTask, onDeleteTask, onFavoriteTask, onMoveToHistory }) => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad de los detalles de la tarea
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    if (!task) return null; // Si no hay tarea, no renderiza nada

    const { id, description, dueDate, priority, status, isFavorite } = task;

    const handleMoveToHistory = async () => {
        try {
            await onMoveToHistory(task.id, true, task.status);
            setSuccessMessage('Tarea movida al historial con éxito.');
            setErrorMessage(''); // Limpiar el mensaje de error si la acción es exitosa

            // Limpiar el mensaje de éxito después de 3 segundos
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setSuccessMessage(''); // Limpiar el mensaje de éxito si hay un error
            setErrorMessage(error.message); // Mostrar mensaje de error si la tarea no está completada
        }
    };

    // Función para asignar clases CSS según el estado de la tarea
    const statusColors = {
        'PENDING': 'bg-red-500',
        'IN_PROGRESS': 'bg-yellow-500',
        'COMPLETED': 'bg-green-500'
    };

    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`w-full p-1 ${snapshot.isDragging ? '' : ''}`}
                >
                    <div className="bg-white rounded-md shadow-md">
                        {/* Línea horizontal que indica el estado */}
                        <div className={`h-1 w-full ${statusColors[status] || ''} rounded-t-md`} />
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2">
                            {/* Nombre de la tarea */}
                            <h3 className="text-lg font-semibold text-gray-900 ml-3">{description}</h3>
                            <div className="flex mt-2 sm:mt-0">
                                <button
                                    className={`mr-1 mb-2 ${isFavorite ? 'text-yellow-600' : 'text-gray-600'} hover:text-yellow-500 text-2xl`}
                                    onClick={() => onFavoriteTask(id)}
                                >
                                    {isFavorite ? '★' : '☆'}
                                </button>
                                <button
                                    className="text-blue-500 hover:text-blue-800 mb-2"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {isOpen ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>

                        {isOpen && (
                            <div className="card-body">
                                <p className="text-sm text-gray-400"><strong>Fecha:</strong> {formatDate(dueDate)}</p>
                                <p className="text-sm text-gray-400"><strong>Prioridad:</strong> {translate(priority)}</p>
                                <p className="text-sm text-gray-400"><strong>Estado:</strong> {translate(status)}</p>

                                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                    <button
                                        className="px-2 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                                        onClick={() => onUpdateTask(id, task)}
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        className="px-2 py-1.5 text-sm text-red-600 duration-150 bg-red-50 rounded-lg hover:bg-red-100"
                                        onClick={() => onDeleteTask(id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="px-2 py-1.5 text-sm text-green-600 duration-150 bg-green-50 rounded-lg hover:bg-green-100"
                                        onClick={handleMoveToHistory}
                                    >
                                        Mover al Historial
                                    </button>
                                </div>

                                {successMessage && (
                                    <div className="text-green-500 mt-2">
                                        {successMessage}
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className="text-red-500 mt-2">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;

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

    if (!task) return null; // Si no hay tarea, no renderiza nada

    const { id, taskId, description, dueDate, priority, status, isFavorite } = task;

    // Función para asignar clases CSS según el estado de la tarea
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
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`col-lg-12 mb-2 ${getStatusClass()} p-2 rounded-lg ${snapshot.isDragging ? 'border-2 border-blue-500' : ''}`}
                >
                    <div className="card bg-gray-900 rounded-xl shadow-md">
                        <div className="card-header flex justify-between">
                            <h3 className="text-lg font-semibold text-gray-700 text-dark">{description}</h3>
                            <div className="">
                                {/* Botón para marcar como favorito */}
                                <button
                                    className={`mr-2 ${isFavorite ? 'text-yellow-600' : 'text-gray-600'} hover:text-yellow-500 text-2xl`}
                                    onClick={() => onFavoriteTask(id)}
                                >
                                    {isFavorite ? '★' : '☆'} {/* Estrella para favorito */}
                                </button>
                                {/* Botón para mostrar u ocultar detalles de la tarea */}
                                <button
                                    className="text-blue-700 hover:text-blue-800"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {isOpen ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>

                        {/* Detalles de la tarea que se muestran al expandir */}
                        {isOpen && (
                            <div className="card-body">
                                <p className="text-sm text-gray-600">Fecha: {formatDate(dueDate)}</p>
                                <p className="text-sm text-gray-600">Prioridad: {translate(priority)}</p>
                                <p className="text-sm text-gray-600">Estado: {translate(status)}</p>

                                <div className="flex justify-between px-5">
                                    {/* Botón para actualizar la tarea */}
                                    <button
                                        className="px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                                        onClick={() => onUpdateTask(id, task)}
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar la tarea */}
                                    <button
                                        className="px-3 py-1.5 text-sm text-danger duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                                        onClick={() => onDeleteTask(id)}
                                    >
                                        Eliminar
                                    </button>
                                    {/* Botón para mover la tarea al historial */}
                                    <button
                                        className="px-3 py-1.5 text-sm text-green-600 duration-150 bg-green-50 rounded-lg hover:bg-green-100 active:bg-green-200"
                                        onClick={() => onMoveToHistory(taskId)}
                                    >
                                        Mover al Historial
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;

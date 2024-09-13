import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { FaStar, FaRegStar, FaEdit, FaTrash, FaHistory, FaEye, FaEyeSlash } from 'react-icons/fa';
import TaskDetailsModal from './taskDetailsModal';

const translations = {
    LOW: "Baja",
    MEDIUM: "Media",
    HIGH: "Alta",
    PENDING: "Pendiente",
    IN_PROGRESS: "En progreso",
    COMPLETED: "Completada"
};

// Función para traducir los textos de prioridad y estado
const translate = (text) => translations[text] || text;

// Función para formatear la fecha
const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Componente TaskItem que representa cada tarea individual
const TaskItem = ({ task, index, onUpdateTask, onDeleteTask, onFavoriteTask, onMoveToHistory, onSaveDetails, setTasks }) => {
    const [isOpen, setIsOpen] = useState(false); // Controlar si los detalles de la tarea están visibles
    const [isModalOpen, setIsModalOpen] = useState(false); // Controlar la apertura del modal de detalles
    const [message, setMessage] = useState({ type: '', text: '' }); // Mensajes de éxito o error
    
    if (!task) return null; // Verificar si existe la tarea antes de renderizar

    const { id, description, dueDate, priority, status, isFavorite } = task;

    // Manejar el evento de mover la tarea al historial
    const handleMoveToHistory = async () => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${id}/move`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                }
            });
    
            if (!response.ok) throw new Error('Error al mover la tarea al historial.');
    
            await onMoveToHistory(id); // Actualizar estado en frontend
    
            // Eliminar la tarea de la columna de completadas
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    
            setMessage({ type: 'success', text: 'Tarea movida al historial con éxito, verifique el Historial.' });
            
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setTimeout(() => setMessage({ type: '', text: '' }), 2000);
        }
    };
    
    // Definir colores según el estado de la tarea
    const statusColors = {
        PENDING: 'bg-red-500',
        IN_PROGRESS: 'bg-yellow-500',
        COMPLETED: 'bg-green-500'
    };

    return (
        <>
            {/* Draggable permite arrastrar la tarea */}
            <Draggable draggableId={id.toString()} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full p-1"
                    >
                        <div className="bg-white rounded-md shadow-md">
                            {/* Barra de estado de color */}
                            <div className={`h-1 w-full ${statusColors[status]} rounded-t-md`} />
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2">
                                <h3 
                                    className="text-lg font-semibold text-gray-900 ml-3 cursor-pointer"
                                    onClick={() => setIsModalOpen(true)} // Abrir modal de detalles
                                >
                                    {description}
                                </h3>
                                <div className="flex mt-2 sm:mt-0">
                                    {/* Botón para marcar como favorita */}
                                    <button
                                        className={`mr-1 mb-2 text-2xl ${isFavorite ? 'text-yellow-600' : 'text-gray-600'} hover:text-yellow-500`}
                                        onClick={() => onFavoriteTask(id)} // Marcar como favorita
                                    >
                                        {isFavorite ? <FaStar /> : <FaRegStar />}
                                    </button>
                                    {/* Botón para mostrar/ocultar detalles */}
                                    <button
                                        className="text-blue-500 hover:text-blue-800 mb-2"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        {isOpen ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Mostrar detalles de la tarea si está abierto */}
                            {isOpen && (
                                <div className="card-body">
                                    <p className="text-sm text-gray-500"><strong>Fecha:</strong> {formatDate(dueDate)}</p>
                                    <p className="text-sm text-gray-500"><strong>Prioridad:</strong> {translate(priority)}</p>
                                    <p className="text-sm text-gray-500"><strong>Estado:</strong> {translate(status)}</p>

                                    <div className="flex flex-col sm:flex-row gap-1 mt-2">
                                        {/* Botón para actualizar tarea */}
                                        <button
                                            className="px-2 py-1.5 text-sm text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 flex items-center"
                                            onClick={() => onUpdateTask(id, task)}
                                        >
                                            <FaEdit /> Actualizar
                                        </button>
                                        {/* Botón para eliminar tarea */}
                                        <button
                                            className="px-2 py-1.5 text-sm text-red-600 bg-red-100 rounded-lg hover:bg-red-200 flex items-center"
                                            onClick={() => onDeleteTask(id)}
                                        >
                                            <FaTrash /> Eliminar
                                        </button>
                                        {/* Botón para mover tarea al historial */}
                                        <button
                                            className="px-2 py-1.5 text-sm text-green-600 bg-green-100 rounded-lg hover:bg-green-200 flex items-center"
                                            onClick={handleMoveToHistory}
                                        >
                                            <FaHistory /> Mover al Historial
                                        </button>
                                    </div>

                                    {/* Mostrar mensaje de éxito o error */}
                                    {message.text && (
                                        <div className={`mt-2 text-${message.type === 'success' ? 'green' : 'red'}-500`}>
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Draggable>

            {/* Modal de detalles */}
            <TaskDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                task={task}
                onSave={onSaveDetails}
            />
        </>
    );
};

export default TaskItem;

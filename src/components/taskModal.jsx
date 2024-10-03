import React, { useState } from 'react';
import TaskForm from './taskForm';
import { FaTimes } from 'react-icons/fa';

const TaskModal = ({ isFormVisible, toggleFormVisibility, createTask, updateTask, updateMode, taskToUpdate }) => {
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState('') // Estado para el mensaje de éxito

    /*Formulario para crear tareas*/
    return (
        isFormVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <div className="bg-gray-800 text-white p-6 rounded-3xl w-full max-w-md relative">
                    <button 
                        className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-600"
                        onClick={toggleFormVisibility}
                    >
                        <i className="fas fa-times"></i>
                    </button>

                    <h2 className="text-xl font-semibold mb-4">Crear Tarea</h2>

                    {successMessage && (
                        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-md transition-opacity">
                            {successMessage}
                            <button
                                onClick={() => setSuccessMessage('')}
                                className="ml-4 text-lg text-white"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-md transition-opacity">
                            {error}
                            <button onClick={() => setError(null)} className="ml-4 text-lg text-white">
                                <FaTimes />
                            </button>
                        </div>
                    )}
                    
                    <TaskForm 
                        onSubmit={(taskData) => {
                            if (updateMode && taskToUpdate) {
                                updateTask(taskToUpdate.id, taskData);
                            } else {
                                createTask(taskData);
                            }
                            toggleFormVisibility();
                        }} 
                    />
                </div>
            </div>
        )
    );
}

export default TaskModal;

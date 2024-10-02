import React from 'react';
import TaskForm from './taskForm';

const TaskModal = ({ isFormVisible, toggleFormVisibility, createTask, updateTask, updateMode, taskToUpdate, error, success }) => {
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

                    {error && 
                        <p className="text-red-500 mb-4 font-bold">
                            {error}
                        </p>
                    }
                    
                    {success && (
                        <p className="mb-4 font-bold text-green-500">
                            {success}
                        </p>
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

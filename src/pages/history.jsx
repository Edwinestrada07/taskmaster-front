import React, { useEffect, useState } from 'react';

const TaskHistoryPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/task/history', {
                    method: 'GET',
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('No se pudo obtener las tareas del historial.');
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error al obtener el historial de tareas:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('No se pudo borrar la tarea.');
            }
            setTasks(tasks.filter(task => task.id !== taskId));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al borrar la tarea:", error);
        }
    };

    const openModal = (taskId) => {
        setSelectedTaskId(taskId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTaskId(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Historial de Tareas</h1>
            <div>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-item mb-4 p-4 bg-white shadow rounded-lg">
                            <h3 className="text-lg font-semibold">{task.description}</h3>
                            <p>Prioridad: {task.priority}</p>
                            <p>Estado: {task.status}</p>
                            <button
                                onClick={() => openModal(task.id)}
                                className="px-3 py-1.5 text-sm text-red-600 duration-150 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200 mt-2"
                            >
                                Borrar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay tareas en el historial.</p>
                )}
            </div>

            {isModalOpen && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="modal-content p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-lg mb-4">¿Estás seguro de que quieres borrar esta tarea?</h3>
                        <button
                            onClick={() => handleDeleteTask(selectedTaskId)}
                            className="px-3 py-1.5 text-sm text-white bg-red-600 rounded-lg mr-4"
                        >
                            Sí, borrar
                        </button>
                        <button
                            onClick={closeModal}
                            className="px-3 py-1.5 text-sm text-gray-600 bg-gray-200 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskHistoryPage;

import React, { useState, useEffect, useCallback } from 'react'
import TaskList from '../components/taskList'
import TaskModal from '../components/taskModal'
import Sidebar from '../components/sidebar'
import TaskFilter from '../components/taskFilter'
import TaskUpdater from '../components/taskUpdater'
import CalendarView from '../components/CalendarView'

const TaskListPage = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [taskStatus, setTaskStatus] = useState(null)
    const [taskToUpdate, setTaskToUpdate] = useState(null) // Estado para almacenar la tarea a actualizar
    const [updateMode, setUpdateMode] = useState(false) // Estado para activar el modo de actualización
    const [isFormVisible, setFormVisible] = useState(false)
    const [viewMode, setViewMode] = useState('') // Estado para controlar qué vista mostrar en la parte derecha
    const [isAsideVisible, setIsAsideVisible] = useState(true)
    const [success, setSuccess] = useState('');

    // Función para obtener las tareas con filtros según el modo de vista
    const getTasks = useCallback(async () => {
        try {
            const baseUrl = 'https://taskmaster-back.onrender.com/task';
            const endpoints = {
                registered: '',
                byFavorites: '/favorites',
                byStatus: taskStatus ? `?status=${taskStatus}` : '',
                history: '/history',
            };

            const url = `${baseUrl}${endpoints[viewMode] || ''}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { authorization: localStorage.getItem('token') },
            });

            if (!response.ok) throw new Error('No se pudo obtener la lista de tareas.');

            const tasksData = await response.json();
            setTasks(tasksData);
            setError(null);

        } catch (error) {
            console.error('Error al obtener las tareas:', error);
            setError('Error al obtener las tareas. Por favor, inténtalo de nuevo más tarde.');
        }
    }, [taskStatus, viewMode]);

    useEffect(() => {
        getTasks() // Obtiene todas las tareas, incluidas las favoritas
    }, [getTasks])

    // Función para crear una nueva tarea
    const createTask = async (task) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user')).id;
            task.userId = userId;

            const response = await fetch('https://taskmaster-back.onrender.com/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) throw new Error('No se pudo crear la tarea.');

            setSuccess('Tarea creada exitosamente.');
            setTimeout(() => setSuccess(''), 3000);

            getTasks();
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            setError('Error al crear la tarea. Por favor, inténtalo de nuevo más tarde.');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Función para actualizar una tarea existente
    const updateTask = async (id, task) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) throw new Error('No se pudo actualizar la tarea.');

            setSuccess('Tarea actualizada exitosamente.');
            setTimeout(() => setSuccess(''), 3000);

            getTasks();
            setUpdateMode(false);
            setTaskToUpdate(null);
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            setError('Error al actualizar la tarea. Por favor, inténtalo de nuevo más tarde.');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Función para eliminar una tarea, incluyendo las que tienen detalles asociados
    const deleteTask = async (id) => {
        try {
            // Primero, hacer una petición para verificar si la tarea tiene detalles
            const detailResponse = await fetch(`https://taskmaster-back.onrender.com/task/${id}/detail`, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            });

            if (!detailResponse.ok) throw new Error('Error al verificar los detalles de la tarea.');

            const detailData = await detailResponse.json();
            const hasDetail = detailData.details && detailData.detail.length > 0;

            // Si la tarea tiene detalles, solicitar confirmación
            if (hasDetail) {
                const confirmDelete = window.confirm('La tarea tiene detalles asociados. ¿Deseas eliminarlos también?');
                if (!confirmDelete) return;
            }

            // Proceder con la eliminación de la tarea
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            });

            if (!response.ok) throw new Error('No se pudo eliminar la tarea.');

            // Mostrar mensaje de éxito
            setSuccess('Tarea eliminada exitosamente.');
            setTimeout(() => setSuccess(''), 3000);

            // Recargar la lista de tareas
            getTasks();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            setError('Error al eliminar la tarea. Por favor, inténtalo de nuevo más tarde.');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Función para eliminar todas las tareas del historial
    const handleDeleteAll = async (taskId) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${taskId}/history`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                }
            });
            if (!response.ok) throw new Error('No se pudo eliminar las tareas del historial.');

            setSuccess('Todas las tareas del historial han sido eliminadas.');
            setTimeout(() => setSuccess(''), 3000);

            setTasks([]);
        } catch (error) {
            console.error('Error al eliminar las tareas del historial:', error);
            setError('Error al eliminar las tareas del historial. Por favor, inténtalo de nuevo más tarde.');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Función para controlar tareas favoritas
    const handleFavoriteTask = async (id, isFavorite) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${id}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify({ isFavorite }),
            });

            if (!response.ok) throw new Error('No se pudo actualizar el estado de favorita.');

            setSuccess('Tarea marcada y/o desmarcada como favorita.');
            setTimeout(() => setSuccess(''), 3000);

            getTasks();
        } catch (error) {
            console.error('Error al actualizar el estado de favorita:', error);
            setError('Error al actualizar el estado de favorita. Por favor, inténtalo de nuevo más tarde.');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Función para mover las tareas al historial
    const moveToHistory = async (taskId, isHistory, taskStatus) => {
        try {
            if (taskStatus === 'COMPLETED') throw new Error('Solo se pueden mover tareas completadas al historial.');

            const response = await fetch(`https://taskmaster-back.onrender.com/task/${taskId}/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify({ isHistory }),
            });

            if (!response.ok) throw new Error('No se pudo mover la tarea al historial.');

            setSuccess('Tarea movida al historial exitosamente.');
            setTimeout(() => setSuccess(''), 3000);

            // Eliminar la tarea de la columna de completadas
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

        } catch (error) {
            console.error('Error al mover la tarea al historial:', error);
            setError('Error al mover la tarea al historial. Por favor, inténtalo de nuevo más tarde.');
            setTimeout(() => setError(''), 3000);
        }
    };   
        
    //Funcion para actualizar el estado de la tarea en la base de datos
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${taskId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (!response.ok) throw new Error('No se pudo actualizar el estado de la tarea.');

            setSuccess('Estado de la tarea actualizado.');
            setTimeout(() => setSuccess(''), 3000);

            // Actualizar la lista de tareas después de la actualización
            getTasks();
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
            setError('Error al actualizar el estado de la tarea. Por favor, inténtalo de nuevo más tarde.');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Función para activar el modo de actualización
    const handleUpdateMode = (id, task) => {
        setTaskToUpdate({ ...task, id }) // Almacenar la tarea a actualizar
        setUpdateMode(true) // Activar el modo de actualización
    }

    //Funcion para activar los formularios del dashboard
    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
        if (updateMode) {
            setUpdateMode(false);
            setTaskToUpdate(null);
        }
    }

    // Función para manejar el cambio de vista
    const handleViewMode = (mode) => {
        setViewMode(mode);
        setTaskStatus(null); // Reinicia el filtro de estado al cambiar de vista
    };

    //Función para reducir el aside
    const toggleAsideVisibility = () => {
        setIsAsideVisible(prevState => !prevState);
    }
    
    return (
        <div className="p-1 flex bg-gradient-to-b from-[#d3c7eb] via-[#EDEAFB] to-[#e8f0f6] dark:bg-gradient-to-b dark:from-[#08090e] dark:via-[#08090e] dark:to-[#08090e]">
            <Sidebar 
                isAsideVisible={isAsideVisible} 
                toggleAsideVisibility={toggleAsideVisibility}
                handleViewMode={handleViewMode}
                toggleFormVisibility={toggleFormVisibility}
                isFormVisible={isFormVisible}
                setTaskStatus={setTaskStatus}
            />

            {/*Formulario para crear tareas tipo modal*/}
            <TaskModal
                isFormVisible={isFormVisible}
                toggleFormVisibility={toggleFormVisibility}
                createTask={createTask}
                updateTask={updateTask}
                updateMode={updateMode}
                taskToUpdate={taskToUpdate}
                error={error}
                success={success}
            />
        
            <div className="flex-1">
                <h5 className="text-2xl font-extrabold text-[#10172A] dark:text-[#e2e8f0] m-3 text-center">Tareas</h5>

                {/*Formulario para filtrar tareas por estados*/}
                {viewMode === 'byStatus' && (
                    <TaskFilter setTaskStatus={setTaskStatus} />
                )}

                {/*Formulario para actualizar tareas*/}
                {updateMode && taskToUpdate && (
                    <TaskUpdater 
                        taskToUpdate={taskToUpdate} 
                        updateTask={updateTask} 
                        setTaskToUpdate={setTaskToUpdate} 
                        setUpdateMode={setUpdateMode}
                        loading={loading}
                        error={error}
                    />
                )}

                {viewMode === 'byFavorites' && (
                    <div className="p-3">
                        <h2 className="text-2xl font-bold mb-4 text-[#10172A] dark:text-[#e2e8f0]">Tareas Favoritas</h2>
                    </div>
                )}

                {viewMode === 'history' && (
                    <div className="p-3">
                        <h2 className="text-2xl font-bold mb-4 text-[#10172A] dark:text-[#e2e8f0]">Historial de Tareas</h2>
                        
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded mb-4"
                            onClick={async () => {
                                const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar todas las tareas del historial?');
                                if (confirmDelete) {
                                    setLoading(true); // Iniciar el spinner
                                    setTimeout(async () => {
                                        await handleDeleteAll(); // Llamar la función de eliminación
                                        setLoading(false); // Detener el spinner
                                    }, 3000); // Esperar 3 segundos antes de ejecutar la eliminación
                                }
                            }}
                        >
                            Eliminar Todas las Tareas del Historial
                        </button>

                        {loading && (
                            <div className="flex justify-center items-center mb-4">
                                <svg className="w-6 h-6 mr-2 text-red-700 animate-spin" xmlns="http://www.w3.org/8000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            </div>
                        )}

                        {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}  
                    </div>
                )}

                {viewMode === 'calendar' && (
                    <div className="flex-1 px-4">
                        <CalendarView
                            
                        />
                    </div>
                )}    
                
                {!updateMode && 
                    <TaskList
                        tasks={tasks} 
                        onDeleteTask={deleteTask} 
                        onUpdateTask={handleUpdateMode} 
                        onFavoriteTask={handleFavoriteTask}
                        onMoveToHistory={moveToHistory}
                        onUpdateTaskStatus={updateTaskStatus}
                    />
                }
                {success && (
                    <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 font-semibold text-sm sm:text-lg text-green-500 bg-green-200 dark:bg-green-600 dark:text-green-300">
                        {success}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskListPage
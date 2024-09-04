import React, { useState, useEffect, useCallback } from 'react'
import TaskList from '../components/taskList'
import TaskModal from '../components/taskModal'
import Sidebar from '../components/sidebar'
import TaskFilter from '../components/taskFilter'
import TaskUpdater from '../components/taskUpdater'

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

    const createTask = async (task) => {
        try {
            // Obtener el userId del almacenamiento local
            const userId = JSON.parse(localStorage.getItem('user')).id
            // Asignar el userId a la tarea
            task.userId = userId
            
            const response = await fetch('https://taskmaster-back.onrender.com/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(task)
            })
            
            if (!response.ok) {
                throw new Error('No se pudo crear la tarea.')
            }

            const responseData = await response.json()
            console.log('Tarea creada:', responseData)
    
            getTasks()
          
        } catch (error) {
            console.error('Error al crear la tarea:', error)
            setError("Error al crear la tarea. Por favor, inténtalo de nuevo más tarde.")
        }
    }

    const updateTask = async (id, task) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({ ...task })
            })

            if (!response.ok) throw new Error('No se pudo actualizar la tarea.')
        
            const responseData = await response.json()
            console.log('Tarea actualizada:', responseData)
    
            getTasks()
            setUpdateMode(false) // Desactivar el modo de actualización
            setTaskToUpdate(null) // Limpiar la tarea a actualizar
            
        } catch (error) {
            console.error('Error al actualizar la tarea:', error)
            setError("Error al actualizar la tarea. Por favor, inténtalo de nuevo más tarde.")
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar la tarea.');
            }

            getTasks(); // Actualiza la lista de tareas
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            setError('Error al eliminar la tarea. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleDeleteAll = async (taskId) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${taskId}/history`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('No se pudo eliminar las tareas del historial.');
            }
            const result = await response.json();
            console.log(result.message);
            // Recargar tareas después de la eliminación
            setTasks([]);
        } catch (error) {
            console.error('Error al eliminar las tareas del historial:', error);
            setError('Error al eliminar las tareas del historial. Por favor, inténtalo de nuevo más tarde.');
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

    //Función para controlar tareas favoritas
    const handleFavoriteTask = async (id, isFavorite) => {
        try {
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${id}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({ isFavorite }) // Enviar el estado deseado de favorita
            });
    
            if (!response.ok) {
                throw new Error('No se pudo actualizar el estado de favorita.');
            }
    
            // Actualiza la lista de tareas favoritas en el frontend
            getTasks(); // Llama a getTasks para actualizar la lista de tareas
        } catch (error) {
            console.error('Error al actualizar el estado de favorita:', error);
            setError("Error al actualizar el estado de favorita. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    //Función para mover las tareas al historial
    const moveToHistory = async (taskId, isHistory, taskStatus) => {
        try {
            if (taskStatus !== 'COMPLETED') {
                throw new Error('Solo se pueden mover tareas completadas al historial.');
            }
    
            const response = await fetch(`https://taskmaster-back.onrender.com/task/${taskId}/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify({ isHistory }),
            });
    
            if (!response.ok) {
                throw new Error('No se pudo mover la tarea al historial.');
            }
            
            const responseData = await response.json();
            console.log('Tarea movida al historial con éxito:', responseData);
    
        } catch (error) {
            console.error('Error al mover la tarea al historial:', error);
            throw error; // Lanza el error para que pueda ser capturado en otro lugar
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
    
            if (!response.ok) {
                throw new Error('No se pudo actualizar el estado de la tarea.');
            }
    
            const responseData = await response.json();
            console.log('Estado de la tarea actualizado:', responseData);
    
            // Actualizar la lista de tareas después de la actualización
            getTasks();
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
            setError('Error al actualizar el estado de la tarea. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    
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

                        {tasks.some(task => task.isHistory) ? (
                            <TaskList
                                tasks={tasks.filter(task => task.isHistory)} 
                                onDeleteTask={deleteTask} // Cambia la función a `moveToHistory`
                                onUpdateTask={handleUpdateMode} 
                                onFavoriteTask={handleFavoriteTask}
                                onMoveToHistory={moveToHistory}
                                onUpdateStatus={updateTaskStatus}
                            />
                        ) : (
                            <p className='text-[#10172A] dark:text-[#e2e8f0]'></p>
                        )}
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
            </div>
        </div>
    )
}

export default TaskListPage
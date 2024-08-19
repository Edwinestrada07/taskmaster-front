import React, { useState, useEffect, useCallback } from 'react'
import TaskList from '../components/taskList'
import TaskForm from '../components/taskForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faStickyNote } from '@fortawesome/free-regular-svg-icons'
import { faAlignLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'

const TaskListPage = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)
    const [taskStatus, setTaskStatus] = useState(null)
    const [taskToUpdate, setTaskToUpdate] = useState(null) // Estado para almacenar la tarea a actualizar
    const [updateMode, setUpdateMode] = useState(false) // Estado para activar el modo de actualización
    const [isFormVisible, setFormVisible] = useState(false)
    const [viewMode, setViewMode] = useState('') // Estado para controlar qué vista mostrar en la parte derecha
    const [isAsideVisible, setIsAsideVisible] = useState(true)

    // Función para obtener las tareas con filtros según el modo de vista
    const getTasks = useCallback(async () => {
        try {
            const baseUrl = 'http://localhost:5000/task';
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
            
            const response = await fetch('http://localhost:5000/task', {
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
            const response = await fetch(`http://localhost:5000/task/${id}`, {
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
            const response = await fetch(`http://localhost:5000/task/${id}`, {
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
            const response = await fetch(`http://localhost:5000/task/${taskId}/history`, {
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
            const response = await fetch(`http://localhost:5000/task/${id}/favorite`, {
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
    
            const response = await fetch(`http://localhost:5000/task/${taskId}/move`, {
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
        
    //Función para controlar el historial de tareas
    /*const handleHistoryTask = async () => {
        try {
            const response = await fetch('http://localhost:5000/task/history', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                }
            });
    
            if (!response.ok) {
                throw new Error('No se pudo obtener el historial de tareas.');
            }
            
            // Parsear la respuesta como JSON
            const historyData = await response.json();

            // Actualizar el estado 'tasks' con las tareas obtenidas
            setTasks(historyData); // Cargar las tareas del historial
    
        } catch (error) {
            console.error('Error al obtener el historial de tareas:', error);
            setError("Error al obtener el historial de tareas. Por favor, inténtalo de nuevo más tarde.");
        }
    }*/

    //Funcion para actualizar el estado de la tarea en la base de datos
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${taskId}/status`, {
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

            {/*Barra lateral, con todos sus botones*/}      
            <aside className={`relative inset-y-0 h-screem bg-gray-800 ${isAsideVisible ? 'w-64' : 'w-16'} sm:flex flex-col items-center rounded-lg shadow-[0px_1px_15px_1px_rgba(165,_39,_255,_0.48)] transition-all duration-300`}>
                <div className="p-3 w-full flex justify-between items-center">
                    {isAsideVisible && (
                        <a href="/start" className="text-white text-xl font-extrabold">
                            TaskMaster
                        </a>
                    )}

                    <button 
                        className="bg-white text-gray-800 rounded-full ml-2 p-1 focus:outline-none" 
                        onClick={toggleAsideVisibility}
                    >
                        <i className={`fas ${isAsideVisible ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                    </button>
                </div>

                <div className="w-3/4 flex flex-col justify-center mt-4 mr-3">
                    <>
                        <button 
                            className={`bg-white text-gray-900 font-semibold py-2 rounded-lg flex items-center justify-center ml-3 ${isAsideVisible ? 'w-full' : 'w-10'}`} 
                            onClick={toggleFormVisibility}
                        >
                            <i className="fas fa-plus"></i>
                            {isAsideVisible && 'Crear Tarea'}
                        </button>

                        {/*Formulario para la creación de tareas (Llamado de TaskForm)*/}
                        {isFormVisible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                                <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md relative">
                                    <button 
                                        className="p-2 text-white font-bold hover:text-gray-900"
                                        onClick={toggleFormVisibility}
                                    >
                                        Cerrar
                                    </button>
                                    {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}
                                    <TaskForm 
                                        onSubmit={(taskData) => {
                                            createTask(taskData);
                                            toggleFormVisibility();
                                            handleViewMode('registered');
                                        }} 
                                    />
                                </div>
                            </div>
                        )}
                    </>
                </div>

                <div className="flex flex-col items-center w-full mt-6">
                    <button 
                        className="flex items-center text-white opacity-75 py-3 cursor-pointer hover:bg-gray-600 w-full justify-center"
                        onClick={() => handleViewMode('registered')}
                    >
                        <FontAwesomeIcon icon={faStickyNote} className='justify-center'/>
                        {isAsideVisible && <span className='ml-3'>Registros</span>}
                    </button>
                    
                    <button 
                        className="flex items-center text-white opacity-75 py-3 cursor-pointer hover:bg-gray-600 w-full justify-center"
                        onClick={() => handleViewMode('byStatus')}
                    >   
                        <FontAwesomeIcon icon={faAlignLeft} className='justify-center'/>
                        {isAsideVisible && <span className='ml-3'>Estados</span>}
                    </button>

                    <button 
                        className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600"
                        onClick={() => handleViewMode('byFavorites')}
                    >
                        <FontAwesomeIcon icon={faBookmark} className='justify-center'/>
                        {isAsideVisible && <span className='ml-3'>Favoritos</span>}
                    </button>

                    <button 
                        className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600"
                        onClick={() => handleViewMode('history')}
                    >
                        <FontAwesomeIcon icon={faRotateRight} className='justify-center'/>
                        {isAsideVisible && <span className='ml-3'>Historial</span>}
                    </button>

                    <a href="calendar.html" className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600">
                        <i className="fas fa-calendar justify-center"></i>
                        {isAsideVisible && <span className='ml-3'>Calendario</span>}
                    </a>      
                </div>
            </aside>

            <div className="flex-1">
                <h5 className="text-2xl font-extrabold text-[#10172A] dark:text-[#e2e8f0] m-3 text-center">Tareas</h5>

                {/*Formulario para filtrar por estados*/}
                {viewMode === 'byStatus' && (
                    <nav className="bg-gray-800 dark:bg-gray-700 p-3 rounded-lg shadow-md flex flex-wrap justify-center items-center space-x-3 ml-2 mb-3">
                        <input
                            type="text"
                            name="text"
                            id="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-25"
                            placeholder="Buscar"
                            required
                        />
                        <button
                            className="bg-red-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                            onClick={() => setTaskStatus("PENDING")}
                        >
                            <span className="hidden sm:inline">Pendiente</span>
                            <i className="fas fa-check-circle sm:hidden"></i> {/* Icono representativo */}
                        </button>
                        <button
                            className="bg-yellow-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                            onClick={() => setTaskStatus("IN_PROGRESS")}
                        >
                            <span className="hidden sm:inline">En progreso</span>
                            <i className="fas fa-spinner sm:hidden"></i> {/* Icono representativo */}
                        </button>
                        <button
                            className="bg-green-500 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                            onClick={() => setTaskStatus("COMPLETED")}
                        >
                            <span className="hidden sm:inline">Completada</span>
                            <i className="fas fa-check sm:hidden"></i> {/* Icono representativo */}
                        </button>
                        <button
                            className="bg-blue-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105 w-10 h-10 flex items-center justify-center sm:w-auto sm:h-auto sm:text-base"
                            onClick={() => setTaskStatus(null)}
                        >
                            <span className="hidden sm:inline">Borrar Filtros</span>
                            <i className="fas fa-times sm:hidden"></i> {/* Icono representativo */}
                        </button>
                    </nav>
                )}

                {/*Formulario para actualizar tareas*/}
                {updateMode && taskToUpdate && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className='bg-gray-800 text-white p-6 rounded-lg w-full max-w-md relative'>
                            <h2 className="text-2xl font-bold mb-4 dark:text-[#e2e8f0]">Formulario de Actualización</h2>
                            
                            {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}

                            <form onSubmit={(e) => {e.preventDefault();
                                    updateTask(taskToUpdate.id, taskToUpdate);
                                }}>
                                <input
                                    className="form-styling-inf"
                                    type="text"
                                    name="description"
                                    placeholder="Descripción"
                                    value={taskToUpdate.description}
                                    onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value })}
                                />

                                <input
                                    className="form-styling-inf"
                                    type="date"
                                    name="dueDate"
                                    placeholder="Fecha de vencimiento"
                                    value={taskToUpdate.dueDate}
                                    onChange={(e) => setTaskToUpdate({ ...taskToUpdate, dueDate: e.target.value })}
                                />

                                <select
                                    className="form-styling-inf"
                                    name="priority"
                                    value={taskToUpdate.priority}
                                    onChange={(e) => setTaskToUpdate({ ...taskToUpdate, priority: e.target.value })}
                                >   
                                    <option className='text-dark' value="LOW">Baja</option>
                                    <option className='text-dark' value="MEDIUM">Media</option>
                                    <option className='text-dark' value="HIGH">Alta</option>
                                </select>

                                <select
                                    className="form-styling-inf"
                                    name="status"
                                    value={taskToUpdate.status}
                                    onChange={(e) => setTaskToUpdate({ ...taskToUpdate, status: e.target.value })}
                                >
                                    <option className='text-dark' value="PENDING">Pendiente</option>
                                    <option className='text-dark' value="IN_PROGRESS">En progreso</option>
                                    <option className='text-dark' value="COMPLETED">Completada</option>
                                </select>

                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    type="submit"
                                >
                                    Actualizar Tarea
                                </button>
                                <button
                                    className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    type="button"
                                    onClick={() => {
                                        setUpdateMode(false);
                                        setTaskToUpdate(null);
                                    }}
                                >
                                    Cancelar
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {viewMode === 'byFavorites' && (
                    <div className="p-3">
                        <h2 className="text-2xl font-bold mb-4 text-[#10172A] dark:text-[#e2e8f0]">Tareas Favoritas</h2>
                        {tasks.some(task => task.isFavorite) ? (
                            <TaskList 
                                tasks={tasks.filter(task => task.isFavorite)} // Filtra para mostrar solo las tareas favoritas
                                onDeleteTask={deleteTask} 
                                onUpdateTask={handleUpdateMode} 
                                onFavoriteTask={handleFavoriteTask}
                            />
                        ) : (
                            <p className='text-[#10172A] dark:text-[#e2e8f0]'>No hay tareas marcadas como favoritas.</p>
                        )}
                    </div>
                )}

                {viewMode === 'history' && (
                    <div className="p-3">
                        <h2 className="text-2xl font-bold mb-4 text-[#10172A] dark:text-[#e2e8f0]">Historial de Tareas</h2>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded mb-4"
                            onClick={handleDeleteAll}
                        >
                            Eliminar Todas las Tareas del Historial
                        </button>
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

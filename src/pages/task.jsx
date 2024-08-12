import React, { useState, useEffect, useCallback } from 'react'
import TaskList from '../components/taskList'
import TaskForm from '../components/taskForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faStickyNote } from '@fortawesome/free-regular-svg-icons'
import { faAlignLeft, faArrowCircleUp, faRotateRight } from '@fortawesome/free-solid-svg-icons'

const TaskListPage = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)
    const [taskStatus, setTaskStatus] = useState(null)
    const [taskToUpdate, setTaskToUpdate] = useState(null) // Estado para almacenar la tarea a actualizar
    const [updateMode, setUpdateMode] = useState(false) // Estado para activar el modo de actualización
    const [isFormVisible, setFormVisible] = useState(false)
    const [viewMode, setViewMode] = useState('') // Estado para controlar qué vista mostrar en la parte derecha
    const [isAsideVisible, setIsAsideVisible] = useState(true)

    const getTasks = useCallback(async () => {
        try {
            const url = taskStatus ? `http://localhost:5000/task?status=${taskStatus}` : "http://localhost:5000/task";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                authorization: localStorage.getItem('token')
                }
            })
        
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de tareas.')
            }
        
            const tasksData = await response.json()
            setTasks(tasksData)
            setError(null);
          
        } catch (error) {
          console.error("Error al obtener las tareas:", error)
          setError("Error al obtener las tareas. Por favor, inténtalo de nuevo más tarde.")
        }
    }, [taskStatus])

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

            if (!response.ok) {
                throw new Error('No se pudo actualizar la tarea.')
            }

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
                    authorization: localStorage.getItem('token')
                }
            })
    
            if (!response.ok) {
                throw new Error('No se pudo eliminar la tarea.')
            }

            getTasks();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error)
            setError("Error al eliminar la tarea. Por favor, inténtalo de nuevo más tarde.")
        }
    }

    // Función para activar el modo de actualización
    const handleUpdateMode = (id, task) => {
        setTaskToUpdate({ ...task, id }) // Almacenar la tarea a actualizar
        setUpdateMode(true) // Activar el modo de actualización
    }

    useEffect(() => {
        getTasks() // Obtiene todas las tareas, incluidas las favoritas
    }, [getTasks])

    //Funcion para activar los formularios del dashboard
    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
        if (updateMode) {
            setUpdateMode(false);
            setTaskToUpdate(null);
        }
    }

    // Función para manejar la vista de opciones en la parte derecha
    const handleViewMode = (mode) => {
        setViewMode(mode)
    }

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
    
    
    return (
        <div className="p-3 bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC] dark:bg-gradient-to-b dark:from-[#1a202c] dark:via-[#2d3748] dark:to-[#2d3748] flex">

            <aside className={`relative bg-gray-800 h-screen ${isAsideVisible ? 'w-64' : 'w-16'} hidden sm:flex flex-col items-center rounded-lg shadow-[0px_1px_25px_1px_rgba(165,_39,_255,_0.48)] transition-all duration-300`}>
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

                <div className="w-3/4 flex flex-col items-center mt-4">
                    <>
                        <button 
                            className={`bg-white text-gray-900 font-semibold py-2 rounded-lg flex items-center justify-center ${isAsideVisible ? 'w-full' : 'w-10'}`} 
                            onClick={toggleFormVisibility}
                        >
                            <i className="fas fa-plus"></i>
                            {isAsideVisible && 'Crear Tarea'}
                        </button>

                        {isFormVisible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                                <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md relative">
                                    <button 
                                        className="p-2 text-white font-bold hover:text-gray-900"
                                        onClick={toggleFormVisibility}
                                    >
                                        Cerrar
                                    </button>
                                    {error && <p className="text-red-500 mb-4">{error}</p>}
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

                    <a href="calendar.html" className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600">
                        <FontAwesomeIcon icon={faRotateRight} className='justify-center'/>
                        {isAsideVisible && <span className='ml-3'>Historial</span>}
                    </a>

                    <a href="calendar.html" className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600">
                        <i className="fas fa-calendar justify-center"></i>
                        {isAsideVisible && <span className='ml-3'>Calendario</span>}
                    </a>      
                </div>

                <a href="/profile" className={`absolute w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center py-4 bottom-0 rounded-md ${isAsideVisible ? '' : 'hidden'}`}>
                    <FontAwesomeIcon icon={faArrowCircleUp} />
                    <span className='ml-2'>Ver Perfil</span>
                </a>
            </aside>

            <div className="flex-1">
                <h5 className="text-2xl font-extrabold text-[#10172A] dark:text-[#e2e8f0] m-3 text-center">Tareas</h5>

                {viewMode === 'byStatus' && (
                    <nav className="bg-gray-800 dark:bg-gray-700 p-3 rounded-lg shadow-md flex justify-center space-x-3 ml-2 mb-3">
                        <input
                            type="text"
                            name="text"
                            id="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar Tarea"
                            required
                        />
                        <button
                            className="bg-red-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus("PENDING")}
                        >
                            Pendiente
                        </button>
                        <button
                            className="bg-yellow-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus("IN_PROGRESS")}
                        >
                            En progreso
                        </button>
                        <button
                            className="bg-green-500 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus("COMPLETED")}
                        >
                            Completada
                        </button>
                        <button
                            className="bg-blue-400 text-white px-3 py-1 text-bold rounded-lg transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus(null)}
                        >
                            Borrar Filtros
                        </button>
                    </nav>
                )}

                {updateMode && taskToUpdate && (
                    <div className="frame-task">
                        
                        {error && <p className="text-red-500 mb-4">{error}</p>}

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

                {!updateMode && <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={handleUpdateMode} onFavoriteTask={handleFavoriteTask}/>}
            </div>
        </div>
    )
}

export default TaskListPage

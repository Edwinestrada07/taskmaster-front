import React, { useState, useEffect, useCallback } from 'react'
import TaskList from '../components/taskList'
import TaskForm from '../components/taskForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-regular-svg-icons'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'

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
        getTasks()
    }, [getTasks])

    //Funcion para activar los formularios del dashboard
    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible)
    }

    // Función para manejar la vista de opciones en la parte derecha
    const handleViewMode = (mode) => {
        setViewMode(mode)
    }

    //Función para reducir el aside
    const toggleAsideVisibility = () => {
        setIsAsideVisible(prevState => !prevState);
    }

    return (
        <div className="p-3 bg-gradient-to-b from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC] dark:bg-gradient-to-b dark:from-[#1a202c] dark:via-[#2d3748] dark:to-[#2d3748] flex">

            <aside className={`relative bg-gray-800 h-screen ${isAsideVisible ? 'w-64' : 'w-16'} hidden sm:flex flex-col items-center rounded-lg shadow-[0px_1px_25px_1px_rgba(165,_39,_255,_0.48)] transition-all duration-300`}>
                <div className="p-3 w-full flex justify-between items-center">
                    {isAsideVisible && (
                        <a href="/start" className="text-white text-2xl font-semibold">
                            TaskMaster
                        </a>
                    )}

                    <button 
                        className="bg-white text-gray-800 rounded-full p-1 focus:outline-none" 
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
                        <FontAwesomeIcon icon={faStickyNote} className='mr-3'/>
                        {isAsideVisible && <span>Registradas</span>}
                    </button>
                    
                    <button 
                        className="flex items-center text-white opacity-75 py-3 cursor-pointer hover:bg-gray-600 w-full justify-center"
                        onClick={() => handleViewMode('byStatus')}
                    >   
                        <FontAwesomeIcon icon={faAlignLeft} className='mr-3'/>
                        {isAsideVisible && <span>Estados</span>}
                    </button>

                    <a href="calendar.html" className="flex items-center text-white opacity-75 py-3 w-full justify-center hover:bg-gray-600">
                        <i className="fas fa-calendar mr-3"></i>
                        {isAsideVisible && <span>Calendario</span>}
                    </a>      
                </div>

                <a href="/profile" className={`absolute w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center py-4 bottom-0 rounded-md ${isAsideVisible ? '' : 'hidden'}`}>
                    <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
                </a>
            </aside>

            <div className="flex-1">
                <h5 className="text-xl font-bold text-white mt-4 text-center">Tareas</h5>

                {viewMode === 'byStatus' && (
                    <div className="mt-4 space-y-2">
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus("PENDING")}
                        >
                            Pendiente
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus("IN_PROGRESS")}
                        >
                            En progreso
                        </button>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus("COMPLETED")}
                        >
                            Completada
                        </button>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                            onClick={() => setTaskStatus(null)}
                        >
                            Borrar Filtros
                        </button>
                    </div>
                )}

                {updateMode && taskToUpdate && (
                    <div className="frame-task">
                        
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <form onSubmit={() => updateTask(taskToUpdate.id, taskToUpdate)}>
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

                {!updateMode && <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={handleUpdateMode} />}
            </div>
        </div>
    )
}

export default TaskListPage

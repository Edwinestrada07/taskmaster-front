import React, { useState, useEffect, useCallback } from 'react'
import TaskList from '../components/taskList'
import TaskForm from '../components/taskForm'

const TaskListPage = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)
    const [taskStatus, setTaskStatus] = useState(null)
    const [taskToUpdate, setTaskToUpdate] = useState(null) // Estado para almacenar la tarea a actualizar
    const [updateMode, setUpdateMode] = useState(false) // Estado para activar el modo de actualización
    const [isFormVisible, setFormVisible] = useState(false);

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
        setFormVisible(!isFormVisible);
    };

    return (
        
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">

            <aside className="relative bg-gray-800 h-screen w-64 hidden sm:block shadow-xl">
                <div className="p-6">
                    <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
                        TaskMaster
                    </a>
                    <button className="w-full bg-white text-gray-800 font-semibold py-2 mt-5 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-plus mr-3"></i> New Report
                    </button>
                </div>
                <nav className="text-white text-base font-semibold pt-3">
                <>
                    <button 
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-3 pl-6 hover:bg-gray-700 rounded-md" 
                        onClick={toggleFormVisibility}
                    >
                        <i className="fas fa-sticky-note mr-3"></i> Crear Tarea
                    </button>
                    
                    {isFormVisible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                            <div className="text-white p-6 rounded-lg w-full max-w-md">
                                <button 
                                    className="text-white font-bold mb-4 hover:text-gray-900"
                                    onClick={toggleFormVisibility}
                                >
                                    Cerrar
                                </button>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
                                <TaskForm onSubmit={createTask} />
                            </div>
                        </div>
                    )}
                </>
                    <a href="blank.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-gray-700 rounded-md">
                        <i className="fas fa-sticky-note mr-3"></i> Blank Page
                    </a>
                    <a href="tables.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-gray-700 rounded-md">
                        <i className="fas fa-table mr-3"></i> Tables
                    </a>
                    <a href="forms.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-gray-700 rounded-md">
                        <i className="fas fa-align-left mr-3"></i> Forms
                    </a>
                    <a href="tabs.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-gray-700 rounded-md">
                        <i className="fas fa-tablet-alt mr-3"></i> Tabbed Content
                    </a>
                    <a href="calendar.html" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-gray-700 rounded-md">
                        <i className="fas fa-calendar mr-3"></i> Calendar
                    </a>
                </nav>
                <a href="#" className="absolute w-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center py-4 bottom-0 rounded-md">
                    <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
                </a>
            </aside>

            
            

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 transition-transform transform hover:scale-105"
                onClick={() => setTaskStatus("status")}
            >
                Filtrar por estado
            </button>

            {taskStatus === "status" && (
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

            <h5 className="text-xl font-bold text-white mt-8 text-center">Lista de Tareas</h5>

            {updateMode && taskToUpdate && (
                <div className="bg-gray-800 p-6 mt-4 rounded-lg shadow-md">
                    
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={() => updateTask(taskToUpdate.id, taskToUpdate)}>
                        <label className="block text-white mb-2">Descripción:</label>
                        <input
                            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
                            type="text"
                            name="description"
                            value={taskToUpdate.description}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value })}
                        />

                        <label className="block text-white mb-2">Fecha de Vencimiento:</label>
                        <input
                            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
                            type="date"
                            name="dueDate"
                            value={taskToUpdate.dueDate}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, dueDate: e.target.value })}
                        />

                        <label className="block text-white mb-2">Prioridad:</label>
                        <select
                            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
                            name="priority"
                            value={taskToUpdate.priority}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, priority: e.target.value })}
                        >
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>

                        <label className="block text-white mb-2">Estado:</label>
                        <select
                            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
                            name="status"
                            value={taskToUpdate.status}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, status: e.target.value })}
                        >
                            <option value="PENDING">Pendiente</option>
                            <option value="IN_PROGRESS">En progreso</option>
                            <option value="COMPLETED">Completada</option>
                        </select>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105" type="submit">
                            Actualizar Tarea
                        </button>
                    </form>
                </div>
            )}

            {!updateMode && <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={handleUpdateMode} />}
        </div>
    );
}

export default TaskListPage

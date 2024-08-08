import React, { useState, useEffect, useCallback } from 'react'
import TaskList from '../components/taskList'
import TaskForm from '../components/taskForm'

const TaskListPage = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)
    const [taskStatus, setTaskStatus] = useState(null)
    const [taskToUpdate, setTaskToUpdate] = useState(null) // Estado para almacenar la tarea a actualizar
    const [updateMode, setUpdateMode] = useState(false) // Estado para activar el modo de actualización

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

    return (
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            
            <h5 className="text-2xl font-bold text-white mb-4">Formulario para la creación de Tareas</h5>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <TaskForm onSubmit={createTask} />

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
                    <h2 className="text-xl font-bold text-white mb-4">Actualizar Tarea</h2>
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

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
        <div>
            <h5 className="text m-3">Formulario para la creación de Tareas</h5>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <TaskForm onSubmit={createTask} /> 
            
            <button className="btn-animate-task btn-primary" onClick={() => setTaskStatus("status")}>Filtrar por estado</button>
            {taskStatus === "status" && (
                <div>
                    <button className="btn-animate-task btn-danger" onClick={() => setTaskStatus("PENDING")}>Pendiente</button>
                    <button className="btn-animate-task btn btn-warning" onClick={() => setTaskStatus("IN_PROGRESS")}>En progreso</button>
                    <button className="btn-animate-task btn-success" onClick={() => setTaskStatus("COMPLETED")}>Completada</button>
                    <button className="btn-animate-task btn-primary" onClick={() => setTaskStatus(null)}>Borrar Filtros</button>
                </div>
            )}

            <h5 className="text-a m-3">Lista de Tareas</h5>
            {/* Renderizar el formulario de actualización si el modo de actualización está activado */}
            
            {/* formulario de actualización */}
            {updateMode && taskToUpdate && (
                <div className="frame-task">
                    <h2 className="text">Actualizar Tarea</h2>
                    {error && <p>{error}</p>}

                    <form onSubmit={() => updateTask(taskToUpdate.id, taskToUpdate)}>

                        <label className="text-a">Descripción:</label>
                        <input
                            className="form-styling-inf"
                            type="text"
                            name="description"
                            value={taskToUpdate.description}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value })}
                        />

                        <label className="text-a">Fecha de Vencimiento:</label>
                        <input
                            className="form-styling-inf"
                            type="date"
                            name="dueDate"
                            value={taskToUpdate.dueDate}
                            onChange={(e) => setTaskToUpdate({ ...taskToUpdate, dueDate: e.target.value })}
                        />

                        <label className="text-a">Prioridad:</label>
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

                        <label className="text-a">Estado:</label>
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
                        <button className="btn-animate" type="submit">Actualizar Tarea</button>
                    </form>
                </div>
            )}

            {/* Renderizar la lista de tareas */}
            {!updateMode && <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={handleUpdateMode} />}
        </div>
    )
}

export default TaskListPage

import React, { useState, useEffect } from 'react';
import TaskList from '../components/taskList';
import TaskForm from '../components/taskForm';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);

    const getTasks = async () => {
        try {
            const url = taskStatus ? `http://localhost:5000/task?status=${taskStatus}` : "http://localhost:5000/task";
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });   
    
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de tareas.');
            }

            const tasksData = await response.json();
            setTasks(tasksData);
            setError(null);
            
        } catch (error) {
            console.error("Error al obtener las tareas:", error);
            setError("Error al obtener las tareas. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    const createTask = async (task) => {
        try {
            // Obtener el userId del almacenamiento local
            const userId = JSON.parse(localStorage.getItem('user')).id;
            // Asignar el userId a la tarea
            task.userId = userId;
            
            const response = await fetch('http://localhost:5000/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(task)
            });
            
            if (!response.ok) {
                throw new Error('No se pudo crear la tarea.');
            }

            const responseData = await response.json();
            console.log('Tarea creada:', responseData);
    
            getTasks();
          
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            setError("Error al crear la tarea. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    const updateTask = async (id, task) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({ ...task }),
            });

            if (!response.ok) {
                throw new Error('No se pudo actualizar la tarea.');
            }

            const responseData = await response.json();
            console.log('Tarea actualizada:', responseData);
    
            getTasks();
            
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            setError("Error al actualizar la tarea. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
    
            if (!response.ok) {
                throw new Error('No se pudo eliminar la tarea.');
            }

            getTasks();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            setError("Error al eliminar la tarea. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    useEffect(() => {
        getTasks();
    }, [taskStatus]);

    return (
        <div>
            <h5 className="text m-3">Formulario para la creación de Tareas</h5>

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
            <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
        </div>
    );
};

export default TaskListPage;

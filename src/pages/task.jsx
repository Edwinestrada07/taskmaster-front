import React, { useState, useEffect } from 'react'
import TaskList from '../components/taskList'
import TaskForm from '../components/taskForm'

const TaskListPage = () => {
    const [tasks, setTasks] = useState([])
    const [error] = useState(null)

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/task", {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
    
            const tasks = await response.json()
            setTasks(tasks)
    
        } catch (error) {
            console.error("error", error)
        }
    }

    const createTask = async (task) => {
        try {
            const response = await fetch('http://localhost:5000/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(task)
            })
            
            const responseData = await response.json()
            console.log('Tarea creada:', responseData)
    
            getTasks()
            setTasks({})
          
        } catch (error) {
            console.error('Error al crear Tarea', error)
        }
    }

    const updateTask = async (task) => {
        try {
            const response = await fetch(`http://localhost:5000/task/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify(task)
            })

            const responseData = await response.json()
            console.log('Tarea actualizada:', responseData)
    
            getTasks()
            
        } catch (error) {
            console.error('Error al actualizar Tarea', error)
        }
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/task/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    
        getTasks()
    }

    return (
        <div>
            <h2>Lista de Tareas</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <TaskForm onSubmit={createTask} />
                <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        </div>
    )
}

export default TaskListPage

import { useEffect, useState } from 'react'
import TaskList from '../components/taskList'
import TaskForm from '../components/taskForm'

const TaskPage = () => {
    const [ tasks, setTasks ] = useState([])
    const [ task, setTask ] = useState({})
    const [ isEditTask, setIsEditTask ] = useState(false)
    
    useEffect(() => {
        getTasks()
    }, [])

    const onSubmit = () => {
        if(isEditTask){
            updateTask(task)
        } else {
            createTask(task)
        }
    }
    
    const onClear = () => {
        setTask({})
        setIsEditTask(false)
    }

    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/task', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })

            const tasks = await response.json()
            setTask(tasks)

        } catch (error) {
            console.error('Error al recuperar las tareas:', error)
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
            console.error('Error al crear tareas:', error)
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
            console.error('Error al actualizar tareas:', error)
        }
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/task/${id}`, {
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    
        getTasks()
    }

return (
        <>
            <div>
                <h2>Lista de Tareas</h2>

                <p style={{ color: 'red' }}></p>
                <TaskForm task={task} onSubmit={onSubmit} onClear={onClear}  />
                <TaskList tasks={tasks} getTasks={getTasks} updateTask={updateTask} deleteTask={deleteTask} />
            </div>
        </>
      )

}

export default TaskPage
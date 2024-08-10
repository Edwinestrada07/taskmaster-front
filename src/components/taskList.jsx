import React from 'react'
import TaskItem from '../components/taskItem'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    // Filtrar las tareas por estado
    const pendingTasks = tasks.filter(task => task.status === 'PENDING')
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS')
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED')

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {pendingTasks.length > 0 && (
                <div className="flex-1 bg-gray-100 p-3 rounded-xl ml-3">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Pendiente</h4>
                    {pendingTasks.map(task => (
                        <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
                    ))}
                </div>
            )}
    
            {inProgressTasks.length > 0 && (
                <div className="flex-1 bg-gray-100 p-3 rounded-xl">
                    <h4 className="text-base font-medium text-gray-800 mb-2">En Progreso</h4>
                    {inProgressTasks.map(task => (
                         <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
                    ))}
                </div>
            )}
    
            {completedTasks.length > 0 && (
                <div className="flex-1 bg-gray-100 p-3 rounded-xl">
                    <h4 className="text-base font-medium text-gray-800 mb-2">Completada</h4>
                    {completedTasks.map(task => (
                        <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
                    ))}
                </div>
            )}
        </div>
    )
    
}

export default TaskList

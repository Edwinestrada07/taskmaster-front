import React from 'react'
import TaskItem from '../components/taskItem'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    return (
        <div>
            {Array.isArray(tasks) && tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </div>
    )
}

export default TaskList





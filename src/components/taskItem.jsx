import React from 'react'

const TaskItem = ({ task }) => {
    return (
        <div>
            <h3>{task.description}</h3>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
        </div>
    )
}

export default TaskItem

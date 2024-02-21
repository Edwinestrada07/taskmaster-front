import React from 'react'
import TaskItem from './taskItem'

const TaskList = ({ tasks }) => {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default TaskList



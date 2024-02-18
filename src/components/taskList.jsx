import React from 'react'
import taskItem from '../components/taskItem'   

const taskList = ({ tasks }) => {
    return (
        <div>
            {tasks.map((task) => (
                <taskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default taskList
const taskList = ({ tasks }) => {
    return (
        <div>
            {tasks.map((task) =>(
                <taskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default taskList
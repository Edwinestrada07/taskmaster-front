import React from 'react'

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    return (
        <div>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Fecha de Vencimiento</th>
                </tr>
            </thead>

            <tbody>
            { 
            tasks.map((task, i) => (
                <tr key={i}>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>
                        <Link onClick={() => deleteTask(task.id)}>Eliminar</Link><br />
                        <Link onClick={() => updateTask(task.id)}>Actualizar</Link>
                    </td>
                </tr>
            ))
        }
        </tbody>
        </div>
    )
}

export default TaskList

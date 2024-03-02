import React from 'react';
import TaskItem from '../components/taskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    // Filtrar las tareas por estado
    const pendingTasks = tasks.filter(task => task.status === 'PENDING');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED');

    return (
        <div className="row">
            <div className="col-md-4">
                <h4 className="text m-2">Pendiente</h4>
                {pendingTasks.map(task => (
                    <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
                ))}
            </div>
            <div className="col-md-4">
                <h4 className="text m-2">En Progreso</h4>
                {inProgressTasks.map(task => (
                    <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
                ))}
            </div>
            <div className="col-md-4">
                <h4 className="text m-2">Completada</h4>
                {completedTasks.map(task => (
                    <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;







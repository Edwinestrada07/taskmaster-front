import React from 'react';
import TaskItem from '../components/taskItem';
import { Droppable } from '@hello-pangea/dnd';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onFavoriteTask, onMoveToHistory }) => {
    const pendingTasks = tasks.filter(task => task.status === 'PENDING');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED');

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <Droppable droppableId="PENDING">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-gray-100'} p-3 rounded-xl ml-2`}
                    >
                        <h4 className="text-base font-medium text-gray-800 mb-2">Pendiente</h4>
                        {pendingTasks.map((task, index) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                index={index}
                                onUpdateTask={onUpdateTask}
                                onDeleteTask={onDeleteTask}
                                onFavoriteTask={onFavoriteTask}
                                onMoveToHistory={onMoveToHistory} // Agregado para mover al historial
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="IN_PROGRESS">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-gray-100'} p-3 rounded-xl ml-2`}
                    >
                        <h4 className="text-base font-medium text-gray-800 mb-2">En Progreso</h4>
                        {inProgressTasks.map((task, index) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                index={index}
                                onUpdateTask={onUpdateTask}
                                onDeleteTask={onDeleteTask}
                                onFavoriteTask={onFavoriteTask}
                                onMoveToHistory={onMoveToHistory} // Agregado para mover al historial
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="COMPLETED">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-gray-100'} p-3 rounded-xl ml-2`}
                    >
                        <h4 className="text-base font-medium text-gray-800 mb-2">Completada</h4>
                        {completedTasks.map((task, index) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                index={index}
                                onUpdateTask={onUpdateTask}
                                onDeleteTask={onDeleteTask}
                                onFavoriteTask={onFavoriteTask}
                                onMoveToHistory={onMoveToHistory} // Agregado para mover al historial
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TaskList;

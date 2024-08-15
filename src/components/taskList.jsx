import React from 'react';
import TaskItem from '../components/taskItem';
import { Droppable, DragDropContext } from '@hello-pangea/dnd';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onFavoriteTask, onHistoryTask, onMoveToHistory, onUpdateTaskStatus }) => {
    const pendingTasks = tasks.filter(task => task.status === 'PENDING');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED');

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // Si no hay destino, no hacer nada
        if (!destination) return;

        // Si la tarea no cambió de columna
        if (destination.droppableId === source.droppableId) return;

        const updatedTask = tasks.find(task => task.id.toString() === draggableId);

        if (updatedTask) {
            // Actualizar el estado de la tarea en el backend
            onUpdateTaskStatus(updatedTask.id, destination.droppableId);

            // Llamar a la función para actualizar la tarea en el frontend
            onUpdateTask(updatedTask.id, { ...updatedTask, status: destination.droppableId });
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-4">
                <Droppable droppableId="PENDING">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-600 dark:bg-gray-500' : 'bg-purple-300 dark:bg-purple-200'} p-3 rounded-xl ml-2`}

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
                                    onHistoryTask={onHistoryTask}
                                    onMoveToHistory={onMoveToHistory}
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
                                    onHistoryTask={onHistoryTask}
                                    onMoveToHistory={onMoveToHistory}
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
                                    onHistoryTask={onHistoryTask}
                                    onMoveToHistory={onMoveToHistory} // Agregado para mover al historial
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>        
        </DragDropContext>
    );
};

export default TaskList;

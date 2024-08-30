import React from 'react';
import TaskItem from '../components/taskItem';
import { Droppable, DragDropContext } from '@hello-pangea/dnd';
import TaskMenu from './taskMenu';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onFavoriteTask, onHistoryTask, onMoveToHistory, onUpdateTaskStatus, onSearchTask, onActivatePomodoro }) => {
    //const readyToStartTasks = tasks.filter(task => task.status === '');
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
                {/* Nueva columna: Listos para Iniciar */}
                {/*<Droppable droppableId="READY_TO_START">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-[#f1f0f7] dark:bg-[#e5e3f1]'} p-3 rounded-xl ml-2 shadow-md h-[calc(100vh-4rem)] overflow-y-auto`}
                        >
                            <h4 className="text-center font-bold text-[#10172A] mb-2">Listos para Iniciar</h4>
                            <div className="space-y-2">
                                {readyToStartTasks.map((task, index) => (
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
                        </div>
                    )}
                </Droppable>*/}

                

                {/* Columna Pendiente */}
                <Droppable droppableId="PENDING">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-[#f1f0f7] dark:bg-[#e5e3f1]'} p-3 rounded-xl ml-2 shadow-md h-[calc(100vh-4rem)] overflow-y-auto`} // Ajusta la altura y el scroll
                        >
                            <TaskMenu
                                onSearchTask={() => onSearchTask(tasks)}
                                onActivatePomodoro={() => onActivatePomodoro(tasks)}
                            />
                            <h4 className="text-center font-bold text-[#10172A] mb-2">Pendiente</h4>
                            
                            <div className="space-y-2"> {/* Espaciado entre las tareas */}
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
                        </div>
                    )}
                </Droppable>
    
                {/* Columna En Progreso */}
                <Droppable droppableId="IN_PROGRESS">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-[#f1f0f7] dark:bg-[#e5e3f1]'} p-3 rounded-xl shadow-md h-[calc(100vh-4rem)] overflow-y-auto`}
                        >
                            <TaskMenu
                                onSearchTask={() => onSearchTask(tasks)}
                                onActivatePomodoro={() => onActivatePomodoro(tasks)}
                            />
                            <h4 className="text-center font-bold text-[#10172A] mb-2">En Progreso</h4>

                            <div className="space-y-2">
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
                        </div>
                    )}
                </Droppable>
    
                {/* Columna Completada */}
                <Droppable droppableId="COMPLETED">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 ${snapshot.isDraggingOver ? 'bg-gray-200' : 'bg-[#f1f0f7] dark:bg-[#e5e3f1]'} p-3 rounded-xl shadow-md h-[calc(100vh-4rem)] overflow-y-auto`}
                        >   
                            <TaskMenu
                                onSearchTask={() => onSearchTask(tasks)}
                                onActivatePomodoro={() => onActivatePomodoro(tasks)}
                            />
                            <h4 className="text-center font-bold text-[#10172A] mb-2">Completada</h4>
                            
                            <div className="space-y-2">
                                {completedTasks.map((task, index) => (
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
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
       
};

export default TaskList;

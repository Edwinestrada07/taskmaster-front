// components/TaskList.js
import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskColumn from './taskColumn';

const TaskList = ({
    tasks,
    onUpdateTask,
    onDeleteTask,
    onFavoriteTask,
    onHistoryTask,
    onMoveToHistory,
    onUpdateTaskStatus,
}) => {
    const pendingTasks = tasks.filter(task => task.status === 'PENDING');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED');

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        const movedTask = tasks.find(task => task.id.toString() === draggableId);
        if (movedTask) {
            const updatedTask = {
                ...movedTask,
                status: destination.droppableId,
            };
            onUpdateTask(updatedTask.id, updatedTask);
            onUpdateTaskStatus(updatedTask.id, destination.droppableId);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row h-[calc(94vh-2rem)] overflow-y-auto">
                <TaskColumn
                    droppableId="PENDING"
                    tasks={pendingTasks}
                    title="Pendiente"
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                    onFavoriteTask={onFavoriteTask}
                    onHistoryTask={onHistoryTask}
                    onMoveToHistory={onMoveToHistory}
                />
                <TaskColumn
                    droppableId="IN_PROGRESS"
                    tasks={inProgressTasks}
                    title="En Progreso"
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                    onFavoriteTask={onFavoriteTask}
                    onHistoryTask={onHistoryTask}
                    onMoveToHistory={onMoveToHistory}
                />
                <TaskColumn
                    droppableId="COMPLETED"
                    tasks={completedTasks}
                    title="Completada"
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                    onFavoriteTask={onFavoriteTask}
                    onHistoryTask={onHistoryTask}
                    onMoveToHistory={onMoveToHistory}
                />
            </div>
        </DragDropContext>
    );
};

export default TaskList;

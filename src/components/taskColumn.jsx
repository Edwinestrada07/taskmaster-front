import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskMenu from './taskMenu';
import TaskItem from './taskItem';
import PomodoroModal from './pomodoroModal';
import SearchModal from './searchModal';

const TaskColumn = ({ droppableId, tasks, onUpdateTask, onDeleteTask, onFavoriteTask, onHistoryTask, onMoveToHistory, title }) => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false);

    return (
        <div className="flex flex-col w-full md:w-1/3 p-2">
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`bg-gray-100 rounded-3xl shadow-2xl p-4 ${
                            snapshot.isDraggingOver ? 'bg-blue-100' : ''
                        }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-center font-bold text-[#10172A]">{title}</h4>
                            <TaskMenu
                                onOpenSearchModal={() => setIsSearchModalOpen(true)}
                                onOpenPomodoroModal={() => setIsPomodoroModalOpen(true)}
                            />
                        </div>
                        <div className="space-y-2">
                            {tasks.map((task, index) => (
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

            {/* Modales */}
            <SearchModal
                isOpen={isSearchModalOpen}
                onRequestClose={() => setIsSearchModalOpen(false)}
                tasks={tasks}
            />
            <PomodoroModal
                isOpen={isPomodoroModalOpen}
                onRequestClose={() => setIsPomodoroModalOpen(false)}
                tasks={tasks}
            />
        </div>
    );
};

export default TaskColumn;

import React, { useState } from 'react';

const TaskMenu = ({ onSearchTask, onActivatePomodoro }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="text-gray-800 hover:text-gray-800 focus:outline-none text-3xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ...
            </button>
            {isMenuOpen && (
                <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                        className="block w-full px-4 py-2 text-left text-md text-gray-700 hover:bg-gray-100"
                        onClick={onSearchTask}
                    >
                        Buscar tarea
                    </button>
                    <button
                        className="block w-full px-4 py-2 text-left text-md text-gray-700 hover:bg-gray-100"
                        onClick={onActivatePomodoro}
                    >
                        Activar Pomodoro
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskMenu;

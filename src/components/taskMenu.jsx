import React, { useState } from 'react';

const TaskMenu = ({ onOpenSearchModal, onOpenPomodoroModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="relative inline-block text-left mb-2">
            <button
                onClick={toggleMenu}
                className="text-gray-900 hover:text-gray-800 focus:outline-none text-3xl"
            >
                ...
            </button>
            {isMenuOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <div className="py-1">
                        <button
                            onClick={() => {
                                onOpenSearchModal();
                                toggleMenu();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Buscar Tarea
                        </button>
                        <button
                            onClick={() => {
                                onOpenPomodoroModal();
                                toggleMenu();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Activar Pomodoro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskMenu;

import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const MagicCard = ({ title, description, size }) => {
    const [springProps, set] = useSpring(() => ({
        transform: 'scale(1)',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    }));

    const sizeClasses = size === 'large' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';

    return (
        <animated.div
            style={springProps}
            onMouseEnter={() =>
                set({
                    transform: 'scale(1.05)',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                })
            }
            onMouseLeave={() =>
                set({
                    transform: 'scale(1)',
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                })
            }
            className={`bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 shadow-lg transform transition-transform duration-300 ease-in-out ${sizeClasses}`}
        >
            <h3 className="text-xl font-bold text-center bg-gradient-to-tl from-slate-800 via-violet-600 to-zinc-400 bg-clip-text text-transparent">
                {title}
            </h3>
            <p className="text-sm font-xs text-center mt-3 text-gray-600 dark:text-gray-300">{description}</p>
        </animated.div>
    );
};

export default MagicCard;

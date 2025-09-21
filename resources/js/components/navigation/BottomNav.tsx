// resources/js/components/navigation/BottomNav.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiList } from 'react-icons/fi'; // Using Feather Icons

const BottomNav: React.FC = () => {
    const activeClass = 'text-[#34D399]'; // A vibrant green for the active tab
    const inactiveClass = 'text-slate-400';

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
            <div className="bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 flex justify-around">
                <NavLink to="/" className={({ isActive }) => `flex-1 p-4 flex flex-col items-center text-xs ${isActive ? activeClass : inactiveClass}`}>
                    <FiHome size={24} />
                    <span className="mt-1">Matches</span>
                </NavLink>
                <NavLink to="/predictions" className={({ isActive }) => `flex-1 p-4 flex flex-col items-center text-xs ${isActive ? activeClass : inactiveClass}`}>
                    <FiList size={24} />
                    <span className="mt-1">Your Predictions</span>
                </NavLink>
            </div>
        </div>
    );
};
export default BottomNav;
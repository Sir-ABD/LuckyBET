// resources/js/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/navigation/BottomNav';

const MainLayout: React.FC = () => {
    return (
        <div className="bg-[#0A1D1A] min-h-screen font-sans">
            <div className="max-w-md mx-auto bg-[#0A1D1A] text-white pb-20">
                {/* Outlet is where the routed pages will be rendered */}
                <Outlet />
            </div>
            <BottomNav />
        </div>
    );
};
export default MainLayout;
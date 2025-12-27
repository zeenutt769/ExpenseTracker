import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-primary text-primary font-sans antialiased selection:bg-blue-500/30">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 relative w-full">

                {/* Mobile Header Bar */}
                <div className="md:hidden flex items-center justify-between mb-6">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-400 hover:text-white active:scale-95 transition-transform"
                    >
                        <Menu size={24} />
                    </button>
                    {/* Simplified mobile profile/logout or just keep them absolute? 
                        Let's keep the absolute positioning for desktop coherence but adjust it for mobile.
                    */}
                </div>

                {/* Header / Profile Controls - Adjusted position for mobile */}
                <div className="absolute top-4 right-4 md:top-6 md:right-8 flex items-center gap-3 z-30">
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/5 pl-4 pr-1 py-1 rounded-full shadow-lg hover:border-white/10 transition-colors group">
                        <span className="text-xs font-medium text-gray-300 hidden md:block">
                            {user?.name || 'User'}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                            <User size={14} />
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all shadow-lg active:scale-95 group"
                        title="Logout"
                    >
                        <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>

                <div className="max-w-7xl mx-auto mt-4 md:mt-12">
                    <Outlet />
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

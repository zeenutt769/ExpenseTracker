import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Wallet, Activity, Settings, PieChart, Bell, Zap, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState('Overview');

    useEffect(() => {
        if (location.pathname === '/expenses') setActive('Expenses');
        else if (location.pathname === '/') setActive('Overview');
    }, [location]);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        if (onClose) {
            onClose();
        }
    }, [location.pathname]);

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/' },
        { name: 'Expenses', icon: Wallet, path: '/expenses' },
        { name: 'Habits', icon: Activity, path: '/habits' },
        { name: 'Reports', icon: PieChart, path: '/reports' },
    ];

    const bottomItems = [
        { name: 'Notifications', icon: Bell, path: '#' },
        { name: 'Settings', icon: Settings, path: '#' },
    ];

    const NavItem = ({ item }) => (
        <button
            onClick={() => {
                setActive(item.name);
                if (item.path !== '#') navigate(item.path);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
        ${active === item.name
                    ? 'text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-blue-500/50 bg-blue-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
        >
            {active === item.name && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent backdrop-blur-md z-0"></div>
            )}
            <div className="relative z-10 flex items-center space-x-3">
                <item.icon size={20} className={`transition-colors duration-300 ${active === item.name ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'text-gray-500 group-hover:text-white'}`} />
                <span className="font-medium tracking-wide">{item.name}</span>
            </div>
        </button>
    );

    // Overlay for mobile
    const overlayClass = isOpen ? 'fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden' : 'hidden';

    // Sidebar container classes
    // md:translate-x-0 ensures it's always visible on desktop
    // -translate-x-full hides it by default on mobile
    const sidebarClass = `w-64 h-screen fixed left-0 top-0 flex flex-col p-6 z-50
        bg-black/80 md:bg-black/40 backdrop-blur-2xl border-r border-white/5 shadow-2xl transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`;

    return (
        <>
            {/* Mobile Overlay */}
            <div className={overlayClass} onClick={onClose} />

            <div className={sidebarClass}>

                {/* Branding */}
                <div className="flex items-center justify-between px-2 mb-12">
                    <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                            <Zap className="text-white fill-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white leading-none">Hexa<span className="text-blue-500">.</span></h1>
                            <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-1">Tracker</p>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 space-y-1">
                    <div className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-4 px-4">Main Menu</div>
                    {menuItems.map((item) => (
                        <NavItem key={item.name} item={item} />
                    ))}
                </div>

                <div className="space-y-1 mt-auto">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>
                    {bottomItems.map((item) => (
                        <NavItem key={item.name} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;

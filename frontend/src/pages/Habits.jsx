import React, { useState } from 'react';

import Card from '../components/Card';
import { Plus, Flame, Check, X, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHabits } from '../context/HabitContext'; // NEW
import HabitFormModal from '../components/Habit/HabitFormModal'; // NEW

const Habits = () => {
    // Consume Context
    const { habits, heatmapData, toggleHabit, deleteHabit } = useHabits();

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteHabit = (id) => {
        if (confirm('Delete this habit?')) {
            deleteHabit(id);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Habit Tracker</h1>
                    <p className="text-gray-400 text-sm mt-1">Build consistency, one day at a time.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                >
                    <Plus size={16} /> Add Habit
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Habit Cards */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Your Goals</h3>
                    </div>
                    {habits.map(habit => (
                        <Card key={habit.id} className="p-5 group hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-1 h-full ${habit.completedToday ? 'bg-blue-500' : 'bg-transparent'} transition-colors duration-300`}></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-white text-lg">{habit.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{habit.goal}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteHabit(habit.id); }} className="text-gray-600 hover:text-red-400 transition-colors"><X size={16} /></button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-end justify-between">
                                <div className={`flex items-center gap-2 ${habit.completedToday ? 'text-orange-400' : 'text-gray-600'}`}>
                                    <Flame size={16} fill="currentColor" />
                                    <span className="font-bold">{habit.streak} Day Streak</span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleHabit(habit.id); }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${habit.completedToday ? 'bg-blue-500 border-blue-500 text-white scale-110' : 'border-gray-600 hover:border-blue-500 hover:text-blue-500 text-transparent'}`}
                                >
                                    <Check size={14} />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Right: Heatmap */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-white">Consistency Map</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <button onClick={() => setCurrentYear(y => y - 1)} className="hover:text-white"><ChevronLeft size={16} /></button>
                                <span className="font-mono text-white">{currentYear}</span>
                                <button onClick={() => setCurrentYear(y => y + 1)} className="hover:text-white"><ChevronRight size={16} /></button>
                            </div>
                        </div>

                        {/* GitHub/LeetCode Style Heatmap */}
                        <div className="flex flex-wrap gap-1">
                            {heatmapData.map((day, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-sm transition-all hover:scale-125 hover:z-10 cursor-pointer
                                    ${day.level === 0 ? 'bg-white/[0.03]' :
                                            day.level === 1 ? 'bg-blue-500/40' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`}
                                    title={`Day ${i + 1}: ${day.level === 0 ? 'No activity' : 'Completed'}`}
                                ></div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 mt-6 text-xs text-gray-500 justify-end">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-white/[0.03]"></div>
                                <div className="w-3 h-3 rounded-sm bg-blue-500/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </Card>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="flex items-center gap-4 p-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <Check size={20} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">85%</div>
                                <div className="text-xs text-gray-500">Completion Rate</div>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-4 p-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">24 Days</div>
                                <div className="text-xs text-gray-500">Longest Streak</div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <HabitFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Habits;

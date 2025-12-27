import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';

const HabitFormModal = ({ isOpen, onClose }) => {
    const { addHabit } = useHabits();
    const [newHabitName, setNewHabitName] = useState('');
    const [newHabitGoal, setNewHabitGoal] = useState('Daily');

    const handleAddHabit = (e) => {
        e.preventDefault();
        addHabit({
            name: newHabitName,
            goal: newHabitGoal
        });
        setNewHabitName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <h2 className="text-xl font-bold text-white mb-6">Create New Habit</h2>
                <form onSubmit={handleAddHabit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Habit Name</label>
                        <input
                            required
                            type="text"
                            value={newHabitName}
                            onChange={e => setNewHabitName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            placeholder="e.g. Meditate"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Frequency</label>
                        <select
                            value={newHabitGoal}
                            onChange={e => setNewHabitGoal(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50"
                        >
                            <option>Daily</option>
                            <option>Mon-Fri</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Create Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HabitFormModal;

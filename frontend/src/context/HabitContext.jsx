import React, { createContext, useContext, useState, useMemo } from 'react';
import { Activity, Calendar, Zap, Flame } from 'lucide-react';

const HabitContext = createContext();

export const useHabits = () => {
    const context = useContext(HabitContext);
    if (!context) {
        throw new Error('useHabits must be used within a HabitProvider');
    }
    return context;
};

export const HabitProvider = ({ children }) => {
    // Mock Data
    const [habits, setHabits] = useState([
        { id: 1, name: "Morning Jog", streak: 12, completedToday: true, goal: "Daily", color: "text-emerald-400", icon: Activity },
        { id: 2, name: "Read 30 Mins", streak: 5, completedToday: false, goal: "Daily", color: "text-blue-400", icon: Calendar },
        { id: 3, name: "No Sugar", streak: 3, completedToday: false, goal: "Mon-Fri", color: "text-purple-400", icon: Zap },
        { id: 4, name: "Drink 3L Water", streak: 20, completedToday: true, goal: "Daily", color: "text-blue-400", icon: Flame },
    ]);

    // Mock Heatmap Data
    const heatmapData = useMemo(() => {
        const days = [];
        for (let i = 0; i < 365; i++) {
            days.push({
                date: i,
                level: Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 1) : 0
            });
        }
        return days;
    }, []);

    const addHabit = (habit) => {
        const newId = Math.max(...habits.map(h => h.id), 0) + 1;
        // Assign random icon/color for now if not provided
        const newHabit = {
            id: newId,
            streak: 0,
            completedToday: false,
            color: "text-blue-400",
            icon: Activity, // Default icon
            ...habit
        };
        setHabits([...habits, newHabit]);
    };

    const toggleHabit = (id) => {
        setHabits(habits.map(h => {
            if (h.id === id) {
                const isCompleted = !h.completedToday;
                return {
                    ...h,
                    completedToday: isCompleted,
                    streak: isCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
                };
            }
            return h;
        }));
    };

    const deleteHabit = (id) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    return (
        <HabitContext.Provider value={{
            habits,
            heatmapData,
            addHabit,
            toggleHabit,
            deleteHabit
        }}>
            {children}
        </HabitContext.Provider>
    );
};

import React from "react";

export default function HabitGrid({ habits }) {
    // Generate days for the current month (or a fixed 30-day view for demo)
    // Generate days for the current month (or a fixed 30-day view for demo)
    const days = Array.from({ length: 30 }, (_, i) => i + 1); // Showing 30 days matching backend model

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr>
                        <th className="p-2 min-w-[150px] font-semibold text-gray-600">Daily Habits</th>
                        <th className="p-2 w-16 text-center text-gray-500">Goal</th>
                        {days.map((day, i) => (
                            <th key={day} className="p-1 text-center min-w-[30px]">
                                <div className="text-[10px] text-gray-400 uppercase mb-1">{weekDays[i % 7]}</div>
                                <div className="font-bold text-gray-700">{day}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map((habit, idx) => (
                        <tr key={habit._id || idx} className="border-t border-gray-100 hover:bg-white/50 transition-colors">
                            <td className="p-2 font-medium text-gray-700 flex items-center gap-2">
                                <span className="text-lg">{habit.emoji || "📝"}</span>
                                {habit.title}
                            </td>
                            <td className="p-2 text-center font-mono text-gray-500">{habit.days?.length || 30}</td>
                            {days.map((day, i) => {
                                // Check if this specific day is completed in the habit data
                                // Assuming habit.days is an array of booleans or objects. 
                                // For this demo, let's look at the index.
                                const isCompleted = habit.days && habit.days[i];

                                return (
                                    <td key={day} className="p-1 text-center">
                                        <div
                                            className={`
                        w-6 h-6 mx-auto rounded-md border flex items-center justify-center cursor-pointer transition-all
                        ${isCompleted
                                                    ? "bg-emerald-400 border-emerald-500 text-white"
                                                    : "bg-white border-gray-200 text-transparent hover:border-emerald-300"}
                      `}
                                        >
                                            ✓
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

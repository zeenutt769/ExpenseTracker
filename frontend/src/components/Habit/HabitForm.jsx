import React from "react";
export default function HabitTracker({ habit }) {
  const completed = habit.days.filter(Boolean).length;
  const percent = Math.round((completed / habit.days.length) * 100);

  return (
    <div>
      <h3>{habit.emoji} {habit.title}</h3>
      <p>🔥 {percent}% Completed</p>
    </div>
  );
}

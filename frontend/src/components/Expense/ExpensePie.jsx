import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensePie({ expenses }) {
  const dataMap = {};

  expenses.forEach(e => {
    dataMap[e.category] = (dataMap[e.category] || 0) + e.amount;
  });

  return (
    <Pie
      data={{
        labels: Object.keys(dataMap),
        datasets: [{
          data: Object.values(dataMap),
          // Hux-inspired palette: Neon Green, Electric Purple, Blue, Pink, Orange
          backgroundColor: ["#34d399", "#8b5cf6", "#3b82f6", "#ec4899", "#f97316"],
          borderColor: '#1e293b', // Match card bg to create "gap" effect
          borderWidth: 2,
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              color: '#94a3b8', // text-slate-400
              font: {
                family: 'Inter',
                size: 11
              }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8
          }
        }
      }}
    />
  );
}

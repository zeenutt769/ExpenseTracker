import React from 'react';
import Card from '../components/Card';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Reports = () => {
    // Memoize data to prevent unnecessary re-renders/chart updates
    const barData = React.useMemo(() => ({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Habit Completion Rate',
            data: [65, 78, 82, 90],
            backgroundColor: '#3b82f6',
            borderRadius: 8,
        }]
    }), []);

    const pieData = React.useMemo(() => ({
        labels: ['Food', 'Rent', 'Entertainment', 'Health', 'Travel'],
        datasets: [{
            data: [35, 40, 10, 10, 5],
            backgroundColor: [
                '#3b82f6', // blue
                '#8b5cf6', // purple
                '#ec4899', // pink
                '#10b981', // emerald
                '#f59e0b', // amber
            ],
            borderColor: '#000',
            borderWidth: 0
        }]
    }), []);

    // Memoize options
    const pieOptions = React.useMemo(() => ({
        maintainAspectRatio: false,
        animation: {
            animateScale: false,
            animateRotate: true,
            duration: 1500,
            easing: 'easeOutQuart'
        }
    }), []);

    const barOptions = React.useMemo(() => ({
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, grid: { color: '#333' } }, x: { grid: { display: false } } },
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        }
    }), []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-white tracking-tight">Reports & Insights</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-lg font-semibold text-white mb-6">Financial Breakdown</h3>
                    <div className="h-64 flex justify-center">
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-white mb-6">Monthly Consistency</h3>
                    <div className="h-64">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/20">
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Smart Insight: Finance</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Your spending on <strong>Entertainment</strong> has decreased by 15% this month compared to last.
                        Consider allocating these savings to your emergency fund. Great job staying within budget!
                    </p>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Smart Insight: Wellness</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        You've hit your <strong>Morning Jog</strong> goal for 5 days in a row!
                        Consistency is key. Try to increase your duration by 5 minutes next week to challenge yourself.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Reports;

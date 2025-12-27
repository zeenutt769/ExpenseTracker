import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { ArrowUpRight, TrendingUp, Calendar, Zap, DollarSign, Activity, ArrowRight, Flame } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import ExpensePie from '../components/Expense/ExpensePie';
import { useTransactions } from '../context/TransactionContext'; // NEW
import { useHabits } from '../context/HabitContext'; // NEW
import TransactionFormModal from '../components/Expense/TransactionFormModal'; // NEW

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
  const navigate = useNavigate();
  const { transactions } = useTransactions();
  const { habits, toggleHabit } = useHabits();

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  // Metrics Calculation
  const totalBalance = transactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);
  const expensesOnly = transactions.filter(t => t.type === 'expense');

  // Calculate Avg Completion for Habits (Mock Logic roughly based on streaks)
  const totalHabits = habits.length;
  const activeStreaks = habits.filter(h => h.streak > 0).length;
  const avgCompletion = totalHabits > 0 ? Math.round((activeStreaks / totalHabits) * 100) : 0;

  // Chart Data (Mock Trend - ideal: calculate from actual transaction history)
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Savings Trend',
      data: [totalBalance - 500, totalBalance - 300, totalBalance - 400, totalBalance - 100, totalBalance, totalBalance + 50, totalBalance], // Dynamic-ish mock
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#000',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#ccc',
        borderColor: '#333',
        borderWidth: 1,
        padding: 10
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#666' } },
      y: { grid: { color: '#222' }, ticks: { color: '#666' } }
    }
  };

  const openAddTransactionModal = () => {
    setTransactionToEdit(null);
    setIsTransactionModalOpen(true);
  };

  const openEditTransactionModal = (t) => {
    setTransactionToEdit(t);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header / Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">Welcome back to Hux Tracker.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={openAddTransactionModal}
            className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            Add Transaction
          </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign size={80} />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Balance</div>
            <div className="text-3xl font-bold text-white mt-2">${totalBalance.toFixed(2)}</div>
            <div className="flex items-center gap-2 mt-4 text-emerald-400 text-xs font-medium">
              <span className="flex items-center bg-emerald-500/10 px-2 py-1 rounded-lg"><ArrowUpRight size={12} className="mr-1" /> +12.5%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={80} />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Active Habits</div>
            <div className="text-3xl font-bold text-white mt-2">{activeStreaks} / {totalHabits}</div>
            <div className="flex items-center gap-2 mt-4 text-blue-400 text-xs font-medium">
              <span className="flex items-center bg-blue-500/10 px-2 py-1 rounded-lg"><TrendingUp size={12} className="mr-1" /> Active</span>
              <span className="text-gray-500">Streaks</span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={80} />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Avg Completion</div>
            <div className="text-3xl font-bold text-white mt-2">{avgCompletion}%</div>
            <div className="flex items-center gap-2 mt-4 text-purple-400 text-xs font-medium">
              <span className="flex items-center bg-purple-500/10 px-2 py-1 rounded-lg">Top 5%</span>
              <span className="text-gray-500">of users</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Chart & Transactions */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Financial Overview</h3>
              <select className="bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 px-3 py-1 outline-none">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-64 cursor-crosshair">
              <Line data={lineData} options={lineOptions} />
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <button
                onClick={() => navigate('/expenses')}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {transactions.slice(0, 5).map(t => (
                <div
                  key={t.id}
                  onClick={() => openEditTransactionModal(t)}
                  className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {t.type === 'income' ? <ArrowUpRight size={18} /> : <DollarSign size={18} />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">{t.description}</div>
                      <div className="text-xs text-gray-500">{t.category} • {t.date}</div>
                    </div>
                  </div>
                  <div className={`font-mono text-sm font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-4">No recent transactions</div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Col: Habits & Expense Breakdown */}
        <div className="space-y-8">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Today's Habits</h3>
              <button
                onClick={() => navigate('/habits')}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Manage
              </button>
            </div>
            <div className="space-y-3">
              {habits.slice(0, 4).map(habit => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:border-white/10 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/5 ${habit.color || 'text-white'}`}>
                      {/* Safe icon rendering (assuming icon can be stored or we mock it) */}
                      {habit.icon ? <habit.icon size={18} /> : <Flame size={18} />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{habit.name}</div>
                      <div className="text-xs text-gray-500">{habit.streak} day streak</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${habit.completedToday ? `bg-blue-500 border-blue-500` : 'border-gray-600 group-hover:border-gray-400'}`}>
                    {habit.completedToday && <ArrowRight size={14} className="text-white" />}
                  </div>
                </div>
              ))}
              {habits.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-4">
                  No habits set. <button onClick={() => navigate('/habits')} className="text-blue-400 hover:underline">Add one?</button>
                </div>
              )}
            </div>
          </Card>

          <Card className="min-h-[300px]">
            <h3 className="text-lg font-semibold text-white mb-6">Expense Structure</h3>
            <div className="h-64 relative">
              <ExpensePie expenses={expensesOnly} />
            </div>
          </Card>
        </div>
      </div>

      <TransactionFormModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transactionToEdit={transactionToEdit}
      />
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';

import Card from '../components/Card';
import { Search, Filter, Plus, Trash2, Edit2, CheckSquare, Square, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext'; // NEW
import TransactionFormModal from '../components/Expense/TransactionFormModal'; // NEW

const Expenses = () => {
    // Consume Context
    const { transactions, deleteTransaction, deleteMultipleTransactions } = useTransactions();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState(null);

    // Handlers
    const toggleSelect = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === transactions.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(transactions.map(t => t.id));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            deleteTransaction(id);
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        }
    };

    const handleBulkDelete = () => {
        if (confirm(`Delete ${selectedItems.length} items?`)) {
            deleteMultipleTransactions(selectedItems);
            setSelectedItems([]);
        }
    };

    const openAddModal = () => {
        setTransactionToEdit(null);
        setIsModalOpen(true);
    };

    const openEditModal = (transaction) => {
        setTransactionToEdit(transaction);
        setIsModalOpen(true);
    };

    const filteredTransactions = transactions.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Calculate Totals
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Expenses</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your financial records.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-gray-300 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    >
                        <Plus size={16} /> New Entry
                    </button>
                </div>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6 bg-emerald-500/5 border-emerald-500/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-emerald-400/80 uppercase tracking-widest">Total Income</p>
                            <h3 className="text-2xl font-bold text-emerald-400">+${totalIncome.toFixed(2)}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-red-500/5 border-red-500/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                            <TrendingDown size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-red-400/80 uppercase tracking-widest">Total Expenses</p>
                            <h3 className="text-2xl font-bold text-red-400">-${totalExpense.toFixed(2)}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-0 overflow-hidden border-white/5 bg-black/40">
                {/* Visual Toolbar */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>
                    {selectedItems.length > 0 && (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
                            <span className="text-xs text-gray-400">{selectedItems.length} selected</span>
                            <button onClick={handleBulkDelete} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Notion-style Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="p-4 w-12 text-center">
                                    <button onClick={toggleSelectAll} className="text-gray-500 hover:text-white">
                                        {selectedItems.length === transactions.length ? <CheckSquare size={16} /> : <Square size={16} />}
                                    </button>
                                </th>
                                <th className="p-4 font-medium">Description</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                                <th className="p-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-white/5">
                            {filteredTransactions.map(t => (
                                <tr key={t.id} className={`group hover:bg-white/[0.02] transition-colors ${selectedItems.includes(t.id) ? 'bg-blue-500/5' : ''}`}>
                                    <td className="p-4 text-center">
                                        <button onClick={() => toggleSelect(t.id)} className={`${selectedItems.includes(t.id) ? 'text-blue-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                            {selectedItems.includes(t.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                                        </button>
                                    </td>
                                    <td className="p-4 font-medium text-white">
                                        <div className="flex items-center gap-2">
                                            {t.type === 'income' ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> : <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                                            {t.description}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300 text-xs">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400 font-mono text-xs">{t.date}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${t.status === 'Completed'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                            }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-right font-mono font-medium ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                    </td>
                                    <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 justify-end">
                                        <button onClick={() => openEditModal(t)} className="text-gray-500 hover:text-blue-400 transition-colors">
                                            <Edit2 size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(t.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <TransactionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                transactionToEdit={transactionToEdit}
            />
        </div>
    );
};

export default Expenses;

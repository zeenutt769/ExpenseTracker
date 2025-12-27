import React, { useState, useEffect } from 'react';
import { useTransactions } from '../../context/TransactionContext';

const TransactionFormModal = ({ isOpen, onClose, transactionToEdit = null }) => {
    const { addTransaction, editTransaction } = useTransactions();
    const [formData, setFormData] = useState({
        description: '',
        category: 'Food',
        amount: '',
        type: 'expense',
        status: 'Completed',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (transactionToEdit) {
            setFormData({
                description: transactionToEdit.description,
                category: transactionToEdit.category,
                amount: transactionToEdit.amount,
                type: transactionToEdit.type,
                status: transactionToEdit.status,
                date: transactionToEdit.date
            });
        } else {
            setFormData({
                description: '',
                category: 'Food',
                amount: '',
                type: 'expense',
                status: 'Completed',
                date: new Date().toISOString().split('T')[0]
            });
        }
    }, [transactionToEdit, isOpen]);

    const handleSave = (e) => {
        e.preventDefault();
        if (transactionToEdit) {
            editTransaction({ id: transactionToEdit.id, ...formData });
        } else {
            addTransaction(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <h2 className="text-xl font-bold text-white mb-6">{transactionToEdit ? 'Edit Transaction' : 'New Transaction'}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                        <input
                            required
                            type="text"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            placeholder="e.g. Grocery Shopping"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Amount</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            >
                                <option>Food</option>
                                <option>Transport</option>
                                <option>Entertainment</option>
                                <option>Health</option>
                                <option>Income</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            >
                                <option>Completed</option>
                                <option>Pending</option>
                            </select>
                        </div>
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
                            {transactionToEdit ? 'Save Changes' : 'Create Entry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionFormModal;

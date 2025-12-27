import React, { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
};

export const TransactionProvider = ({ children }) => {
    // Initial Mock Data
    const [transactions, setTransactions] = useState([
        { id: 1, date: '2024-03-10', description: 'Grocery Market', category: 'Food', amount: 150.00, type: 'expense', status: 'Completed' },
        { id: 2, date: '2024-03-12', description: 'Freelance Payment', category: 'Income', amount: 1200.00, type: 'income', status: 'Completed' },
        { id: 3, date: '2024-03-14', description: 'Netflix Subscription', category: 'Entertainment', amount: 15.00, type: 'expense', status: 'Pending' },
        { id: 4, date: '2024-03-15', description: 'Gym Membership', category: 'Health', amount: 45.00, type: 'expense', status: 'Completed' },
        { id: 5, date: '2024-03-16', description: 'Coffee Shop', category: 'Food', amount: 12.50, type: 'expense', status: 'Completed' },
        { id: 6, date: '2024-03-18', description: 'Client Bonus', category: 'Income', amount: 500.00, type: 'income', status: 'Completed' },
    ]);

    const addTransaction = (transaction) => {
        const newId = Math.max(...transactions.map(t => t.id), 0) + 1;
        setTransactions([{ id: newId, ...transaction, amount: parseFloat(transaction.amount) }, ...transactions]);
    };

    const editTransaction = (updatedTransaction) => {
        setTransactions(transactions.map(t =>
            t.id === updatedTransaction.id
                ? { ...t, ...updatedTransaction, amount: parseFloat(updatedTransaction.amount) }
                : t
        ));
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const deleteMultipleTransactions = (ids) => {
        setTransactions(transactions.filter(t => !ids.includes(t.id)));
    };

    return (
        <TransactionContext.Provider value={{
            transactions,
            addTransaction,
            editTransaction,
            deleteTransaction,
            deleteMultipleTransactions
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

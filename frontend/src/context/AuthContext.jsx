import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent login
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const loginWithProvider = (provider) => {
        // Mocking Social Login
        const userData = {
            id: provider === 'Google' ? 3 : 4,
            name: `${provider} User`,
            email: `user@${provider.toLowerCase()}.com`
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
    };

    const login = (email, password) => {
        // Mock Validation - In a real app, this would be an API call
        // Logic: Accept any email, but password must be 'password123' or 'admin' 
        // Or just check if fields are not empty for demo purposes as requested "certain user id" implies specific check.

        if (email === 'admin@example.com' && password === 'admin') {
            const userData = { id: 1, name: 'Admin User', email };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        }

        // For demo flexibility, let's also allow a generic "demo" user
        if (email === 'demo@hux.com' && password === 'hux') {
            const userData = { id: 2, name: 'Demo User', email };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        }

        return { success: false, message: 'Invalid credentials. Try admin@example.com / admin' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithProvider, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Habits from './pages/Habits';
import Reports from './pages/Reports';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext'; 
import { HabitProvider } from './context/HabitContext'; 
import PrivateRoute from './components/PrivateRoute';
import CursorFollower from './components/CursorFollower';

function App() {
  return (
    <AuthProvider>
      <CursorFollower />
      <TransactionProvider> 
        <HabitProvider> 
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<PrivateRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/habits" element={<Habits />} />
                  <Route path="/reports" element={<Reports />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </HabitProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;


///This is a test Pull Request
///
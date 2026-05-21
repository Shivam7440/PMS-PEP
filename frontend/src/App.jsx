import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './store/slices/authSlice';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GlobalDashboard from './pages/dashboard/GlobalDashboard';
import Projects from './pages/projects/Projects';
import ProjectDashboard from './pages/projects/ProjectDashboard';
import TaskBoard from './pages/tasks/TaskBoard';
import TeamManagement from './pages/team/TeamManagement';
import CalendarPage from './pages/calendar/Calendar';
import Notifications from './pages/notifications/Notifications';
import Settings from './pages/settings/Settings';
import AdminPanel from './pages/admin/AdminPanel';
import NotFound from './pages/utility/NotFound';
import Unauthorized from './pages/utility/Unauthorized';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const token = localStorage.getItem('accessToken');

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Routes (Protected) */}
        <Route path="/dashboard" element={<ProtectedRoute><GlobalDashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute><ProjectDashboard /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
        <Route path="/teams" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />

        {/* Utility Routes */}
        <Route path="/403" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

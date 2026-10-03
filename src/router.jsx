import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AppLayout from './routes/AppLayout';
import PrivateRoute from './components/PrivateRoute';
import DashboardPanel from './components/DashboardPanel';
import StatsPanel from './components/StatsPanel';
import TrackerPanel from './components/TrackerPanel';

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  {
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPanel /> },
      { path: "/stats", element: <StatsPanel /> },
      { path: "/tracker", element: <TrackerPanel /> },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
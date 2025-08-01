import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>; // show spinner instead of redirecting
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute;

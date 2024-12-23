import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

const PrivateRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
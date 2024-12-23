import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

const AnonymousRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default AnonymousRoute;
import React, { useEffect } from 'react';
import { useAuth } from '@/Contexts';
import { useNavigate } from 'react-router-dom';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    },[isAuthenticated, navigate]);
    

    return (
        <>
            {isAuthenticated ? children : null}
        </>
  )

};

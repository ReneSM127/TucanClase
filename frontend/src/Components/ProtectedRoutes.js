// src/components/ProtectedRoute.js
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Espera un momento para asegurar que el usuario se haya cargado
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>; // o un spinner
    }

    if (!user) {
        // Si no hay usuario, redirige al login
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.rol)) {
        //Si el usuario no tiene el rol requerido, redirige a una página de no autorizado
        return <Navigate to="/Tutorial" replace />;
    }

    return children;
};
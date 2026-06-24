import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const PublicRoutes = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase());

    if (token) {
        if (userRole === 'admin') return <Navigate to="/home" replace />;
        if (userRole === 'staff') return <Navigate to="/dashboard_staff" replace />;
        // fallbak ketika refresh terlalu cepat
        return <Navigate to="/dashboard" replace />;
    }
// jika token tidak ada izinkan akses login
    return children;
};


export default PublicRoutes;
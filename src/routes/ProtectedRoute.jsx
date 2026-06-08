import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useContext(AuthContext);

  // Jika user belum login sama sekali, tendang ke halaman login awal
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Jika sudah login tapi role-nya tidak diizinkan masuk ke halaman ini
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Jika aman, izinkan masuk ke halaman tujuan
  return <Outlet />;
}
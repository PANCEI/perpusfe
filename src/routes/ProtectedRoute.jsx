import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const isLoggedIn = localStorage.getItem('is_logged_in') === 'true';
  const userRole = localStorage.getItem('user_role');

  if (!isLoggedIn) {
    // Jika belum login, tendang balik ke halaman login awal
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Jika sudah login tapi rolenya tidak cocok, lempar ke halaman unauthorized
    return <Navigate to="/unauthorized" replace />;
  }

  // Jika semua kondisi aman, izinkan masuk ke halaman komponen anak (Outlet)
  return <Outlet />;
}
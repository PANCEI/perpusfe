// import { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function ProtectedRoute({ allowedRoles }) {
//   // useContext untuk ambil data user global dari AuthContext
//   const { user } = useContext(AuthContext);

//   // Jika user belum login sama sekali, tendang ke halaman login awal
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }

//   // Jika sudah login tapi role-nya tidak diizinkan masuk ke halaman ini
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // Jika aman, izinkan masuk ke halaman tujuan
//   return <Outlet />;
// }
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// 1. Ganti useContext dengan useSelector dari react-redux
import { useSelector } from 'react-redux'; 

export default function ProtectedRoute() {
  // 2. Ambil data user atau token langsung dari slice state 'auth' Redux
  const authState = useSelector((state) => state.auth);
  const user = authState?.user;
  const token = authState?.token; // Opsional: bisa juga cek ketersediaan token JWT

  // Jika user belum login sama sekali (tidak ada user/token), tendang ke halaman login awal
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  // 💡 Catatan: Logika allowedRoles dihapus karena validasi role sudah ditangani 
  // secara dinamis oleh looping array `menus` di App.jsx Anda.

  // Jika aman, izinkan masuk ke halaman tujuan (mengaktifkan rute anak)
  return <Outlet />;
}
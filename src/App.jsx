import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import semua halaman
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
// import DashboardSiswa from './pages/DashboardSiswa';
// import Unauthorized from './pages/Unauthorized';

// Import komponen proteksi (satpam)
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman yang bisa dibuka tanpa login */}
        <Route path="/" element={<Login />} />
       {/* Jalur Khusus ADMIN (Hanya boleh diakses role 'admin') */}
        {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<DashboardAdmin />} />
        </Route> */}

        {/* Jika URL asal-asalan, tampilkan 404 */}
        <Route path="*" element={<main style={{ padding: '40px' }}><h1>404: Halaman Tidak Ditemukan</h1></main>} />
      </Routes>
    </Router>
  );
}

export default App;
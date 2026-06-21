import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import Halaman Utama
import Login from './pages/Login';
import DashboardAdmin from './pages/Dashboard/DashboardAdmin';
import DashboardStaff from './pages/Dashboard/DashboardStaff';

// Import Komponen Proteksi
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  // 1. Ambil data menu dan token dari state Redux 'auth'
  const authState = useSelector((state) => state.auth);
  const menus = authState?.user?.menus || authState?.menus || [];
  const token = authState?.token;

  // 2. Daftarkan seluruh komponen halaman yang Anda miliki di sini.
  // Key di bawah ini harus sama dengan string 'path' atau 'code' yang dikirim dari database backend Anda.
  const pageComponents = {
    dashboard_admin: <DashboardAdmin />,
    dashboard_staff: <DashboardStaff />,
    // Jika nanti ada halaman baru, tinggal tambah di bawah sini:
    // kelola_buku: <KelolaBuku />,
    // laporan: <Laporan />,
  };

  return (
    <Router>
      <Routes>
        {/* 🔓 Rute Publik */}
        <Route path="/" element={<Login />} />

        {/* 🔒 Rute Dinamis Terproteksi */}
        <Route element={<ProtectedRoute />}>
          {/* Halaman default setelah login (Home/Dashboard dasar) */}
          <Route 
            path="/dashboard" 
            element={
              token ? (
                // Redirect otomatis ke halaman pertama yang diizinkan oleh backend jika ada
                <Navigate to={`/${menus[0]?.url?.toLowerCase() || ''}`} replace />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />

          {/* 🚀 PROSES LOOPING ROUTE DINAMIS */}
          {menus?.map((item) => {
            const pathName = item.path?.toLowerCase(); // misal: 'dashboard_admin'
            const urlPath = item.url?.toLowerCase();   // misal: 'admin'

            return (
              <Route
                key={item.id || item.url}
                path={`/${urlPath}`}
                element={pageComponents[pathName] || <Navigate to="/404" replace />}
              />
            );
          })}
        </Route>

        {/* 🚫 Halaman 404 */}
        <Route path="*" element={
          <main style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ color: '#64748b' }}>404: Halaman Tidak Ditemukan</h1>
          </main>
        } />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import Halaman Utama
import Login from './pages/Login';
import DashboardAdmin from './pages/Dashboard/DashboardAdmin';
import DashboardStaff from './pages/Dashboard/DashboardStaff';

// Import Komponen Proteksi
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  // 1. Ambil data dari masing-masing slice Redux
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase()); // 🚀 Ambil data role user
  const menus = useSelector((state) => state.menu.listMenu) || []; // 🚀 Ambil data dari menuSlice terpisah

  // 2. Daftarkan seluruh komponen halaman Anda di sini.
  const pageComponents = {
    dashboard_admin: <DashboardAdmin />,
    dashboard_staff: <DashboardStaff />,
    // Tambahkan komponen lain di sini sesuai kolom 'path' di Navicat
  };

  /**
   * 🚀 FUNGSI PENENTU REDIRECT BERDASARKAN ROLE
   */
  const getRedirectPath = () => {
    if (userRole === 'admin') {
      return '/home'; // ⚠️ SESUAIKAN: Isikan string URL halaman admin Anda (misal di Navicat url-nya 'Home')
    }
    if (userRole === 'staff') {
      return '/staff-page'; // Sesuaikan dengan isi kolom url untuk staff
    }
    
    // Fallback jika tidak ada role yang cocok, ambil url pertama dari list menu
    return `/${menus[0]?.url?.toLowerCase() || ''}`;
  };

  return (
    <Router>
      <Routes>
        {/* 🔓 Rute Publik */}
        <Route path="/" element={<Login />} />

        {/* 🔒 Rute Dinamis Terproteksi */}
        <Route element={<ProtectedRoute />}>
          
          {/* 🚀 REDIRECT OMATIS BERDASARKAN ROLE SETELAH LOGIN */}
          <Route 
            path="/dashboard" 
            element={
              token ? (
                <Navigate to={getRedirectPath()} replace />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />

          {/* 🚀 PROSES LOOPING ROUTE DINAMIS UNTUK SUB-MENU */}
          {menus?.map((menu) => {
            // Jika menu berbentuk Folder, loop isi sub_menu nya
            if (menu.jenis === 'Folder' && menu.sub_menu) {
              return menu.sub_menu.map((sub) => {
                const pathName = sub.path?.toLowerCase(); // misal: 'dashboard_admin'
                const urlPath = sub.url?.toLowerCase();   // misal: 'home'
                
                return (
                  <Route
                    key={sub.id}
                    path={`/${urlPath}`}
                    element={pageComponents[pathName] || <Navigate to="/404" replace />}
                  />
                );
              });
            }

            // Jika menu berbentuk File (Single Menu)
            const pathName = menu.path?.toLowerCase();
            const urlPath = menu.url?.toLowerCase();

            return (
              <Route
                key={menu.id}
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
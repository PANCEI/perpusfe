  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { useSelector } from 'react-redux';

  // Import Halaman Utama
  import Login from './pages/Login';
  import DashboardAdmin from './pages/Dashboard/DashboardAdmin';
  import DashboardStaff from './pages/Dashboard/DashboardStaff';

  // Import Komponen Proteksi
  import ProtectedRoute from './routes/ProtectedRoute';

  function App() {
    // 1. Ambil data token dan menu dari Redux
    const token = useSelector((state) => state.auth.token);
    const menus = useSelector((state) => state.menu.listMenu) || [];

    // 2. Daftar komponen halaman
    // KUNCI UTAMA: Pastikan KEY di bawah ini cocok dengan data 'path' yang dikirim Laravel (di-lowercase)
    const pageComponents = {
      dashboard_admin: <DashboardAdmin />, // Jika kolom path bernilai 'Dashboard_Admin' atau 'dashboard_admin'
      dashboardadmin: <DashboardAdmin />,  // Cadangan jika di database ditulis menyatu tanpa underscore
      home: <DashboardAdmin />,            // Cadangan jika di database kolom path-nya berisi 'Home'
      dashboard_staff: <DashboardStaff />,
    };

    return (
      <Router>
        <Routes>
          {/* 🔓 Rute Publik */}
          <Route path="/" element={<Login />} />

          {/* 🔒 Rute Dinamis Terproteksi */}
          <Route element={<ProtectedRoute />}>
            
            {/* 🚀 MANUALLY REDIRECT: Langsung tembak ke url tujuan yang diinginkan */}
            <Route 
              path="/dashboard" 
              element={
                token ? (
                  <Navigate to="/dashboard_admin" replace /> 
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          <Route path="/dashboard_admin" element={<DashboardAdmin />} />
            {/* 🚀 PROSES LOOPING ROUTE DINAMIS UNTUK SUB-MENU */}
            {menus?.map((menu) => {
              // Jika menu berbentuk Folder, loop isi sub_menu nya
              if (menu.jenis === 'Folder' && menu.sub_menu) {
                return menu.sub_menu.map((sub) => {
                  const pathName = sub.path?.toLowerCase(); // mencari key di objek pageComponents
                  const urlPath = sub.url?.toLowerCase();   // rute url di browser (misal: dashboard_admin)
                  
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
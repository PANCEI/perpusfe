import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import DashboardAdmin from './pages/Dashboard/DashboardAdmin';
import DashboardStaff from './pages/Dashboard/DashboardStaff';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase());
  const menus = useSelector((state) => state.menu.listMenu) || [];

  const pageComponents = {
    home: <DashboardAdmin />,
    dashboard_staff: <DashboardStaff />,
    // Halaman CRUD lain dipetakan di sini
  };

  const getRedirectPath = () => {
    if (userRole === 'admin') return '/home';
    if (userRole === 'staff') return '/dashboard_staff';
    return '/';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          {/* 🔄 Saat login sukses, rute /dashboard langsung melempar ke /home atau /dashboard_staff */}
          <Route 
            path="/dashboard" 
            element={token ? <Navigate to={getRedirectPath()} replace /> : <Navigate to="/" replace />} 
          />

          {/* 🔒 RUTE MASTER DASHBOARD DIREGISTER STATIS (Agar saat di-redirect dari /dashboard tidak 404) */}
          <Route path="/home" element={<DashboardAdmin />} />
          <Route path="/dashboard_staff" element={<DashboardStaff />} />

          {/* 🚀 PROSES LOOPING ROUTE DINAMIS UNTUK SUB-MENU SELEBIHNYA */}
          {menus?.map((menu) => {
            if (menu.jenis === 'Folder' && menu.sub_menu) {
              return menu.sub_menu.map((sub) => {
                const pathName = sub.path?.toLowerCase();
                const urlPath = sub.url?.toLowerCase();
                
                return (
                  <Route
                    key={sub.id}
                    path={`/${urlPath}`}
                    element={pageComponents[pathName] || <Navigate to="/404" replace />}
                  />
                );
              });
            }

            // Untuk menu bertipe File selain 'home' yang sudah di-register statis di atas
            const pathName = menu.path?.toLowerCase();
            const urlPath = menu.url?.toLowerCase();
            if (urlPath === 'home') return null; // Skip karena sudah didaftarkan manual di atas

            return (
              <Route
                key={menu.id}
                path={`/${urlPath}`}
                element={pageComponents[pathName] || <Navigate to="/404" replace />}
              />
            );
          })}
        </Route>

        <Route path="*" element={<main style={{ padding: '40px', textAlign: 'center' }}><h1>404: Not Found</h1></main>} />
      </Routes>
    </Router>
  );
}

export default App;
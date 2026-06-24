import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoutes from './routes/PublicRoutes';

// 1. CODE SPLITTING (Lazy Loading)
// Komponen hanya akan di-download oleh browser JIKA user membuka halaman tersebut.
const Login = React.lazy(() => import('./pages/Login'));
const DashboardAdmin = React.lazy(() => import('./pages/Dashboard/DashboardAdmin'));
const DashboardStaff = React.lazy(() => import('./pages/Dashboard/DashboardStaff'));
// const VehicleMaster = React.lazy(() => import('./pages/Logistics/VehicleMaster')); // Contoh halaman baru
const Error403 = React.lazy(() => import('./pages/errors/Error403'));


// Loading Placeholder khusus Enterprise
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="spinner">Memuat Halaman...</div>
  </div>
);

// 2. CENTRAL REGISTRY (Hanya memetakan fungsi import, bukan instance komponen)
const COMPONENT_REGISTRY = {
  home: <DashboardAdmin />,
  dashboard_staff: <DashboardStaff />,

};

/**
 * 🛡️ 3. ENTERPRISE SECURITY MIDDLEWARE (Outer Guard)
 */
/**
 * 🛡️ ENTERPRISE SECURITY MIDDLEWARE (Outer Guard)
 */
const EnterpriseRouteGuard = ({ children }) => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase()); // 🚀 Ambil data role
  const menus = useSelector((state) => state.menu.listMenu) || [];
  const currentUrl = location.pathname.substring(1).toLowerCase();

  // 🔒 BYPASS HANYA JIKA URL COCOK DENGAN ROLE USER (Saat data menu belum di-load)
  if (menus.length === 0 && token) {
    if (currentUrl === 'home' && userRole === 'admin') return children;
    if (currentUrl === 'dashboard_staff' && userRole === 'staff') return children;
    
    // Jika ada role baru nanti, cukup tambahkan di bawah sini:
    // if (currentUrl === 'dashboard_manager' && userRole === 'manager') return children;

    // Jika mencoba akses rute role lain saat menu kosong, langsung blokir ke 403
    if (currentUrl === 'home' || currentUrl === 'dashboard_staff') {
      return <Navigate to="/403" replace />;
    }

    return <PageLoader />;
  }

  //  STRICT MATCHING ACCESS CONTROL (Setelah API Menu berhasil dimuat)
  const hasAccess = menus.some(menu => {
    if (menu.jenis === 'Folder' && menu.sub_menu) {
      return menu.sub_menu.some(sub => sub.url?.toLowerCase() === currentUrl);
    }
    return menu.url?.toLowerCase() === currentUrl;
  });

  return hasAccess ? children : <Navigate to="/403" replace />;
};

function App() {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase());
  const menus = useSelector((state) => state.menu.listMenu) || [];

  const getRedirectPath = () => {
    if (userRole === 'admin') return '/home';
    if (userRole === 'staff') return '/dashboard_staff';
    return '/';
  };

  return (
    <Router>
      {/*  Suspense menjamin UX tetap mulus saat browser mengunduh potongan file halaman */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={
            <PublicRoutes>
                <Login />
              </PublicRoutes>
          } />

          {/* Rute Sesi Terproteksi */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={token ? <Navigate to={getRedirectPath()} replace /> : <Navigate to="/" replace />}
            />

            {/*  SECURITY FIX: Daftarkan Gerbang Utama secara Statis agar TIDAK MEMICU 404
        Aksesnya tetap aman karena dibungkus ketat oleh EnterpriseRouteGuard */}
            <Route
              path="/home"
              element={<EnterpriseRouteGuard>{COMPONENT_REGISTRY['home']}</EnterpriseRouteGuard>}
            />
            <Route
              path="/dashboard_staff"
              element={<EnterpriseRouteGuard>{COMPONENT_REGISTRY['dashboard_staff']}</EnterpriseRouteGuard>}
            />

            {/* 🚀 AUTOMATED DYNAMIC ROUTING ENGINE (Untuk Sub-menu CRUD lainnya) */}
            {menus?.map((menu) => {
              if (menu.jenis === 'Folder' && menu.sub_menu) {
                return menu.sub_menu.map((sub) => {
                  const pName = sub.path?.toLowerCase();
                  const uPath = sub.url?.toLowerCase();

                  // Skip jika ada sub_menu yang url-nya tidak sengaja dinamai 'home' atau 'dashboard_staff'
                  if (uPath === 'home' || uPath === 'dashboard_staff') return null;

                  return (
                    <Route
                      key={sub.id}
                      path={`/${uPath}`}
                      element={<EnterpriseRouteGuard>{COMPONENT_REGISTRY[pName] || <Navigate to="/404" replace />}</EnterpriseRouteGuard>}
                    />
                  );
                });
              }

              const pName = menu.path?.toLowerCase();
              const uPath = menu.url?.toLowerCase();

              // Skip karena sudah kita deklarasikan secara manual di atas
              if (uPath === 'home' || uPath === 'dashboard_staff') return null;

              return (
                <Route
                  key={menu.id}
                  path={`/${uPath}`}
                  element={<EnterpriseRouteGuard>{COMPONENT_REGISTRY[pName] || <Navigate to="/404" replace />}</EnterpriseRouteGuard>}
                />
              );
            })}
          </Route>

          {/* Halaman Status Error */}
          <Route path="/403" element={<Error403 />} />
          <Route path="*" element={<main style={{ padding: '40px', textAlign: 'center' }}><h1>404: Not Found</h1></main>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
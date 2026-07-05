import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoutes from './routes/PublicRoutes';
import DashboardLayout from './components/DashboardLayout';
// 1. CODE SPLITTING (Lazy Loading)
const Login = React.lazy(() => import('./pages/Login'));
const DashboardAdmin = React.lazy(() => import('./pages/Dashboard/DashboardAdmin'));
const DashboardStaff = React.lazy(() => import('./pages/Dashboard/DashboardStaff'));
const Error403 = React.lazy(() => import('./pages/errors/Error403'));
const MasterMenu = React.lazy(() => import('./pages/Master/Menu/Menu'));
const Error404 = React.lazy(() => import('./pages/errors/Error404'));

// Loading Placeholder khusus Enterprise
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="spinner">Memuat Halaman...</div>
  </div>
);
/**
 * 🏢 DYNAMIC PAGE WRAPPER (Sekarang Otomatis Sinkron dengan Data Login User)
 */
const DynamicPageWrapper = ({ componentName }) => {
  // 🚀 Ambil data user langsung dari Redux Store auth Anda
  const user = useSelector((state) => state.auth.user);

  const ComponentToRender = COMPONENT_REGISTRY[componentName] || <Navigate to="/404" replace />;
  
  // Jika rute lama (home / staff) yang menangani layout secara internal, langsung return
  // if (componentName === 'home' || componentName === 'dashboard_staff') {
  //   return ComponentToRender;
  // }

  // 🚀 JALUR DINAMIS: Ambil properti 'role' dan 'name' langsung dari JSON object login Anda
  const currentRole = user?.role || "User";
  const currentName = user?.name || "Guest";

  return (
    <DashboardLayout role={currentRole} userTitle={currentName}>
      {ComponentToRender}
    </DashboardLayout>
  );
};
// 2. CENTRAL REGISTRY
const COMPONENT_REGISTRY = {
  home: <DashboardAdmin />,
  dashboard_staff: <DashboardStaff />,
  menu: <MasterMenu />, // 🚀 Key 'menu' disamakan dengan URL dari database
};

/**
 * 🛡️ 3. ENTERPRISE SECURITY MIDDLEWARE (Outer Guard)
 */
const EnterpriseRouteGuard = ({ children }) => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase());
  
  // 🚀 FIX 1: Ubah .listMenu menjadi .menus agar sinkron dengan Reducer Anda
  const menus = useSelector((state) => state.menu.menus) || [];
  const currentUrl = location.pathname.substring(1).toLowerCase();

  // 🔒 BYPASS HANYA JIKA URL COCOK DENGAN ROLE USER (Saat data menu belum di-load)
  if (menus.length === 0 && token) {
    if (currentUrl === 'home' && userRole === 'admin') return children;
    if (currentUrl === 'dashboard_staff' && userRole === 'staff') return children;
    
    if (currentUrl === 'home' || currentUrl === 'dashboard_staff') {
      return <Navigate to="/403" replace />;
    }

    return <PageLoader />;
  }

  // STRICT MATCHING ACCESS CONTROL
  const hasAccess = menus.some(menu => {
    // Pengecekan bersarang jika tipenya Folder
    if (menu.jenis === 'Folder' && menu.sub_menu) {
      return menu.sub_menu.some(sub => sub.url?.toLowerCase() === currentUrl);
    }
    // Pengecekan jika tipe File (Ambil dari sub_menu pertama jika url utama kosong / '#')
    const actualUrl = menu.url && menu.url !== '#' ? menu.url : menu.sub_menu?.[0]?.url;
    return actualUrl?.toLowerCase() === currentUrl;
  });

  return hasAccess ? children : <Navigate to="/403" replace />;
};

function App() {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase());
  
  // 🚀 FIX 2: Ubah .listMenu menjadi .menus di sini juga
  const menus = useSelector((state) => state.menu.menus) || [];

  const getRedirectPath = () => {
    if (userRole === 'admin') return '/home';
    if (userRole === 'staff') return '/dashboard_staff';
    return '/';
  };

  return (
  <Router>
    {/* Suspense menjamin UX tetap mulus saat browser mengunduh potongan file halaman */}
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

          {/* 🚀 Gerbang Utama Statis (Sekarang menggunakan Wrapper agar konsisten jika dipanggil ulang) */}
          <Route
            path="/home"
            element={<EnterpriseRouteGuard><DynamicPageWrapper componentName="home" /></EnterpriseRouteGuard>}
          />
          <Route
            path="/dashboard_staff"
            element={<EnterpriseRouteGuard><DynamicPageWrapper componentName="dashboard_staff" /></EnterpriseRouteGuard>}
          />

          {/* 🚀 AUTOMATED DYNAMIC ROUTING ENGINE */}
          {menus?.map((menu) => {
            // KONDISI A: JIKA MENU ADALAH FOLDER (Banyak Sub-menu)
            if (menu.jenis === 'Folder' && menu.sub_menu) {
              return menu.sub_menu.map((sub) => {
                const uPath = sub.url?.toLowerCase();
                const pName = (sub.path || sub.url)?.toLowerCase();

                if (uPath === 'home' || uPath === 'dashboard_staff') return null;

                return (
                  <Route
                    key={`sub-${sub.id}`}
                    path={`/${uPath}`}
                    element={
                      <EnterpriseRouteGuard>
                        {/* 🚀 GANTI DI SINI: Menggunakan DynamicPageWrapper */}
                        <DynamicPageWrapper componentName={pName} />
                      </EnterpriseRouteGuard>
                    }
                  />
                );
              });
            }

            // KONDISI B: JIKA MENU ADALAH FILE SINGLE (Seperti Menu Dashboard / Master Menu Anda)
            const actualUrl = menu.url && menu.url !== '#' ? menu.url : menu.sub_menu?.[0]?.url || '';
            const actualPath = menu.path ? menu.path : actualUrl;

            const uPath = actualUrl.toLowerCase();
            const pName = actualPath.toLowerCase();

            if (uPath === 'home' || uPath === 'dashboard_staff' || !uPath) return null;

            return (
              <Route
                key={`menu-${menu.id}`}
                path={`/${uPath}`}
                element={
                  <EnterpriseRouteGuard>
                    {/* 🚀 GANTI DI SINI JUGA: Menggunakan DynamicPageWrapper */}
                    <DynamicPageWrapper componentName={pName} />
                  </EnterpriseRouteGuard>
                }
              />
            );
          })}
        </Route>

        {/* Halaman Status Error */}
        <Route path="/403" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  </Router>
);
}

export default App;
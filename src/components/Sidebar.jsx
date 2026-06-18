import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Book, Users, Repeat, FileText, Settings, Wallet, TrendingUp, LogOut, Menu, X } from 'lucide-react';

const Sidebar = ({ role, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State untuk lebar sidebar (default 256px / w-64)
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isResizing = useRef(false);

  // Batas minimum dan maksimum lebar sidebar
  const minWidth = 200;
  const maxWidth = 450;

  // Handler saat mouse mulai menekan tepi kanan sidebar
  const startResizing = (e) => {
    isResizing.current = true;
    document.body.style.cursor = 'ew-resize'; // Ubah cursor global
    document.body.style.userSelect = 'none';  // Mencegah teks terblok saat drag
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      // Hitung lebar baru berdasarkan posisi x mouse
      let newWidth = e.clientX;
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    // Tambahkan event ke window agar drag tetap mulus meskipun mouse keluar dari sidebar
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const menus = {
    admin: [
      { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20}/> },
      { name: 'Books', path: '/admin/books', icon: <Book size={20}/> },
      { name: 'Users', path: '/admin/users', icon: <Users size={20}/> },
      { name: 'Transactions', path: '/admin/transactions', icon: <Repeat size={20}/> },
      { name: 'Reports', path: '/admin/reports', icon: <FileText size={20}/> },
      { name: 'Settings', path: '/admin/settings', icon: <Settings size={20}/> },
    ],
    staff: [
      { name: 'Dashboard', path: '/staff', icon: <LayoutDashboard size={20}/> },
      { name: 'Circulation', path: '/staff/circulation', icon: <Repeat size={20}/> },
      { name: 'Catalog', path: '/staff/catalog', icon: <Book size={20}/> },
      { name: 'Members', path: '/staff/members', icon: <Users size={20}/> },
    ],
    pimpinan: [
      { name: 'Performance', path: '/pimpinan', icon: <TrendingUp size={20}/> },
      { name: 'Budget', path: '/pimpinan/budget', icon: <Wallet size={20}/> },
    ],
    peminjam: [
      { name: 'Dashboard', path: '/peminjam', icon: <LayoutDashboard size={20}/> },
      { name: 'My Books', path: '/peminjam/my-books', icon: <Book size={20}/> },
      { name: 'Profile', path: '/peminjam/profile', icon: <Users size={20}/> },
    ]
  };

  const currentMenu = menus[role?.toLowerCase()] || [];

  return (
    <>
      {/* Overlay untuk Mobile saat sidebar terbuka */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Kontainer Sidebar */}
    <div 
  style={{ width: window.innerWidth >= 1024 ? `${sidebarWidth}px` : '256px' }}
  className={`sidebar-container bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
>
        {/* Header Sidebar */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Book size={24} />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">PerpusWeb</span>
          </div>
          {/* Tombol Close Hanya Muncul di Mobile */}
          <button className="lg:hidden p-1 text-slate-500 hover:bg-slate-100 rounded-lg" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {currentMenu.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={idx} 
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false); // Otomatis tutup sidebar di mobile setelah klik menu
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {item.icon}
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-100">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium truncate">Logout</span>
          </button>
        </div>

        {/* 🛠️ Handle untuk Resize (Hanya aktif di layar Desktop/Lg ke atas) */}
        {/* <div 
          onMouseDown={startResizing}
          className="hidden lg:block absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-indigo-500/40 active:bg-indigo-600 transition-colors"
        /> */}
        {/* 🛠️ Handle untuk Resize: Sekarang aktif di semua resolusi laptop/layar */}
<div 
    onMouseDown={startResizing}
    className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-indigo-500/40 active:bg-indigo-600 transition-colors z-50"
  />
      </div>
    </>
  );
};

export default Sidebar;
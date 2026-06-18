import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bell, Menu } from 'lucide-react';

const DashboardLayout = ({ children, role, userTitle }) => {
  // Set default true agar langsung terbuka di layar laptop saat pertama kali dimuat
  const [isOpen, setIsOpen] = useState(true); 
  const [paddingLeft, setPaddingLeft] = useState(256);

  // Sesuaikan status awal jika diakses via perangkat mobile sejak awal
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, []);

  // Memantau perubahan ukuran sidebar secara real-time (baik karena di-resize maupun di-toggle)
  useEffect(() => {
    const updatePadding = () => {
      const sidebarEl = document.querySelector('.sidebar-container');
      if (sidebarEl) {
        // Ketika sidebar ditutup (di-translate keluar), offsetWidth atau bounding client akan bernilai 0
        const isHidden = sidebarEl.getBoundingClientRect().left < 0;
        setPaddingLeft(isHidden ? 0 : sidebarEl.offsetWidth);
      } else {
        setPaddingLeft(0);
      }
    };

    // Daftarkan ke ResizeObserver untuk memantau pergeseran piksel saat di-resize
    const observer = new ResizeObserver(updatePadding);
    const sidebarEl = document.querySelector('.sidebar-container');
    if (sidebarEl) observer.observe(sidebarEl);

    window.addEventListener('resize', updatePadding);
    
    // Gunakan interval kecil/requestAnimationFrame untuk memastikan transisi pergeseran terpantau mulus
    const transitionInterval = setInterval(updatePadding, 30);
    setTimeout(() => clearInterval(transitionInterval), 400);

    updatePadding();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePadding);
      clearInterval(transitionInterval);
    };
  }, [isOpen]); // Memicu kalkulasi ulang setiap kali tombol toggle ditekan

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      {/* Komponen Sidebar */}
      <Sidebar role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {/* Konten Utama: Menggunakan nilai paddingLeft murni dari hasil observasi */}
      <div 
        style={{ paddingLeft: `${paddingLeft}px` }}
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
      >
        <header className="flex justify-between items-center p-6 bg-white border-b border-slate-200 lg:px-8 lg:pt-8 lg:pb-4 lg:bg-transparent lg:border-none">
          <div className="flex items-center gap-4">
            {/* Tombol Burger Menu - Aktif di semua ukuran layar (Lg hidden dihapus) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 shadow-sm transition-transform active:scale-95"
              title={isOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800 capitalize leading-tight">Dashboard {role}</h1>
              <p className="text-slate-500 text-xs lg:text-sm hidden sm:block">Sistem Manajemen Perpustakaan Terpadu</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">{userTitle}</p>
                <p className="text-xs text-slate-500 capitalize">{role}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                {userTitle.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Area Bungkus Konten Dashboard Utama */}
        <div className="p-6 lg:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
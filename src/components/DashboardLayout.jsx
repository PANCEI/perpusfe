import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bell, Menu } from 'lucide-react';

const DashboardLayout = ({ children, role, userTitle }) => {
  const [isOpen, setIsOpen] = useState(false); // State sidebar mobile (open/close)
  const [paddingLeft, setPaddingLeft] = useState(256);

  // Sinkronisasi padding konten utama dengan lebar asli elemen sidebar di desktop
  useEffect(() => {
    const updatePadding = () => {
      if (window.innerWidth >= 1024) {
        // Cari elemen sidebar berdasarkan kelas atau struktur style-nya
        const sidebarEl = document.querySelector('.h-screen.border-r');
        if (sidebarEl) {
          setPaddingLeft(sidebarEl.offsetWidth);
        }
      } else {
        setPaddingLeft(0); // Di mobile, konten utama memenuhi layar penuh
      }
    };

    // Jalankan pengecekan berkala singkat atau pasang resize observer
    const observer = new ResizeObserver(updatePadding);
    const sidebarEl = document.querySelector('.h-screen.border-r');
    if (sidebarEl) observer.observe(sidebarEl);

    window.addEventListener('resize', updatePadding);
    updatePadding();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Komponen Sidebar bawaan */}
      <Sidebar role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {/* Konten Utama */}
      <div 
        style={{ paddingLeft: window.innerWidth >= 1024 ? `${paddingLeft}px` : '0px' }}
        className="flex-1 flex flex-col min-w-0 transition-all duration-150"
      >
        <header className="flex justify-between items-center p-6 bg-white border-b border-slate-200 lg:bg-transparent lg:border-none lg:px-8 lg:pt-8 lg:pb-4">
          <div className="flex items-center gap-4">
            {/* Tombol Hamburger Menu - Hanya muncul di Mobile */}
            <button 
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
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
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as LucideIcons from 'lucide-react'; 
import { Book, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import {  useDispatch } from 'react-redux';
import *  as actionType from '../constanta/actionTypes';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // 🚀 1. AMBIL DATA MENU DINAMIS DARI REDUX STORE
  const listMenuFromApi = useSelector((state) => state.menu.listMenu) || [];
  
  // State untuk menghandle folder mana saja yang sedang terbuka dropdown-nya
  const [openDropdowns, setOpenDropdowns] = useState({});

  // 📐 State untuk lebar sidebar (Bisa digeser)
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isResizing = useRef(false);
  const minWidth = 200;
  const maxWidth = 450;

  // Fungsi helper untuk merender icon Lucide berdasarkan string dari database
  const renderDynamicIcon = (iconName) => {
    if (!iconName) return <LucideIcons.FileText size={20} />;
    const FormattedIcon = LucideIcons[iconName];
    return FormattedIcon ? <FormattedIcon size={20} /> : <LucideIcons.FileText size={20} />;
  };

  // Toggle buka/tutup untuk menu jenis Folder
  const toggleDropdown = (menuId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // Handler Drag untuk Resize Lebar Sidebar
  const startResizing = (e) => {
    isResizing.current = true;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* 🌫️ Overlay Mobile (Hanya aktif jika di layar hp sidebar sedang terbuka) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔐 PERBAIKAN UTAMA: State `isOpen` mengontrol penuh translate-x di desktop dan mobile */}
      <div 
        style={{ width: `${sidebarWidth}px` }}
        className={`sidebar-container bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* 🏢 Header Sidebar */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Book size={24} />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">PerpusWeb</span>
          </div>
        </div>

        {/* 🚀 2. MENU NAVIGASI DINAMIS DATABASE */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {listMenuFromApi.map((menu) => {
            
            // KONDISI A: MENU BERTIPE FOLDER (MEMILIKI SUB-MENU)
            if (menu.jenis === 'Folder' && menu.sub_menu) {
              const isFolderOpen = !!openDropdowns[menu.id];
              return (
                <div key={menu.id} className="space-y-1">
                  <button
                    onClick={() => toggleDropdown(menu.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {renderDynamicIcon(menu.icon)}
                      <span className="text-sm font-medium truncate">{menu.name}</span>
                    </div>
                    {isFolderOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {/* Rendering Sub-menu */}
                  {isFolderOpen && (
                    <div className="pl-6 space-y-1 border-l-2 border-slate-100 ml-6">
                      {menu.sub_menu.map((sub) => {
                        const isActive = location.pathname === `/${sub.url?.toLowerCase()}`;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              navigate(`/${sub.url?.toLowerCase()}`);
                              if (window.innerWidth < 1024) setIsOpen(false); // Hanya tutup otomatis di mobile
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                              isActive 
                                ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                                : 'text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {renderDynamicIcon(sub.icon)}
                            <span className="truncate">{sub.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // KONDISI B: MENU BERTIPE FILE (MENU TUNGGAL / DASHBOARD UTAMA)
            const isActive = location.pathname === `/${menu.url?.toLowerCase()}`;
            return (
              <button 
                key={menu.id} 
                onClick={() => {
                  navigate(`/${menu.url?.toLowerCase()}`);
                  if (window.innerWidth < 1024) setIsOpen(false); // Hanya tutup otomatis di mobile
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {renderDynamicIcon(menu.icon)}
                <span className="truncate">{menu.name}</span>
              </button>
            );
          })}
        </nav>

        {/* 🚪 Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => {
             // Ganti 'logout()' dengan nama action reducer auth Anda yang bertugas menghapus token & user
           dispatch({ type: actionType.AUTH_LOG_OUT });
            
            // Atau jika menggunakan Redux Toolkit biasanya seperti ini:
            // dispatch(logoutAction());

            // 🚀 4. Bersihkan storage & reset navigasi
            localStorage.clear();
            sessionStorage.clear();
            
            // Gunakan replace: true agar user tidak bisa klik tombol "Back" browser untuk kembali masuk
            navigate('/', { replace: true });
            }} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm truncate">Logout</span>
          </button>
        </div>

        {/* 🛠️ Handle untuk Resize Drag */}
        <div 
          onMouseDown={startResizing}
          className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-indigo-500/40 active:bg-indigo-600 transition-colors z-50"
        />
      </div>
    </>
  );
};

export default Sidebar;
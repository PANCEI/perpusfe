import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Book, LogOut } from 'lucide-react';
import * as actionType from '../../constanta/actionTypes'; //  Pastikan path relative konstan ini benar

// Import sub-komponen yang sudah dipecah
import MenuItem from './MenuItem';
import MenuFolder from './MenuFolder';

// IMPORT FUNGSI BRIDGE DARI UTILS (Jika Anda menaruh fungsi loadSidebarMenu di file utilitas terpisah)
import { loadSidebarMenu } from './utils'; 

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Ambil data token untuk API Auth, dan data menu yang tersimpan di store Redux
  const token = useSelector((state) => state.auth.token);
  const listMenuFromApi = useSelector((state) => state.menu.listMenu) || [];

  // 📐 State untuk Pengubah Ukuran Lebar (Resize)
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isResizing = useRef(false);

  //  INTERPRETASI UTILS: Pemicu Hit API otomatis saat komponen pertama kali di-mount
  useEffect(() => {
    if (token && listMenuFromApi.length === 0) {
      loadSidebarMenu(dispatch, token);
    }
  }, [token, listMenuFromApi.length, dispatch]);

  // Fungsi navigasi yang aman untuk mobile & desktop
  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) setIsOpen(false); // Otomatis tutup sidebar hanya di device mobile/tablet
  };

  // Handler fungsi tombol log out
  const handleLogout = () => {
    dispatch({ type: actionType.AUTH_LOG_OUT });
    localStorage.clear();
    sessionStorage.clear();
    navigate('/', { replace: true });
  };

  // Menangani penyeretan mouse untuk mengubah lebar sidebar (Resize Logic)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      let newWidth = e.clientX;
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 450) newWidth = 450;
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
      {/* 🌫️ Overlay Mobile Backing Blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔒 Kontainer Utama Sidebar */}
      <div 
        style={{ width: `${sidebarWidth}px` }}
        className={`sidebar-container bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header Instansi App */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Book size={24} />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">PerpusWeb</span>
          </div>
        </div>

        {/* Loop Daftar Menu Dinamis */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {listMenuFromApi.map((menu) => (
            menu.jenis === 'Folder' && menu.sub_menu ? (
              <MenuFolder 
                key={menu.id} 
                folder={menu} 
                currentPath={location.pathname} 
                onSubItemClick={handleNavigation} 
              />
            ) : (
              <MenuItem 
                key={menu.id} 
                item={menu} 
                currentPath={location.pathname} 
                onClick={handleNavigation} 
              />
            )
          ))}
        </nav>

        {/* Footer Aksi Logout */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm truncate">Logout</span>
          </button>
        </div>

        {/* Batas Garis Drag Resizing */}
        <div 
          onMouseDown={() => {
            isResizing.current = true;
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
          }}
          className="absolute top-0 right-0 w-1.5 h-full cursor-ew-resize hover:bg-indigo-500/40 active:bg-indigo-600 transition-colors z-50"
        />
      </div>
    </>
  );
};

export default Sidebar;
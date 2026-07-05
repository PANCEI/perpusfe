import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FileSearch, ArrowLeft, Home } from 'lucide-react';

const Error404 = () => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase());

  // Tentukan arah pulang terbaik berdasarkan role user saat ini
  const handleGoHome = () => {
    if (userRole === 'admin') {
      navigate('/home', { replace: true });
    } else if (userRole === 'staff') {
      navigate('/dashboard_staff', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full space-y-6">
        
        {/* 🎨 Area Ilusasi Visual */}
        <div className="relative flex justify-center">
          {/* Efek Lingkaran Glow di Belakang */}
          <div className="absolute inset-0 bg-indigo-500/5 rounded-full filter blur-xl w-32 h-32 mx-auto left-0 right-0 top-4 animate-pulse" />
          
          <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-indigo-600">
            <FileSearch size={56} strokeWidth={1.5} className="animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* 💬 Judul & Pesan Konten */}
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold text-slate-900 tracking-tighter">
            4<span className="text-indigo-600">0</span>4
          </h1>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Halaman Tidak Ditemukan
          </h2>
       
        </div>

        {/* 🛠️ Navigasi Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 font-semibold rounded-xl text-sm shadow-sm transition-all active:scale-95"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-sm shadow-indigo-600/10 transition-all active:scale-95"
          >
            <Home size={16} />
            Menu Utama
          </button>
        </div>

      </div>

      {/* 🏷️ Footer kecil penanda sistem */}
      <span className="absolute bottom-6 text-xs font-medium text-slate-400 tracking-wider uppercase">
        Enterprise Routing Core Engine
      </span>
    </div>
  );
};

export default Error404;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Error403 = () => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.user?.role?.toLowerCase());

  // Handle tombol kembali ke dashboard yang sesuai dengan role
  const handleBackToDashboard = () => {
    if (userRole) {
      navigate('/dashboard'); // Ini akan memicu fungsi getRedirectPath() di App.jsx Anda
    } else {
      navigate('/'); // Jika sesi habis, tendang ke halaman login
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 py-12 select-none">
      <div className="text-center max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
        
        {/* 🔒 Ilustrasi Ikon Gembok Terkunci */}
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-12 h-12"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              pathLength="1"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" 
            />
          </svg>
        </div>

        {/* 🔏 Teks Kode Error & Informasi */}
        <span className="text-sm font-semibold text-red-600 uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full mb-3">
          Error Code: 403
        </span>
        
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">
          Akses Ditolak
        </h1>
        
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Maaf, Anda tidak memiliki izin atau otoritas yang cukup untuk mengakses halaman ini. Silakan hubungi Administrator jika Anda merasa ini adalah kesalahan.
        </p>

        {/* 🔘 Tombol Navigasi Kembali */}
        <div className="w-full flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleBackToDashboard}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Kembali ke Dashboard
          </button>
          
          <button
            onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
            className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl border border-slate-200 transition-all duration-200 focus:outline-none"
          >
            Kembalikan Saya
          </button>
        </div>

      </div>

      {/* 🏢 Footer Perusahaan */}
      <footer className="mt-8 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Enterprise Fleet & Logistics System. All rights reserved.
      </footer>
    </div>
  );
};

export default Error403;
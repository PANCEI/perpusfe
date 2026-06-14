import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Integrasikan dengan fungsi login Redux/API Laravel Anda di sini
    console.log({ username, password });
  };

  return (
    // 1. Background utama dengan gradien radial/linear abstrak sesuai gambar
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-tr from-[#6366f1] via-[#a855f7] to-[#22d3ee]">
      
      {/* Dekorasi lingkaran/elemen abstrak di background */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      {/* Pola titik-titik dekoratif (Grid Pattern) */}
      <div className="absolute top-1/4 right-12 opacity-30 hidden md:block">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
          ))}
        </div>
      </div>

      {/* 2. Kartu Login Putih (Main Card) */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center p-1">
            {/* Ganti dengan tag <img src="logo.png" /> jika sudah ada file logonya */}
            <span className="text-xl font-bold text-slate-800 tracking-tighter border-b-2 border-slate-800">PK</span>
          </div>
        </div>

        {/* Teks Sambutan */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Selamat Datang Kembali!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Masuk ke akun Platform Kreatif Anda untuk memulai.
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Nama Pengguna atau Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Pengguna atau Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <User size={16} />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all text-slate-600 placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          {/* Input Kata Sandi */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all text-slate-600 placeholder:text-slate-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Lupa Kata Sandi */}
          <div className="text-right">
            <a href="#forgot" className="text-xs font-medium text-slate-500 hover:text-purple-600 transition-colors">
              Lupa Kata Sandi?
            </a>
          </div>

          {/* Tombol MASUK (Gradien Oranye-Pink dengan Efek Shadow Lembut) */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-[#ff7e40] to-[#ff4b72] text-white font-bold rounded-full text-sm shadow-lg shadow-orange-500/20 hover:opacity-95 transform active:scale-[0.98] transition-all tracking-wide"
            >
              MASUK
            </button>
          </div>
        </form>

        {/* Pembatas "Atau Masuk Dengan" */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative px-3 bg-white text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Atau Masuk Dengan
          </span>
        </div>

        {/* Tombol Media Sosial (Google & Facebook) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Tombol Google */}
          <button className="flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700">
            {/* SVG Logo Google */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.422 1.487 15.545 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.57-4.894 11.57-11.79 0-.795-.085-1.4-.195-2.405H12.24z"/>
            </svg>
            Google
          </button>

          {/* Tombol Facebook */}
          <button className="flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700">
            {/* SVG Logo Facebook */}
            <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        {/* Footer Daftar Baru */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            Belum punya akun?{' '}
            <a href="#register" className="font-bold text-cyan-600 hover:text-cyan-700 transition-colors">
              Daftar Sekarang
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
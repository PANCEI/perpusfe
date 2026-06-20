import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Impor hook Redux
import { useNavigate } from 'react-router-dom'; // Impor untuk redirect halaman
import { User, Lock, AlertCircle } from 'lucide-react';
import BackgroundDecoration from '../components/BackgroundDecoration';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(''); // Mengelola error lokal visual

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Membaca status loading global (jika ada) dari rootReducer -> auth
  const authState = useSelector((state) => state.auth);
  const isLoading = authState?.isLoading || false;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    // 1. Beritahu Redux bahwa proses autentikasi dimulai
    dispatch({ type: 'AUTH_LOGIN_START' });

    // 2. Simulasi hit API backend korporat Anda
    setTimeout(() => {
      // Skenario Simulasi: Jika password diisi "salah", kita pancing error
      if (password === 'salah') {
        const errorMessage = 'Kredensial salah. Silakan periksa kembali nama pengguna dan kata sandi Anda.';
        
        dispatch({ type: 'AUTH_LOGIN_FAIL', payload: errorMessage });
        setLocalError(errorMessage);
        return;
      }

      // Skenario Sukses: Berikan data profil riil beserta role-nya
      const mockApiResponse = {
        user: {
          name: "Aswar Hamid",
          email: username.includes('@') ? username : "aswar@company.com",
          role: "admin" // Akun ini otomatis akan membuka layout dashboard Super Admin
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0..."
      };

      // 3. Dispatch data sukses untuk disimpan ke sessionStorage via rootReducer
      dispatch({ 
        type: 'AUTH_LOGIN_SUCCESS', 
        payload: mockApiResponse 
      });

      // 4. Alihkan pengguna langsung ke halaman dashboard utama
      navigate('/dashboard');

    }, 1200); // Memberikan jeda 1.2 detik agar animasi loading tombol terlihat mapan
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-tr from-[#6366f1] via-[#a855f7] to-[#22d3ee]">
      
      {/* 1. Komponen Dekorasi Latar Belakang */}
      <BackgroundDecoration />

      {/* 2. Kartu Utama */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center p-1">
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

        {/* Alert Box jika login gagal */}
        {localError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2.5 text-xs animate-shake">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{localError}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Nama Pengguna */}
          <InputField
            label="Nama Pengguna atau Email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="contoh@email.com"
            icon={User}
            required
            disabled={isLoading}
          />

          {/* Input Kata Sandi */}
          <InputField
            label="Kata Sandi"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            icon={Lock}
            required
            disabled={isLoading}
          />

          {/* Lupa Kata Sandi */}
          <div className="text-right">
            <a href="#forgot" className="text-xs font-medium text-slate-500 hover:text-purple-600 transition-colors">
              Lupa Kata Sandi?
            </a>
          </div>

          {/* Tombol Masuk dengan Status Loading */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'MEMPROSES...' : 'MASUK'}
          </Button>
        </form>

        {/* Pembatas */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative px-3 bg-white text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Atau Masuk Dengan
          </span>
        </div>

        {/* Tombol Media Sosial */}
        <div className="grid grid-cols-2 gap-3">
          <SocialButton 
            disabled={isLoading}
            icon={
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.422 1.487 15.545 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.57-4.894 11.57-11.79 0-.795-.085-1.4-.195-2.405H12.24z"/>
              </svg>
            }
          >
            Google
          </SocialButton>

          <SocialButton 
            disabled={isLoading}
            icon={
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            }
          >
            Facebook
          </SocialButton>
        </div>

        {/* Footer */}
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
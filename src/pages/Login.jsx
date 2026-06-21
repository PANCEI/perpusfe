import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Impor hook Redux
import { useNavigate } from 'react-router-dom'; // Impor untuk redirect halaman
import { User, Lock, AlertCircle } from 'lucide-react';
import BackgroundDecoration from '../components/BackgroundDecoration';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import { loginAction } from '../actions/auth/authActions';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(''); // Mengelola error lokal visual

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Membaca status loading global (jika ada) dari rootReducer -> auth
  const authState = useSelector((state) => state.auth);
  console.log(authState);
  const isLoading = authState?.isLoading || false;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLocalError('');

  //   // 1. Beritahu Redux bahwa proses autentikasi dimulai
  //   dispatch({ type: 'AUTH_LOGIN_START' });

  //   // 2. Simulasi hit API backend korporat Anda
  //   setTimeout(() => {
  //     // Skenario Simulasi: Jika password diisi "salah", kita pancing error
  //     if (password === 'salah') {
  //       const errorMessage = 'Kredensial salah. Silakan periksa kembali nama pengguna dan kata sandi Anda.';
        
  //       dispatch({ type: 'AUTH_LOGIN_FAIL', payload: errorMessage });
  //       setLocalError(errorMessage);
  //       return;
  //     }

  //     // Skenario Sukses: Berikan data profil riil beserta role-nya
  //     const mockApiResponse = {
  //       user: {
  //         name: "Aswar Hamid",
  //         email: username.includes('@') ? username : "aswar@company.com",
  //         role: "admin" // Akun ini otomatis akan membuka layout dashboard Super Admin
  //       },
  //       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0..."
  //     };

  //     // 3. Dispatch data sukses untuk disimpan ke sessionStorage via rootReducer
  //     dispatch({ 
  //       type: 'AUTH_LOGIN_SUCCESS', 
  //       payload: mockApiResponse 
  //     });

  //     // 4. Alihkan pengguna langsung ke halaman dashboard utama
  //     navigate('/dashboard');

  //   }, 1200); // Memberikan jeda 1.2 detik agar animasi loading tombol terlihat mapan
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    try {
      // Eksekusi Thunk Action lewat dispatch Redux
      await dispatch(loginAction(username, password));
      
      // Jika sukses (tidak masuk ke block catch), langsung alihkan halaman
      navigate('/dashboard');
    } catch (error) {
      // Menangkap pesan error yang dilempar dari catch-nya authActions.js
      setLocalError(error.message);
    }
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

       

       

        

      </div>
    </div>
  );
}
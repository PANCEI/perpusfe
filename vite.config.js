import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 🚀 Setiap request yang dimulai dengan '/api' akan dialihkan
      '/api': {
        target: 'http://127.0.0.1:8000', // URL asli backend Laravel Anda
        changeOrigin: true,
        secure: false,
        // Jika di Laravel route Anda sudah diawali '/api' (ex: /api/login), 
        // maka bagian rewrite ini tidak perlu dikonfigurasi atau biarkan apa adanya.
      },
    },
  },
});
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import echo from '../utils/echo';
import toast from 'react-hot-toast';

export const useWebSockets = () => {
  // Ambil data user dari Redux Store Anda (sesuaikan dengan slice auth Anda)
  const user = useSelector((state) => state.auth.user); 

  useEffect(() => {
    // 🔒 PROTEKSI: Jika user belum login atau id tidak ada, JANGAN jalankan WebSocket
    if (!user?.id) return;

    console.log(`Membuka koneksi WebSocket untuk User ID: ${user.id}`);
    
    // 🚀 Hubungkan ke channel jika sudah login
    const channel = echo.channel(`notification-channel.${user.id}`);

    // Dengarkan event notifikasi
    channel.listen('.MenuNotification', (data) => {
      toast.success(data.message, {
        duration: 5000,
        position: 'top-right',
      });
    });

    // 🚪 CLEANUP: Otomatis memutus koneksi jika user logout atau keluar dari dashboard
    return () => {
      console.log(`Menutup koneksi WebSocket untuk User ID: ${user.id}`);
      echo.leaveChannel(`notification-channel.${user.id}`);
    };
  }, [user?.id]); // Hook akan berjalan ulang secara otomatis begitu nilai user.id berubah (dari null menjadi ada)
};
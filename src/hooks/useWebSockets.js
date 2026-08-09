import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // 1. Tambahkan useDispatch
import echo from '../utils/echo';
import toast from 'react-hot-toast';
import * as actionType from '../constanta/actionMenuList'; // 2. Import constanta Redux

export const useWebSockets = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); 

  useEffect(() => {
    if (!user?.id) return;

    console.log(`Membuka koneksi WebSocket untuk User ID: ${user.id}`);
    
    const channel = echo.channel(`notification-channel.${user.id}`);

    channel.listen('.MenuNotification', (data) => {
      const { message, type, action, menu } = data;

      // 🔔 1. Selalu tampilkan toast jika ada pesan
      if (message) {
        toast.success(message, {
          duration: 5000,
          position: 'top-right',
        });
      }

      // 🚀 2. Jika payload membawa sinyal update menu, jalankan dispatch ke Redux
      if (type === 'MENU_UPDATE') {
        switch (action) {
          case 'CREATE':
            dispatch({ type: actionType.MENU_ADD_REALTIME, payload: menu });
            break;
          case 'UPDATE':
            dispatch({ type: actionType.MENU_UPDATE_REALTIME, payload: menu });
            break;
          case 'DELETE':
            dispatch({ type: actionType.MENU_DELETE_REALTIME, payload: menu });
            break;
          default:
            break;
        }
      }
    });

    return () => {
      console.log(`Menutup koneksi WebSocket untuk User ID: ${user.id}`);
      echo.leaveChannel(`notification-channel.${user.id}`);
    };
  }, [user?.id, dispatch]); // Sertakan dispatch ke dependency array
};
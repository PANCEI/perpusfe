import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import echo from '../utils/echo';
import toast from 'react-hot-toast';
import * as actionType from '../constanta/actionMenuList'

export const useWebSockets = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.id) return;

    const channel = echo.channel('menu-channel');

    channel.listen('.MenuListUpdated', (data) => {
      const { action, menu, message } = data;

      toast.success(message || 'Ada pembaruan pada data menu!', {
        duration: 4000,
        position: 'top-right',
      });

      switch (action) {
        case 'CREATE':
          dispatch({ type: actionType.MENU_ADD_REALTIME, payload: menu });
          break;

        case 'UPDATE':
          dispatch({ type: actionType.MENU_UPDATE_REALTIME, payload: menu });
          break;

        case 'DELETE':
          dispatch({ type: actionType.MENU_DELETE_REALTIME, payload: menu }); // payload { id }
          break;

        default:
          break;
      }
    });

    return () => {
      echo.leaveChannel('menu-channel');
    };
  }, [user?.id, dispatch]);
};
import axiosInstance from '../../config/axios';
import * as actionType from '../../constanta/actionMenuList';

export const getMenuListAction = () => {
    return (dispatch, getState) => {
        const { token } = getState().auth; 

        dispatch({ type: actionType.MENU_LIST_START });

        return axiosInstance.get('/menu/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            // 🚀 PERBAIKAN: Ambil menuList dari response.data.data
            const { menuList } = response.data.data; 

            dispatch({
                type: actionType.MENU_LIST_SUCCESS,
                payload: menuList
            });
            return menuList;
        }).catch(error => {
            const message = error.response?.data?.message || 'Gagal memuat daftar menu';
            dispatch({
                type: actionType.MENU_LIST_FAIL,
                payload: message
            });
            throw new Error(message);
        });
    };
};
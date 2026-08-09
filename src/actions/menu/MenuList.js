import axiosInstance from '../../config/axios';
import * as actionType from '../../constanta/actionMenuList';

export const getMenuListAction = () => {
    // 1. Ambil `getState` sebagai argumen kedua dari Thunk
    return (dispatch, getState) => {
        // 2. Ambil token langsung dari Redux state menggunakan getState()
        const { token } = getState().auth; 
console.log('Isi seluruh Redux Store:', getState());
        dispatch({ type: actionType.MENU_LIST_START });

        // 3. Masukkan token ke dalam Authorization header jika axiosInstance belum memasangnya secara otomatis
        return axiosInstance.get('/menu/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const { menuList } = response.data;
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
import axios from 'axios';

// Menggunakan arrow function JavaScript murni
export const fetchUserMenus = (token) => {
    return dispatch => {
        dispatch({ type: 'GET_MENU_START' });

        return axios.get('http://127.0.0.1:8000/api/user/menus', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const menusData = response.data.menus || response.data;

            dispatch({
                type: 'SET_DYNAMIC_MENUS',
                payload: menusData
            });

            return menusData;
        })
        .catch(error => {
            const message = error.response?.data?.message || 'Gagal memuat menu';
            
            dispatch({
                type: 'GET_MENU_FAIL',
                payload: message
            });
        });
    };
};
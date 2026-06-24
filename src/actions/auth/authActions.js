// 🚀 1. GANTI import axios mentah dengan Instance buatan Anda sendiri
import axiosInstance from '../../config/axios'; 
import * as actionType from '../../constanta/actionTypes';

export const loginAction = (username, password) => {
    return dispatch => {
        dispatch({ type: actionType.AUTH_LOGIN_START });

        // 🚀 2. Gunakan axiosInstance dan CUKUP tulis sisa path kodenya saja ('/login')
        // Karena http://127.0.0.1:8000/api sudah otomatis digabung dari baseURL .env Anda
        return axiosInstance.post('/login', {
            username,
            password
        })
        .then(response => {
            const { user, token } = response.data;

            // Simpan profil dan token ke auth reducer
            dispatch({
                type: actionType.AUTH_LOGIN_SUCCESS,
                payload: { user, token }
            });
            
            console.log(response);
            return response.data;
        })
        .catch(error => {
            // Pengaman jika error.response tidak ada (misal server Laravel mati total)
            const message = error.response?.data?.message || 'Login gagal terhubung ke server';

            dispatch({
                type: actionType.AUTH_LOGIN_FAIL,
                payload: message
            });

            throw new Error(message);
        });
    };
};
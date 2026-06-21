import axios from 'axios';

// Ekspor fungsi login biasa tanpa kata kunci 'public'
export const loginAction = (username, password) => {
    return dispatch => {
        dispatch({ type: 'AUTH_LOGIN_START' });

        return axios.post('http://127.0.0.1:8000/api/login', {
            username,
            password
        })
        .then(response => {
            const { user, token } = response.data;

            // Simpan profil dan token ke auth reducer
            dispatch({
                type: 'AUTH_LOGIN_SUCCESS',
                payload: { user, token }
            });
                console.log(response);
            return response.data;
        })
        .catch(error => {
            const message = error.response?.data?.message || 'Login gagal';

            dispatch({
                type: 'AUTH_LOGIN_FAIL',
                payload: message
            });

            throw new Error(message);
        });
    };
};
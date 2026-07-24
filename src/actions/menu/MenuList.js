import axiosInstance from '../../utils/axiosInstance';
import * as actionType from '../../constanta/actionMenuList';

export const getMenuListAction = () => {
    return dispatch => {
        dispatch({ type: actionType.MENU_LIST_START });
        return axiosInstance.get('/menu/list').then((response)=>{
            const { menuList } = response.data;
            dispatch({
                type: actionType.MENU_LIST_SUCCESS,
                payload: menuList
            });
            return menuList;
        }).catch(error =>{
            const message = error.response?.data?.message || 'Gagal memuat daftar menu';
            dispatch({
                type: actionType.MENU_LIST_FAIL,
                payload: message
            });
            throw new Error(message);
        })
    }
}
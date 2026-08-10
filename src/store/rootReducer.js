import { combineReducers } from 'redux';
import { reducer as toastReducer } from 'react-redux-toastr';

import authReducer from './reducers/authReducers';
import menuReducer from './reducers/menu/menuReducer';
import menuListReducer from './reducers/menu/menuListReducer'; // 🚀 Impor Default (Tanpa {})

/**
 * rootReducer bertindak sebagai gerbang utama penyatuan state global aplikasi.
 */
const rootReducer = combineReducers({
    auth: authReducer,
    toastr: toastReducer,
    menu: menuReducer,
    menuList: menuListReducer, // 🚀 Tersambung dengan sempurna
});

export default rootReducer;
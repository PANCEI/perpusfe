import {combineReducers} from 'redux'; // untuk menggabungkan beberapa reducer menjadi satu
import {reducer as toastReducer} from 'react-redux-toastr'; // ini digunakan untuk menampilkan notifikasi ini adalah bawaan library dari react-redux-toastr

// import reducer authentikasi yang mengatur session login dan role
import authReducer from './reducers/authReducers';


/**
 * rootReducer bertindak sebagai gerbang utama penyatuan state global aplikasi.
 * Semua state individual (auth, toastr, dll) digabung di sini agar bisa 
 * diakses oleh seluruh komponen dashboard menggunakan useSelector.
 */
const rootReducer = combineReducers({
    auth: authReducer,     // Menyimpan status login, token, dan role ('admin', 'staff', dll)
    toastr: toastReducer  // Menyimpan data antrean popup notifikasi sistem
});

export default rootReducer;
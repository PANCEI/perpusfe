import { createStore , applyMiddleware, compose } from "redux";
// Store adalah tempat penyimpanan seluruh state aplikasi.
// Store adalah tempat seluruh state Redux disimpan dan dikelola.
// Middleware adalah "penjaga gerbang" yang berada di antara: dispatch -> midleware -> reducer ini juga agar dispatch bisa menggunakan function
// compose Digunakan untuk menggabungkan banyak enhancer atau middleware menjadi satu.
import { persistStore, persistReducer } from 'redux-persist'; //digunakan untuk membuat state Redux tetap tersimpan meskipun halaman di-refresh.
// persist reducer Fungsi ini digunakan untuk membungkus reducer agar state-nya disimpan ke storage.
// persistStore()
// Digunakan untuk membuat persistor yang bertugas:
// Menyimpan state ke storage
// Membaca state dari storage
// Menjalankan proses REHYDRATE
//import storage from 'redux-persist/lib/storage'; // Menyimpan data di localStorage 
// local storage itu datanya tidak akan hilang walaupun browser di tutup
//import sessionStorage from 'redux-persist/lib/storage/session'; // menyimpan data ke session storage
import sessionStorage from 'redux-persist/lib/storage/session'; // menyimpan data ke session storage
// session storage itu datanya akan hilang ketika browser di tutup
import { thunk } from "redux-thunk";
/**
 * redux-thunk adalah middleware yang memungkinkan kamu melakukan action asynchronous di Redux.
Tanpa redux-thunk, Redux hanya bisa menerima action berupa object.
Kapan perlu thunk?
Gunakan ketika:
Memanggil API
Login
Upload file
Fetch data tabel
Request SAP/API backend
Delay (setTimeout)
Operasi async lainnya
 */
import rootReducer from './rootReducer';

// const safeSessionStorage = {
//     getItem: (key) => {
//         return new Promise((resolve) => {
//             resolve(window.sessionStorage.getItem(key));
//         });
//     },
//     setItem: (key, value) => {
//         return new Promise((resolve) => {
//             window.sessionStorage.setItem(key, value);
//             resolve();
//         });
//     },
//     removeItem: (key) => {
//         return new Promise((resolve) => {
//             window.sessionStorage.removeItem(key);
//             resolve();
//         });
//     },
// };

// konfigurasi penyimpanan redux persist , ini agar menetukan key storage  dan whitelist
const persistConfig = {
    key: 'perpustakaan_enterprise_root',
    storage: sessionStorage.default || sessionStorage,
    whitelist: ['auth', 'menu'] //ini ada dua whitelist dan blacklist  
};
// bungkus rootreducer dengan konfigurasi persist
const persistedReducer= persistReducer(persistConfig, rootReducer);
// Setup Redux DevTools untuk kebutuhan debugging di browser
const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
// buat store utama aplikasi
// export const store = createStore(
//     persistReducer,
//     composeEnhancers(applyMiddleware(thunk))
// );
export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
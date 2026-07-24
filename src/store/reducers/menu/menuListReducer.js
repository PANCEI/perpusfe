import * as actionType from '../../../constanta/actionMenuList';

const intialState = {
    items: [],
    loading: false,
    error: null
}
const menusListReducer = (state = initialState, action) => {
    switch (action.type) {
        // Dipanggil saat pertama kali load dari Axios / REST API
        case actionType.MENU_LIST_START:
            return { ...state, loading: true, error: null };
        case actionType.MENU_LIST_SUCCESS:
            return { ...state, items: action.payload, loading: false, error: null };
        case actionType.MENU_LIST_FAIL:
            return {...state , loading: false, error: action.payload};
        case actionType.MENU_ADD_REALTIME:
            // DIPANGGUL SAAT SOKET MENGIRIM DATA REAL-TIME (Tanpa perlu HTTP GET ulang)
            /**
             * Sintaks return { ...state, items: [...state.items, action.payload] }; adalah pola standar Redux yang didasari oleh satu prinsip utama: Immutability (Prinsip Ketidakubahan Data).Sederhananya: Di Redux, kita TIDAK BOLEH mengubah (mutate) state lama secara langsung. Kita harus membuat salinan (copy) data baru beserta perubahannya.Mari kita bedah sintaks tersebut baris demi baris:1. ...state (Spread Operator untuk Object State)Sintaks ... (Spread Operator) menyalin seluruh properti yang ada di dalam state saat ini (misalnya isLoading, error, atau state lainnya).Kenapa perlu? Agar properti lain di dalam state tidak hilang saat kita hanya ingin memperbarui items.2. items: [...] (Memperbarui Key items)Kita memberitahu Redux: "Ambil salinan state lama, tetapi khusus untuk key items, ganti nilainya dengan array baru ini."3. [...state.items, action.payload] (Spread Operator untuk Array Items)Sintaks ini cara modern (ES6) untuk menyambung (append) data baru ke dalam array tanpa merusak array aslinya....state.items $\rightarrow$ Menyalin (membuka) semua elemen menu yang sudah ada sebelumnya., action.payload $\rightarrow$ Menambahkan menu baru (yang dikirim dari socket/action) ke baris paling akhir array tersebut.❌ Kenapa Tidak Menggunakan push() Biasa?Mungkin Anda berpikir, "Kenapa tidak pakai state.items.push(action.payload) saja yang lebih sederhana?"Coba bandingkan dua pendekatan ini:Cara SANGAT SALAH (Direct Mutation):JavaScript// ❌ SALAH BESAR DI REDUX
                state.items.push(action.payload); 
                return state;
                Masalahnya: Fungsi push() mengubah array state.items secara langsung di memori (reference memori array tidak berubah).Dampaknya: React TIDAK AKAN MERENDER ULANG UI Anda! React menggunakan shallow comparison (mengecek apakah referensi memori berubah). Karena referensi memorinya dianggap sama, React berpikir "Wah, tidak ada perubahan data" sehingga tabel menu di layar Anda tidak akan bertambah secara otomatis.Cara BENAR (Immutable Update):JavaScript// ✅ BENAR
                return { 
                ...state, 
                items: [...state.items, action.payload] 
                };
                Hasilnya: Menghasilkan object state baru dan array items baru dengan alamat memori yang baru.Dampaknya: React langsung mendeteksi adanya perubahan data, memicu render ulang (re-render), dan menu baru dari admin lain langsung muncul di layar secara instant!💡 Ilustrasi SederhanaBayangkan Redux State itu seperti Dokumen PDF.Jika ada perubahan, Anda tidak bisa menghapus/mencoret teks di PDF yang sudah terbit (mutating).Anda harus "Save As" / cetak ulang dokumen tersebut menjadi versi baru yang sudah menyertakan data tambahan tersebut (immutable).
             */
            return { ...state, items: [...state.items, action.payload] };
        case actionType.MENU_UPDATE_REALTIME:
            // DIPANGGIL SAAT SOKET MENGIRIM DATA REAL-TIME (Tanpa perlu HTTP GET ulang)
            return {... state , items:state.items.map((item) => item.id === action.payload.id ? action.payload : item)};
        case actionType.MENU_DELETE_REALTIME:
            // DIPANGGIL SAAT SOKET MENGIRIM DATA REAL-TIME (Tanpa perlu HTTP GET ulang)
            return {... state , items:state.items.filter((item) => item.id !== action.payload.id)};
        default:
            return state;
        
    }
}
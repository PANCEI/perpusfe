import *  as actionType from '../../constanta/actionTypes';
// definiskan state awal untuk autentikasi 
const initialState={
    user:null, //akan berisi data profile(nama user role dan lain lain)
    token:null, //menyimpan jwt token untuk akses api
    isAuthenticated:false,
    isLoading:false,
    error:null
}
// buat fungsi reducer untuk memanipulasi reducer secara aman
const authReducer= (state = initialState , auction)=>{
    switch (auction.type){
        case actionType.AUTH_LOGIN_START:
            return { ...state, isLoading:true, error:null };
        case actionType.AUTH_LOGIN_SUCCESS:
            return { ... state , isLoading:false, isAuthenticated:true, user:auction.payload.user, token:auction.payload.token, error:null};
        case actionType.AUTH_LOGIN_FAIL:
            return {...state , isLoading:false , isAuthenticated:false, error:auction.payload};
        case actionType.AUTH_LOG_OUT:
            return {...initialState}
        default:
            return state;
    }
}
export default authReducer;
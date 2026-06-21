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
        case "AUTH_LOGIN_START":
            return { ...state, isLoading:true, error:null };
        case "AUTH_LOGIN_SUCCESS":
            return { ... state , isLoading:false, isAuthenticated:true, user:auction.payload.user, token:auction.payload.token, error:null};
        case "AUTH_LOGIN_FAIL":
            return {...state , isLoading:false , isAuthenticated:false, error:auction.payload};
        case "AUTH_LOGOUT":
            return {...initialState}
        default:
            return state;
    }
}
export default authReducer;
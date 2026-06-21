const initialState = {
    menus :[],
    isLoading:false,
    error:null
}
export default function menuReducer(state= initialState , action ){
switch (action.type){
    case 'GET_MENU_START':
    case 'SET_MENU_LOADING':
        return {...state , isLoading:true , error:null};
    case 'SET_DYNAMIC_MENUS':
        return {...state , menus:action.payload, isLoading:false , error :null};
    case 'GET_MENU_FAIL':
        return {...state , isLoading:false , error:action.payload};
    case 'AUTH_LOGOUT':
        return initialState;
    default:
        return state;
    
}
}
import * as actionType from '../../../constanta/actionMenuList';

const initialState = {
    items: [],
    isLoading: false,
    error: null
};

const menuListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.MENU_LIST_START:
            return { ...state, isLoading: true, error: null };

        case actionType.MENU_LIST_SUCCESS:
            return { ...state, items: action.payload, isLoading: false, error: null };

        case actionType.MENU_LIST_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        // Real-time Socket Reducers
        case actionType.MENU_ADD_REALTIME:
            return { ...state, items: [...state.items, action.payload] };

        case actionType.MENU_UPDATE_REALTIME:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                )
            };

        case actionType.MENU_DELETE_REALTIME:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id)
            };

        default:
            return state;
    }
};

export default menuListReducer; // 🚀 Gunakan Export Default
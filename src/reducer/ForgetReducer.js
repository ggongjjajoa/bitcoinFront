import {
    forget,
    changePw,
    FORGET_REQUEST,
    FORGET_SUCCESS,
    FORGET_FAILURE,
    CHANGE_REQUEST,
    CHANGE_SUCCESS,
    CHANGE_FAILURE
} from '../action/ForgetActions';

const initialState = {
    isForgetRequest: false,
    isForgetSuccess: false,
    isChangeRequest: false,
    isChangeSuccess: false
};

const ForgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGET_REQUEST:
            return {
                ...state,
                isForgetRequest: true
            };
            break;
        case FORGET_SUCCESS:
            return {
                ...state,
                isForgetRequest: false,
                isForgetSuccess: true
            };
            break;
        case FORGET_FAILURE:
            return {
                ...state,
                isForgetRequest: false
            };
            break;
        case CHANGE_REQUEST:
            return {
                ...state,
                isChangeRequest: true
            };
            break;
        case CHANGE_SUCCESS:
            return {
                ...state,
                isChangeRequest: false,
                isChangeSuccess: true
            };
            break;
        case CHANGE_FAILURE:
            return {
                ...state,
                isForgetRequest: false
            };
            break;
        default:
            return state;
    }
};

export {ForgetReducer};

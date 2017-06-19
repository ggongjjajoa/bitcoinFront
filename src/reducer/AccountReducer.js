import {
    EMAIL_REQUEST,
    EMAIL_SUCCESS,
    EMAIL_FALLURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    WITHDRAW_REQUEST,
    WITHDRAW_SUCCESS,
    WITHDRAW_FAILURE
} from '../action/AccountActions';

const initialAccountState = {
    isEmailRequest: false,
    isEmailSuccess: false,
    isPasswordRequest: false,
    isPasswordSuccess: false,
    isWithdrawRequest: false,
    isWithdrawSuccess: false
};

const AccountReducer = (state = initialAccountState, action) => {
    switch (action.type) {
        case EMAIL_REQUEST:
            return {
                ...state,
                isEmailRequest: true
            };
            break;
        case EMAIL_SUCCESS:
            return {
                ...state,
                isEmailRequest: false,
                isEmailSuccess: true
            };
            break;
        case EMAIL_FALLURE:
            return {
                ...state,
                isEmailRequest: false
            };
            break;
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isPasswordRequest: true
            };
            break;
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isPasswordRequest: false,
                isPasswordSuccess: true
            };
            break;
        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                isPasswordRequest: false
            };
            break;
        case WITHDRAW_REQUEST:
            return {
                ...state,
                isWithdrawRequest: true
            };
            break;
        case WITHDRAW_SUCCESS:
            return {
                ...state,
                isWithdrawRequest: false,
                isWithdrawSuccess: true
            };
            break;
        case WITHDRAW_FAILURE:
            return {
                ...state,
                isPasswordRequest: false
            };
            break;
        default:
            return state;
            break;
    }
};

export {AccountReducer};

import {login, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../action/LoginActions';

const initialLoginState = {
    isLoggedin: false,
    isLoginLoading: false,
    username: null,
    loginFailure: false
};

const LoginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoginLoading: true
            };
            break;
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginLoading: false,
                isLoggedin: true,
                loginFailure: false
            };
            break;
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoginLoading: false,
                loginFailure: true
            };
            break;
        default:
            return state;
    }
};

export {LoginReducer};

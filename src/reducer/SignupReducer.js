import {signup, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE} from '../action/SignupActions';

const initialSignupState = {
    isSignupLoading : false,
    isSuccess : false
};

const SignupReducer = (state = initialSignupState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                isSignupLoading: true
            };
            break;
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSignupLoading: false,
                isSuccess: true
            };
            break;
        case SIGNUP_FAILURE:
            return {
                ...state,
                isSignupLoading: false
            };
            break;
        default:
            return state;
            break;
    }
};

export {SignupReducer};

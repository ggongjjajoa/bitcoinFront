import axios from 'axios';
import {browserHistory} from 'react-router';
import {login} from './LoginActions';
import {showAlert, showSMessage} from '../util/Message';
import {serverUrl} from '../Config';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signup = (id, password, confirm) => (dispatch) => signupFlow(dispatch, id, password, confirm);

const signupFlow = (dispatch, id, password, confirm) => {
    dispatch(signupRequest());
    if (password != confirm) {
        showAlert("Please Check Password");
        return dispatch(signupFailure());
    } else if (!(24 >= password.length && password.length >= 8) || !(15 >= id.length && id.length >= 4)) {
        showAlert("Please Check ID Length Or password Length");
        return dispatch(signupFailure());
    } else {
        return axios.post(serverUrl + "/users", {
            username: id,
            password: password,
            userIp: null,
            countryCode: null,
            partnerId: null
        }).then((resp) => {
            dispatch(login(id, password));
            showSMessage("You have successfully signed up","success");
            return dispatch(signupSuccess());
        }).catch((err) => {
            showAlert(err.response.data.message);
            return dispatch(signupFailure());
        });
    }
}

const signupRequest = () => {
    return {type: SIGNUP_REQUEST};
}

const signupSuccess = () => {
    return {type: SIGNUP_SUCCESS};
}

const signupFailure = () => {
    return {type: SIGNUP_FAILURE};
}

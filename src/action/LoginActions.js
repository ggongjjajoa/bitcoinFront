import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    setOAuthToken,
    getOAuthToken,
    getUsername,
    deleteOAuthToken,
    setAuthority,
    getAuthority,
    setPrincipal
} from '../oAuth';
import {showAlert, showSuccess, showSMessage} from '../util/Message';
import {serverUrl} from '../Config';

const oAuthConfig = {
    baseUrl: serverUrl,
    clientId: 'clientapp',
    clientSecret: '1fc57f93f0903cc75a74e1267b3e22a5e7943deb1eb8b5f1b0ee426a9824ff26',
    grantPath: '/oauth/token',
    grant_type: 'password',
    grant_type_refresh_token: 'refresh_token'
};


const USERNAME = "USERNAME";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (id, password, callback) => (dispatch) => loginFlow(dispatch, id, password, callback);

const loginRequest = () => {
    return {type: LOGIN_REQUEST};
}

const loginSuccess = () => {
    return {type: LOGIN_SUCCESS};
}

const loginFailure = () => {
    return {type: LOGIN_FAILURE};
}

const _getAuthEndpoint = (grantType) => {
    if(serverUrl=="https://nexybit.com/api"){
      return 'https://nexybit.com/oauth/token?client_id=' + oAuthConfig.clientId + '&client_secret=' + oAuthConfig.clientSecret + '&grant_type=' + grantType;
    }else{
      return 'http://211.57.201.165:8080/oauth/token?client_id=' + oAuthConfig.clientId + '&client_secret=' + oAuthConfig.clientSecret + '&grant_type=' + grantType;
    }
};

const loginFlow = (dispatch, username, password, callback) => {
    dispatch(loginRequest());
    return axios.post(_getAuthEndpoint(oAuthConfig.grant_type) + '&username=' + username + '&password=' + escape(password)).then((resp) => {
        deleteOAuthToken();
        axios.get(serverUrl + "/profile/userinfo?username=" + username).then((resp) => {
            setAuthority(resp.data);
            setPrincipal(resp.data);
        }).catch((err) => {
        });
        setOAuthToken(resp.data);
        sessionStorage.setItem(USERNAME, username);
        callback();
        return dispatch(loginSuccess());
    }).catch((err) => {
        const error = JSON.parse(JSON.stringify(err));
        return dispatch(loginFailure());
    });
}

import axios from 'axios';
import {serverUrl, requestCheck} from '../Config';
import {showAlert, showSuccess, showSMessage} from '../util/Message';

export const EMAIL_REQUEST = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const EMAIL_FALLURE = 'EMAIL_FALLURE';

const email_request = () => {
    return {type: EMAIL_REQUEST};
}

const email_success = () => {
    return {type: EMAIL_SUCCESS};
}

const email_fallure = () => {
    return {type: EMAIL_FALLURE};
}

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

const change_password_request = () => {
    return {type: CHANGE_PASSWORD_REQUEST};
}

const change_password_success = () => {
    return {type: CHANGE_PASSWORD_SUCCESS};
}

const change_password_failure = () => {
    return {type: CHANGE_PASSWORD_FAILURE};
}

export const WITHDRAW_REQUEST = 'WITHDRAW_REQUEST';
export const WITHDRAW_SUCCESS = 'WITHDRAW_SUCCESS';
export const WITHDRAW_FAILURE = 'WITHDRAW_FAILURE';

const withdraw_request = () => {
    return {type: WITHDRAW_REQUEST};
}

const withdraw_success = () => {
    return {type: WITHDRAW_SUCCESS};
}

const withdraw_failure = () => {
    return {type: WITHDRAW_FAILURE};
}

export const sendEmail = (email, username) => (dispatch) => sendingEmail(dispatch, email, username);

const sendingEmail = (dispatch, email, username) => {
    dispatch(email_request());
    if (email == "" || username == "") {
        return dispatch(email_fallure());
    } else {
        return axios.post(serverUrl + "/profile/email", {
            username: username,
            email: email
        }).then((resp) => {
            if (resp.data.type == true) {
                showSMessage(resp.data.content, "success");
                return dispatch(email_success());
            } else {
                showAlert(resp.data.content);
                return dispatch(email_fallure());
            }
        }).catch((err) => {
            if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
                setTimeout(sendEmail(email, username), 1000);
            } else {
                showAlert(err.response.data.message);
                return dispatch(email_fallure());
            }
        });
    }
}

export const changePassword = (oldPassword, newPassword, confirm, username) => (dispatch) => changingPassword(dispatch, oldPassword, newPassword, confirm, username);

const changingPassword = (dispatch, oldPassword, newPassword, confirm, username) => {
    dispatch(change_password_request());
    if (confirm != newPassword || username == "") {
        showAlert("Password and verification data do not match");
        return dispatch(change_password_failure());
    } else {
        return axios.post(serverUrl + "/profile/password", {
            username: username,
            password: oldPassword,
            newPassword: newPassword,
            newPasswordConfirm: confirm
        }).then((resp) => {
            showSMessage(resp.data.message, 'success');
            return dispatch(change_password_success());
        }).catch((err) => {
            if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
                setTimeout(changePassword(oldPassword, newPassword, confirm, username), 1000);
            } else {
                showAlert(err.response.data.message);
                return dispatch(change_password_failure());
            }
        });
    }
}

export const withdrawEmail = (username, btcAddress, amount, password) => (dispatch) => withdrawingEmail(dispatch, username, btcAddress, amount, password);

const withdrawingEmail = (dispatch, username, btcAddress, amount, password) => {
    dispatch(withdraw_request());

    return axios.post(serverUrl + "/account/withdrawal", {
        username: username,
        btcAddress: btcAddress,
        amount: amount,
        password: password
    }).then((resp) => {
        showSMessage(resp.data.message, 'success');
        return dispatch(withdraw_success());
    }).catch((err) => {
        if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
            setTimeout(withdrawEmail(username, btcAddress, amount, password), 1000);
        } else {
            showAlert(err.response.data.message);
            return dispatch(change_password_failure());
        }
    });
}

export const withdrawOtp = (username, btcAddress, amount, password, otpkey) => (dispatch) => withdrawingOtp(dispatch, username, btcAddress, amount, password, otpkey);

const withdrawingOtp = (dispatch, username, btcAddress, amount, password, otpkey) => {
    dispatch(withdraw_request());

    return axios.post(serverUrl + "/account/otpwithdrawal", {
        username: username,
        btcAddress: btcAddress,
        amount: amount,
        password: password,
        otpCode: otpkey
    }).then((resp) => {
        showSMessage(resp.data.content, 'success');
        return dispatch(withdraw_success());
    }).catch((err) => {
        if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
            setTimeout(withdrawingOtp(username, btcAddress, amount, password, otpkey), 1000);
        } else {
            showAlert(err.response.data.message);
            return dispatch(change_password_failure());
        }
    });

}

import axios from 'axios';
import {browserHistory} from 'react-router';

import {showSuccess, showAlert, showInfo} from '../util/Message';
import {serverUrl, requestCheck} from '../Config';

export const FORGET_REQUEST = 'FORGET_REQUEST';
export const FORGET_SUCCESS = 'FORGET_SUCCESS';
export const FORGET_FAILURE = 'FORGET_FAILURE';

export const forget = (username, email) => (dispatch) => forgetFlow(dispatch, username, email);

const forgetRequest = () => {
    return {type: FORGET_REQUEST};
}

const forgetSuccess = () => {
    return {type: FORGET_SUCCESS};
}

const forgetFailure = () => {
    return {type: FORGET_FAILURE};
}

const forgetFlow = (dispatch, username, email) => {
    dispatch(forgetRequest());
    return axios.post(serverUrl + "/profile/resetpassword", {
        "username": username,
        "email": email
    }).then((resp) => {
      if(resp.data.content=="Please verify your e-mail"){
        showSuccess(resp.data.content);
        dispatch(forgetFailure());
        browserHistory.push('/');
      }else{
        showAlert(resp.data.content);
        return dispatch(forgetFailure());
      }
    }).catch((err) => {
      if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
          setTimeout(forget(username, email), 1000);
      } else {
          showAlert("No matches found. Please check and try again")
          return dispatch(forgetFailure());
      }
    })
}

export const CHANGE_REQUEST = 'CHANGE_REQUEST';
export const CHANGE_SUCCESS = 'CHANGE_SUCCESS';
export const CHANGE_FAILURE = 'CHANGE_FAILURE';

export const changePw = (username, token, password, confirm) => (dispatch) => changePwFlow(dispatch, username, token, password, confirm);

const changeRequest = () => {
  return {type: CHANGE_REQUEST};
}

const changeSuccess = () => {
  return {type: CHANGE_SUCCESS};
}

const changeFailure = () => {
  return {type: CHANGE_FAILURE};
}

const changePwFlow = (dispatch, username, token, password, confirm) => {
  dispatch(changeRequest());
  if(password!=confirm){
    showAlert("Password and verification data do not match");
    return dispatch(changeFailure());
  }
  else{
    return axios.post(serverUrl+"/verification/resetpassword", {
      "username": username,
      "token": token,
      "password": password
    }).then((resp)=>{
      if(resp.data.type==true){
        showSuccess(resp.data.content);
        dispatch(changeSuccess());
        browserHistory.push('/');
      }else{
        showAlert(resp.data.content);
        return dispatch(changeFailure());
      }
    }).catch((err)=>{
      if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
          setTimeout(changePw(username, token, password, confirm), 1000);
      } else {
          showAlert(err)
          return dispatch(changeFailure());
      }
    })
  }
}

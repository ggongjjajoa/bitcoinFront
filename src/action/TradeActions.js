import axios from 'axios';

import {showSuccess, showAlert, showInfo, showSMessage} from '../util/Message';
import {serverUrl, requestCheck} from '../Config';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';

const order_request = () => {
  return {type: ORDER_REQUEST};
}

const order_success = (response) => {
  return {type: ORDER_SUCCESS, orderId: response};
}

const order_failure = (msg) => {
  return {type: ORDER_FAILURE, msg: msg};
}

export const order = (username, contract_type, price, amount, type, match_price, lever_rate, ordNum) => (dispatch) => orderFlow(dispatch, username, contract_type, price, amount, type, match_price, lever_rate, ordNum);

const orderFlow = (dispatch, username, contract_type, price, amount, type, match_price, lever_rate, ordNum) => {
  dispatch(order_request());
  if ((type==1 || type==2 ||type==3 ||type==4)&&match_price==false && (price <= 0 || price == null || amount <= 0 || amount == null)) {
    showAlert("please check your order data");
    return dispatch(order_failure(""));
  } else {
    return axios.post(serverUrl + "/account/orders", {
      username: username,
      symbol: "btc_usd",
      contract_type: contract_type,
      contract_name: sessionStorage.getItem(contract_type),
      api_key: "_",
      sign: "_",
      price: price,
      amount: amount,
      type: type,
      match_price: match_price
        ? 1
        : 0,
      lever_rate: lever_rate,
      account_type: "01",
      org_no: ordNum
    }).then((resp) => {
      const response = JSON.parse(resp.data.response);
      if(response.RESULT != "S_OK"){
          showSMessage(response.RESULT, "error");
      }
      return dispatch(order_success(response.ORDER_NO));
    }).catch((err) => {
        console.log(err);
      if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
        const error = JSON.parse(JSON.stringify(err));
        showSMessage("Order transfer failed. Please order again", "error");
        return dispatch(order_failure(error));
      } else {
        const error = JSON.parse(JSON.stringify(err));
        showAlert(error.response.data.message);
        return dispatch(order_failure(error));
      }
    })
  }
}

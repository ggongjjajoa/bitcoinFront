export const showAlert = (data) => {
    msg.show(data, {type: 'error'});
};

export const showSuccess = (data) => {
    msg.show(data, {type: 'success'});
};

export const showInfo = (data) => {
    msg.show(data, {type: 'info'});
}

export const socketConnected = (client) => (dispatch) => {return dispatch(connect(client))}
export const socketDisconnect = () => (dispatch) => {return dispatch(disconnect())}

const disconnect = () => {
  return {type : "DISCONNECT"};
}

const connect = (data) => {
  return {type : "CONNECT", client: data};
}

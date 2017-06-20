export const socketConnected = (client) => (dispatch) => {return dispatch(connect(client))}
export const socketDisconnect = () => (dispatch) => {return dispatch(disconnect())}

const disconnect = () => {
  return {type : "DISCONNECT"};
}

const connect = (data) => {
  return {type : "CONNECT", client: data};
}

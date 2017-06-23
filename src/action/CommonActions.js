export const socketConnected = (client) => (dispatch) => {return dispatch(connect(client))}
export const socketDisconnect = () => (dispatch) => {return dispatch(disconnect())}

const disconnect = () => {
  return {type : "DISCONNECT"};
}

const connect = (data) => {
  return {type : "CONNECT", client: data};
}

export const setItemList = (itemList) => (dispatch) => {
    return dispatch(_setItemList(itemList))
}

const _setItemList = (itemList) => {
    return {type : "SETITEMLIST", itemList: itemList};
}

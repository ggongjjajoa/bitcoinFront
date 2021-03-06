const initialState = {
    isConnect: true,
    client: null,
    itemList: null,
    expandItem: ""
};

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONNECT":
            return {
              ...state,
              isConnect: true,
              client: action.client
            }
            break;
        case "DISCONNECT":
            return {
              ...state,
              isConnect: false,
              client: null
            }
            break;
        case "SETITEMLIST":
            return {
              ...state,
              itemList: action.itemList
            }
            break;
        case "SETITEMEXPAND":
            return {
              ...state,
              expandItem: action.expandItem
            }
            break;
        default:
        return {
            ...state
        }
    }
}

export {CommonReducer};

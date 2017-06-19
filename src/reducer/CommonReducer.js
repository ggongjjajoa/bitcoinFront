const initialState = {
    isConnect: true,
    client: null
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
        default:
        return {
            ...state
        }
    }
}

export {CommonReducer};

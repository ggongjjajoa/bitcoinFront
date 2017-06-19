import {order, ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE} from '../action/TradeActions';

const initialTradeState = {
    isOrderRequest: false,
    isOrderSuccess: false,
    orderId: null,
    msg : null
}

const TradeReducer = (state = initialTradeState, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                isOrderRequest: true,
                orderId: null,
                msg: null
            };
            break;
        case ORDER_SUCCESS:
            return {
                ...state,
                isOrderSuccess: true,
                isOrderRequest: false,
                orderId: action.orderId,
                msg: null
            }
            break;
        case ORDER_FAILURE:
            return {
                ...state,
                isOrderRequest: false,
                orderId: null,
                msg: action.msg
            }
            break;
        default:
            return state;
            break;
    }
};

export {TradeReducer};

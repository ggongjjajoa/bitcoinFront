import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import {connect} from 'react-redux';

import {serverUrl} from '../Config';

class TradeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: "btc",
            contract_type: "this_week",
            askList: [],
            bidList: [],
            tickerList: [],
            leverage: 10,
            price: 0,
            amount: 0
        }
    }

    getTickerData(){
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default TradeContainer;

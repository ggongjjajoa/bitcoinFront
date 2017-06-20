import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import {connect} from 'react-redux';

import {serverUrl} from '../Config';

const itemList = [
    {
        item_name: "btc",
        contract_type: "this_week",
        last_price: 0
    },
    {
        item_name: "btc",
        contract_type: "next_week",
        last_price: 0
    },
    {
        item_name: "btc",
        contract_type: "quarter",
        last_price: 0
    },
];

class HomeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openChartNo: -1,
            items: itemList,
            subscribeTicker: null,
        }
    }

    componentDidMount() {
        this.getItemData();
        if(this.props.CommonStore.client != null){
            this.onSubscribeTicker(this.props.CommonStore.client);
        }
    }

    componentWillUnmount() {
        if(this.state.subscribeTicker!=null){
            this.state.subscribeTicker.unsubscribe();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.CommonStore.client == null && nextProps.CommonStore.client != null){
            if(this.state.subscribeTicker!=null){
                this.state.subscribeTicker.unsubscribe();
            }
            this.getItemData();
            this.onSubscribeTicker(nextProps.CommonStore.client);
        }
    }

    onChartClick(itemNo){
        if(itemList.length>=itemNo&&itemNo>=-1&&this.state.openChartNo!=itemNo){
            this.setState({openChartNo: itemNo});
        }else{
            this.setState({openChartNo: -1});
        }
    }

    getItemData(){
    }

    onSubscribeTicker(client){
        let subscribe = client.subscribe("/topic/ticker", (message) => {
            let parseMsg = JSON.parse(message.body);
            for(let i = 0; i < this.state.items.length ; i++){
                if(parseMsg.contract_type == this.state.items[i].contract_type){
                    this.setState({
                        items: update(this.state.items, {
                            [i]: {
                                lastPrice: {
                                    $set: (parseMsg.price * 1)
                                }
                            }
                        })
                    });
                    break;
                }
            }
        });
        this.setState({subscribeTicker: subscribe});
    }

    render () {
        return(
            <div></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {CommonStore: state.CommonReducer};
};

export default connect(mapStateToProps)(HomeContainer);

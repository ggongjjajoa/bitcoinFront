import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';

const itemList = [
    {
        item_name: "btc",
        contract_type: "this_week",
        lastPrice: 0
    },
    {
        item_name: "btc",
        contract_type: "next_week",
        lastPrice: 0
    },
    {
        item_name: "btc",
        contract_type: "quarter",
        lastPrice: 0
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

    onChartClick(itemNo){
        if(itemList.length>=itemNo&&itemNo>=-1&&this.state.openChartNo!=itemNo){
            this.setState({openChartNo: itemNo});
        }else{
            this.setState({openChartNo: -1});
        }
    }

    getInitialData(){
        axios.
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

export default HomeContainer;

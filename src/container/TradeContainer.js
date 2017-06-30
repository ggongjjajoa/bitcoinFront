import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import {connect} from 'react-redux';

import {serverUrl} from '../Config';

import TabsCtrl from '../components/trade/TabsCtrl';

class TradeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: false,
            historyList: [],
            orderList: [],
            positionList: [],
            subscribeTicker: null,
            subscribeDepth: null,
            subscribeConfrim: null,
            subscribeFilled: null,
            subscribePnl: null,
            askList: [],
            bidList: [],
            depthList: [],
            tickerList: []
        }
    }

    componentDidMount() {
        if (this.props.CommonStore.client != null) {
            this._onSubscribeBundle(this.props.CommonStore.client);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.CommonStore.client==null && nextProps.CommonStore.client != null){
            this._onSubscribeBundle(nextProps.CommonStore.client);
        }
    }

    componentWillUnmount() {
        this._onUnSubscrineBundle();
    }

    _onSubscribeBundle(client){
        this._onUnSubscrineBundle();
        this.subscribeTicker(client);
        this.subscribeDepth(client);
    }

    _onUnSubscrineBundle(){
        if(this.state.subscribeTicker != null){
            this.state.subscribeTicker.unsubscribe();
        }
        if(this.state.subscribeDepth != null){
            this.state.subscribeDepth.unsubscribe();
        }
    }

    getHistoryList(page) {
        axios.get(serverUrl + "/account/orders/list/my?page=" + page + "&username=" + getUsername()).then((resp) => {
            const response = JSON.parse(JSON.stringify(resp));
            if (page != 0) {
                let oldData = this.state.historyList.slice();
                for (let i = 0; i < response.data.orders.content.length; i++) {
                    oldData.push(response.data.orders.content[i]);
                }
                this.setState({
                    historyList: oldData,
                    hasMore: (response.data.orders.last == true
                        ? false
                        : true)
                });
            } else {
                this.setState({
                    historyList: response.data.orders.content,
                    hasMore: (response.data.orders.last == true
                        ? false
                        : true)
                });
            }
        }).catch((err) => {
            if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
                setTimeout(this.getOrdersData(page), 1000);
            } else {}
        });
    }

    getOrderList() {
        axios.get(serverUrl + "/account/voutstanding/list/my?page=0&username=" + getUsername()).then((resp) => {
            const response = JSON.parse(JSON.stringify(resp));
            this.setState({openOrdersList: response.data.outstandings.content});
        }).catch((err) => {
            if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
                setTimeout(this.getOutstandingData(), 1000);
            } else {}
        });
    }

    getPositionList() {
        axios.post(serverUrl + "/account/inquiry", {
            requestdata: JSON.stringify({"trtype": "USER_PL", "username": getUsername(), "account_type": "01"})
        }).then((resp) => {
            const response = JSON.parse(JSON.stringify(resp));
            this.setState({
                openPositionsList: JSON.parse(response.data.response)
            });
        }).catch((err) => {
            if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
                setTimeout(this.getOpenpositionData(), 1000);
            } else {}
        });
    }

    getUserData() {
        axios.post(serverUrl + "/account/inquiry", {
            requestdata: JSON.stringify({"trtype": "USER_BALANCE", "username": getUsername(), "account_type": "01"})
        }).then((resp) => {
            this.props.setAccountData(JSON.parse(resp.data.response));
        }).catch((err) => {
            if (JSON.parse(JSON.stringify(err)).response.status == 401 && requestCheck()) {
                setTimeout(this.searchUserBalance(), 1000);
            } else {}
        });
    }

    subscribeTicker(client) {
        let subscribe = client.subscribe("/topic/ticker", message => {
            let parseMsg = JSON.parse(message.body);
            if (this.props.params.contract_type == parseMsg.contract_type) {
                if (this.state.tickerList.length >= this.props.orderBookLength) {
                    this.setState({
                        tickerList: update(this.state.tickerList, {
                            $unshift: [
                                {
                                    'date': (parseMsg.date_ms * 1),
                                    'price': (parseMsg.price * 1),
                                    'type': parseMsg.type,
                                    'amount': (parseMsg.amount * 1)
                                }
                            ],
                            $splice: [
                                [this.props.orderBookLength, 1]
                            ]
                        })
                    })
                } else {
                    this.setState({
                        tickerList: update(this.state.tickerList, {
                            $unshift: [
                                {
                                    'date': (parseMsg.date_ms * 1),
                                    'price': (parseMsg.price * 1),
                                    'type': parseMsg.type,
                                    'amount': (parseMsg.amount * 1)
                                }
                            ]
                        })
                    });
                }
            }
        });
        this.setState({subscribeTicker: subscribe});
    }

    subscribeDepth(client) {
        let subscribe = client.subscribe("/topic/depth", message => {
            let parseMsg = JSON.parse(message.body);
            if (parseMsg.contract_type == this.props.params.contract_type) {
                let depths = [];
                for(let i = parseMsg.asks.length - 1 ; i > (parseMsg.asks.length - 1) - (this.props.orderBookLength / 2) ; i--){
                    let ask = parseMsg.asks[i];
                    ask[2] = "ask";
                    depths.push(ask);
                }
                for(let i = 0 ; i < (this.props.orderBookLength / 2) ; i++ ){
                    let bid = parseMsg.bids[i];
                    bid[2] = "bid";
                    depths.push(bid);
                }
                this.setState({depthList: depths});
            }else if (parseMsg.contract_type == "index") {
            }
        });
        this.setState({subscribeDepth: subscribe});
    }

    subscribeConfrim(client) {
        let subscribe = client.subscribe("/topic/confirm/" + getUsername(), message => {
            let parseMsg = JSON.parse(message.body);
            if (parseMsg.username == getUsername()) {
                if (parseMsg.RESULT == "S_OK") {
                    console.log("Successfully Order!");
                    if (parseMsg.type == "1" || parseMsg.type == "2") {
                        this.setState({
                            openOrdersList: update(this.state.openOrdersList, {
                                $unshift: [
                                    {
                                        'accountType': parseMsg.account_type,
                                        'average': "0",
                                        'code': parseMsg.contract_name,
                                        'codeType': parseMsg.contract_type,
                                        'fee': "0",
                                        'filled': "0",
                                        'hogaTypeId': parseMsg.match_price,
                                        'margin': "0",
                                        'ordNum': parseMsg.ORDER_NO,
                                        'pk': "0",
                                        'positionTypeId': (parseMsg.type) * 1,
                                        'price': parseMsg.price,
                                        'realOrderOrdNum': "0",
                                        'time': parseMsg.time,
                                        'username': parseMsg.username,
                                        'volOrder': parseMsg.amount,
                                        'volOutStd': parseMsg.amount,
                                        'volRemain': "0",
                                        'lever_rate': parseMsg.lever_rate
                                    }
                                ]
                            })
                        })
                    } else if (parseMsg.type == "3" || parseMsg.type == "4") {
                        let pair = 1;
                        if (parseMsg.type == "4") {
                            pair = 2;
                        }
                        let pairPosition = this.getPositionIndex(pair, parseMsg.contract_type);
                        this.setState({
                            openOrdersList: update(this.state.openOrdersList, {
                                $unshift: [
                                    {
                                        'accountType': parseMsg.account_type,
                                        'average': "0",
                                        'code': parseMsg.contract_name,
                                        'codeType': parseMsg.contract_type,
                                        'fee': "0",
                                        'filled': "0",
                                        'hogaTypeId': parseMsg.match_price,
                                        'margin': "0",
                                        'ordNum': parseMsg.ORDER_NO,
                                        'pk': "0",
                                        'positionTypeId': (parseMsg.type) * 1,
                                        'price': parseMsg.price,
                                        'realOrderOrdNum': "0",
                                        'time': parseMsg.time,
                                        'username': parseMsg.username,
                                        'volOrder': parseMsg.amount,
                                        'volOutStd': parseMsg.amount,
                                        'volRemain': "0",
                                        'lever_rate': parseMsg.lever_rate
                                    }
                                ]
                            }),
                            openPositionsList: update(this.state.openPositionsList, {
                                [pairPosition]: {
                                    _sum_available: {
                                        $set: (this.state.openPositionsList[pairPosition]._sum_available * 1) - (parseMsg.amount * 1)
                                    }
                                }
                            })
                        })
                    } else if (parseMsg.type == "6" || parseMsg.type == "7") {
                        for (let i = 0; i < this.state.openOrdersList.length; i++) {
                            if (this.state.openOrdersList[i].ordNum == parseMsg.org_no) {
                                this.setState({
                                    openOrdersList: update(this.state.openOrdersList, {
                                        $splice: [
                                            [i, 1]
                                        ]
                                    })
                                })
                            }
                        }
                    } else if (parseMsg.type == "8" || parseMsg.type == "9") {
                        let pair = 1;
                        if (parseMsg.type == "9") {
                            pair = 2;
                        }
                        let pairPosition = this.getPositionIndex(pair, parseMsg.contract_type);
                        for (let i = 0; i < this.state.openOrdersList.length; i++) {
                            if (this.state.openOrdersList[i].ordNum == parseMsg.org_no) {
                                this.setState({
                                    openOrdersList: update(this.state.openOrdersList, {
                                        $splice: [
                                            [i, 1]
                                        ]
                                    }),
                                    openPositionsList: update(this.state.openPositionsList, {
                                        [pairPosition]: {
                                            _sum_available: {
                                                $set: (this.state.openPositionsList[pairPosition]._sum_available * 1) + (parseMsg.amount * 1)
                                            },
                                            _sum_vol: {
                                                $set: (this.state.openPositionsList[pairPosition]._sum_available * 1) + (parseMsg.amount * 1)
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    }
                } else {
                    console.log(parseMsg.RESULT);
                }
            }
        });
        this.setState({subscribeConfrim: subscribe})
    }

    subscribeFilled(client) {
        let subscribe = client.subscribe("/topic/filled/" + getUsername(), message => {
            let parseMsg = JSON.parse(message.body);
            if (parseMsg.username == getUsername()) {
                if (parseMsg.message != "") {
                    if (parseMsg.message == "Your position is margin-called. Please check your order-history." && this.state.marginCall == false) {
                        this.setState({marginCall: true});
                        console.log(parseMsg.message, "info");
                    } else {
                        console.log(parseMsg.message, "info");
                    }
                }
                for (let i = 0; i < this.state.openOrdersList.length; i++) {
                    if (this.state.openOrdersList[i].ordNum == parseMsg.ordno) {
                        if (parseMsg.type == 1 || parseMsg.type == 2) {
                            if (this.state.openOrdersList[i].volOutStd == ((parseMsg.vol) * 1) + ((this.state.openOrdersList[i].filled) * 1)) {
                                let samePosition = this.getPositionIndex(parseMsg.type, parseMsg.contract_type);
                                if (samePosition != null) {
                                    this.setState({
                                        openOrdersList: update(this.state.openOrdersList, {
                                            $splice: [
                                                [i, 1]
                                            ]
                                        }),
                                        openPositionsList: update(this.state.openPositionsList, {
                                            [samePosition]: {
                                                _sum_vol: {
                                                    $set: (parseMsg.sum_vol * 1)
                                                },
                                                _sum_available: {
                                                    $set: (parseMsg.sum_available * 1)
                                                },
                                                _average: {
                                                    $set: parseMsg.sum_avg
                                                },
                                                _sum_profit: {
                                                    $set: (parseMsg.sum_pl * 1)
                                                },
                                                _sum_amount: {
                                                    $set: parseMsg.sum_amount
                                                }

                                            }
                                        }),
                                        orderHistoryList: update(this.state.orderHistoryList, {
                                            $unshift: [
                                                {
                                                    'code': parseMsg.contract_name,
                                                    'time': parseMsg.time,
                                                    'positionTypeId': (parseMsg.type) * 1,
                                                    'hogaTypeID': parseMsg.match_price,
                                                    'volOrder': 0,
                                                    'priceOrder': parseMsg.orderprice,
                                                    'volContract': parseMsg.available,
                                                    'priceContract': parseMsg.price,
                                                    'margin': 100 / (parseMsg.price * 1) / (parseMsg.lever_rate * 1) * (parseMsg.available * 1),
                                                    'fee': parseMsg.fee,
                                                    'orderTypeID': 2
                                                }
                                            ]
                                        })
                                    });
                                } else {
                                    this.setState({
                                        openOrdersList: update(this.state.openOrdersList, {
                                            $splice: [
                                                [i, 1]
                                            ]
                                        }),
                                        openPositionsList: update(this.state.openPositionsList, {
                                            $unshift: [
                                                {
                                                    '_accountType': parseMsg.account_type,
                                                    '_average': parseMsg.sum_avg,
                                                    '_code': parseMsg.contract_name,
                                                    '_codeType': parseMsg.contract_type,
                                                    '_isReal': parseMsg.isreal,
                                                    '_positionType': (parseMsg.type) * 1,
                                                    '_ratio': 0,
                                                    '_sum_amount': parseMsg.sum_amount,
                                                    '_sum_available': parseMsg.available,
                                                    '_sum_price': parseMsg.price,
                                                    '_sum_profit': (parseMsg.sum_pl * 1),
                                                    '_sum_vol': parseMsg.vol,
                                                    '_time': parseMsg.time,
                                                    'margin_rate': parseMsg.margin_rate,
                                                    'lever_rate': parseMsg.lever_rate,
                                                    'username': parseMsg.username
                                                }
                                            ]
                                        }),
                                        orderHistoryList: update(this.state.orderHistoryList, {
                                            $unshift: [
                                                {
                                                    'code': parseMsg.contract_name,
                                                    'time': parseMsg.time,
                                                    'positionTypeId': (parseMsg.type) * 1,
                                                    'hogaTypeID': parseMsg.match_price,
                                                    'volOrder': 0,
                                                    'priceOrder': parseMsg.orderprice,
                                                    'volContract': parseMsg.available,
                                                    'priceContract': parseMsg.price,
                                                    'margin': 100 / (parseMsg.price * 1) / (parseMsg.lever_rate * 1) * (parseMsg.available * 1),
                                                    'fee': parseMsg.fee,
                                                    'orderTypeID': 2
                                                }
                                            ]
                                        })
                                    });
                                }
                            } else {
                                let samePosition = this.getPositionIndex(parseMsg.type, parseMsg.contract_type);
                                if (samePosition != null) {
                                    this.setState({
                                        openOrdersList: update(this.state.openOrdersList, {
                                            [i]: {
                                                filled: {
                                                    $set: ((parseMsg.vol) * 1) + ((this.state.openOrdersList[i].filled) * 1)
                                                }
                                            }
                                        }),
                                        openPositionsList: update(this.state.openPositionsList, {
                                            [samePosition]: {
                                                _sum_vol: {
                                                    $set: (parseMsg.sum_vol * 1)
                                                },
                                                _sum_available: {
                                                    $set: (parseMsg.sum_available * 1)
                                                },
                                                _average: {
                                                    $set: parseMsg.sum_avg
                                                },
                                                _sum_profit: {
                                                    $set: (parseMsg.sum_pl * 1)
                                                },
                                                _sum_amount: {
                                                    $set: parseMsg.sum_amount
                                                }

                                            }
                                        }),
                                        orderHistoryList: update(this.state.orderHistoryList, {
                                            $unshift: [
                                                {
                                                    'code': parseMsg.contract_name,
                                                    'time': parseMsg.time,
                                                    'positionTypeId': (parseMsg.type) * 1,
                                                    'hogaTypeID': parseMsg.match_price,
                                                    'volOrder': 0,
                                                    'priceOrder': parseMsg.orderprice,
                                                    'volContract': parseMsg.available,
                                                    'priceContract': parseMsg.price,
                                                    'margin': 100 / (parseMsg.price * 1) / (parseMsg.lever_rate * 1) * (parseMsg.available * 1),
                                                    'fee': parseMsg.fee,
                                                    'orderTypeID': 2
                                                }
                                            ]
                                        })
                                    });
                                } else {
                                    this.setState({
                                        openOrdersList: update(this.state.openOrdersList, {
                                            [i]: {
                                                filled: {
                                                    $set: ((parseMsg.vol) * 1) + ((this.state.openOrdersList[i].filled) * 1)
                                                }
                                            }
                                        }),
                                        openPositionsList: update(this.state.openPositionsList, {
                                            $unshift: [
                                                {
                                                    '_accountType': parseMsg.account_type,
                                                    '_average': parseMsg.sum_avg,
                                                    '_code': parseMsg.contract_name,
                                                    '_codeType': parseMsg.contract_type,
                                                    '_isReal': parseMsg.isreal,
                                                    '_positionType': (parseMsg.type) * 1,
                                                    '_ratio': 0,
                                                    '_sum_amount': parseMsg.sum_amount,
                                                    '_sum_available': parseMsg.available,
                                                    '_sum_price': parseMsg.price,
                                                    '_sum_profit': (parseMsg.sum_pl * 1),
                                                    '_sum_vol': parseMsg.vol,
                                                    '_time': parseMsg.time,
                                                    'margin_rate': parseMsg.margin_rate,
                                                    'lever_rate': parseMsg.lever_rate,
                                                    'username': parseMsg.username
                                                }
                                            ]
                                        }),
                                        orderHistoryList: update(this.state.orderHistoryList, {
                                            $unshift: [
                                                {
                                                    'code': parseMsg.contract_name,
                                                    'time': parseMsg.time,
                                                    'positionTypeId': (parseMsg.type) * 1,
                                                    'hogaTypeID': parseMsg.match_price,
                                                    'volOrder': 0,
                                                    'priceOrder': parseMsg.orderprice,
                                                    'volContract': parseMsg.available,
                                                    'priceContract': parseMsg.price,
                                                    'margin': 100 / (parseMsg.price * 1) / (parseMsg.lever_rate * 1) * (parseMsg.available * 1),
                                                    'fee': parseMsg.fee,
                                                    'orderTypeID': 2
                                                }
                                            ]
                                        })
                                    });
                                }
                            }
                        } else if (parseMsg.type == 3 || parseMsg.type == 4) {
                            let pair = 1;
                            if (parseMsg.type == 4) {
                                pair = 2;
                            }
                            let pairPosition = this.getPositionIndex(pair, parseMsg.contract_type);
                            if (pairPosition == null) {
                                console.log("Position Select Error");
                            }
                            if (this.state.openOrdersList[i].volOutStd == ((parseMsg.vol) * 1) + ((this.state.openOrdersList[i].filled) * 1)) {
                                this.setState({
                                    openOrdersList: update(this.state.openOrdersList, {
                                        $splice: [
                                            [i, 1]
                                        ]
                                    }),
                                    openPositionsList: update(this.state.openPositionsList, {
                                        [pairPosition]: {
                                            _sum_vol: {
                                                $set: (parseMsg.sum_vol * 1)
                                            },
                                            _sum_available: {
                                                $set: (parseMsg.sum_available * 1)
                                            },
                                            _average: {
                                                $set: parseMsg.sum_avg
                                            },
                                            _sum_profit: {
                                                $set: (parseMsg.sum_pl * 1)
                                            },
                                            _sum_amount: {
                                                $set: parseMsg.sum_amount
                                            },
                                            margin_rate: {
                                                $set: parseMsg.margin_rate
                                            }
                                        }
                                    }),
                                    orderHistoryList: update(this.state.orderHistoryList, {
                                        $unshift: [
                                            {
                                                'code': parseMsg.contract_name,
                                                'time': parseMsg.time,
                                                'positionTypeId': (parseMsg.type) * 1,
                                                'hogaTypeID': parseMsg.match_price,
                                                'volOrder': 0,
                                                'priceOrder': parseMsg.orderprice,
                                                'volContract': parseMsg.available,
                                                'priceContract': parseMsg.price,
                                                'margin': 100 / (parseMsg.price * 1) / (parseMsg.lever_rate * 1) * (parseMsg.available * 1),
                                                'fee': parseMsg.fee,
                                                'orderTypeID': 2
                                            }
                                        ]
                                    })
                                });
                                let sameContrectAndtype = 0;
                                for (let j = 0; j < this.state.openOrdersList.length; j++) {
                                    if (this.state.openOrdersList[j].code == parseMsg.contract_type && this.state.openOrdersList[j].positionTypeId == parseMsg.type) {
                                        sameContrectAndtype++;
                                    }
                                }
                                if (sameContrectAndtype == 0 && (this.state.openPositionsList[pairPosition]._sum_vol * 1) == 0) {
                                    this.setState({
                                        openPositionsList: update(this.state.openPositionsList, {
                                            $splice: [
                                                [pairPosition, 1]
                                            ]
                                        })
                                    });
                                }
                            } else {
                                this.setState({
                                    openOrdersList: update(this.state.openOrdersList, {
                                        [i]: {
                                            filled: {
                                                $set: ((parseMsg.vol) * 1) + ((this.state.openOrdersList[i].filled) * 1)
                                            }
                                        }
                                    }),
                                    orderHistoryList: update(this.state.orderHistoryList, {
                                        $unshift: [
                                            {
                                                'code': parseMsg.contract_name,
                                                'time': parseMsg.time,
                                                'positionTypeId': (parseMsg.type) * 1,
                                                'hogaTypeID': parseMsg.match_price,
                                                'volOrder': 0,
                                                'priceOrder': parseMsg.orderprice,
                                                'volContract': parseMsg.available,
                                                'priceContract': parseMsg.price,
                                                'margin': 100 / (parseMsg.price * 1) / (parseMsg.lever_rate * 1) * (parseMsg.available * 1),
                                                'fee': parseMsg.fee,
                                                'orderTypeID': 2
                                            }
                                        ]
                                    })
                                })
                            }
                        }
                    }
                }
            }
        });
        this.setState({subscribeFilled: subscribe});
    }

    subscribePnl(client) {
        let subscribe = client.subscribe("/topic/pnl/" + getUsername(), message => {
            let parseMsg = JSON.parse(message.body);
            if (parseMsg.trid == "PNL") {
                for (let i = 0; i < this.state.openPositionsList.length; i++) {
                    if (this.state.openPositionsList[i]._codeType == parseMsg.contract_type && this.state.openPositionsList[i]._code == parseMsg.contract_name && this.state.openPositionsList[i]._positionType == parseMsg.type) {
                        this.setState({
                            openPositionsList: update(this.state.openPositionsList, {
                                [i]: {
                                    _sum_profit: {
                                        $set: (parseMsg.profit * 1)
                                    },
                                    _ratio: {
                                        $set: (parseMsg.ratio * 1)
                                    },
                                    margin_rate: {
                                        $set: (parseMsg.margin_rate * 1)
                                    }
                                }
                            })
                        });
                    }
                }
            }
        });
        this.setState({subscribePnl: subscribe});
    }

    render() {
        return (<TabsCtrl depthList={this.state.depthList} tickerList={this.state.tickerList}/>);
    }
}
TradeContainer.defaultProps = {
	orderBookLength: 10,
};


const mapStateToProps = (state) => {
    return {CommonStore: state.CommonReducer};
};

export default connect(mapStateToProps)(TradeContainer);

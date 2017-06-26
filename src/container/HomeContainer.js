import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import {connect} from 'react-redux';

import {serverUrl} from '../Config';

import {setExpandCard, setItemList} from '../action/CommonActions';

import CardList from '../components/home/CardList';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            chartData: [],
            bufChartData: [],
            subscribeTicker: null,
            isInterval: null,
            start: null,
            end: null
        }
    }

    componentDidMount() {
        if (this.props.CommonStore.itemList != null) {
            this.setState({itemList: this.props.CommonStore.itemList});
        }
        if (this.props.CommonStore.expandItem != "") {
            this.props.dispatch(setExpandCard(""));
        }
        if (this.props.CommonStore.client != null) {
            this.getTickerSubscribe(this.props.CommonStore.client);
        }
        this.onInterval();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.itemList.length == 0 && nextProps.CommonStore.itemList != null) {
            this.setState({itemList: nextProps.CommonStore.itemList});
        }
        if (nextProps.CommonStore.expandItem != "") {
            this.getChartData(nextProps.CommonStore.expandItem);
        }
        if (this.props.CommonStore.client == null && nextProps.CommonStore.client != null) {
            if (this.state.subscribeTicker != null) {
                this.state.subscribeTicker.unsubscribe();
            }
            this.getTickerSubscribe(nextProps.CommonStore.client);
        }
    }

    componentWillUnmount() {
        if (this.state.subscribeTicker != null) {
            this.state.subscribeTicker.unsubscribe();
        }
        if (this.state.itemList != []) {
            this.props.dispatch(setItemList(this.state.itemList));
        }
        this.offInterval();
    }

    getChartData(contract_type) {
        this.setState({chartData: [], bufChartData: []})
        axios.get(serverUrl + "/quotes/future_kline?symbol=btc_usd&type=1min&contract_type=" + contract_type).then((resp) => {
            let dataList = [];
            for (let i = 0; i < resp.data.length; i++) {
                let date = new Date(resp.data[i][0]);
                dataList.push({
                    'date': date,
                    'open': resp.data[i][1],
                    'close': resp.data[i][4],
                    'high': resp.data[i][2],
                    'low': resp.data[i][3],
                    'volume': resp.data[i][5],
                    'data': "ticker"
                });
            }
            this.setState({
                chartData: dataList,
                bufChartData: dataList,
                start: dataList[dataList.length - 21].date,
                end: dataList[dataList.length - 1].date
            })
        }).catch((err) => {
            this.getChartData(contract_type);
        });
    }

    getTickerSubscribe(client) {
        let subscribeTicker = client.subscribe("/topic/ticker", (message) => {
            let parseMsg = JSON.parse(message.body);
            for (let i = 0; i < this.state.itemList.length; i++) {
                if (this.state.itemList[i].contract_type == parseMsg.contract_type) {
                    this.setState({
                        itemList: update(this.state.itemList, {
                            [i]: {
                                last_price: {
                                    $set: (parseMsg.price * 1)
                                },
                                contract_name: {
                                    $set: (parseMsg.contract_name)
                                }
                            }
                        })
                    });
                    break;
                };
            };
            if (this.props.CommonStore.expandItem == parseMsg.contract_type && this.state.chartData.length != 0) {
                let position = this.getPosition(parseMsg.date * 1000, 1);
                if (position != null) {
                    let targetData = this.state.chartData[position];
                    if (targetData.data == "ticker") {
                        this.setState({
                            chartData: update(this.state.chartData, {
                                [position]: {
                                    close: {
                                        $set: (parseMsg.price * 1)
                                    },
                                    high: {
                                        $set: (((parseMsg.price * 1) > targetData.high)
                                            ? (parseMsg.price * 1)
                                            : targetData.high)
                                    },
                                    low: {
                                        $set: (((parseMsg.price * 1) > targetData.low)
                                            ? targetData.low
                                            : (parseMsg.price * 1))
                                    },
                                    volume: {
                                        $set: ((parseMsg.amount * 1) + (targetData.volume * 1))
                                    },
                                    data: {
                                        $set: "ticker"
                                    }
                                }
                            })
                        });
                    } else {
                        this.setState({
                            chartData: update(this.state.chartData, {
                                [position]: {
                                    open: {
                                        $set: (parseMsg.price * 1)
                                    },
                                    close: {
                                        $set: (parseMsg.price * 1)
                                    },
                                    high: {
                                        $set: (parseMsg.price * 1)
                                    },
                                    low: {
                                        $set: (parseMsg.price * 1)
                                    },
                                    volume: {
                                        $set: (parseMsg.amount * 1)
                                    },
                                    data: {
                                        $set: "ticker"
                                    }
                                }
                            })
                        });
                    }
                } else {
                    let targetData = this.state.chartData[this.state.chartData.length - 1];
                    this.setState({
                        chartData: update(this.state.chartData, {
                            $push: [
                                {
                                    'date': new Date(targetData.date * 1 + 60000 * 1),
                                    'open': targetData.close,
                                    'close': targetData.close,
                                    'high': targetData.close,
                                    'low': targetData.close,
                                    'volume': 0,
                                    'data': "else"
                                }
                            ]
                        })
                    });
                }
            };
        });
        this.setState({subscribeTicker: subscribeTicker});
    }

    getPosition(tickerDate, typeNumber) {
        if (this.state.chartData.length!=0) {
            for (let i = this.state.chartData.length - 1; i >= this.state.chartData.length - 4; i--) {
                let chartItem = this.state.chartData[i];
                if ((chartItem.date * 1) <= tickerDate && tickerDate < (chartItem.date * 1) + (60000 * typeNumber)) {
                    return i;
                }
            }
        }
        return null;
    }

    onInterval() {
        if (this.state.isInterval == null) {
            let intervalData = setInterval(() => {
                if (this.state.chartData.length != 0) {
                    let now = new Date();
                    let newChartData = this.state.chartData;
                    if ((now.getSeconds() == 0) && (now.getMinutes() % 1 == 0) && (now.getMinutes() != new Date(this.state.chartData[this.state.chartData.length - 1].date).getMinutes())) {
                        newChartData.push({
                            open: this.state.chartData[this.state.chartData.length - 1].close,
                            close: this.state.chartData[this.state.chartData.length - 1].close,
                            high: this.state.chartData[this.state.chartData.length - 1].close,
                            low: this.state.chartData[this.state.chartData.length - 1].close,
                            volume: 0,
                            date: new Date(this.state.chartData[this.state.chartData.length - 1].date * 1 + 60000 * 1),
                            data: "interval"
                        });
                        this.setState({chartData: newChartData});
                    }
                    this.setState({bufChartData: newChartData});
                }
            }, 1000);
            this.setState({isInterval: intervalData});
        }
    }

    offInterval() {
        if (this.state.isInterval != null) {
            clearInterval(this.state.isInterval);
        }
    }

    render() {
        return (
            <div>
                <CardList itemList={this.state.itemList} chartData={this.state.bufChartData} start={this.state.start} end={this.state.end}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {CommonStore: state.CommonReducer};
};

export default connect(mapStateToProps)(HomeContainer);

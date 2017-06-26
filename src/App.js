import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
    Link,
    refresh
} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import webstomp from 'webstomp-client';

import {socketConnected, socketDisconnect, setItemList} from './action/CommonActions';

import MainLayout from './components/layouts/MainLayout';
import {serverUrl} from './Config';

import TapsCtrl from './components/trade/TapsCtrl';

import HomeContainer from './container/HomeContainer';
import TradeContainer from './container/TradeContainer';

class App extends React.Component {
    componentDidMount() {
        this.getItemList();
        this.connectWebSocket();
    }

    getItemList() {
        axios.get(serverUrl + "/quotes/getassetmast").then((resp) => {
            this.props.dispatch(setItemList(resp.data));
        }).catch((err) => {
            console.log(err);
        });
    }

    connectWebSocket() {
        let ws = new SockJS(serverUrl+"/ws-quote");
        let client = webstomp.over(ws);
        client.heartbeat.incoming = 3000;
        client.heartbeat.outgoing = 0;
        client.debug = () => {};
        client.connect({}, () => {
            this.props.dispatch(socketConnected(client));
        }, () => {
            this.props.dispatch(socketDisconnect());
            this.reconnectWebSocket();
        });
    }

    reconnectWebSocket(){
        let connected = false;
        let reconInv = setInterval(()=>{
            let ws = new SockJS(serverUrl + "/ws-quote");
            let client = webstomp.over(ws);
            client.heartbeat.incoming = 3000;
            client.heartbeat.outgoing = 0;
            client.debug = () => {};
            client.connect({},()=>{
                clearInterval(reconInv);
                connected = true;
                this.props.dispatch(socketConnected(client));
            },()=>{
                if(connected){
                    this.props.dispatch(socketDisconnect());
                    this.reconnectWebSocket();
                }
            });
        },1000);
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" components={MainLayout}>
                    <IndexRoute component={HomeContainer}/>
                    <Route path="trade" components={TapsCtrl}>
                        <Route path=":contract_type"/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default connect(null)(App);

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

import {serverUrl, requestSuccess, requestFailure} from './Config';

import {socketConnected, socketDisconnect, setItemList} from './action/CommonActions';

import MainLayout from './components/layouts/MainLayout';
import HomeContainer from './container/HomeContainer';
import TradeContainer from './container/TradeContainer';

axios.interceptors.request.use(function(config) {
    const url = config.url;
    if (url.includes("/account") || url.includes("/profile") || url.includes("/otp") || url.includes("/partner")) {
        let token_data = getOAuthToken();
        config.headers.Authorization = 'Bearer ' + token_data.ACCESS_TOKEN;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
    requestSuccess();
    return response;
}, function(error) {
    if (error.response.status === 401 && getOAuthToken().ACCESS_TOKEN != null) {
        if (error.response.data.error_description.indexOf("expired") != -1) {
            axios.post(serverUrl + '/oauth/token?client_id=clientapp&client_secret=1fc57f93f0903cc75a74e1267b3e22a5e7943deb1eb8b5f1b0ee426a9824ff26&grant_type=refresh_token&refresh_token=' + getOAuthToken().REFRESH_TOKEN).then((resp) => {
                setOAuthToken(resp.data);
            }).catch((err) => {
                deleteOAuthToken();
                console.log("Server Error!! Please Login");
                browserHistory.push("/");
            });
        }
        if (requestFailure() > 10) {
            deleteOAuthToken();
            console.log("Your session has ended or you might be signed in from somewhere else.");
            browserHistory.push("/");
        }
    }
    return Promise.reject(error);
});

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
        console.log("connect socket");
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
        console.log("reconnect socket");
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
                    <Route path="trade" components={TradeContainer}>
                        <Route path=":contract_type"/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default connect(null)(App);

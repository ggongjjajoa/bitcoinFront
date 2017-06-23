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
import {socketConnected, socketDisconnect, setItemList} from './action/CommonActions';

import mainLayout from './components/layouts/mainLayout';
import {serverUrl} from './Config';

import test1 from './components/test1';
import test2 from './components/test2';

import HomeContainer from './container/HomeContainer';
import TradeContainer from './container/TradeContainer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.getInitialData();
    }

    getInitialData() {
        this.getItemList();
    }

    getItemList() {
        axios.get(serverUrl + "/quotes/getassetmast").then((resp) => {
            this.props.dispatch(setItemList(resp.data));
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" components={mainLayout}>
                    <IndexRoute component={HomeContainer}/>
                    <Route path="trade" components={test2}>
                        <Route path=":contract_type"/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default connect(null)(App);

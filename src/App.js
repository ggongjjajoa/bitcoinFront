import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
    Link,
    refresh
} from 'react-router';

import MainLayout from './components/layouts/MainLayout';

import HomeContainer from './container/HomeContainer';
import TradeContainer from './container/TradeContainer';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" components={MainLayout}>
                    <IndexRoute component={HomeContainer}/>
                    <Route path="trade" component={TradeContainer}/>
                </Route>
            </Router>
        );
    }
}

export default App;

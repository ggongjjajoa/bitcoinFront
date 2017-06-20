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
import test1 from './components/test1';
import test2 from './components/test2';


import HomeContainer from './container/HomeContainer';
import TradeContainer from './container/TradeContainer';

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" components={MainLayout}>
                    <IndexRoute component={test1}/>
                    <Route path="trade" component={test2}/>
                </Route>
            </Router>
        );
    }
}

export default App;
